import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import CustomPhoneField from "../../utils/CustomPhoneField";
import { selectCurrentUser } from "./userSlice";
import SubHeader from "../../components/SubHeader";
import UserProfileUpload from "./UserProfileUpload";
import { updateUserDetails } from "../users/usersSlice";
import { useDispatch } from "react-redux";
import Error from '../../components/Error';
import Loading from '../../components/Loading';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import { selectAllServices } from "../services/servicesSlice";


const UserEditProfile = (props) => {
    const currentUser = useSelector(selectCurrentUser);
    const selectedValue = useRef(currentUser.services);
    const dispatch = useDispatch();
    const ref = React.createRef();
    const isLoading = useSelector((state) => state.user.currentUser.isLoading);
    const errMsg = useSelector((state) => state.user.currentUser.errMsg);
    if (isLoading) {
        return (
            <Row>
                <Loading />
            </Row>
        );
    }

    if (errMsg) {
        return (
            <Row>
                <Error errMsg={errMsg} />
            </Row>
        );
    }

    const ServicesDropdownList = ({ fldName, onFormChange, formik, ...rest }) => {
        const allServices = useSelector(selectAllServices);

        // convert array to hierarchical structure as per the requirement of the dropdown component
        const optionslist = Array.from(
            allServices.reduce((acc, o) => {

                let checked_state = selectedValue.current.filter(selectedservice => selectedservice === o._id).length === 0 ? false : true;
                acc.set(o._id, {
                    "value": o._id, "label": o.title, "checked": checked_state,
                    "children": o.sub_service.map(subservice => {
                        //console.log(subservice.title, selectedValue.current.filter(selectedservice => selectedservice === subservice._id).length === 0 ? false : true)
                        checked_state = checked_state ? checked_state : (selectedValue.current.filter(selectedservice => selectedservice === subservice._id).length === 0 ? false : true);
                        return { "value": subservice._id, "label": subservice.title, "checked": checked_state }
                    })
                })

                return acc
            }, new Map()).values()
        )
        const onChange = (currentNode, selectedNodes) => {
            selectedValue.current = selectedNodes;
            console.log('onChange::', currentNode, selectedNodes, "selectedValue", selectedValue)
        }
        return (
            <DropdownTreeSelect name={fldName} data={optionslist} onChange={onChange} />
        )
    }

    const handleSubmit = (values) => {
        values.services = selectedValue.current.map(service => service.value);
        dispatch(updateUserDetails({ currentUserId: currentUser._id, profile: { ...values } }))
        props.toggleEdit();
    }
    return (
        <Container>
            <SubHeader current='Profile' />
            <Row>
                <Col xs='4' md='3'>
                    <UserProfileUpload />
                </Col>
                <Col className="">
                    <Formik
                        initialValues={{
                            first_name: currentUser.first_name,
                            last_name: currentUser.last_name,
                            email: currentUser.email,
                            phone: currentUser.phone,
                            services: currentUser.services
                        }}
                        onSubmit={handleSubmit}
                    // validate={validateForm }
                    >
                        {(formik) => (
                            <Form>
                                <FormGroup className="col-md-10">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Field id="first_name" name="first_name" placeholder="Enter First Name" className="form-control" />
                                    <ErrorMessage name="first_name">
                                        {(msg) => <p className="text-danger">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className="col-md-10">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Field id="last_name" name="last_name" placeholder="Enter Last Name" className="form-control" />
                                    <ErrorMessage name="last_name">
                                        {(msg) => <p className="text-danger">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className="col-md-10">
                                    <Label htmlFor="email">Email</Label>
                                    <Field id="email" name="email" disabled={!formik.isSubmitting} placeholder="Enter Email Address" className="form-control" />
                                    <ErrorMessage name="email">
                                        {(msg) => <p className="text-danger">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className="col-md-10">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <CustomPhoneField
                                        ref={ref}
                                        name="phone"
                                        formik={formik}
                                        defaultValue={currentUser.phone}
                                        onChange={e => formik.setFieldValue("phone", e)}
                                    />
                                    <ErrorMessage name="phone">
                                        {(msg) => <p className="text-danger">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="services" >Services you can provide</Label>
                                    <ServicesDropdownList
                                        ref={ref}
                                        fldName="services"
                                        formik={formik}
                                        defaultValue={currentUser.services}
                                        onFormChange={e => formik.setFieldValue("services", e)} />
                                </FormGroup>
                                <Button className='mb-4' type="submit">Submit</Button>
                                <Button className='mb-4 mx-2' onClick={props.toggleEdit}>Cancel</Button>
                            </Form>
                        )}
                    </Formik>

                </Col>
            </Row>
        </Container>
    );
}

export default UserEditProfile;