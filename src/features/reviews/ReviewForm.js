import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useState } from "react";
import { selectCurrentUser } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "./reviewsSlice";
import { validateReviewForm } from "../../utils/validateReviewForm";

const ReviewForm = ({ userId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log(values);
        const review = {
            userId: userId,
            authorId: currentUser.id,
            title: values.title,
            rating: values.rating,
            reviewText: values.reviewText,
            date: new Date(Date.now()).toISOString()
        };
        console.log(review)
        dispatch(addReview(review));
        setModalOpen(!modalOpen);
    };

    return(
        <>
            <Button onClick={() => {
                if (!currentUser) {
                    alert('Please log in to leave a review');
                    return
                }
                setModalOpen(true)
            }}>
                <i className='fa fa-pencil' />
                Add Review
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Add Review
                </ModalHeader>
                <ModalBody>
                    <Formik                         
                        initialValues={{
                        title: '',
                        rating: undefined,
                        reviewText: '',
                    }}
                    onSubmit={handleSubmit}
                    validate={validateReviewForm}>
                        <Form>
                            <FormGroup>
                                <Label htmlFor='rating'>
                                    Rating
                                </Label>
                                <Field 
                                    name='rating'
                                    as='select'
                                    className='form-control'
                                >
                                    <option>Select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Field>
                                <ErrorMessage name='rating'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor='title'>
                                    Title
                                </Label>
                                <Field 
                                    name='title'
                                    placeholder='Title'
                                    className='form-control'
                                />
                                <ErrorMessage name='title'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='reviewText'>
                                    Review
                                </Label>
                                <Field 
                                    name='reviewText'
                                    as='textarea'
                                    rows='12'
                                    className='form-control'
                                />
                            </FormGroup>
                            <Button type='submit'>Submit</Button>
                            <Button className='mx-1' onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>   
    )
};

export default ReviewForm;