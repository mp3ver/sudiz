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

import java.util.*;

@RestController
@CrossOrigin
@Secured({"ROLE_SUPPLY", "ROLE_ADMIN"})
public class DetailController {

    @Autowired
    DetailRepository detailRepository;

    @Autowired
    AuditDataRepository auditDataRepository;

    /**
     * Создать нового поставщика
     * @param dealer поставщик
     * @param authentication данные пользователя, заполняются автоматически
     * @return сохранённая запись
     */
    @PostMapping("/detail")
    @ResponseStatus(HttpStatus.CREATED)
    public Detail create(@RequestBody Detail detail, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        detail.setId(null);
        Detail savedDetail = detailRepository.save(detail);
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Detail.class.toString(), OperationType.CREATE, null, savedDetail.toString()));
        return savedDetail;
    }

    /**
     * Получить всех поставщиков
     * @return все поставщики
     */
    @GetMapping("/detail")
    @ResponseStatus(HttpStatus.OK)
    public List<Detail> findAll() {
        return detailRepository.findAll();
    }

    /**
     * Удалить деталь по идентификатору
     * @param id идентификатор детали
     * @param authentication данные пользователя
     */
    @DeleteMapping("/detail/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        auditDataRepository.save(new AuditData(userDetails.getUsername(), Detail.class.toString(), OperationType.DELETE, detailRepository.findById(id).orElse(new Detail()).toString(), null));
        detailRepository.deleteById(id);
    }

    /**
     * Обновить деталь
     * @param id идентификатор детали
     * @param detail новые данные детали
     * @param authentication данные пользователя
     * @return обновлённая деталь
     */
    @PatchMapping("/detail/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Detail patch(@PathVariable Long id, @RequestBody Detail detail, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<Detail> bdDetailOptional = detailRepository.findById(id);
        if (!bdDetailOptional.isPresent()) {
            return null;
        }

        Detail bdDetail = bdDetailOptional.get();

        auditDataRepository.save(new AuditData(userDetails.getUsername(), Detail.class.toString(), OperationType.UPDATE, bdDetail.toString(), detail.toString()));
        BeanUtils.copyProperties(detail, bdDetail, "id");
        detailRepository.save(bdDetail);
        return bdDetail;
    }
}
