package bookstore.model.repositories;

import bookstore.model.entities.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
    List<Supply> findByUserId(Long userId);
}
