import ContactRequestCard from './ContactRequestCard';
import { selectUsersByUserIdArray } from "./usersSlice";
import { useSelector } from "react-redux";

const ContactList = ({ userIdArray }) => {
    const contacts = useSelector(selectUsersByUserIdArray(userIdArray));

    return(
        <>
            {
                contacts.map((contact) => {
                    return (
                        <ContactRequestCard contact={contact} key={contact.id}/>
                    )
                })
            }
        </>
    )
};

export default ContactList;