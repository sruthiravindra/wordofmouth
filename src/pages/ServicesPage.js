import { Container, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchWorkers } from '../features/users/usersSlice';
import WorkerList from '../features/workers/WorkerList';
import { useParams } from "react-router-dom";
import { selectCurrentUser } from '../features/user/userSlice';
import GetGeocode from '../utils/GetGeocode';

const ServicesPage = () => {
    const dispatch = useDispatch();
    const { service } = useParams();
    const [filterString, setFilterString] = useState(service);
    const currentUser = useSelector(selectCurrentUser);
    const [userGeocode, setUserGeocode] = useState(null);

    useEffect(() => {
        setFilterString(service);
    }, [service]);

    useEffect(() => {
        getFilteredServices();
    }, [filterString]);

    useEffect( () => {
        if (currentUser) {
            GetGeocode(currentUser.address)
            .then((coordinates) => {
                setUserGeocode(coordinates);
                console.log(userGeocode.latitude, userGeocode.longitude);
            })
            .catch((error) => {
                console.error(error);
            })
        } else {
            setUserGeocode(null);
        }
    }, [currentUser])

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
            <WorkerList currentUserGeocode={userGeocode} />
        </Container>
    );
};

export default ServicesPage;