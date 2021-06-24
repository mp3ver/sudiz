import React, {useEffect, useState} from "react";
import styles from './checkout.module.css';
import {useHistory} from "react-router";
import {setBasket} from "../../../store/actions/basket";
import {connect} from "react-redux";
import {addSupply} from "../../../store/actions/supplies";


const Checkout = (props) => {
    const history = useHistory();
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        if (!props.basket.id) {
            history.push("/main/catalog");
        }
    }, []);

    const tryToBuy = () =>{
        let supply = {
            catalogRecord: props.basket,
            amount: amount
        }
        props.addSupply(supply);
        history.push("/main/catalog");
    }

    return (
        <div className="catalog">
            <div className={styles.receipt}>
                <h3>Чек</h3>
                <div className={styles.row}>
                    <span>Наименование</span> <span>Сумма</span>
                </div>
                <div className={styles.row}>
                    <span>{props.basket.vendorCode + ' ' + props.basket.detail.name}</span>
                    <button className={styles.amountButton} onClick={()=>{amount!==1 && setAmount(amount-1)}}>-</button>
                    <span>{amount}</span>
                    <button className={styles.amountButton} onClick={()=>{setAmount(amount+1)}}>+</button>
                    <span>{'x' + props.basket.currentPrice+' руб.'}</span>
                </div>
                <div className={styles.row}>
                    <span>Всего</span> <span>{amount * props.basket.currentPrice+' руб.'}</span>
                </div>
                <button className={"submit_button"} onClick={() => tryToBuy()}>Оформить заказ
                </button>
            </div>
        </div>
    )
}


const mapStateToProps = state => (
    {
        basket: state.basket.basket,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (detail) => dispatch(setBasket(detail)),
        addSupply: (supply) => dispatch(addSupply(supply))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);