import { selectParentServices, selectServicesByParent } from '../services/servicesSlice';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    Navbar, 
    Collapse,
    Nav,
    Accordion,
    AccordionItem,
    AccordionBody,
    AccordionHeader,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
    Button
} from 'reactstrap';

import logo from '../../app/assets/img/logo.svg'
import Login from '../../components/Login';

const AccordionSubServices = ({ parentId } ) => {
    const subservices = useSelector(selectServicesByParent(parentId));
    return (
        <>
            {
                subservices.map((subService, idx) => (
                    <NavLink
                        className="nav-link"
                        to={`/search/${subService.title}`}
                        key={idx}
                    >
                        {subService.title}
                    </NavLink>
                ))
            }
        </>
    )
}

const DropdownSubservices = ({ parentId } ) => {
    const subservices = useSelector(selectServicesByParent(parentId));
    return (
        <>
            {
                subservices.map((subService, idx) => (
                    <NavLink className='nav-link' to={`/search/${subService.title}`} key={idx}>
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
            sticky='top' 
            expand='md' 
            className='mb-0' 
            onMouseLeave = {() => {
                if (menuOpen) {
                    setMenuOpen(!menuOpen);
                }
            }}
        >
            <Col xs='6' md='5' lg='4' className='logo'>
                <Link to='/' className='unstyledLink'>
                    <h1 className='mb-0 d-none d-sm-flex'>WORD OF MOUTH</h1>
                    <img 
                        src={logo}
                        alt='logo'
                        width='30px'
                    />
                </Link>
            </Col>
            <Button onClick={() => setMenuOpen(!menuOpen)} className='d-md-none me-2'>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            {/* login is rendered outside the collapse if accordion */}
           {isAccordion && (<Login />)}
            <Collapse isOpen={menuOpen} navbar>
                <Nav className='mx-auto' navbar>
                {
                    isAccordion ? (
                        <Accordion open={accordionOpen} toggle={toggleAccordion}>
                            {
                                parentServices.map((parentService, idx) => {
                                    return (
                                        <AccordionItem key={idx}>
                                            <AccordionHeader targetId={idx.toString()}>{parentService.title}</AccordionHeader>
                                            <AccordionBody accordionId={idx.toString()}>
                                                <AccordionSubServices parentId={parentService._id}/>
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
                                            <DropdownToggle nav>
                                                <NavLink className='parent-nav-link' to={`/search/${parentService.title}`}>
                                                {parentService.title}
                                                </NavLink>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownSubservices parentId={parentService._id} />
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
            {isAccordion === false && (<Login />)}
    </Navbar>
    )
};

export default NavMenu;