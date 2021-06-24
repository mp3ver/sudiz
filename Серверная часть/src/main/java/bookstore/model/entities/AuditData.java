package bookstore.model.entities;

import bookstore.model.entities.enums.*;

import javax.persistence.*;

/**
 * Аудит данных
 */
@Table(name = "audit_data")
@Entity
public class AuditData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String login;
    String resource;
    @Enumerated(EnumType.STRING)
    OperationType operationType;
    String oldValue;
    String newValue;

    public AuditData(String login, String resource, OperationType operationType, String oldValue, String newValue) {
        this.login = login;
        this.resource = resource;
        this.operationType = operationType;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    public AuditData() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public OperationType getOperationType() {
        return operationType;
    }

    public void setOperationType(OperationType operationType) {
        this.operationType = operationType;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }
}
