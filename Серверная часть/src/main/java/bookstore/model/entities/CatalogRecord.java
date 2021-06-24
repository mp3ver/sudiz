package bookstore.model.entities;

import javax.persistence.*;
import java.math.*;

/**
 * Запись в каталог
 */
@Entity
@Table(name = "catalog")
public class CatalogRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "dealer_id")
    Dealer dealer;
    BigDecimal currentPrice;
    String vendorCode;
    @ManyToOne
    @JoinColumn(name = "detail_id")
    Detail detail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public Detail getDetail() {
        return detail;
    }

    public void setDetail(Detail detail) {
        this.detail = detail;
    }

    @Override
    public String toString() {
        return "CatalogRecord{" +
                "id=" + id +
                ", dealer=" + dealer +
                ", currentPrice=" + currentPrice +
                ", vendorCode='" + vendorCode + '\'' +
                '}';
    }
}
