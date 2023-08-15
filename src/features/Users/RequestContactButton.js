import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { requestContact } from './usersSlice';

const RequestContactButton = ({ workerId, currentUserId }) => {
    const dispatch = useDispatch();
    const [buttonClicked, setButtonClicked] = useState(false);

    return !buttonClicked ? (
        <Button 
            className='btn-sm' 
            onClick={() => {
                const data = {
                    "workerId": workerId,
                    "currentUserId": currentUserId,
                };
                dispatch(requestContact(data));
                setButtonClicked(true);
            }}>
            Request contact
        </Button>
    ) : (
        <>
            <p className='clicked-button'>Contact Requested</p>
        </>
    )
}

export default RequestContactButton;
