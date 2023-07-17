import { Container, Row, Col } from "reactstrap";
import SubHeader from "../components/SubHeader";
const AboutPage = () => {
    return (
        <Container>
            <SubHeader current='About Us' />
            <Row>
                <Col>
                    <div
                        className='p-5 text-center bg-image'
                        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: 400 }}
                    >
                        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
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
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique molestias ipsam porro, harum
                        commodi recusandae facere odit corrupti quisquam velit sunt officia exercitationem voluptate, ad
                        excepturi vitae labore cupiditate reiciendis?
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
export default AboutPage;