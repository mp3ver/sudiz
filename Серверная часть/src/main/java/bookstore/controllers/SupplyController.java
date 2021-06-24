package bookstore.controllers;

import bookstore.model.entities.*;
import bookstore.model.entities.User;
import bookstore.model.entities.enums.*;
import bookstore.model.repositories.*;
import org.springframework.beans.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import java.math.*;
import java.util.*;

@RestController
@CrossOrigin
@Secured({"ROLE_PURCHASE", "ROLE_ADMIN"})
public class SupplyController {

    @Autowired
    SupplyRepository supplyRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CatalogRecordRepository catalogRecordRepository;

    @Autowired
    AuditDataRepository auditDataRepository;

    /**
     * Создать новую поставку
     * @param supply поставка
     * @param authentication данные пользователя, заполняются автоматически
     * @return сохранённая запись
     */
    @PostMapping("/supply")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_PURCHASE", "ROLE_ADMIN", "ROLE_SUPPLY"})
    public Supply create(@RequestBody Supply supply, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findUserByLogin(userDetails.getUsername());
        supply.setId(null);
        supply.setDate(new Date());
        supply.setCatalogRecord(catalogRecordRepository.findById(supply.getCatalogRecord().getId()).orElse(null));
        supply.setTotalPrice(supply.getCatalogRecord().getCurrentPrice().multiply(BigDecimal.valueOf(supply.getAmount())));
        supply.setUser(user);
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Supply.class.toString(), OperationType.CREATE, null, supply.toString()));
        return supplyRepository.save(supply);
    }

    /**
     * Получить все поставки
     * @return все поставки
     */
    @GetMapping("/supply")
    @ResponseStatus(HttpStatus.OK)
    public List<Supply> findAll() {
        return supplyRepository.findAll();
    }

    /**
     * Получить поставки текущего пользователя
     * @param authentication данные пользователя
     * @return поставки текущего пользователя
     */
    @GetMapping("/supply/my")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_PURCHASE", "ROLE_ADMIN", "ROLE_SUPPLY"})
    public List<Supply> findMySupplies(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findUserByLogin(userDetails.getUsername());
        return supplyRepository.findByUserId(user.getId());
    }

    /**
     * Удалить поставку по идентификатору
     * @param id идентификатор
     * @param authentication данные пользователя
     */
    @DeleteMapping("/supply/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Supply.class.toString(), OperationType.DELETE, supplyRepository.findById(id).orElse(new Supply()).toString(), null));
        supplyRepository.deleteById(id);
    }

    /**
     * Обновить поставку
     * @param id идентификатор поставки
     * @param supply новые данные поставки
     * @param authentication данные пользователя
     * @return обновлённая поставка
     */
    @PatchMapping("/supply/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Supply patch(@PathVariable Long id, @RequestBody Supply supply, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<Supply> bdSupplyOptional = supplyRepository.findById(id);
        if (!bdSupplyOptional.isPresent()) {
            return null;
        }

        Supply bdSupply = bdSupplyOptional.get();

        auditDataRepository.save(new AuditData(userDetails.getUsername(), Supply.class.toString(), OperationType.UPDATE, bdSupply.toString(), supply.toString()));
        BeanUtils.copyProperties(supply, bdSupply, "id");
        supplyRepository.save(bdSupply);
        return bdSupply;
    }
}
