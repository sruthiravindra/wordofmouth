import { Container } from 'reactstrap'
import { selectCurrentUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import ContactList from '../features/users/ContactList';

const ContactsPage = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Container>
            <ContactList userIdArray={currentUser.contacts} />
        </Container>
    )
};

export default ContactsPage;