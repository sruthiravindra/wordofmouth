import { Formik, Form, Field } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../user/userSlice";
import { selectAllUsers, selectUserByEmailPassword } from "../users/UsersSlice";
import UserMenu from "./UserMenu";

const UserLoginForm = (props) => {
    const [modalLoginOpen, setModalLoginOpen] = useState(props.modalLoginOpen);
    const [loginError, setLoginError] = useState("");
    const currentUser = useSelector(selectCurrentUser);
    const allUsers = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    
    const handleSubmit = (values) => {
        const currentUser = allUsers.filter((user)=> user.email === values.email && user.password === values.password);
        if (currentUser.length) {
            dispatch(setCurrentUser(currentUser[0]));
            setModalLoginOpen(false);
        } else {
            setLoginError("Invalid email, password");
        }
    }
    return (
        <>
            <span className='ml-auto user'>
                {
                    currentUser ? (
                        <UserMenu />
                    ) : (
                        <Button onClick={() => setModalLoginOpen(true)}>
                            Log In
                        </Button>
                    )
                }
            </span>
            <Modal isOpen={modalLoginOpen}>
                <ModalHeader toggle={() => setModalLoginOpen(false)}>
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
                                {' '}
                                <Button onClick={()=>props.onFormSwitch('register')}>Click here to register</Button>
                            </p>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserLoginForm;