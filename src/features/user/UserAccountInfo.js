import { useSelector } from "react-redux";
import { Col, Row, Button } from 'reactstrap';
import { selectCurrentUser } from "./userSlice";
import Loading from '../../components/Loading';
import ServiceList from '../services/ServiceList';

const UserAccountInfo = ({ toggleEdit }) => {
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector((state) => state.user.isLoading);
    const errMsg = useSelector((state) => state.user.errMsg);

    return isLoading ? 
        (<div className='mt-3'><Loading /></div>) :
        errMsg ? 
        (<p>{errMsg}</p>) : 
        (<div>
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
                <Button onClick={toggleEdit}>Edit Profile</Button>
            </Row>
            
        </div>
    );
};

export default UserAccountInfo;