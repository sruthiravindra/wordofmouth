import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRequests } from "../requests/requestsSlice";
import Loading from '../../components/Loading';
import ContactRequestCard from './ContactRequestCard';


const ContactRequestList = () => {
    const isLoading = useSelector((state) => state.requests.isLoading);
    const errMsg = useSelector((state) => state.requests.errMsg);
    const dispatch = useDispatch();
    const contactRequests = useSelector((state) => state.requests.requestsArray);

    useEffect(() => {
        dispatch(fetchRequests());
    }, [])

    return isLoading ? (<Loading />) : errMsg ? (<p>{errMsg}</p>) 
    : contactRequests.length === 0 ? (<p>No requests to display</p>) : (
        <>
            {
                contactRequests.map((contact) => {
                    return (
                        <ContactRequestCard contact={contact} key={contact._id}/>
                    )
                })
            }
        </>
    )
};

export default ContactRequestList;