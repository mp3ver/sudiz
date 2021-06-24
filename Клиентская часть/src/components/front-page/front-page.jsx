import React from 'react';
import styles from './front-page.module.css';
import {Route, useHistory} from "react-router";
import Registry from "./registry/registry";
import Catalog from "./catalog/catalog";
import Management from "./management/management";
import Checkout from "./checkout/checkout";


const FrontPage = () => {
    const history = useHistory();
    const signOut = () => {
        localStorage.clear();
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.title}>СУДИЗ</h4>
                <div className={styles.navigation}>
                    <button className={styles.navButton} onClick={() => history.push("/main/registry")}>Реестр закупок
                    </button>
                    <button className={styles.navButton} onClick={() => history.push("/main/catalog")}>Каталог</button>
                    <button className={styles.navButton} onClick={() => history.push("/main/management")}>Управление</button>
                    <a href={'/'} onClick={signOut}>
                        <div className={styles.navButton}>Выйти</div>
                    </a>
                </div>
            </div>

            <div className={styles.contentArea}>
                <Route path={"/main/registry"} component={Registry}/>
                <Route path={"/main/catalog"} component={Catalog}/>
                <Route path={"/main/management"} component={Management}/>
                <Route path={"/main/checkout"} component={Checkout}/>
            </div>
        </div>
    )
}

export default FrontPage;