import { Container } from "reactstrap";
import { selectUserById } from "../features/Users/UsersSlice";
import { useParams } from "react-router-dom";
import SubHeader from "../components/SubHeader";

const WorkerProfilePage = () => {
    const { userId } = useParams();
    const user = selectUserById(userId);
    console.log(user);

    return (
        <Container>
            <SubHeader current={user.username} profile={true} />
            <h3>{user.firstName} {user.lastName}</h3>
        </Container>
    );
};

export default WorkerProfilePage;