import { Formik, Form, Field } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../user/userSlice";
import { selectAllUsers, selectUserByEmailPassword } from "../users/usersSlice";
import UserMenu from "./UserMenu";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const UserLoginForm = (props) => {
    const auth = getAuth(); // this is for firebase
    const modalLoginOpen = props.modalLoginOpen;
    const setModalLoginOpen = props.setModalLoginOpen;
    const [loginError, setLoginError] = useState("");
    const currentUser = useSelector(selectCurrentUser);
    const allUsers = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const ContinueToLogin = (values) => {
        const currentUser = allUsers.filter((user) => user.email === values.email);
        if (currentUser.length) {
            dispatch(setCurrentUser(currentUser[0]));
            setModalLoginOpen(false);
        } else {
            setLoginError("User not registered");
        }
    }

    const LoginWithFirebase = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          ContinueToLogin(values)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
            setLoginError(errorMessage);
        });
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
                            email: 'adhikari.krishna@lama.org.np',
                            password: '99070277'
                        }}
                        onSubmit={LoginWithFirebase}
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
                            </Button>{' '}
                            {/* <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => LoginWithGoogle(props)} >Login with google</Button> */}
                            <div style={{ color: "red", display: (loginError == "") ? "none" : "" }}>
                                <span>{loginError}</span>
                            </div>
                            <br />
                            <br />
                            <p><Link to="/">Forgot Password</Link></p>
                            <p>Not a registered user?
                                {' '}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => props.onFormSwitch('register')} >Click here to register</Button>

                            </p>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserLoginForm;