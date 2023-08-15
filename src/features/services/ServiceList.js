import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";

const ServiceList = ({ serviceIds }) => {
    const serviceTitles = useSelector(selectServiceTitleById(serviceIds));

    return (
        <Row>
            <Col className='mx-2 my-3 service-display'>
                {
                    serviceTitles.map((service) => {
                        return (
                            <p>{service}</p>
                        );
                    })
                }
            </Col>
        </Row>   
    );
};

export default ServiceList;