import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormGroup, Button, Label, ModalHeader, ModalBody, Modal } from "reactstrap";
import { validateUserRegisterForm } from "../../utils/validateUserRegisterForm";
import { updateUserDetails } from "../users/usersSlice";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const UserRegisterForm = (props) => {
    const modalRegisterOpen = props.modalRegisterOpen;
    const setModalRegisterOpen = props.setModalRegisterOpen;
    const dispatch = useDispatch();
    const auth = getAuth();

    const registerUser = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const uid = userCredential.user.uid
            const docRef = doc(database, `userData/${uid}`);

            //wait for the doc to be added by the cloud function, then add the rest of the data captured in the register form
            const listener = onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists) {
                    console.log('user doc created');
                    const user = {
                        id: uid,
                        firstName: values.firstName,
                        lastName: values.lastName,
                    }
                    dispatch(updateUserDetails(user));
                    listener();
                }
            });
        } catch (error) {
            alert(error.message);
        }
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
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        onSubmit={registerUser}
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
                                <Label htmlFor="lastName">Last Name</Label>
                                <Field id="lastName" name="lastName" placeholder="Enter Last Name" className="form-control" />
                                <ErrorMessage name='lastName'>
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