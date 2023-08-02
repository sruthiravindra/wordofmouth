import { 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useState } from 'react';
import { selectServicesByParent } from '../services/servicesSlice';
import { useSelector } from 'react-redux';

const NavDropdown = ({ parentService }) => {
    const { title: parentTitle } = parentService;
    const subservices = useSelector(selectServicesByParent(parentTitle));
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav>
                {parentTitle}
            </DropdownToggle>
            <DropdownMenu>
                {
                    subservices.map((subService, idx) => {
                        return (
                            //<NavLink className='nav-link' to={subService.url} key={idx}>
                                <DropdownItem>{subService.title}</DropdownItem>
                            //</NavLink>
                        );
                    })
                }
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavDropdown;