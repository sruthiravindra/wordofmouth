import { Formik, Form } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader,Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateLoginForm } from "../../utils/validateLoginForm";
import { ErrorMessage } from "formik";

const LoginForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleSubmit = (values) => {
        console.log("in handle submit");
        console.log(values);
        setModalOpen(false);
    }
    return (
        <>
            <Button onClick={() => setModalOpen(true)}>
                Log In
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Login
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={handleSubmit}
                        validate={validateLoginForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" placeholder="email" type="email" />
                                <ErrorMessage name='email'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input name="password" placeholder="password" type="password" />
                                <ErrorMessage name='password'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <Button type="submit">
                                Submit
                            </Button>
                            <br />
                            <br />
                            <p><Link to="/">Forgot Password</Link></p>
                            <p>Not a registered user? 
                                {' '}<Link to="/">Click here to register</Link>
                            </p>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default LoginForm;