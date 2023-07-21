import { Container, Row, Col, Button } from "reactstrap";
import { selectUserById } from "../features/Users/UsersSlice";
import { useParams } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import StarRating from "../features/Workers/StarRating";

const WorkerProfilePage = () => {
    const { userId } = useParams();
    const user = selectUserById(userId);
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
                            <h3>{user.firstName} {user.lastName}</h3>
                            <StarRating rating={user.rating}/>
                            <p>{user.rating}</p>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button className='btn-sm'>Request contact</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='4' sm='6'>
                            <ul>
                                <li>service description</li>
                                <li>service description</li>
                                <li>service description</li>
                            </ul>
                        </Col>
                        <Col lg='4' sm='6'>
                            <ul>
                                <li>service description</li>
                                <li>service description</li>
                                <li>service description</li>
                            </ul>
                        </Col>
                        <Col lg='4' sm='6'>
                            <ul>
                                <li>service description</li>
                                <li>service description</li>
                                <li>service description</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default WorkerProfilePage;