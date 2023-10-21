import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";

const ServiceList = ({ serviceIds }) => {
    const services = useSelector(selectServiceTitleById(serviceIds));
    if(!serviceIds || serviceIds.length === 0)return (<p>no services yet</p>);
    return (
        <Row>
            <Col className='service-display'>
                {
                    services.map((service, idx) => {
                        return (
                            <p key={idx}>{service}</p>
                        );
                    })
                }
            </Col>
        </Row>   
    );
};

export default ServiceList;