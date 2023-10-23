import { Row, Col, Button } from 'reactstrap';
import ktmAerialImg from '../app/assets/img/ktm-aerial.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../css/pages/HomePage.css';

const HomePage = () => {
    const fadeProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
      })

    const [keyword, setKeyword] = useState('');
    
    return (
        <>
            <Row>
                <Col>
                    <div
                        className='text-center bg-image m-0'
                        style={{ backgroundImage: "url('" + ktmAerialImg + "')", height: 550}}
                    >
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
                                    <Link to='/about' className='read-me-link'>
                                        <p>Read Me!</p>
                                    </Link>
                                </animated.div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            
        </> 
    );
}

export default HomePage;