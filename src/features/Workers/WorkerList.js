import WorkerCard from "./WorkerCard";
import { selectWorkers } from "../users/UsersSlice";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const WorkerList = () => {
    const workers = useSelector(selectWorkers);

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