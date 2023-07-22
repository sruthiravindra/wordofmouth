import { selectParentNav } from './servicesSlice';
import { 
    Navbar, 
    Collapse,
    NavbarToggler,
    Nav
} from "reactstrap";
import { useState } from 'react';
import NavDropdown from './NavDropdown';

const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navData = selectParentNav();

    return (
        <Navbar dark sticky='top' expand='md' >
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen} navbar>
                <Nav className='ms-auto' navbar>
                    {
                        navData.map((navItem) => {
                            return (
                             <NavDropdown navItem={navItem} key={navItem.id}/>
                            )
                        })
                    }
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavMenu;