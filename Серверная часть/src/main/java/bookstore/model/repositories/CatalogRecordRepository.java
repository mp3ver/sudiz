package bookstore.model.repositories;

import bookstore.model.entities.*;
import org.springframework.data.jpa.repository.*;

public interface CatalogRecordRepository extends JpaRepository<CatalogRecord, Long> {
}
