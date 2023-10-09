import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";

const ServiceList = ({ serviceIds }) => {

    if(serviceIds.length === 0)return (<p>no services yet</p>);
    return (
        <Row>
            <Col className='service-display'>
                {
                    serviceIds.map((service) => {
                        return (
                            <p>{service.title}</p>
                        );
                    })
                }
            </Col>
        </Row>   
    );
};

export default ServiceList;