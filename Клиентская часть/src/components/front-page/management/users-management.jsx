import React, {useEffect, useState} from 'react';
import {DataTypeProvider, EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {ADMIN, PURCHASE, SUPPLY} from "../../../utils/consts";
import {connect} from "react-redux";
import {addUser, deleteUser, editUser, getUsers} from "../../../store/actions/users";
import {Input} from "reactstrap";

const getRowId = row => row.id;

const roles = [ADMIN, SUPPLY, PURCHASE];

const UsersManagement = (props) => {

    useEffect(() => {
        props.getUsers();
    }, []);

    const [columns] = useState([
        {name: 'login', title: 'Логин'},
        {name: 'password', title: 'Пароль'},
        {name: 'role', title: 'Роль'},
    ]);

    const RoleEditor = ({value, onValueChange}) => {
        return (
            <Input type="select" name="select" value={value ? value : ADMIN} onChange={event => {
                onValueChange(event.target.value)
            }}>
                {roles.map(role => <option value={role}>{role}</option>)}
            </Input>
        );
    }

    const RoleTypeProvider = props => (
        <DataTypeProvider
            editorComponent={RoleEditor}
            {...props}
        />
    );


    const PasswordEditor = ({value, onValueChange}) => {
        return (
            <input type="password" placeholder={"Установите пароль"} onChange={(event) => {
                onValueChange(event.target.value)
            }}/>
        );
    }

    const PasswordTypeProvider = props => (
        <DataTypeProvider
            editorComponent={PasswordEditor}
            {...props}
        />
    );

    const [roleSelectColumns] = useState(['role']);
    const [passwordSelectColumns] = useState(['password']);

    const commitChanges = ({added, changed, deleted}) => {
        if (added) {
            let addedRow = {...added[0], roleUser:{role: added.role?added.role:ADMIN}, role: added.role?added.role:ADMIN};
            props.addUser(addedRow);
        }
        //TODO: пофиксить изменение
        if (changed) {
            props.users.forEach(row => {
                if (changed[row.id]) {
                    let editedRawRow = {...row, ...changed[row.id], roleUser:{role: changed[row.id].role?changed[row.id].role:row.role}, role: changed[row.id].role?changed[row.id].role:row.role};
                    props.editUser(editedRawRow);
                }
            })
        }
        if (deleted) {
            props.deleteUser(deleted[0]);
        }
    };

    return (
        <div className="card">
            <Grid
                rows={props.users ? props.users.map(user => {
                    return{
                        ...user,
                        password: '********'
                    }
                }) : []}
                columns={columns}
                getRowId={getRowId}
            >

                <RoleTypeProvider
                    for={roleSelectColumns}
                />
                <PasswordTypeProvider
                    for={passwordSelectColumns}
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
                    width={"200px"}
                    messages={{
                        addCommand: "Добавить",
                        editCommand: "Изменить",
                        deleteCommand: "Удалить",
                        commitCommand: "Сохранить",
                        cancelCommand: "Отменить",
                    }}
                />
            </Grid>
        </div>
    );
};

const mapStateToProps = state => ({
    users: state.users.users,
})

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers()),
        addUser: (user) => dispatch(addUser(user)),
        editUser: (user) => dispatch(editUser(user)),
        deleteUser: (user) => dispatch(deleteUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);