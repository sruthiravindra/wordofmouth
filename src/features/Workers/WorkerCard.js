import { Card, Button, Col, Row, CardTitle,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import StarRating from '../reviews/StarRating';
import ServiceList from '../services/ServiceList';
import { selectCurrentUser } from '../user/userSlice';
import { useSelector } from 'react-redux';
import RequestContactButton from '../users/RequestContactButton';
import { storage } from '../../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const WorkerCard = ({ worker }) => {
    const {firstName, lastName, profilePic, id, rating, contacts, services, phone, email, address} = worker;
    const currentUser = useSelector(selectCurrentUser);
    const [imgSRC, setImgSRC] = useState('');

    //this retrieves the profile picture from firebase storage
    useEffect(() => {
        const getImageSRC = async (storageURL) => {
            const storageRef = ref(storage, storageURL);
            if (storageRef) {
                try {
                const downloadURL = await getDownloadURL(storageRef);
                setImgSRC(downloadURL);
                } catch (error) {
                    console.error('Error retreiving downloadURL:', error);
                }
            }
        }
    
        if (profilePic) getImageSRC(`${profilePic}`);
    }, [])
    
    return (
        <Card className='mb-2 p-2'>
            <Row className=''>
                <Col xs='2' lg='1'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={imgSRC} 
                        alt='profile picture'
                        className='img-fluid profile-pic-small'/>
                    </div>
                </Col>
                <Col className=''>
                    <Link to={`${id}`} className='unstyledLink'>
                        <h5 className='d-inline'>{firstName} {lastName}</h5>
                        <StarRating rating={rating}/><p className='d-inline'>({rating})</p>
                    </Link>
                    <div className='location'>
                        <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline'>{address}</p>
                    </div>
                    <ServiceList serviceIds={services}/>
                </Col>
                <Col className='d-flex justify-content-end pe-3' xs='3'>
                    { 
                        (currentUser && currentUser.contacts.includes(id)) ?
                            (<div className='text-end'>
                                <Button className='btn-sm mb-1 d-block'>{phone}</Button>
                                <Button className='btn-sm d-block'>{email}</Button>
                            </div>) :
                        (currentUser && currentUser.contactRequests.includes(id)) ?
                            (
                                <>
                                    <p className='clicked-button'>Contact Requested</p>
                                </>
                            ) :
                        (!currentUser) ?
                            (<div className='text-end'>
                                <Button className='btn-sm mb-1'>Login to request contact</Button>
                            </div>) :
                        (<RequestContactButton workerId={id} currentUserId={currentUser.id} />)
                    }
                </Col>
            </Row>
            <Row>
            </Row>
        </Card>
    )
};

export default WorkerCard;