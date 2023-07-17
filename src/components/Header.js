import { 
    Col,
    Row,
    Button
} from "reactstrap";
import NavMenu from "../app/features/Nav/NavMenu";

const Header = () => {

    return (
        <>
            <Row className='mt-3'>
                <Col md='9'>
                    <h1>Word of Mouth</h1>
                </Col>
                <Col md='3' className='text-end pe-3'>
                    <Button>Sign up / Log in</Button>
                </Col>
            </Row>
            
            <NavMenu />
        </>
    );
};

export default Header;