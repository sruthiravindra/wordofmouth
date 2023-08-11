import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from 'react-redux';
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import CustomPhoneField from "../../utils/CustomPhoneField";
import { selectCurrentUser } from "./userSlice";
import SubHeader from "../../components/SubHeader";
import UserProfileUpload from "./UserProfileUpload";
import { updateUserProfilePic } from "../users/usersSlice";
import { useDispatch } from "react-redux";

const UserEditProfile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const ref = React.createRef();

    const handleChange = () => {
        console.log(ref.current);
    }
    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <Container>
            <SubHeader current='Profile' />
            <Row>
                <Col className="mx-auto col-10 col-md-8 col-lg-6">
                    <Row>
                        <Col className="col-md-4">
                            <UserProfileUpload saveImage={updateUserProfilePic} userId={currentUser.id}/>
                        </Col>
                        <Col className="col-md-8">
                            <Formik
                                initialValues={{
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    email: currentUser.email,
                                    phone: currentUser.phone
                                }}
                                onSubmit={handleSubmit}
                            // validate={validateForm }
                            >
                                {(formik) => (
                                    <Form>
                                        <FormGroup className="col-md-10">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Field id="firstName" name="firstName" placeholder="Enter First Name" className="form-control" />
                                            <ErrorMessage name="firstName">
                                                {(msg) => <p className="text-danger">{msg}</p>}
                                            </ErrorMessage>
                                        </FormGroup>
                                        <FormGroup className="col-md-10">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Field id="lastName" name="lastName" placeholder="Enter Last Name" className="form-control" />
                                            <ErrorMessage name="lastName">
                                                {(msg) => <p className="text-danger">{msg}</p>}
                                            </ErrorMessage>
                                        </FormGroup>
                                        <FormGroup className="col-md-10">
                                            <Label htmlFor="email">Email</Label>
                                            <Field id="email" name="email" disabled={!formik.isSubmitting} placeholder="Enter Email Address" className="form-control" />
                                            <ErrorMessage name="email">
                                                {(msg) => <p className="text-danger">{msg}</p>}
                                            </ErrorMessage>
                                        </FormGroup>
                                        <FormGroup className="col-md-10">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <CustomPhoneField
                                                ref={ref}
                                                name="phone"
                                                formik={formik}
                                                onChange={e => formik.setFieldValue("phone", e)}
                                            />
                                            <ErrorMessage name="phone">
                                                {(msg) => <p className="text-danger">{msg}</p>}
                                            </ErrorMessage>
                                        </FormGroup>
                                        <Button type="submit">Submit</Button>

                                    </Form>
                                )}
                            </Formik>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default UserEditProfile;