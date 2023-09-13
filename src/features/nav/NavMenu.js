import { selectParentServices, selectServicesByParent } from '../services/servicesSlice';
import { useSelector } from 'react-redux';
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
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../app/assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Login from '../../components/Login';

const AccordionSubServices = ({ parentTitle} ) => {
    const subservices = useSelector(selectServicesByParent(parentTitle));
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
            {isAccordion === false && (<Login />)}
    </Navbar>
    )
};

export default NavMenu;