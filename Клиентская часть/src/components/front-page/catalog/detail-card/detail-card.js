import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {useHistory} from "react-router";
import {setBasket} from "../../../../store/actions/basket";
import {connect} from "react-redux";

const DetailCard = (props) => {
    const history = useHistory();
    const tryToBuy = (detail) =>{
        props.setBasket(detail);
        history.push("/main/checkout");
    }

    return (
        <div className={"detailCard"}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{props.detail.detail.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Артикул: {props.detail.detail.vendorCode}</CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.detail.dealer.name}</CardSubtitle>
                </CardBody>
                <img style={{width:"100%"}} src={"https://images.ru.prom.st/436863228_w640_h640_podshipniki.jpg"} alt="Card image cap"/>
                <CardBody>
                    <CardText>{props.detail.detail.note}</CardText>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.detail.currentPrice +' руб.'}</CardSubtitle>
                    <Button style={{height:"40px"}} onClick={()=>tryToBuy(props.detail)}>Приобрести</Button>
                </CardBody>
            </Card>
        </div>
    );
};


const mapStateToProps = state => ({
    basket: state.basket.basket,
})

const mapDispatchToProps = dispatch => {
    return {
        setBasket: (detail) => dispatch(setBasket(detail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);