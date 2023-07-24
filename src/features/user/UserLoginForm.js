import { Formik, Form, Field } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../user/userSlice";
import { selectUserByEmailPassword } from "../users/usersSlice";

const UserLoginForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loginError, setLoginError] = useState("");
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const currentUser = selectUserByEmailPassword(values)
        if (currentUser.length) {
            dispatch(setCurrentUser(currentUser[0]));
            setModalOpen(false);
        } else {
            setLoginError("Invalid email, password");
        }
    }
    return (
        <>
            <span className='ml-auto'>
                {
                    currentUser ? (
                        <img src={currentUser.profilePic}
                        alt={currentUser.username}
                        style={{ width: '3rem', height: '3rem' }}
                    />
                    ) : (
                        <Button onClick={() => setModalOpen(true)}>
                            Log In
                        </Button>
                    )
                }
            </span>

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
                        validate={validateUserLoginForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Field id="email" name="email" placeholder="email" className="form-control" />
                                <ErrorMessage name='email'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Field id="password" name="password" placeholder="password" type="password" className="form-control" />
                                <ErrorMessage name='password'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <Button type="submit">
                                Login
                            </Button>
                            <div style={{ color: "red", display: (loginError == "") ? "none" : "" }}>
                                <span>{loginError}</span>
                            </div>
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

export default UserLoginForm;