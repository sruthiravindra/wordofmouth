import { Row, Col, Container, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import '../css/components/Footer.css'

const Footer = () => {
    return (
        <footer className="site-footer mt-0">
            <Container>
                <Row>
                    <Col className='sm-4 socials'>
                        <Button href='https://instagram.com' target='_blank' >
                            <FontAwesomeIcon icon={faInstagram} size='xl'/>
                        </Button>
                        <Button href='https://facebook.com' target='_blank' >
                            <FontAwesomeIcon icon={faFacebook} size='xl'/>
                        </Button>
                        <Button href='https://twitter.com' target='_blank' >
                            <FontAwesomeIcon icon={faXTwitter} size='lg'/>
                        </Button>
                        <Button href='https://youtube.com' target='_blank' >
                            <FontAwesomeIcon icon={faYoutube} size='lg'/>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className='sm-6'>
                        <ul className="footer-links">
                            <li>
                                <Link to='/' className='red-link'>Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className='red-link'>About Us</Link>
                            </li>
                            <li>
                                <Link to="/contactus" className='red-link'>Contact</Link>
                            </li>
                            <li>
                                FAQ
                            </li>
                            <li>
                                Terms and Condition
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;