import { Container, Row, Col, Button } from "reactstrap";
import SubHeader from "../components/SubHeader";
import banner1 from '../app/assets/img/aboutus_banner_1.jpg';
import TeamsList from '../app/features/teams/TeamsList';

const AboutPage = () => {
    return (
        <Container>
            <SubHeader current='About Us' />
            <Row>
                <Col>
                    <div
                        className='text-center bg-image'
                        style={{ backgroundImage: "url('" + banner1 + "')", height: 400 }}
                    >
                        <div className='mask h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className='text-white'>
                                    <h1 className='mb-3'>Revolutionizing Everyday Work</h1>
                                    <h4 className='mb-3'>Get More Done In Less Time</h4>

                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="row-content">
                <Col>
                    <h3 className="text-center">
                        Our Mission
                    </h3>
                    <p className="text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias ipsam porro, harum
                        commodi recusandae facere odit corrupti quisquam velit sunt officia exercitationem voluptate, ad
                        excepturi vitae labore cupiditate reiciendis?
                    </p>
                </Col>
            </Row>
            <Row className="row-content bg-light">
                <Col>
                    <h3 className="text-center">Our Leadership</h3>
                    <TeamsList />
                </Col>
            </Row>
            <Row className="row-content border-bottom-0">
                <Col className="text-center">
                    <h3 className="text-center">Want to be part of our journey?</h3>
                    <br></br>
                    <Button className="fs-1 btn btn-success">Join Us</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default AboutPage;