import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Label, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "./reviewsSlice";
import { validateReviewForm } from "../../utils/validateReviewForm";
import { updateWorkerProfile } from "../workers/workersSlice";

const ReviewForm = ({ userId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const workerProfile = useSelector((state) => state.workers.workerProfile);
    const ratingAverage = useSelector((state) => state.reviews.ratingAverage);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const ratingChange = ratingAverage !== workerProfile.rating;
    const dispatch = useDispatch();

    useEffect(() => {
        if (ratingChange && formSubmitted) {
            dispatch(updateWorkerProfile({
                profileId: userId,
                profile: { rating: ratingAverage }
            }));
            setFormSubmitted(false);
        }
    }, [formSubmitted, ratingChange, userId, dispatch])

    const handleSubmit = (values) => {
        console.log(values);
        const review = {
            reviewed_user_id: userId,
            author_id: currentUser._id,
            review_title: values.title,
            rating: values.rating,
            review_text: values.reviewText
        };
        dispatch(addReview(review))
            .finally(() => {
                setFormSubmitted(true);
                setModalOpen(!modalOpen);
            });
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