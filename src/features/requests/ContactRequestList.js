import { useSelector } from "react-redux";
import { selectCurrentUser } from "../user/userSlice";
import Loading from '../../components/Loading';
import ContactRequestCard from './ContactRequestCard';
import ContactRequestSentCard from "./ContactRequestSentCard";


const ContactRequestList = () => {
    const isLoading = useSelector((state) => state.requests.isLoading);
    const errMsg = useSelector((state) => state.requests.errMsg);
    const contactRequests = useSelector((state) => state.requests.requestsArray);
    const currentUser = useSelector(selectCurrentUser);

    return isLoading 
        ? (<Loading />) 
        : errMsg 
        ? (<p>{errMsg}</p>) 
        : contactRequests === undefined || contactRequests.length === 0 
        ? (<p className='no-requests'>No requests at this time</p>) 
        : (<>
            {
                contactRequests.map((request, idx) => {
                    return request.to_id === currentUser._id 
                    ? (<ContactRequestCard request={request} key={idx} />) 
                    : (<ContactRequestSentCard request={request} key={idx} />)
                })
            }
        </>
    )
};

export default ContactRequestList;