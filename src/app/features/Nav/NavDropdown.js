import { 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavDropdown = ({ navItem }) => {
    const { title, submenu } = navItem;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav>
                {title}
            </DropdownToggle>
            <DropdownMenu>
                {
                    submenu.map((subNavItem) => {
                        return (
                            <NavLink className='nav-link' to={subNavItem.url}>
                                <DropdownItem>{subNavItem.title}</DropdownItem>
                            </NavLink>
                        );
                    })
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavDropdown;