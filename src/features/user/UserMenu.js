import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { selectCurrentUser, userLogout  } from "./userSlice";
import { Link } from "react-router-dom";
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
                            alt={currentUser.first_name}
                            style={{ width: '2.5rem', height: '2.5rem' }}
                        />
                    }
                    <p className='d-inline'>{currentUser.first_name}</p>
                </DropdownToggle>
                <DropdownMenu className='user-menu'>
                    <DropdownItem>
                        <Link to='/account'>
                            My Account
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link to='/contacts' className='red-link'>
                            My Contacts
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <a onClick={logout}>Logout</a>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

export default UserMenu;