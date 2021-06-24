import React, {useEffect, useState} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import CatalogManagement from './catalog-management';
import DealersManagement from './dealers-management';
import DetailsManagement from './details-management';
import OrderManagement from './order-management';
import PriceHistory from './price-history';
import UsersManagement from './users-management';
import {ADMIN, PURCHASE, SUPPLY} from "../../../utils/consts";
import {connect} from "react-redux";
import {role} from "../../../utils/utils";
import {addDealer, deleteDealer, editDealer, getDealers} from "../../../store/actions/dealers";
import {getCatalog} from "../../../store/actions/catalog";
import {getDetails} from "../../../store/actions/details";



const Management = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [currentRole, setRole] = useState(role());

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    useEffect(() => {
        props.getDealers();
        props.getDetails();
        props.getCatalog();
    }, []);

    return (
        <div className={"catalog"}>
            <Nav tabs>
                {(currentRole === ADMIN || currentRole === SUPPLY) && <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        Поставщики
                    </NavLink>
                </NavItem>}
                {(currentRole === ADMIN || currentRole === SUPPLY) && <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        Детали
                    </NavLink>
                </NavItem>}
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => {
                            toggle('3');
                        }}
                    >
                        Каталог
                    </NavLink>
                </NavItem>
                {(currentRole === ADMIN || currentRole === SUPPLY) && <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '4'})}
                        onClick={() => {
                            toggle('4');
                        }}
                    >
                        История цен
                    </NavLink>
                </NavItem>}
                {(currentRole === ADMIN || currentRole === PURCHASE) && <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '5'})}
                        onClick={() => {
                            toggle('5');
                        }}
                    >
                        Заказы
                    </NavLink>
                </NavItem>}
                {currentRole === ADMIN && <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '6'})}
                        onClick={() => {
                            toggle('6');
                        }}
                    >
                        Пользователи
                    </NavLink>
                </NavItem>}
            </Nav>
            <TabContent activeTab={activeTab}>
                {(currentRole === ADMIN || currentRole === SUPPLY) && <TabPane tabId="1">
                    <DealersManagement/>
                </TabPane>}
                {(currentRole === ADMIN || currentRole === SUPPLY) && <TabPane tabId="2">
                    <DetailsManagement/>
                </TabPane>}
                <TabPane tabId="3">
                    <CatalogManagement/>
                </TabPane>
                {(currentRole === ADMIN || currentRole === SUPPLY) && <TabPane tabId="4">
                    <PriceHistory/>
                </TabPane>}
                {(currentRole === ADMIN || currentRole === PURCHASE) && <TabPane tabId="5">
                    <OrderManagement/>
                </TabPane>}
                {currentRole === ADMIN && <TabPane tabId="6">
                    <UsersManagement/>
                </TabPane>}
            </TabContent>
        </div>
    )
}



const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
    return {
        getCatalog: () => dispatch(getCatalog()),
        getDealers: () => dispatch(getDealers()),
        getDetails: () => dispatch(getDetails()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Management);