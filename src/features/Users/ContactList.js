import ContactCard from './ContactCard';
import { selectUsersByUserIdArray } from "../users/UsersSlice";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const ContactList = ({ userIdArray }) => {
    const contacts = useSelector(selectUsersByUserIdArray(userIdArray));
    console.log(contacts);

    return(
        <Container>
            {
                contacts.map((contact) => {
                    return (
                        <ContactCard contact={contact} key={contact.id}/>
                    )
                })
            }
        </Container>
    )
};

export default ContactList;