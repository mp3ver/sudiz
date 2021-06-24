package bookstore.model.entities;

import bookstore.model.entities.enums.*;

import javax.persistence.*;

/**
 * Сущность "Роль пользователя"
 */
@Table(name = "role")
@Entity
public class RoleUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String note;
    @Enumerated(EnumType.STRING)
    Role role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "RoleUser{" +
                "id=" + id +
                ", note='" + note + '\'' +
                ", role=" + role +
                '}';
    }
}
