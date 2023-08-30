import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { selectCurrentUser, setCurrentUser } from "./userSlice";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownToggle, Dropdown, DropdownItem } from 'reactstrap';
import { useDispatch } from "react-redux";
import { getImageSRC } from "../../utils/getImageSRC";

const UserMenu = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setCurrentUser(null));
    }
    const [imageSRC, setImageSRC] = useState('');

    useEffect(() => {
        async function getImage () {
            const imageDownload = await getImageSRC(currentUser.profilePic);
            setImageSRC(imageDownload);
        }
        getImage();
    }, [currentUser.profilePic])

    return(
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{zIndex: 9999}}>
                <DropdownToggle caret>
                    {imageSRC &&
                        <img 
                            src={imageSRC}
                            alt={currentUser.username}
                            style={{ width: '2rem', height: '2rem' }}
                        />
                    }
                    <p className='d-inline'>{currentUser.username}</p>
                </DropdownToggle>
                <DropdownMenu classname='user-menu'>
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