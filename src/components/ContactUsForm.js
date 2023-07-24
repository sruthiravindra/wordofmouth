import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, FormGroup,  Label } from "reactstrap";
import { validateContactUsForm } from "../utils/validateContactUsForm";

const ContactUsForm = () =>{
    const handleSubmit = (values, {resetForm})=>{
        resetForm();        
    }
    return (
        <Formik
            initialValues={{
                email: "",
                subject: "",
                description: ""
            }}
            onSubmit={handleSubmit}
            validate={validateContactUsForm}
        >
            <Form>
                <FormGroup>
                    <Label htmlFor="email">Email address</Label>
                    <Field className='form-control' id="email" name="email" placeholder="Enter Your Email Address" />
                    <ErrorMessage name='email'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="subject">Subject</Label>
                    <Field className='form-control' id="subject" name="subject" placeholder="Enter Subject" />
                    <ErrorMessage name='subject'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Description">Subject</Label>
                    <Field className='form-control' id="description" name="description" as='textarea' rows='12' placeholder="Description" />
                    <ErrorMessage name='description'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Formik>
    );
}

export default ContactUsForm;