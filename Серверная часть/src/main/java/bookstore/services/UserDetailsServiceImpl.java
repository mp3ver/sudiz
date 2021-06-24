package bookstore.services;

import bookstore.model.entities.User;
import bookstore.model.repositories.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;

import javax.transaction.*;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepository.findUserByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException(
                    "No user found with username: " + login);
        }
        org.springframework.security.core.userdetails.User.UserBuilder userBuilder = org.springframework.security.core.userdetails.User.withUsername(login);
        userBuilder.password(user.getPassword());
        userBuilder.authorities(user.getRoleUser().getRole().toString());
        return userBuilder.build();
    }
}