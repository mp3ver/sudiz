package bookstore.controllers.security;

import bookstore.auth.*;
import bookstore.model.entities.*;
import bookstore.model.entities.User;
import bookstore.model.entities.enums.*;
import bookstore.model.repositories.*;
import bookstore.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.*;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.message.*;
import javax.servlet.http.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;

@RestController
@CrossOrigin
public class AuthorisationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuditAuthRepository auditAuthRepository;

    public final static int MILLIS_15_MIN = 15 * 60 * 1000;

    Map<String, AuthLock> lockMap = new ConcurrentHashMap<>();

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest, HttpServletRequest request) throws AuthException {
        AuthLock authLock = lockMap.get(request.getRemoteAddr());
        if (authLock != null) {
            authLock.incTryNumber();
        } else {
            authLock = new AuthLock(new Date(), false);
            lockMap.put(request.getRemoteAddr(), authLock);
        }

        if (authLock.isLocked()) {
            throw new AuthException("Too many tries. Please, wait for 15 minutes");
        }

        long now = new Date().getTime();
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            if (authLock.getTryNumber() >= AuthLock.AUTH_THRESHOLD &&
                    (now - authLock.getFirstTryDate().getTime() < MILLIS_15_MIN)) {
                authLock.lock();
                throw new AuthException("Too many tries. Please, wait for 15 minutes");
            } else if (now - authLock.getFirstTryDate().getTime() >= MILLIS_15_MIN) {
                authLock.newIteration();
                authLock.incTryNumber(); // 1 попытка уже была сделана, а сбросили мы их до нуля, т.к. отбыл наказание
            }
            auditAuthRepository.save(new AuditAuth(loginRequest.getLogin(), OperationAuthType.SIGNIN, OperationStatus.FAILURE));
            throw e;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        authLock.newIteration();

        auditAuthRepository.save(new AuditAuth(loginRequest.getLogin(), OperationAuthType.SIGNIN, OperationStatus.SUCCESS));
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getUsername(),
                roles));
    }
}