package bookstore.controllers;

import bookstore.model.entities.*;
import bookstore.model.entities.enums.*;
import bookstore.model.repositories.*;
import org.springframework.beans.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.*;
import java.util.*;

@RestController
@CrossOrigin
@Secured({"ROLE_SUPPLY", "ROLE_PURCHASE", "ROLE_ADMIN"})
public class CatalogController {

    @Autowired
    CatalogRecordRepository catalogRecordRepository;

    @Autowired
    PriceHistoryRepository priceHistoryRepository;

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    DetailRepository detailRepository;

    @Autowired
    AuditDataRepository auditDataRepository;

    /**
     * Создать новую запись в каталоге
     * @param catalogRecord запись каталога
     * @param authentication данные пользователя, заполняются автоматически
     * @return сохранённая запись
     */
    @PostMapping("/catalog")
    @ResponseStatus(HttpStatus.CREATED)
    public CatalogRecord create(@RequestBody CatalogRecord catalogRecord, Authentication authentication) {
        catalogRecord.setId(null);
        catalogRecord.setDealer(dealerRepository.findById(catalogRecord.getDealer().getId()).orElse(null));
        catalogRecord.setDetail(detailRepository.findById(catalogRecord.getDetail().getId()).orElse(null));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), CatalogRecord.class.toString(), OperationType.CREATE, null, catalogRecord.toString()));
        return catalogRecordRepository.save(catalogRecord);
    }

    /**
     * Получить все записи каталога
     * @return все записи каталога
     */
    @GetMapping("/catalog")
    @ResponseStatus(HttpStatus.OK)
    public List<CatalogRecord> findAll() {
        return catalogRecordRepository.findAll();
    }

    /**
     * Удалить запись каталога
     * @param id идентификатор записи каталога
     * @param authentication данные текущего пользователя
     */
    @DeleteMapping("/catalog/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), CatalogRecord.class.toString(), OperationType.DELETE, catalogRecordRepository.findById(id).orElse(new CatalogRecord()).toString(), null));
        catalogRecordRepository.deleteById(id);
    }

    /**
     * Обновить запись каталога
     * @param id идентификатор записи каталога
     * @param catalogRecord новые данные запписи каталога
     * @param authentication данные пользователя
     * @return обновлённая запись каталога
     */
    @PatchMapping("/catalog/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CatalogRecord patch(@PathVariable Long id, @NotNull @RequestBody CatalogRecord catalogRecord, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<CatalogRecord> bdRecordOptional = catalogRecordRepository.findById(id);
        if (!bdRecordOptional.isPresent()) {
            return null;
        }

        CatalogRecord bdRecord = bdRecordOptional.get();

        if (bdRecord.getCurrentPrice() != null &&
                bdRecord.getCurrentPrice().compareTo(catalogRecord.getCurrentPrice()) != 0) {
            priceHistoryRepository.save(new PriceHistory(bdRecord, bdRecord.getCurrentPrice(), catalogRecord.getCurrentPrice()));
        }

        catalogRecord.setDealer(dealerRepository.findById(catalogRecord.getDealer().getId()).orElse(null));
        catalogRecord.setDetail(detailRepository.findById(catalogRecord.getDetail().getId()).orElse(null));

        auditDataRepository.save(new AuditData(userDetails.getUsername(), CatalogRecord.class.toString(), OperationType.UPDATE, bdRecord.toString(), catalogRecord.toString()));
        BeanUtils.copyProperties(catalogRecord, bdRecord, "id");
        catalogRecordRepository.save(bdRecord);
        return bdRecord;
    }
}
