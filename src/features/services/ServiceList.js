import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";

const ServiceList = ({ serviceIds }) => {
    const serviceTitles = useSelector(selectServiceTitleById(serviceIds));
    if (!serviceTitles) return (<p>no services yet</p>);

    return (
        <Row>
            <Col className='service-display'>
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