import { 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { selectSubmenu } from './navSlice';

const NavDropdown = ({ navItem }) => {
    const { id, title: parentTitle } = navItem;
    const submenu = selectSubmenu(id);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav>
                {parentTitle}
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