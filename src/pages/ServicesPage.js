import { Container, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFilteredUsersArray, fetchWorkers } from '../features/users/usersSlice';
import WorkerList from '../features/workers/WorkerList';
import { useParams } from "react-router-dom";
import SubHeader from '../components/SubHeader';

const ServicesPage = () => {
    const dispatch = useDispatch();
    const { service } = useParams();
    const filteredWorkers = useSelector((state) => state.users.filteredUsersArray)
    const [filterString, setFilterString] = useState(service);

    useEffect(() => {
        setFilterString(service);
    }, [service]);

    useEffect(() => {
        getFilteredServices();
    }, [filterString]);


    const getFilteredServices = () => {
        const data = {
            "serviceString": filterString
        };
        dispatch(fetchWorkers(data))
    }

    return (
        <Container>
            <div className='d-flex my-4' id='search-bar'>
                <Input type='text' placeholder='search' onChange={e => setFilterString(e.target.value)} value={filterString}/>
                <Button className='mx-1'>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <WorkerList />
        </Container>
    );
};

export default ServicesPage;