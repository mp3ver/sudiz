package bookstore.model.repositories;

import bookstore.model.entities.*;
import bookstore.model.entities.enums.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface RoleRepository extends JpaRepository<RoleUser, Long> {
    Optional<RoleUser> findRoleUserByRole(Role role);
}
