import { Row, Col } from "reactstrap";
import mountain from "../../app/assets/img/mountain.jpeg";

const WorkerImageGallery = () => {
    return (
        <Row>
            <Col xs='6' lg='4' className='mb-3'>
                <img 
                    src={mountain}
                    alt='picture of mountain'
                    className='img-fluid'
                />
            </Col>
            <Col xs='6' lg='4' className='mb-3'>
                <img 
                    src={mountain}
                    alt='picture of mountain'
                    className='img-fluid'
                />
            </Col>
            <Col xs='6' lg='4' className='mb-3'>
                <img 
                    src={mountain}
                    alt='picture of mountain'
                    className='img-fluid'
                />
            </Col>
            <Col xs='6' lg='4' className='mb-3'>
                <img 
                    src={mountain}
                    alt='picture of mountain'
                    className='img-fluid'
                />
            </Col>

        </Row>
    )
};

export default WorkerImageGallery;