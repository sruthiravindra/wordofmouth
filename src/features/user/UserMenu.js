import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentUser, userLogout  } from "./userSlice";
import { NavLink } from "react-router-dom";
import { DropdownMenu, DropdownToggle, Dropdown, DropdownItem } from 'reactstrap';
import { useDispatch } from "react-redux";

const UserMenu = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userLogout())
    }

    return(
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{zIndex: 9999}}>
                <DropdownToggle className='user-menu'>
                    {currentUser.profile_pic &&
                        <img 
                            src={currentUser.profile_pic}
                            alt={currentUser.first_name + currentUser.last_name}
                            style={{ width: '2.5rem', height: '2.5rem' }}
                        />
                    }
                </DropdownToggle>
                <DropdownMenu className='user-menu'>
                    <DropdownItem>
                        <NavLink to='/account' className='nav-link'>
                            My Account
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink to='/contacts' className='nav-link'>
                            My Contacts
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <a onClick={logout} className='nav-link'>Logout</a>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

export default UserMenu;