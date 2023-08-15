import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { requestContact } from './usersSlice';

const RequestContactButton = ({ workerId, workerContactRequests, currentUserId, currentUserContactRequests }) => {
    const dispatch = useDispatch();

    return (
        <Button 
            className='btn-sm' 
            onClick={() => {
                const data = {
                    "workerId": workerId,
                    "workerContactRequests": workerContactRequests, 
                    "currentUserId": currentUserId,
                    "currentUserContactRequests": currentUserContactRequests
                };
                dispatch(requestContact(data));
            }}>
                Request contact
        </Button>

    )
}

export default RequestContactButton;
