import { Container, Row, Col, Button } from 'reactstrap';

const HomePage = () => {
    return (
        <Container> 
            <Row className='mt-30'>
                <Col className='d-flex justify-content-center'>
                    <h2 className>Find top-rated services in your area</h2>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <input></input>
                    <Button>Go</Button>
                </Col>
            </Row>
        </Container> 
    );
}

export default HomePage;