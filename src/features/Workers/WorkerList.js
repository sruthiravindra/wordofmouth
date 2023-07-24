import WorkerCard from "./WorkerCard";
import { selectWorkers } from "../users/usersSlice";
import { Container } from "reactstrap";

const WorkerList = () => {
    const workers = selectWorkers();

    return(
        <Container>
            {
                workers.map((worker) => {
                    return (
                        <WorkerCard worker={worker} key={worker.id}/>
                    )
                })
            }
        </Container>
    )
};

export default WorkerList;