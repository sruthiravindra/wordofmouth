import { selectAllTeams } from "./teamsSlice";
import { Row, Col, CardGroup } from "reactstrap";
import TeamCard from "./TeamCard";

const TeamsList = () => {
    const teams = selectAllTeams();
    return (
        <Row>
            {
                teams.map((team) => {
                    return (
                        <Col className="sm-6">

                            <TeamCard team={team} />
                        </Col>
                    );
                })
            }
        </Row>


    );
}

export default TeamsList;