import ContactCard from './ContactCard';
import { selectCurrentUser } from '../user/userSlice';
import { useSelector } from "react-redux";

const ContactList = () => {
    const contacts = useSelector(selectCurrentUser).contacts;

    return(
        <>
            {
                contacts.map((contact, idx) => {
                    return (
                        <ContactCard contact={contact} key={idx}/>
                    )
                })
            }
        </>
    )
};

export default ContactList;