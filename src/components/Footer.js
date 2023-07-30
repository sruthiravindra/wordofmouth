import { Row, Col, Container, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <Container>
                <Row>
                    <Col className='sm-4'>
                    Follow Us! <a
                            className='btn btn-social-icon btn-instagram'
                            href='http://instagram.com/'
                        >
                            <i className='fa fa-instagram' />
                        </a>{' '}
                        <a
                            className='btn btn-social-icon btn-facebook'
                            href='http://www.facebook.com/'
                        >
                            <i className='fa fa-facebook' />
                        </a>{' '}
                        <a
                            className='btn btn-social-icon btn-twitter'
                            href='http://twitter.com/'
                        >
                            <i className='fa fa-twitter' />
                        </a>{' '}
                        <a
                            className='btn btn-social-icon btn-google'
                            href='http://youtube.com/'
                        >
                            <i className='fa fa-youtube' />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className='sm-6'>
                        <ul className="list-unstyled mt-4">
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
                    <Col>
                        <Row>
                            <Col>
                            <h5>Subscribe to our newsletter</h5>
                            <input type='text' className='py-1'></input>
                            <Button>Go</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;