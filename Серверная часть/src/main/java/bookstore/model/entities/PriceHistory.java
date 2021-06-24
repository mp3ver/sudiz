package bookstore.model.entities;

import javax.persistence.*;
import java.math.*;
import java.util.*;

/**
 * Сущность "История цен"
 */
@Table(name = "price_history")
@Entity
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "catalog_id")
    CatalogRecord catalogRecord;
    Date date;
    BigDecimal oldPrice;
    BigDecimal newPrice;

    public PriceHistory() {
    }

    public PriceHistory(CatalogRecord catalogRecord, BigDecimal oldPrice, BigDecimal newPrice) {
        this.date = new Date();
        this.catalogRecord = catalogRecord;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatalogRecord getCatalog() {
        return catalogRecord;
    }

    public void setCatalog(CatalogRecord catalogRecord) {
        this.catalogRecord = catalogRecord;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(BigDecimal oldPrice) {
        this.oldPrice = oldPrice;
    }

    public BigDecimal getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(BigDecimal newPrice) {
        this.newPrice = newPrice;
    }
}
