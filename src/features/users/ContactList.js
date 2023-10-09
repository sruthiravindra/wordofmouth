import ContactCard from './ContactCard';
import { selectUsersByUserIdArray } from "../users/usersSlice";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const ContactList = ({ userIdArray }) => {
    const contacts = useSelector(selectUsersByUserIdArray(userIdArray));
    console.log(contacts);

    return(
        <>
            {
                contacts.map((contact) => {
                    return (
                        <ContactCard contact={contact} key={contact.id}/>
                    )
                })
            }
        </>
    )
};

export default ContactList;