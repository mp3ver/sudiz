package bookstore.controllers;

import bookstore.model.entities.*;
import bookstore.model.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Secured({"ROLE_SUPPLY", "ROLE_ADMIN"})
public class PriceHistoryController {

    @Autowired
    PriceHistoryRepository priceHistoryRepository;

    /**
     * Получить всю историю цен
     * @return вся история цен
     */
    @GetMapping("/price_history")
    @ResponseStatus(HttpStatus.OK)
    public List<PriceHistory> findAll() {
        return priceHistoryRepository.findAll();
    }
}
