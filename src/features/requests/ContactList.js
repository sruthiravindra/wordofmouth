import ContactCard from './ContactCard';
import { selectCurrentUser } from '../user/userSlice';
import { useSelector } from "react-redux";

const ContactList = () => {
    const contacts = useSelector(selectCurrentUser).contacts;

    return contacts.length === 0 
        ? (<p className='text-center my-4'>No contacts yet...</p>) 
        : (<>
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