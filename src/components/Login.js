import { Col } from "reactstrap";
import UserLoginForm from "../features/user/UserLoginForm";
import UserRegisterForm from "../features/user/UserRegisterForm";
import { useState } from "react";

const Login = () => {
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
    const toggleForm = (formName) => {
        if (formName === 'login') {
            setModalLoginOpen(true);
            setModalRegisterOpen(false);
        }
        if (formName === 'register') {
            setModalLoginOpen(false);
            setModalRegisterOpen(true);
        }
    }


    return (
        <>
            {
                <>
                    <UserLoginForm 
                        onFormSwitch={toggleForm} 
                        setModalLoginOpen={setModalLoginOpen} 
                        modalLoginOpen={modalLoginOpen} 
                                            />
                    <UserRegisterForm 
                        onFormSwitch={toggleForm} 
                        setModalRegisterOpen={setModalRegisterOpen} 
                        modalRegisterOpen={modalRegisterOpen} />
                </>
            }
        </>
    );
};

export default Login;