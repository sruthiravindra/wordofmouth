import { useSelector } from "react-redux";
import { Col, Row, Button } from 'reactstrap';
import { selectCurrentUser } from "./userSlice";
import Loading from '../../components/Loading';
import ServiceList from '../services/ServiceList';

const UserAccountInfo = ({ toggleEdit }) => {
    const currentUser = useSelector(selectCurrentUser);
    const address = currentUser.address;
    const isLoading = useSelector((state) => state.user.isLoading);
    const errMsg = useSelector((state) => state.user.errMsg);

    return isLoading 
        ? (<div className='mt-3'><Loading /></div>) 
        : errMsg 
        ? (<p>{errMsg}</p>) 
        : (<div>
            <Row className='account-info'>
                <Col xs='12' sm='4' md='3' className='prof-pic-container'>
                    <img
                        src={currentUser.profile_pic}
                        alt='profile'
                        className='img-fluid'
                    />
                </Col>
                <Col className='info'>
                    <Row className='top'>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>First Name</p></Col>
                        <Col><p>{currentUser.first_name}</p></Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>Last Name</p></Col>
                        <Col><p>{currentUser.last_name}</p></Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>Email</p></Col>
                        <Col><p>{currentUser.email}</p></Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>Phone</p></Col>
                        <Col><p>{currentUser.phone}</p></Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>Gender</p></Col>
                        <Col><p>{currentUser.gender}</p></Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2'><p className='info-title'>Address</p></Col>
                        <Col>
                            <div className='address'>
                                <p>{address.address_line_1}</p>
                                {address.address_line_2 && (<p>{address.address_line_2}</p>)}
                                {address.address_line_3 && (<p>{address.address_line_3}</p>)}
                                <p>{address.city}, {address.province} {address.postal_code}</p>
                                <p>{address.country}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='5' sm='4' md='3' xl='2' className='d-flex align-items-center'><p className='info-title'>Services</p></Col>
                        <Col><ServiceList serviceIds={currentUser.services}/></Col>
                    </Row>
                </Col>
            </Row>
            <Row className='edit-profile-btn'>
                <Button onClick={toggleEdit}>Edit Profile</Button>
            </Row>
            
        </div>
    );
};

export default UserAccountInfo;