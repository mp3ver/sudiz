import React, {useEffect} from 'react';
import DetailCard from "./detail-card/detail-card";
import {connect} from "react-redux";
import {getCatalog} from "../../../store/actions/catalog";
import {setBasket} from "../../../store/actions/basket";


const Catalog = (props) => {
    useEffect(() => {
        props.getCatalog();
    }, []);

    return (
        <div className="catalog">
                {props.catalog.map(detail => <DetailCard key={detail.id} detail={detail}/>)}
        </div>
    )
}


const mapStateToProps = state => ({
    catalog: state.catalog.catalog,
})

const mapDispatchToProps = dispatch => {
    return {
        getCatalog: () => dispatch(getCatalog()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);