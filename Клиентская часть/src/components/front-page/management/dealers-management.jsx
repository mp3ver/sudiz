import React, {useEffect, useState} from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {addDealer, deleteDealer, editDealer, getDealers} from "../../../store/actions/dealers";
import {connect} from "react-redux";

const getRowId = row => row.id;

const DealersManagement = (props) => {
    const [columns] = useState([
        { name: 'name', title: 'Название' },
        { name: 'address', title: 'Адрес' },
        { name: 'phoneNumber', title: 'Номер телефона' },
    ]);

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            let addedRow ={...added[0]};
            props.addDealer(addedRow);
        }
        if (changed) {
            props.dealers.forEach(row =>{
                if(changed[row.id]){
                    let editedRawRow = {...row, ...changed[row.id]};
                    props.editDealer(editedRawRow);
                }
            })
        }
        if (deleted) {
            props.deleteDealer(deleted[0]);
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.dealers}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <Table />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand
                    showEditCommand
                    showDeleteCommand
                    width = {"200px"}
                    messages = {{
                        addCommand:"Добавить",
                        editCommand:"Изменить",
                        deleteCommand:"Удалить",
                        commitCommand: "Сохранить",
                        cancelCommand: "Отменить",
                    }}
                />
            </Grid>
        </div>
    );
};


const mapStateToProps = state => ({
    dealers: state.dealers.dealers,
})

const mapDispatchToProps = dispatch => {
    return {
        addDealer: (dealer) => dispatch(addDealer(dealer)),
        editDealer: (dealer) => dispatch(editDealer(dealer)),
        deleteDealer: (dealer) => dispatch(deleteDealer(dealer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealersManagement);