import { Container } from 'reactstrap';
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
            <SubHeader current='Services'/>
            <WorkerList/>
        </Container>
    );
};

export default ServicesPage;