import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectCurrentUser, setCurrentUser } from "./userSlice";
import { Link } from "react-router-dom";
import { Button, DropdownMenu, DropdownToggle, Dropdown, DropdownItem } from 'reactstrap';
import { useDispatch } from "react-redux";
import { getImageSRC } from "../../utils/getImageSRC";

const UserMenu = () => {
    const [imgSRC, setImgSRC] = useState('');
    const currentUser = useSelector(selectCurrentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setCurrentUser(null));
    }
    useEffect(() => {
        if (currentUser.profilePic) 
        {
            getImageSRC(`${currentUser.profilePic}`).then(
                (value) => setImgSRC(value)
            )
        }
    }, []);
    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ zIndex: 9999 }}>
                <DropdownToggle caret>
                    <img src={imgSRC}
                        alt={currentUser.username}
                        style={{ width: '2rem', height: '2rem' }} />
                    <p className='d-inline'>{currentUser.username}</p>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <Link to='/account'>
                            <a className='red-link'>My Account</a>
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link to='/contacts'>
                            <a className='red-link'>My Contacts</a>
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