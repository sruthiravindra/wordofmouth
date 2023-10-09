import { useSelector } from "react-redux";
import { selectCurrentUser } from "./userSlice";
import { Col, Row, Button } from 'reactstrap';
import ServiceList from '../services/ServiceList';

const UserAccountInfo = (props) => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div>
            <Row className='mt-4'>
                <Col xs='4' md='3'>
                    <img
                        src={currentUser.profile_pic}
                        alt='profile'
                        className='img-fluid profile-pic-small'
                    />
                </Col>
                <Col>
                    <p>First Name: {currentUser.first_name}</p>
                    <p>Last Name: {currentUser.last_name}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>Phone Number: {currentUser.phone}</p>
                    <p>Services: <ServiceList serviceIds={currentUser.services}/></p>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center m-5'>
                <Button onClick={props.toggleEdit}>Edit Profile</Button>
            </Row>
            
        </div>
    );
};

export default UserAccountInfo;