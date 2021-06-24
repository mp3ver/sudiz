package bookstore.controllers.security;

import java.util.*;

import static bookstore.controllers.security.AuthorisationController.*;

public class AuthLock {
    private Date firstTryDate;
    private boolean isLocked;
    private int tryNumber = 1;

    public final static int AUTH_THRESHOLD = 3;

    public AuthLock(Date firstTryDate, boolean isLocked) {
        this.firstTryDate = firstTryDate;
        this.isLocked = isLocked;
    }

    public Date getFirstTryDate() {
        return firstTryDate;
    }

    public void setFirstTryDate(Date firstTryDate) {
        this.firstTryDate = firstTryDate;
    }

    public boolean isLocked() {
        return isLocked && new Date().getTime() - getFirstTryDate().getTime() < MILLIS_15_MIN;
    }

    public void lock() {
        isLocked = true;
    }

    public void unlock() {
        isLocked = false;
    }

    public int getTryNumber() {
        return tryNumber;
    }

    public void clearTryNumber() {
        this.tryNumber = 0;
    }

    public int incTryNumber() {
        return ++this.tryNumber;
    }

    public void newIteration() {
        this.firstTryDate = new Date();
        clearTryNumber();
        unlock();
    }
}
