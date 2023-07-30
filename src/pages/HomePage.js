import { Container, Row, Col, Button } from 'reactstrap';
import ktmAerialImg from '../app/assets/img/ktm-aerial.jpeg';

const HomePage = () => {
    return (
        <>
            <Row>
                <Col>
                    <div
                        className='text-center bg-image m-0'
                        style={{ backgroundImage: "url('" + ktmAerialImg + "')", height: 550}}
                    >
                        <div className='mask h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div>
                                    <h2 className='mb-3 light-title'>Find top-rated service professionals in your area</h2>
                                    <input type='text' className='py-1'></input>
                                    <Button className='custom-button'>Go</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            
        </> 
    );
}

export default HomePage;