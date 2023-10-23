import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormGroup, Button, ModalHeader, ModalBody, Modal, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateUserRegisterForm } from "../../utils/validateUserRegisterForm";
import { userSignup } from "../user/userSlice";
import Loading from '../../components/Loading';

const UserRegisterForm = (props) => {
    const modalRegisterOpen = props.modalRegisterOpen;
    const setModalRegisterOpen = props.setModalRegisterOpen;
    const isLoading = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();

    const registerUser = async (values) => {
        dispatch(userSignup({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password
        }))
        .then(response => {
            if (response.error) {
                toast('Registration Failed: ' + response.error.message);
            } else {
                toast('Registration Successful! Loggin in now...')
                setModalRegisterOpen(false);
            }
        })
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
                            username: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        onSubmit={registerUser}
                        validate={validateUserRegisterForm}
                    >
                        <Form>
                            <Row>
                                <Col md={"6"}>
                                    <FormGroup>
                                        <Field id="firstName" name="firstName" placeholder="First Name" className="form-control" />
                                        <ErrorMessage name='firstName'>
                                            {(msg) => <p className="text-danger">{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>
                                </Col>
                                <Col md={"6"}>
                                    <FormGroup>
                                        <Field id="lastName" name="lastName" placeholder="Last Name" className="form-control" />
                                        <ErrorMessage name='lastName'>
                                            {(msg) => <p className="text-danger">{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Field id="username" name="username" placeholder="Email / Phone Number" className="form-control" />
                                <ErrorMessage name='username'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>


                            <FormGroup>
                                <Field id="password" name="password" placeholder="Enter Password" className="form-control" type="password" />
                                <ErrorMessage name='password'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Field id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" className="form-control" type="password" />
                                <ErrorMessage name='confirmPassword'>
                                    {(msg) => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            {
                                isLoading
                                ? (<Loading />)
                                : (<Button type="submit">Register</Button>)
                            }
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

// import { getAuth } from "firebase/auth";


//     const auth = getAuth();
//     const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
//     const uid = userCredential.user.uid
//     const docRef = doc(database, `userData/${uid}`);

//     //wait for the doc to be added by the cloud function, then add the rest of the data captured in the register form
//     const listener = onSnapshot(docRef, (snapshot) => {
//         if (snapshot.exists) {
//             console.log('user doc created');
//             const user = {
//                 id: uid,
//                 firstName: values.firstName,
//                 lastName: values.lastName,
//             }
//             dispatch(updateUserProfile(user));
//             listener();
//         }
//     });