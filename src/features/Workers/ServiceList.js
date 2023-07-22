import { selectServiceTitleById } from '../Nav/servicesSlice';
import { Row, Col } from 'reactstrap';

const ServiceList = ({ serviceIds }) => {
    const serviceTitles = selectServiceTitleById(serviceIds);

    return (
        <Row>
            <Col>
                <ul>
                    {
                        serviceTitles.map((service) => {
                            return (<li>{service}</li>);
                        })
                    }
                </ul>
            </Col>
        </Row>   
    );
};

export default ServiceList;