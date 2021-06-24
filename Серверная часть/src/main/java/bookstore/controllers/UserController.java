package bookstore.controllers;

import bookstore.model.entities.*;
import bookstore.model.entities.User;
import bookstore.model.entities.enums.*;
import bookstore.model.repositories.*;
import bookstore.services.*;
import com.google.common.collect.*;
import org.springframework.beans.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@Secured("ROLE_ADMIN")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuditDataRepository auditDataRepository;

    @Autowired
    RoleRepository roleRepository;

    /**
     * Создать нового пользователя
     * @param user пользователь
     * @param authentication данные пользователя, заполняются автоматически
     * @return сохранённая запись
     */
    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        user.setId(null);

        if (user.getRoleUser() == null || user.getRoleUser().getRole() == null) {
            throw new IllegalArgumentException("There is no role for user!");
        }

        Optional<RoleUser> roleUserByRole = roleRepository.findRoleUserByRole(user.getRoleUser().getRole());
        if (!roleUserByRole.isPresent()) {
            throw new IllegalArgumentException("There is no role for user!");
        }

        user.setRoleUser(roleUserByRole.get());
        User savedUser = userRepository.save(user);
        auditDataRepository.save(new AuditData(userDetails.getUsername(), User.class.toString(), OperationType.CREATE, null, savedUser.toString()));
        return savedUser;
    }

    /**
     * Удалить пользователя
     * @param id идентификатор пользователя
     * @param authentication данные пользователя
     */
    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable long id, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), User.class.toString(), OperationType.DELETE, userRepository.findById(id).orElse(new User()).toString(), null));
        userRepository.deleteById(id);
    }

    /**
     * Обновить пользователя
     * @param id идентификатор пользователя
     * @param user новые данные пользователя
     * @param authentication данные пользователя
     * @return обновлённый пользователь
     */
    @PatchMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User patch(@PathVariable Long id, @RequestBody User user, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<User> bdUserOptional = userRepository.findById(id);
        if (!bdUserOptional.isPresent()) {
            return null;
        }

        User bdUser = bdUserOptional.get();

        if (user.getRoleUser() == null || user.getRoleUser().getRole() == null) {
            throw new IllegalArgumentException("There is no role for user!");
        }

        Optional<RoleUser> roleUserByRole = roleRepository.findRoleUserByRole(user.getRoleUser().getRole());
        if (!roleUserByRole.isPresent()) {
            throw new IllegalArgumentException("There is no role for user!");
        }

        user.setRoleUser(roleUserByRole.get());

        auditDataRepository.save(new AuditData(userDetails.getUsername(), User.class.toString(), OperationType.UPDATE, bdUser.toString(), user.toString()));
        BeanUtils.copyProperties(user, bdUser, "id");
        userRepository.save(bdUser);
        return bdUser;
    }

    /**
     * Получить всех пользователей
     * @return все пользователи
     */
    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /**
     * Получить все роли
     * @return все роли
     */
    @GetMapping("/roles")
    @ResponseStatus(HttpStatus.OK)
    public List<Role> getRoles() {
        return Lists.newArrayList(Role.values());
    }
}