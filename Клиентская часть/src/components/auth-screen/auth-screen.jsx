import React, {useState} from 'react';
import styles from './auth-screen.module.css'
import {useHistory} from "react-router";
import {setRole} from "../../store/actions/auth";
import {connect} from "react-redux";

const AuthScreen = (props) => {

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const tryToRegister = () => {
        fetch("/api/signin", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({login: login, password: password})
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else if(response.status === 401){
                    throw new Error("Неверный логин или пароль")
                } else if(response.status === 500){
                    throw new Error("Превышен лимит попыток входа, попробуйте позже")
                }
            })
            .then(jsonData => {
                localStorage.setItem("jwt", JSON.stringify(jsonData));
                history.push("/main/registry");
            }).catch((error) => alert(error.message))
    }

    const history = useHistory();
    return (
        <div className={styles.container}>
            <div className={styles.fill}/>
            <div className={styles.authorization}>
                <div className={styles.authorizationBlock}>
                    <h1 className={styles.title}>СУДИЗ</h1>
                    <input placeholder="Логин" onChange={(e) => setLogin(e.target.value)}/>
                    <input placeholder="Пароль" type={'password'} onChange={(e) => setPassword(e.target.value)}/>
                    <button className={"submit_button"} onClick={() => tryToRegister()}>Войти</button>
                </div>
                <div className={styles.version}>ver: 0.5.2</div>
            </div>
        </div>
    )
}

export default AuthScreen;