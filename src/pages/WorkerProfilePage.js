import { Container, Row, Col, Button } from "reactstrap";
import { selectUserById } from "../features/users/UsersSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SubHeader from "../components/SubHeader";
import StarRating from "../features/Reviews/StarRating";
import ServiceList from "../features/services/ServiceList";
import ReviewList from "../features/Reviews/ReviewList";
import ReviewForm from "../features/Reviews/ReviewForm";
import WorkerImageGallery from "../features/Workers/WorkerImageGallery";


const WorkerProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(selectUserById(userId));
    console.log(user);

    return (
        <Container>
            <SubHeader current={user.username} profile={true} />

            <div className='d-flex align-items-center'>
                <div class='flex-shrink-0'>
                    <img 
                    src={user.profilePic} 
                    alt='profile picture'
                    width='150px'/>
                </div>
                <div class='flex-grow-1'>
                    <Row className='mb-2'>
                        <Col>
                            <h3 class='d-inline'>{user.firstName} {user.lastName}</h3>
                            <StarRating rating={user.rating}/>
                            <p class='d-inline'>{user.rating}</p>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button className='btn-sm'>Request contact</Button>
                        </Col>
                    </Row>
                    <Row>
                        <ServiceList serviceIds={user.services} />
                    </Row>
                </div>
            </div>
            <WorkerImageGallery />
            <ReviewList userId={userId}/>
            <div className='text-end mt-4'>
                <ReviewForm userId={userId}/>
            </div>

        </Container>
    );
};

export default WorkerProfilePage;