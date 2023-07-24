import { Row, Col, Container, Input } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <Container>
                <Row>
                    <Col xs={{ offset: 1 }}>
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
                    <Col xs={{ size: 7, offset: 1 }}>
                        <ul className="list-unstyled mt-4">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contactus">Contact</Link>
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
                        <Container className="mt-4">
                            <Row>
                                <Col>
                                <h5>Subscribe to our newsletter</h5>
                                <Input/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;