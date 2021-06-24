package bookstore.model.repositories;

import bookstore.model.entities.*;
import org.springframework.data.jpa.repository.*;

public interface DetailRepository extends JpaRepository<Detail, Long> {
}
