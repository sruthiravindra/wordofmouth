import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';

const ServiceList = ({ serviceIds }) => {
    const serviceTitles = selectServiceTitleById(serviceIds);

    return (
        <Row>
            <Col className='mx-3 my-3'>
                <p>Services</p>
                <ul className='service-list border border-secondary py-2'>
                    {
                        serviceTitles.map((service) => {
                            return (
                                <li className=''>{service}</li>
                            );
                        })
                    }
                </ul>
            </Col>
        </Row>   
    );
};

export default ServiceList;