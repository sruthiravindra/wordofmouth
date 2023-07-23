import { 
    Col,
    Row
} from "reactstrap";
import NavMenu from "../features/Nav/NavMenu";
import LoginForm from "../features/Users/LoginForm";

const Header = () => {

    return (
        <>
            <Row className='mt-3'>
                <Col md='9'>
                    <h1>Word of Mouth</h1>
                </Col>
                <Col md='3' className='text-end pe-3'>
                    <LoginForm />
                </Col>
            </Row>
            
            <NavMenu />
        </>
    );
};

export default Header;