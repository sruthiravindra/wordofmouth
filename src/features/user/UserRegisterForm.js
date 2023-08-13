import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { FormGroup, Input, Button, Label, ModalHeader, ModalBody, Modal } from "reactstrap";
import { validateUserRegisterForm } from "../../utils/validateUserRegisterForm";
import { setCurrentUser } from "../user/userSlice";
import { addUsers, selectAllUsers } from "../users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import profilePicDefault from '../../app/assets/img/profile-default.png'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const UserRegisterForm = (props) => {
    const modalRegisterOpen = props.modalRegisterOpen;
    const setModalRegisterOpen = props.setModalRegisterOpen;
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const auth = getAuth();

    const continueToAddUserInStore = (values) => {
        const currentUser = {
            firstName: values.firstName,
            email: values.email,
            profilePic: profilePicDefault
        }
        dispatch(addUsers(currentUser));
        setModalRegisterOpen(false);
    }
    const RegisterWithFirebase = (values) => {
       
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                continueToAddUserInStore(values);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
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
                            firstName: 'asaasds',
                            email: 'a@a.com',
                            password: '123456',
                            confirmPassword: '123456'
                        }}
                        onSubmit={RegisterWithFirebase}
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