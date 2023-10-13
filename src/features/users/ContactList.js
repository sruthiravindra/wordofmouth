import ContactCard from './ContactCard';
import { selectUsersByUserIdArray } from "./usersSlice";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const ContactList = ({ userIdArray }) => {
    // const contacts = useSelector(selectUsersByUserIdArray(userIdArray));
    const contacts = [{
        "username": "adas",
        "password": "99070277",
        "first_name": "Aadarsh",
        "last_name": "Das",
        "is_worker": true,
        "is_verified": true,
        "email": "adhikari.krishna@lama.org.np",
        "phone": "9808118874",
        "gender": "male",
        "rating": 5,
        "address": {
            "address_line_1": "Kapurkot-6",
            "city": "Dhakalkot",
            "province": "Sunsari",
            "postal_code": 89716,
            "country": "Nepal"
        },
        "profile_pic": "https://firebasestorage.googleapis.com/v0/b/wordofmouth-alpha.appspot.com/o/profile-pictures%2FAadarshDas.png?alt=media&token=ce854fb5-11a3-4027-a3c1-9c4a797b1b3e&_gl=1*dlki24*_ga*MTAyODI4NzM3NC4xNjkwNTQyNTYy*_ga_CW55HF8NVT*MTY5NjY1MTM0NS42OS4xLjE2OTY2NTMzMDMuMzQuMC4w",
        "services": ["65253d8f49cb54589a00462c", "65253e2149cb54589a00463c"]
    }]

    return(
        <>
            {
                contacts.map((contact, idx) => {
                    return (
                        <ContactCard contact={contact} key={idx}/>
                    )
                })
            }
        </>
    )
};

export default ContactList;