import { Container, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFilteredUsersArray } from '../features/users/usersSlice';
import WorkerList from '../features/workers/WorkerList';
import SubHeader from '../components/SubHeader'

const ServicesPage = () => {
    // const dispatch = useDispatch();
    // const users = useSelector((state) => state.users.usersArray)
    // const filteredWorkers = useSelector((state) => state.users.filteredUsersArray)
    // const [filterString, setFilterString] = useState("salon");

    // useEffect(() => {
    //     getFilteredServices();
    // }, [filterString]);


    // const getFilteredServices = () => {
    //     // const api = process.env.REACT_APP_API_UR;
    //     // const response = await fetch(`https://api.json-generator.com/templates/EHcZwKZOhKLy/data?access_token=${api}`);
    //     // const data = await data.json();
    //     dispatch(getFilteredUsersArray(filterString))
    // }
    
    return (
        <Container>
            <div className='d-flex my-4'>
                <Input type='text' placeholder='search' />
                <Button className='mx-1'>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <WorkerList/>
        </Container>
    );
};

export default ServicesPage;