import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from "react";
import { Row, Col, FormGroup, Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import { selectCurrentUser } from "./userSlice";
import { updateUserProfile } from "../user/userSlice";
import { selectAllServices } from "../services/servicesSlice";
import UserProfileUpload from "./UserProfileUpload";
import CustomPhoneField from "../../utils/CustomPhoneField";
import { validateUserEditProfileForm } from '../../utils/validateUserEditProfileForm';
import Loading from "../../components/Loading";

const UserEditProfile = (props) => {
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector((state) => state.user.isLoading);
    const selectedValue = useRef(currentUser.services);
    const dispatch = useDispatch();
    const ref = React.createRef();

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
                        const sub_checked_state = checked_state ? checked_state : (selectedValue.current.filter(selectedservice => selectedservice === subservice._id).length === 0 ? false : true);
                        return { "value": subservice._id, "label": subservice.title, "checked": sub_checked_state }
                    })
                })

                return acc
            }, new Map()).values()
        )
        const onChange = (currentNode, selectedNodes) => {
            selectedValue.current = selectedNodes.map(nodes => nodes.value);
            // console.log('onChange::', currentNode, selectedNodes, "selectedValue", selectedValue)
        }
        return (
            <DropdownTreeSelect name={fldName} data={optionslist} onChange={onChange} className='dropdown' />
        )
    }

    const handleSubmit = (values) => {
        values.services = selectedValue.current;
        const updatedProfile = {
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            gender: values.gender,
            address: {
              address_line_1: values.address_line_1.trim(),
              address_line_2: values.address_line_2 ? values.address_line_2.trim() : null,
              address_line_3: values.address_line_3 ? values.address_line_3.trim() : null,
              city: values.city.trim(),
              province: values.province.trim(),
              postal_code: values.postal_code.trim(),
              country: values.country.trim()
            },
          services: values.services
        }
        console.log('updates', updatedProfile);
        dispatch(updateUserProfile({ 
            currentUserId: currentUser._id, 
            profile: updatedProfile 
        }))
            .then(response => {
                if (response.error) {
                    toast("Profile Update Failed: " + response.error.message, {
                        position: "bottom-right",
                        theme: "light",
                        type: "error"
                    });
                } else {
                    toast("Profile Update Was Successful!", {
                        position: "bottom-right",
                        theme: "light",
                        type: "success"
                    });
                    props.toggleEdit();
                }
            })
    }

    return (
        <>
            <Row className='user-edit-profile'>
                <Col xs='12'sm='4' md='3' xxl='2'>
                    <UserProfileUpload />
                </Col>
                <Col className=''>
                    <Formik
                        initialValues={{
                            first_name: currentUser.first_name,
                            last_name: currentUser.last_name,
                            email: currentUser.email,
                            phone: currentUser.phone,
                            gender: currentUser.gender,
                            address_line_1: currentUser.address.address_line_1,
                            address_line_2: currentUser.address.address_line_2,
                            address_line_3: currentUser.address.address_line_3,
                            city: currentUser.address.city,
                            province: currentUser.address.province,
                            postal_code: currentUser.address.postal_code,
                            country: currentUser.address.country,
                            services: currentUser.services
                        }}
                        onSubmit={handleSubmit}
                        validate={validateUserEditProfileForm}
                    >
                        {(formik) => (
                            <Form>
                                <div className='edit-info'>
                                <FormGroup className='row'>
                                    <Label htmlFor="first_name" className='col-4 col-md-3 col-lg-2'>First Name</Label>
                                    <Field id="first_name" name="first_name" placeholder="Enter First Name" className="form-control col" />
                                    <ErrorMessage name="first_name">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="last_name" className='col-4 col-md-3 col-lg-2'>Last Name</Label>
                                    <Field id="last_name" name="last_name" placeholder="Enter Last Name" className="form-control col" />
                                    <ErrorMessage name="last_name">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="email" className='col-4 col-md-3 col-lg-2'>Email</Label>
                                    <Field id="email" name="email" disabled={true} placeholder="Enter Email Address" className="form-control col" />
                                    <ErrorMessage name="email">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="phone" className='col-4 col-md-3 col-lg-2'>Phone</Label>
                                    <CustomPhoneField
                                        ref={ref}
                                        disabled={true}
                                        name="phone"
                                        formik={formik}
                                        defaultValue={currentUser.phone}
                                        onChange={e => formik.setFieldValue("phone", e)}
                                        className='col-8'
                                    />
                                    <ErrorMessage name="phone">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="gender" className='col-4 col-md-3 col-lg-2'>Gender</Label>
                                    <Field id="gender" name="gender" placeholder="Enter gender" className="form-control col" as='select'>
                                        <option value='male'>male</option>
                                        <option value='female'>female</option>
                                        <option value='non-binary'>non-binary</option>
                                        <option value='unspecified'>unspecified</option>
                                    </Field>
                                    <ErrorMessage name="gender">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>

                                <hr />
                                <p className='sub-header'>Address</p>
                                <FormGroup className='row'>
                                    <Label htmlFor="address_line_1" className='col-4 col-md-3 col-lg-2'>Line 1</Label>
                                    <Field id="address_line_1" name="address_line_1" placeholder="Enter Address" className="form-control col" />
                                    <ErrorMessage name="address_line_1">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="address_line_2" className='col-4 col-md-3 col-lg-2'>Line 2</Label>
                                    <Field id="address_line_2" name="addres_line_2" placeholder="Enter Address" className="form-control col" />
                                    <ErrorMessage name="address_line_2">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="address_line_3" className='col-4 col-md-3 col-lg-2'>Line 3</Label>
                                    <Field id="address_line_3" name="addres_line_3" placeholder="Enter Address" className="form-control col" />
                                    <ErrorMessage name="address_line_3">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="city" className='col-4 col-md-3 col-lg-2'>City</Label>
                                    <Field id="city" name="city" placeholder="Enter City" className="form-control col" />
                                    <ErrorMessage name="city">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="province" className='col-4 col-md-3 col-lg-2'>Province</Label>
                                    <Field id="province" name="province" placeholder="Enter Province" className="form-control col" />
                                    <ErrorMessage name="province">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="postal_code" className='col-4 col-md-3 col-lg-2'>Postal Code</Label>
                                    <Field id="postal_code" name="postal_code" placeholder="Enter Postal Code" className="form-control col" />
                                    <ErrorMessage name="postal_code">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label htmlFor="country" className='col-4 col-md-3 col-lg-2'>Country</Label>
                                    <Field id="country" name="country" placeholder="Enter Country" className="form-control col" />
                                    <ErrorMessage name="country">
                                        {(msg) => <p className="err-msg">{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>

                                <hr />
                                <FormGroup className='row'>
                                    <Label className='text-center'>Services</Label>
                                    <ServicesDropdownList
                                        ref={ref}
                                        fldName="services"
                                        formik={formik}
                                        defaultValue={currentUser.services}
                                        onFormChange={e => formik.setFieldValue("services", e)} />
                                </FormGroup>
                                </div>
                                {
                                    isLoading
                                    ? (<Loading />)
                                    : (<div className='sub-cancel-btns'>
                                        <Button className='mb-4' type="submit">Submit</Button>
                                        <Button className='mb-4 mx-2' onClick={props.toggleEdit}>Cancel</Button>
                                    </div>)
                                }
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </>
    );
}

export default UserEditProfile;