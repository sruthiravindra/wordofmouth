import { selectServiceTitleById } from './servicesSlice';
import { Row, Col } from 'reactstrap';
import { useSelector } from "react-redux";
import '../../css/features/services.css';

const ServiceList = ({ serviceIds }) => {
    const services = useSelector(selectServiceTitleById(serviceIds));
    if (!serviceIds || serviceIds.length === 0) return (<p>no services yet</p>);
    return (
        <div className='service-display'>
            {
                services.map((service, idx) => {
                    return (
                        <div key={idx}>{service}</div>
                    );
                })
            }
        </div>
    );
};

export default ServiceList;