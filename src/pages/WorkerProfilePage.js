import { Container, Row, Col, Button } from "reactstrap";
import { selectUserById } from "../features/users/usersSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SubHeader from "../components/SubHeader";
import StarRating from "../features/reviews/StarRating";
import ServiceList from "../features/services/ServiceList";
import ReviewList from "../features/reviews/ReviewList";
import ReviewForm from "../features/reviews/ReviewForm";
import WorkerImageGallery from "../features/workers/WorkerImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { selectReviewsByUserId } from "../features/reviews/reviewsSlice";


const WorkerProfilePage = () => {
    const { userId } = useParams();
    const users = useSelector((state) => state.users);
    const worker = useSelector(selectUserById(userId));
    const reviews = useSelector(selectReviewsByUserId(userId));

    if (users.isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } 
    
    if (users.errMsg) {
        return (
            <div>
                ERROR
            </div>
        )
    }


    return (
        <Container>
            <SubHeader current={userId} profile={true} />
            <Row className='d-flex align-items-center'>
                <Col xs='3' lg='2'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={worker.profilePic} 
                        alt='profile picture'
                        className='img-fluid profile-pic-small'/>
                    </div>
                </Col>
                <Col className=''>
                        <h5 className='d-inline'>{worker.firstName} {worker.lastName}</h5>
                        <StarRating rating={worker.rating}/>
                        <p className='d-inline'>({worker.rating})</p>
                        <div className='location'>
                            <FontAwesomeIcon icon={faLocationDot} className='d-inline me-1'/>
                        <p className='d-inline'>{worker.address}</p>
                    </div>
                    <ServiceList serviceIds={worker.services}/>
                </Col>
                <Col className='d-flex justify-content-center' xs='12' md='2'>
                        <Button className=''>Request contact</Button>
                </Col>
            </Row>
            <hr />
            <WorkerImageGallery />
            <hr />
            <h6 className='text-center'> Reviews for {worker.firstName} {worker.lastName}</h6>
            <hr />
            <ReviewList userId={userId}/>
            <div className='text-end my-4'>
                <ReviewForm userId={userId}/>
            </div>
        </Container>
    );
};

export default WorkerProfilePage;