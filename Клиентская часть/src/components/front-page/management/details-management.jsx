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
import {connect} from "react-redux";
import {addDetail, deleteDetail, editDetail, getDetails} from "../../../store/actions/details";

const getRowId = row => row.id;

const DetailsManagement = (props) => {
    const [columns] = useState([
        { name: 'vendorCode', title: 'Артикул' },
        { name: 'name', title: 'Наименование' },
        { name: 'note', title: 'Примечание' },
    ]);

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            let addedRow ={...added[0]};
            props.addDetail(addedRow);
        }
        if (changed) {
            props.details.forEach(row =>{
                if(changed[row.id]){
                    let editedRawRow = {...row, ...changed[row.id]};
                    props.editDetail(editedRawRow);
                }
            })
        }
        if (deleted) {
            props.deleteDetail(deleted[0]);
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.details}
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
    details: state.details.details,
})

const mapDispatchToProps = dispatch => {
    return {
        addDetail: (detail) => dispatch(addDetail(detail)),
        editDetail: (detail) => dispatch(editDetail(detail)),
        deleteDetail: (detail) => dispatch(deleteDetail(detail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsManagement);