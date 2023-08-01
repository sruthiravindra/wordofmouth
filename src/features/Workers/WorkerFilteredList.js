import WorkerCard from "./WorkerCard";
import { Container, Col, Row } from "reactstrap";

const WorkerFilterList = ({ workers }) => {
    return (
        <Container className="mt-5">
            <Row>
                {

                    workers.length > 0 && workers.map((worker) => {
                        console.log("here")
                        return (
                            <Col md='6'>
                                <WorkerCard worker={worker} key={worker.id} />
                            </Col>
                        )
                    })

                }
            </Row>

        </Container>
    )
};

export default WorkerFilterList;