import { Container, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { fetchWorkersByServiceId, fetchWorkersByKeyword } from '../features/workers/workersSlice';
import { selectServiceIdByTitle } from '../features/services/servicesSlice';
import WorkerList from '../features/workers/WorkerList';
import Loading from '../components/Loading';

const WorkerSearchPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.services.isLoading);
    const errMsg = useSelector((state) => state.workers.errMsg);
    const { keyword } = useParams();
    const [filterString, setFilterString] = useState(keyword);
    const [actionInProgress, setActionInProgress] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    
    const serviceId = useSelector(selectServiceIdByTitle(filterString));

    //set the base value of the search bar to the param value
    useEffect(() => {
        setFilterString(keyword);
    }, [keyword]);

    //fetch workers when the component is first loaded based on param value
    useEffect(() => {
        if (!isLoading && !actionInProgress) {
            if (serviceId !== 'Unable to find service') {
                //this variable lets us enforce only one action at a time
                setActionInProgress(true);
                dispatch(fetchWorkersByServiceId(serviceId))
                    .finally(() => setActionInProgress(false));
            //to support misc values from search bar on home page
            } else {
                setActionInProgress(true);
                dispatch(fetchWorkersByKeyword(keyword))
                    .finally(() => setActionInProgress(false));
            }
        } 
    }, [isLoading, keyword, serviceId, dispatch])

    const search = (e) => {
        let keyword = e.target.value;
        if (!isLoading && !actionInProgress) {
            setActionInProgress(true);
            console.log(`workers fetched by keyword ${keyword}`);
            dispatch(fetchWorkersByKeyword(keyword))
              .finally(() => setActionInProgress(false));
        }
    }

    return isLoading ? ( <div className='mt-3'><Loading /></div> ) : errMsg ? ( <p>{errMsg}</p> ) : (
        <Container>
            <div className='d-flex my-4' id='search-bar'>
                <Input 
                    type='text' 
                    placeholder='search' 
                    value={filterString}
                    //cotinue to fetch workers as user types
                    onChange={e => {
                        setFilterString(e.target.value)
                        if (typingTimeout) {
                            clearTimeout(typingTimeout)
                        }
                        const newTypingTimeout = setTimeout(() => {
                            // The user has finished typing
                            search(e);
                          }, 500);
                          setTypingTimeout(newTypingTimeout);
                    }} 
                />
                <Button className='mx-1' onClick={search} value={filterString}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            <WorkerList currentUserGeocode={null} />
        </Container>
    );
};

export default WorkerSearchPage;

//OLD CODE

// import { useLocation } from 'react-router-dom';
// import GetGeocode from '../utils/GetGeocode';

// const [userGeocode, setUserGeocode] = useState(null);

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