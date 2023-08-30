import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Col } from "reactstrap";

const Loading = ()=>{
    return(
        <Col className='loading-icon'>
            <FontAwesomeIcon icon={faCircleNotch} size='lg' spin />
            <p>Loading...</p>
        </Col>
    );
};

export default Loading;