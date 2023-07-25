import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { FormGroup, Input, Button, Label, ModalHeader, ModalBody, Modal } from "reactstrap";
import { validateUserRegisterForm } from "../../utils/validateUserRegisterForm";

const UserRegisterForm = (props) => {

    const [modalRegisterOpen, setModalRegisterOpen] = useState(props.modalRegisterOpen);

    const handleSubmit = (values) => {
        setModalRegisterOpen(false);
    }
    return (
        <>
            <Modal isOpen={modalRegisterOpen}>
                <ModalHeader toggle={() => setModalRegisterOpen(false)}>
                    Register
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            firstName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        onSubmit={handleSubmit}
                        validate={validateUserRegisterForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor="firstName">First Name</Label>
                                <Field id="firstName" name="firstName" placeholder="Enter First Name" className="form-control" />
                                <ErrorMessage name='firstName'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Field id="email" name="email" placeholder="Enter Email" className="form-control" />
                                <ErrorMessage name='email'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Field id="password" name="password" placeholder="Enter Password" className="form-control" type="password" />
                                <ErrorMessage name='password'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Field id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" className="form-control" type="password" />
                                <ErrorMessage name='confirmPassword'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <Button type="submit">
                                Register
                            </Button>
                            <br />
                            <br />
                            <p>Already a registered user?
                                {' '}
                                <Button onClick={() => props.onFormSwitch('login')}>Click here to Login</Button>
                            </p>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserRegisterForm;