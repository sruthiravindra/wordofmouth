import {Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import NavMenu from "../features/Nav/NavMenu";
import UserLoginForm from "../features/user/UserLoginForm";
import UserRegisterForm from "../features/user/UserRegisterForm";
import { useState } from "react";

const Header = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
    const toggleForm = (formName) => {
        console.log(formName);
        setCurrentForm(formName);
        if(formName === 'login'){
            setModalLoginOpen(true);
            setModalRegisterOpen(false);
        }
        if(formName === 'register'){
            setModalLoginOpen(false);
            setModalRegisterOpen(true);
        }
    }

    return (
        <>
            <Row className='mt-3'>
                <Col className='col-6'>
                    <Link to='/' className='unstyledLink'>
                        <h1>Word of Mouth</h1>
                    </Link>
                </Col>
                <Col className='text-end pe-3'>
                    {
                        <>
                        {

                        (currentForm==='login')?
                            <UserLoginForm onFormSwitch={toggleForm} modalLoginOpen={modalLoginOpen} />
                           : <UserRegisterForm onFormSwitch={toggleForm} modalRegisterOpen={modalRegisterOpen} />
                        }

                        </>
                    }
                </Col>
            </Row>

            <NavMenu />
        </>
    );
};

export default Header;