import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useState } from 'react';
import ContactList from '../features/users/ContactList';
import ContactRequestList from '../features/users/ContactRequestList';

const ContactsPage = () => {
    const [activeTab, setActiveTab] = useState('1');

    return (
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
                    {/* {
                        currentUser.contacts ? (
                            <div className='contacts-message'>
                                <h6>You don't have any contacts yet</h6>
                                <p><a href='/services'>Start your search here</a></p>
                            </div>
                        ) : (
                            <ContactList userIdArray={currentUser.contacts} />
                        )
                        
                    } */}
                </TabPane>
                <TabPane tabId='2'>
                    <ContactRequestList />
                    {/* {
                        currentUser.contactRequests ? (
                            <div className='contacts-message'>
                                <h6>You don't have any requests yet</h6>
                                <p><a href='/services'>Start your search here</a></p>
                            </div>
                        ) : (
                            <ContactRequestList userIdArray={currentUser.contactRequests} />
                        )
                    } */}
                </TabPane>
            </TabContent>
        </>
    )
};

export default ContactsPage;