import { Navbar, 
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem 
} from "reactstrap";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

    return (
        <Navbar sticky='top' expand='md'>
            <NavbarBrand href='/' className='ms-5'>
                <h1 className='mt-1'>Word of Mouth</h1>
            </NavbarBrand>
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen}>
                <Nav className='ms-auto' navbar>
                    <NavItem>
                        <NavLink className='nav-link' to='/'>
                            Salon
                        </NavLink>
                    </NavItem>
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
    );
};

export default Header;
