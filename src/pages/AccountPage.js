import { Container } from "reactstrap"
import { useState } from "react";
import { Button } from "reactstrap";
import UserEditProfile from "../features/user/UserEditProfile";
import UserAccountInfo from "../features/user/UserAccountInfo";

const AccountPage = () => {
    const [editProfile, setEditProfile] = useState(false);
    
    const toggleEdit = () => setEditProfile(!editProfile);

    return(
        <Container>
            { !editProfile && <UserAccountInfo toggleEdit={toggleEdit} />}
            { editProfile && <UserEditProfile toggleEdit={toggleEdit} /> }
        </Container>
    )
};

export default AccountPage;