import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from 'react-redux';
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

const ServicesDropdownList = ({ fldName, onFormChange, formik, ...rest }) => {
    const allServices = useSelector(selectAllServices);

    // convert array to hierarchical structure
    const optionslist = Array.from(
        allServices.reduce((acc, o) => {

            // check if current item is parent if yes then set current id and name else find the parent item and set it id and name
            const { id: value, title: label } = (o.parent === 'self') ? o : allServices.find(op => op.title === o.parent)

            if (!acc.has(value)) acc.set(value, { value, label }) // if the current item's parent doesn't exist, create it in the Map

            const parent = acc.get(value) // get the current parent
            parent.children ??= [] // init children if it doesn't exist

            if (o.id !== value) parent.children.push({"value": o.id, "label": o.title, "parent": o.parent}) // add the item to the children

            return acc
        }, new Map()).values()
    ).filter(o => !o.hasOwnProperty('parent'))

    const onChange = (currentNode, selectedNodes) => {
        //onFormChange(selectedNodes);
        console.log('onChange::', currentNode, selectedNodes)
    }
    const onAction = (node, action) => {
        console.log('onAction::', action, node)
    }
    const onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
    }
    return (
        <DropdownTreeSelect name={fldName} data={optionslist} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
    )
}

const UserEditProfile = (props) => {
    const currentUser = useSelector(selectCurrentUser);
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
    const handleSubmit = (values) => {
        dispatch(updateUserDetails({ id: currentUser.id, ...values }))
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
                            firstName: currentUser.firstName,
                            lastName: currentUser.lastName,
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
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Field id="firstName" name="firstName" placeholder="Enter First Name" className="form-control" />
                                    <ErrorMessage name="firstName">
                                        {(msg) => <p className="text-danger">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className="col-md-10">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Field id="lastName" name="lastName" placeholder="Enter Last Name" className="form-control" />
                                    <ErrorMessage name="lastName">
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
                                <Button className='mb-4'type="submit">Submit</Button>
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