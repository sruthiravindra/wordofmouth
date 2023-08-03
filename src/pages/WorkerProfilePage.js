import { Container, Row, Col, Button } from "reactstrap";
import { selectUserById } from "../features/users/usersSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../features/user/userSlice";
import SubHeader from "../components/SubHeader";
import StarRating from "../features/reviews/StarRating";
import ServiceList from "../features/services/ServiceList";
import ReviewList from "../features/reviews/ReviewList";
import ReviewForm from "../features/reviews/ReviewForm";
import WorkerImageGallery from "../features/workers/WorkerImageGallery";
import { useSpring, animated } from 'react-spring';


const WorkerProfilePage = () => {
    const { userId } = useParams();
    const worker = useSelector(selectUserById(userId));
    const {firstName, lastName, profilePic, id, rating, contacts, services, phone, email, username} = worker;
    const currentUser = useSelector(selectCurrentUser);
    const fadeProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 }
      })

    return (
        <Container>
            <SubHeader current={username} profile={true} />
            <Row className='d-flex align-items-center'>
                <Col xs='2' lg='1'>
                    <div class='flex-shrink-0'>
                        <img 
                        src={profilePic} 
                        alt='profile picture'
                        className='img-fluid'/>
                    </div>
                </Col>
                <Col className='d-flex justify-content-start'>
                        <h5 className='d-inline'>{firstName} {lastName}</h5>
                        <StarRating rating={rating}/>
                        <p className='d-inline'>({rating})</p>
                </Col>
                <Col className='d-flex justify-content-end pe-3' xs='3'>
                    <animated.div style={fadeProps}>
                        { 
                            (currentUser && currentUser.contacts.includes(id)) ?
                                (<div className='text-end'>
                                    <Button className='btn-sm mb-1 d-block'>{phone}</Button>
                                    <Button className='btn-sm d-block'>{email}</Button>
                                </div>) :
                            (<Button className='btn-sm'>Request contact</Button>)
                        }
                    </animated.div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ServiceList serviceIds={services}/>
                    <p className='ms-2 banner'>location  |  payment  |  {contacts.length} customers</p>
                </Col>
            </Row>
            <hr />
            <WorkerImageGallery />
            <hr />
            <h6>Reviews for {firstName} {lastName}</h6>
            <ReviewList userId={userId}/>
            <div className='text-end mt-4'>
                <ReviewForm userId={userId}/>
            </div>

        </Container>
    );
};

export default WorkerProfilePage;