import { Formik, Form, Field } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { validateUserLoginForm } from "../../utils/validateUserLoginForm";
import { selectCurrentUser, userLogin } from "./userSlice";
import UserMenu from "./UserMenu";
import Loading from '../../components/Loading';
import '../../css/features/user.css';


const UserLoginForm = (props) => {
    const isLoading = useSelector((state) => state.user.isLoading);
    const errMsg = useSelector((state) => state.user.errMsg);
    const modalLoginOpen = props.modalLoginOpen;
    const setModalLoginOpen = props.setModalLoginOpen;
    const loginError = useSelector((state) => state.user.errMsg);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

        const LoginUser = async (values) => {
        dispatch(
            userLogin({
                username: values.email,
                password: values.password
            })
        )
            .then(response => {
                if (response.error) {
                    toast("Login Failed: " + response.error.message);
                } else {
                    setModalLoginOpen(false);
                    toast("Login Successful!");
                }

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
                            email: '',
                            password: ''
                        }}
                        onSubmit={LoginUser}
                        validate={validateUserLoginForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor="email">Email / Phone Number</Label>
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
                            {
                                isLoading ? (<Loading />) 
                                : (<Button type="submit">
                                    Login
                                </Button>)
                            }
                            {/* <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => LoginWithGoogle(props)} >Login with google</Button> */}
                            
                            {
                                loginError ? 
                                (<p className='err-msg'>{loginError}</p>) : 
                                (<></>)
                            }
                            {/* <p><Link to="/">Forgot Password</Link></p> */}
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