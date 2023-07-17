import { Navbar, 
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem 
} from "reactstrap";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <>
            <h1 className='mt-3'>Word of Mouth</h1>
            <Navbar sticky='top' expand='md' >
                <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
                <Collapse isOpen={menuOpen} navbar>
                    <Nav className='ms-auto' navbar tabs>
                        <Dropdown nav isOpen={dropdownOpen} onMouseOver={() => setDropdownOpen(!dropdownOpen)} onMouseOut={() => setDropdownOpen(!dropdownOpen)}>
                            <DropdownToggle nav caret>
                                Salon
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>massage</DropdownItem>
                                <DropdownItem>hair</DropdownItem>
                                <DropdownItem>nails</DropdownItem>
                                <DropdownItem>wax & thread</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Artisan
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Home Repair
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Cleaning/Cooking
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Driving
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/'>
                                Child/Pet Care
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Header;