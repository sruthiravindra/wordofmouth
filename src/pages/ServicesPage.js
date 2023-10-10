import { Container, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchWorkersByServiceId } from '../features/users/usersSlice';
import { selectServiceIdByTitle } from '../features/services/servicesSlice';
import WorkerList from '../features/workers/WorkerList';
import Loading from '../components/Loading';
// import { useLocation } from 'react-router-dom';
// import GetGeocode from '../utils/GetGeocode';
// import { selectCurrentUser } from '../features/user/userSlice';


const ServicesPage = () => {
    const dispatch = useDispatch();
    const { service } = useParams();
    const serviceId = useSelector(selectServiceIdByTitle('salon'));
    const isLoading = useSelector((state) => state.services.isLoading);

    const [filterString, setFilterString] = useState(service);
    const [userGeocode, setUserGeocode] = useState(null);

    useEffect(() => {
        if (!isLoading) {
            console.log(serviceId)
            dispatch(fetchWorkersByServiceId(serviceId));
        }
    }, [isLoading, serviceId])

    // useEffect(() => {
    //     setFilterString(service);
    // }, [service]);

    // useEffect(() => {
    //     getFilteredServices();
    // }, [filterString]);

    // useEffect( () => {
    //     if (currentUser) {
    //         GetGeocode(currentUser.address)
    //         .then((coordinates) => {
    //             setUserGeocode(coordinates);
    //             console.log(userGeocode.latitude, userGeocode.longitude);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    //     } else {
    //         setUserGeocode(null);
    //     }
    // }, [currentUser])

    // const getFilteredServices = () => {
    //     const data = {
    //         "serviceString": filterString
    //     };
    //     dispatch(fetchWorkers(data))
    // }

    return isLoading ? (
        <Loading />
    ) : (
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