import { Container } from 'reactstrap';
import WorkerList from '../features/workers/WorkerList';
import SubHeader from '../components/SubHeader'

const ServicesPage = () => {
    return (
        <Container>
            <SubHeader current='Services'/>
            <WorkerList/>
        </Container>
    );
};

export default ServicesPage;