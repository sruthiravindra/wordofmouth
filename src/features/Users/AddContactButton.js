import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addContact } from "./usersSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../user/userSlice";

const AddContactButton = ({ contactId }) => {
    const dispatch = useDispatch();
    const [buttonClicked, setButtonClicked] = useState(false);
    const currentUser = useSelector(selectCurrentUser);

    return !buttonClicked ? (
        <>
            <Button 
                className='btn-sm' 
                onClick={() => {
                    const data = {
                        "contactId": contactId,
                        "currentUserId": currentUser.id,
                    };
                    dispatch(addContact(data));
                    setButtonClicked(true);
                }}>
                Add contact
            </Button>
            <Button>Ignore</Button>
        </>
    ) : (
        <>
            <p className='clicked-button'>Contact Added</p>
        </>
    )
}

export default AddContactButton;