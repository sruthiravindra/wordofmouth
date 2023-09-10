import { selectParentServices, selectServicesByParent } from '../services/servicesSlice';
import { useSelector } from 'react-redux';
import { 
    Navbar, 
    Collapse,
    NavbarToggler,
    Nav,
    Accordion,
    AccordionItem,
    AccordionBody,
    AccordionHeader,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const AccordionSubServices = ({ parentTitle} ) => {
    const subservices = useSelector(selectServicesByParent(parentTitle));
    console.log(subservices);
    return (
        <>
            {
                subservices.map((subService, idx) => (
                    <NavLink
                        className="nav-link"
                        to={subService.url}
                        key={idx}
                    >
                        {subService.title}
                    </NavLink>
                ))
            }
        </>
    )
}

const DropdownSubservices = ({ parentTitle} ) => {
    const subservices = useSelector(selectServicesByParent(parentTitle));

    return (
        <>
            {
                subservices.map((subService, idx) => (
                    <NavLink className='nav-link' to={subService.url} key={idx}>
                        <DropdownItem>{subService.title}</DropdownItem>
                    </NavLink>
                    )
                )
            }
        </>
    )
}

const NavMenu = () => {
    const parentServices = useSelector(selectParentServices);
    const [menuOpen, setMenuOpen] = useState(false); 
    const [isAccordion, setIsAccordian] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const toggleDropdown = (idx) => {
        if (openDropdownIndex === idx) {
            setOpenDropdownIndex(null);
        } else {
            setOpenDropdownIndex(idx);
        }
    }
    const toggleAccordion = (id) => {
        if (accordionOpen === id) {
            setAccordionOpen();
        } else {
            setAccordionOpen(id);
        }
    }

    const handleMouseEnter = (idx) => {
        setOpenDropdownIndex(idx);
      };
    
      const handleMouseLeave = () => {
        setOpenDropdownIndex(null);
      };

    useEffect(() => {
        const handleResize = () => {
            setIsAccordian(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <Navbar 
            dark 
            sticky='top' 
            expand='md' 
            className='mb-0' 
            onMouseLeave = {() => {
                if (menuOpen) {
                    setMenuOpen(!menuOpen);
                }
            }}
        >
        <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
        <Collapse isOpen={menuOpen} navbar>
            <Nav className='ms-auto' navbar>
                {
                    isAccordion ? (
                        <Accordion open={accordionOpen} toggle={toggleAccordion}>
                            {
                                parentServices.map((parentService, idx) => {
                                    return (
                                        <AccordionItem key={idx}>
                                            <AccordionHeader targetId={idx}>{parentService.title}</AccordionHeader>
                                            <AccordionBody accordionId={idx}>
                                                <AccordionSubServices parentTitle={parentService.title}/>
                                            </AccordionBody>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                    )

                    : (
                        <>
                            {
                                parentServices.map((parentService, idx) => {
                                    return (
                                        <Dropdown 
                                            nav 
                                            isOpen={openDropdownIndex === idx} toggle={() => toggleDropdown(idx)}
                                            onMouseEnter={()=> handleMouseEnter(idx)}
                                            onMouseLeave={handleMouseLeave}
                                            key={idx}
                                        >
                                            <DropdownToggle nav>{parentService.title}</DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownSubservices parentTitle={parentService.title} />
                                            </DropdownMenu>
                                        </Dropdown>
                                    )
                                })
                            }
                        </>
                    )
                }
    
            </Nav>
            </Collapse>
        </Navbar>
    )
};

export default NavMenu;