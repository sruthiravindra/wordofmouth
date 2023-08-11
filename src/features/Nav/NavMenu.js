import { selectParentServices } from '../services/servicesSlice';
import { useSelector } from 'react-redux'
import { 
    Navbar, 
    Collapse,
    NavbarToggler,
    Nav
} from 'reactstrap';
import { useState } from 'react';
import NavDropdown from './NavDropdown';


const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const parentServices = useSelector(selectParentServices);

    return (
        <Navbar dark sticky='top' expand='md' className='mb-0' >
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen} navbar>
                <Nav className='ms-auto' navbar>
                    {
                        parentServices.map((parentService, idx) => {
                            return (
                             <NavDropdown parentService={parentService} key={idx}/>
                            )
                        })
                    }
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavMenu;