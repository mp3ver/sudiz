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
import {getHistory} from "../../../store/actions/price-history";
import {getPriceHistory} from "../../../store/selectors/price-history";

const PriceHistory = (props) => {
    const [columns] = useState([
        {name: 'vendorCode', title: 'Артикул'},
        {name: 'dealer', title: "Поставщик"},
        {name: 'date', title: 'Дата'},
        {name: 'oldPrice', title: 'Старая цена'},
        {name: 'newPrice', title: 'Новая цена'},
    ]);

    useEffect(() => {
        props.getPriceHistory();
    }, []);

    return (
        <div className="card">
            <Grid
                rows={props.history}
                columns={columns}
            >
                <SearchState/>
                <IntegratedFiltering />
                <Table />
                <TableHeaderRow />
                <Toolbar />
                <SearchPanel messages={{searchPlaceholder:"Поиск..."}}/>
            </Grid>
        </div>
    );
};



const mapStateToProps = state => ({
    history: getPriceHistory(state),
})

const mapDispatchToProps = dispatch => {
    return {
        getPriceHistory: () => dispatch(getHistory()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistory);