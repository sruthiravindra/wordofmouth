import { Row, Col, Button } from 'reactstrap';
import ktmAerialImg from '../app/assets/img/ktm-aerial.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

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
                        <div className='mask h-100 home-body' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <animated.div style={fadeProps}>
                                    <h2 className='mb-3 light-title'>Find top-rated service professionals in your area</h2>
                                    <input 
                                        type='text' 
                                        className='py-1' 
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <Link to={`/services/${keyword}`}>
                                        <Button className='custom-button'>Go</Button>
                                    </Link>
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