package bookstore.controllers;

import bookstore.model.entities.*;
import bookstore.model.entities.enums.*;
import bookstore.model.repositories.*;
import org.springframework.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@Secured({"ROLE_SUPPLY", "ROLE_ADMIN"})
public class DealerController {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    AuditDataRepository auditDataRepository;

    /**
     * Создать нового поставщика
     * @param dealer поставщик
     * @param authentication данные пользователя, заполняются автоматически
     * @return сохранённая запись
     */
    @PostMapping("/dealer")
    @ResponseStatus(HttpStatus.CREATED)
    public Dealer create(@RequestBody Dealer dealer, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        dealer.setId(null);
        Dealer savedDealer = dealerRepository.save(dealer);
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Dealer.class.toString(), OperationType.CREATE, null, savedDealer.toString()));
        return savedDealer;
    }

    /**
     * Получить всех поставщиков
     * @return все поставщики
     */
    @GetMapping("/dealer")
    @ResponseStatus(HttpStatus.OK)
    public List<Dealer> findAll() {
        return dealerRepository.findAll();
    }

    /**
     * Удалить поставщика
     * @param id идентификатор поставщика
     * @param authentication данные текущего пользователя
     */
    @DeleteMapping("/dealer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Dealer.class.toString(), OperationType.DELETE, dealerRepository.findById(id).orElse(new Dealer()).toString(), null));
        dealerRepository.deleteById(id);
    }

    /**
     * Обновить поставщика
     * @param id идентификатор поставщика
     * @param dealer новые данные поставщика
     * @param authentication данные пользователя
     * @return обновлённый поставщик
     */
    @PatchMapping("/dealer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Dealer patch(@PathVariable Long id, @RequestBody Dealer dealer, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<Dealer> bdDealerOptional = dealerRepository.findById(id);
        if (!bdDealerOptional.isPresent()) {
            return null;
        }

        Dealer bdDealer = bdDealerOptional.get();

        auditDataRepository.save(new AuditData(userDetails.getUsername(), Dealer.class.toString(), OperationType.UPDATE, bdDealer.toString(), dealer.toString()));
        BeanUtils.copyProperties(dealer, bdDealer, "id");
        dealerRepository.save(bdDealer);
        return bdDealer;
    }
}
