package bookstore.model.entities;

import bookstore.model.entities.enums.*;

import javax.persistence.*;
import java.util.*;

/**
 * Аудит авторизации
 */
@Table(name = "audit_auth")
@Entity
public class AuditAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Date date;
    String login;
    @Enumerated(EnumType.STRING)
    OperationAuthType operationType;
    @Enumerated(EnumType.STRING)
    OperationStatus status;

    public AuditAuth(String login, OperationAuthType operationType, OperationStatus status) {
        this.date = new Date();
        this.login = login;
        this.operationType = operationType;
        this.status = status;
    }

    public AuditAuth() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public OperationAuthType getOperationType() {
        return operationType;
    }

    public void setOperationType(OperationAuthType operationType) {
        this.operationType = operationType;
    }

    public OperationStatus getStatus() {
        return status;
    }

    public void setStatus(OperationStatus status) {
        this.status = status;
    }
}
