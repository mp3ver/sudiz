import React, {useState} from 'react';
import {DataTypeProvider, EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {connect} from "react-redux";
import {addCatalog, deleteCatalog, editCatalog} from "../../../store/actions/catalog";
import {Input} from "reactstrap";
import {getCatalogForManagement} from "../../../store/selectors/catalog";
import {ADMIN} from "../../../utils/consts";

const getRowId = row => row.id;

const CatalogManagement = (props) => {
    const [columns] = useState([
        {name: 'dealer', title: 'Поставщик'},
        {name: 'vendorCode', title: 'Артикул'},
        {name: 'currentPrice', title: 'Цена'},
    ]);

    const [dealerSelectColumns] = useState(['dealer']);
    const [detailSelectColumns] = useState(['vendorCode']);

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            let addedRow = {};
            if(added[0].dealer){
                addedRow.dealer = (props.dealers.filter(dealer => dealer.id==added[0].dealer))[0]
            } else {
                addedRow.dealer = props.dealers[0]
            }

            if(added[0].vendorCode){
                addedRow.detail = (props.details.filter(detail => detail.id==added[0].detail))[0]
            } else {
                addedRow.detail = props.details[0]
            }
            addedRow.currentPrice = added[0].currentPrice;
            props.addCatalog(addedRow);
        }
        if (changed) {
            props.initialCatalog.forEach(row =>{
                if(changed[row.id]){
                    let editedRawRow = {};
                    if(changed[row.id].dealer){
                        editedRawRow.dealer = (props.dealers.filter(dealer => dealer.id==changed[0].dealer))[0]
                    } else {
                        editedRawRow.dealer = row.dealer
                    }
                    if(changed[row.id].vendorCode){
                        editedRawRow.detail = (props.details.filter(detail => detail.id==added[0].detail))[0]
                    } else {
                        editedRawRow.detail = row.detail
                    }
                    if(changed[row.id].currentPrice){
                        editedRawRow.currentPrice = changed[row.id].currentPrice;
                    } else {
                        editedRawRow.currentPrice = row.currentPrice;
                    }
                    editedRawRow.id = row.id;
                    props.editCatalog(editedRawRow);
                }
            })
        }
        if (deleted) {
            props.deleteCatalog(deleted[0]);
        }
    };

    const DealerEditor = ({value, onValueChange}) => {
        return (
            <Input type="select" name="select"  value={value ? value : props.dealers[0].id} onChange={event => {
                onValueChange(event.target.value)
            }}>
                {props.dealers.map(dealer => <option key={dealer.id} value={dealer.id}>{dealer.name}</option>)}
            </Input>
        );
    }

    const DealerTypeProvider = props => (
        <DataTypeProvider
            editorComponent={DealerEditor}
            {...props}
        />
    );

    const DetailEditor = ({value, onValueChange}) => {
        return (
            <Input type="select" name="select" value={value ? value : props.details[0].id}  onChange={event => {
                onValueChange(event.target.value)
            }}>
                {props.details.map(detail => <option key={detail.id} value={detail.id}>{detail.vendorCode}</option>)}
            </Input>
        );
    }

    const DetailTypeProvider = props => (
        <DataTypeProvider
            editorComponent={DetailEditor}
            {...props}
        />
    );


    return (
        <div className="card">
            <Grid
                rows={props.catalog}
                columns={columns}
                getRowId={getRowId}
            >

                <DealerTypeProvider
                    for={dealerSelectColumns}
                />
                <DetailTypeProvider
                    for={detailSelectColumns}
                />

                <EditingState
                    onCommitChanges={commitChanges}
                />
                <Table/>
                <TableHeaderRow/>
                <TableEditRow/>
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
    initialCatalog: state.catalog.catalog,
    catalog: getCatalogForManagement(state),
    dealers: state.dealers.dealers,
    details: state.details.details,
})

const mapDispatchToProps = dispatch => {
    return {
        addCatalog: (catalog) => dispatch(addCatalog(catalog)),
        editCatalog: (catalog) => dispatch(editCatalog(catalog)),
        deleteCatalog: (catalog) => dispatch(deleteCatalog(catalog)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogManagement);