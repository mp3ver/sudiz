package bookstore.model.entities;

import javax.persistence.*;
import java.math.*;
import java.util.*;

/**
 * Сущность "Поставка"
 */
@Table(name = "supply")
@Entity
public class Supply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "catalog_id")
    CatalogRecord catalogRecord;
    Date date;
    Integer amount;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    BigDecimal totalPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatalogRecord getCatalogRecord() {
        return catalogRecord;
    }

    public void setCatalogRecord(CatalogRecord catalogRecord) {
        this.catalogRecord = catalogRecord;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Supply{" +
                "id=" + id +
                ", catalogRecordId=" + (catalogRecord == null ? "null" : catalogRecord.getId()) +
                ", date=" + date +
                ", amount=" + amount +
                ", user=" + (user == null ? null : user.getLogin()) +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
