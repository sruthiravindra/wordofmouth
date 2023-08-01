import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { getFilteredUsersArray } from '../features/users/UsersSlice';
import WorkerFilterList from '../features/Workers/WorkerFilteredList';
import { useState } from 'react';

const HomePage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.usersArray)
    const filteredWorkers = useSelector((state) => state.users.filteredUsersArray)
    const [filterString, setFilterString] = useState("salon");

    useEffect(() => {
        getFilteredServices();
    }, [filterString]);


    const getFilteredServices = () => {
        // const api = process.env.REACT_APP_API_UR;
        // const response = await fetch(`https://api.json-generator.com/templates/EHcZwKZOhKLy/data?access_token=${api}`);
        // const data = await data.json();
        dispatch(getFilteredUsersArray(filterString))
    }


    return (
        <Container>
            <Row className='mt-30'>
                <Col className='d-flex justify-content-center'>
                    <h2 className>Find top-rated services in your area</h2>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Input id="searchServices" name="searchServices" placeholder='Search services..' onChange={(e) => setFilterString(e.target.value)}/>
                    <Button>Go</Button>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <WorkerFilterList workers={filteredWorkers} />
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;