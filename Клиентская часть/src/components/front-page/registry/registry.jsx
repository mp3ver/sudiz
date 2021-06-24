import React, {useEffect, useState} from 'react';
import {
    SearchState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {connect} from "react-redux";
import {getMySupplies} from "../../../store/actions/supplies";

const Registry = (props) => {
    const [columns] = useState([
        {name: 'vendorCode', title: 'Артикул'},
        {name: 'deviceName', title: 'Наименование'},
        {name: 'dealer', title: 'Поставщик'},
        {name: 'amount', title: 'Кол-во'},
        {name: 'totalPrice', title: 'Итого'},
        {name: 'date', title: 'Дата'},
    ]);

    useEffect(() => {
        props.getMySupplies();
    }, []);

    return (
        <div className="card" style={{margin: "1% 10%"}}>
            <Grid
                rows={props.supplies}
                columns={columns}
            >
                <SearchState/>
                <IntegratedFiltering/>
                <Table/>
                <TableHeaderRow/>
                <Toolbar/>
                <SearchPanel messages={{searchPlaceholder:"Поиск..."}}/>
            </Grid>
        </div>
    );
};

const mapStateToProps = state => ({
    supplies: state.supplies.mySupplies,
})

const mapDispatchToProps = dispatch => {
    return {
        getMySupplies: () => dispatch(getMySupplies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registry);