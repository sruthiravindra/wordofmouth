import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

const TeamCard = ({team}) => {
    const {name,id, image, position} = team;
    return(
        <Card>
            <CardImg 
            alt={name}
            src={image}
            top
            width="100%"
            />
            <CardBody className="text-center">
                <CardTitle tag="h5">{name}</CardTitle>
                <CardSubtitle tag="h4">{position}</CardSubtitle>
            </CardBody>
        </Card>
    );
}

export default TeamCard;