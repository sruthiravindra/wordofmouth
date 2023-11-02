import { Row, Col, Button, Container } from 'reactstrap';
import ktmAerialImg from '../app/assets/img/ktm-aerial.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import effieHeadshot from '../app/assets/img/effie-headshot.png'
import sruthiHeadshot from '../app/assets/img/sruthi-headshot.jpg'
import '../css/pages/HomePage.css';

const HomePage = () => {
    const fadeProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
      })

    const [keyword, setKeyword] = useState('');
    
    return (
        <Container fluid>
            <Row className='home'>
                <div style={{ backgroundImage: "url('" + ktmAerialImg + "')"}}>
                    <div className='home-mask'>
                        <div className='home-body'>
                            <animated.div style={fadeProps}>
                                <h2 className='home-msg'>Find top-rated service professionals in your area</h2>
                                <div className='home-search'>
                                    <input 
                                        type='text' 
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <Link to={`/search/${keyword}`}>
                                        <Button>Go</Button>
                                    </Link>
                                </div>
                            </animated.div>
                        </div>
                    </div>
                </div>
            </Row>
            <Container className='mb-5'>
                <Row>
                    <Link to='/about' className='read-me-link'>
                        <p>Read Me</p>
                    </Link>
                    <p className='text-center'><b>This website is still in testing and development. All the workers you see here were created with randomly generated data, and do not represent real people. The Login modal is pre-populated with a test user if you wish to explore the full range of available features. You are welcome to create your own account, but it may be deleted as testing continues. Please do not provide any personal details or confidential information!</b></p>
                </Row>
                <p className='about-us-title'>About Us</p>
                <Row className='team-member'>
                    <Col xs='3' md='2'>
                        <img 
                            src={effieHeadshot}
                            alt='effie'
                            className='img-fluid headshot'
                        />
                    </Col>
                    <Col xs='9' lg='7'>
                        <p className='about-name'>Effie Guenther</p>
                        <p>Coming from a product development background, Effie has brought much of the aesthetic detail to this project. Her favorite contributions are the responsive navigation bar, worker summary cards, and the contact request ecosystem. After spending 5 months in Nepal, she has a personal connection to the concept and a unique insight into the user experience. She is currently based in New York City and is open to work.</p>
                    </Col>
                    <Col>
                    <p className='contact-links'>
                            <a href='https://www.linkedin.com/in/effieguenther/' target='_blank'>LinkedIn</a>
                            <a href='https://github.com/effieguenther' target='_blank'>Github</a>
                            <a href='https://effie-guenther.com/' target='_blank'>Portfolio</a>
                            <a href='mailto:effiegguenther@gmail.com' target='_blank'>Email</a>
                    </p>
                    </Col>
                </Row>
                <Row className='team-member'>
                    <Col xs='3' md='2'>
                        <img 
                            src={sruthiHeadshot}
                            alt='sruthi'
                            className='img-fluid headshot'
                        />
                    </Col>
                    <Col xs='9' lg='7'>
                        <p className='about-name'>Sruthi Ravindran</p>
                        <p>With 10+ years of experience as a backend developer, Sruthi has been vital to managing the data within this project. Her favorite contributions are the login/register modals, search bar functionality, and the edit profile page. Originally from Bangalore, India, she is very familiar with the ecosystem of freelance workers which is prominent in Southeast Asia that inspired the website. She is currently located in Dubai and is open to work starting in December.</p>
                    </Col>
                    <Col>
                        <p className='contact-links'>
                            <a href='https://www.linkedin.com/in/sruthiravindran/' target='_blank'>LinkedIn</a>
                            <a href='https://github.com/sruthiravindra' target='_blank'>Github</a>
                            <a href='' target='_blank'>Portfolio</a>
                            <a href='mailto:sruthi.ravindran@gmail.com' target='_blank'>Email</a>
                        </p>
                    </Col>
                </Row>
            </Container>
            
        </Container> 
    );
}

export default HomePage;