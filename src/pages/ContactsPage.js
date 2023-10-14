import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from "react";
import { fetchRequests } from "../features/requests/requestsSlice";
import Loading from '../components/Loading';
import ContactList from '../features/users/ContactList';
import ContactRequestList from '../features/users/ContactRequestList';

const ContactsPage = () => {
    const isLoading = useSelector((state) => state.user.isLoading)
    const errMsg = useSelector((state) => state.user.errMsg);
    const [activeTab, setActiveTab] = useState('1');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRequests());
    }, [dispatch])

    return isLoading ? (<Loading />) : errMsg ? (<p>{errMsg}</p>) : (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        Contacts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        Requests
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <ContactList />
                </TabPane>
                <TabPane tabId='2'>
                    <ContactRequestList />
                </TabPane>
            </TabContent>
        </>
    )
};

export default ContactsPage;