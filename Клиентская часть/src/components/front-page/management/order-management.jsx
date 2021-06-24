import React, {useEffect, useState} from 'react';
import {EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {addSupply, deleteSupply, editSupply, getSupplies} from "../../../store/actions/supplies";
import {connect} from "react-redux";
import {getSuppliesForManagement} from "../../../store/selectors/supplies";

const getRowId = row => row.id;

const SupplyManagement = (props) => {
    const [columns] = useState([
        {name: 'detail', title: 'Артикул'},
        {name: 'dealer', title: "Поставщик"},
        {name: 'date', title: 'Дата'},
        {name: 'amount', title: 'Кол-во'},
        {name: 'totalPrice', title: 'Итого'},
        {name: 'user', title: 'Покупатель'}
    ]);


    useEffect(() => {
        props.getSupplies();
    }, []);

    const commitChanges = ({ added, changed, deleted }) => {
        if (deleted) {
            props.deleteSupply(deleted[0]);
        }
    };
    

    return (
        <div className="card">
            <Grid
                rows={props.supplies}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <Table/>
                <TableHeaderRow/>
                <TableEditRow/>
                <TableEditColumn
                    showDeleteCommand
                    width = {"200px"}
                    messages = {{
                        deleteCommand:"Удалить",
                    }}
                />
            </Grid>
        </div>
    );
};


const mapStateToProps = state => ({
    supplies: getSuppliesForManagement(state),
    initialSupplies: state.supplies.supplies,
})

const mapDispatchToProps = dispatch => {
    return {
        getSupplies: () => dispatch(getSupplies()),
        addSupply: (dealer) => dispatch(addSupply(dealer)),
        editSupply: (dealer) => dispatch(editSupply(dealer)),
        deleteSupply: (dealer) => dispatch(deleteSupply(dealer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplyManagement);