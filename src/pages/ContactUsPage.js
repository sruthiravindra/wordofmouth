import { Row, Col, Container, Input } from "reactstrap";
import SubHeader from "../components/SubHeader";
import ContactUsForm from "../components/ContactUsForm";

const ContactUsPage = () => {
    return (
        <Container>
            <SubHeader current='Contact Us' />
            <Row className="mb-5 align-items-center">
                <Col>
                    <h3>How can we help you?</h3>
                    <Input
                        id="searchKB"
                        name="searchKB"
                        placeholder="Search our knowledge base"
                        type="search"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="7">
                    <div className="square border rounded p-5">
                        <h3 className="text-center">Help us help you faster!</h3>
                        <ContactUsForm />
                    </div>

                </Col>
                <Col xs="12" sm="5" >
                    <div className="square border rounded p-5">
                        <h3>You can also reach us on!</h3>
                        <br />
                        <h5>Our Address</h5>
                        <address>
                            1 akjdh
                            <br />
                            Katmandu, WA 98001
                            <br />
                            Nepal
                        </address>
                        <a
                        role='button'
                        className='btn btn-link'
                        href='tel:+12065551234'
                    >
                        <i className='fa fa-phone' /> 1-206-555-1234
                    </a>
                    <br />
                    <a
                        role='button'
                        className='btn btn-link'
                        href='mailto:fakeemail@fakeemail.co'
                    >
                        <i className='fa fa-envelope-o' /> campsites@nucamp.co
                    </a>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default ContactUsPage;