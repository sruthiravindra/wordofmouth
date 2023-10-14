import { useSelector } from 'react-redux';
import { useState } from "react";
import { selectCurrentUser } from "./userSlice";
import { updateUserProfilePic } from "../users/usersSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { getImageSRC } from '../../utils/getImageSRC';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

const UserProfileUpload = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    // const [imageSRC, setImageSRC] = useState('');
    const uploadedImage = useRef(undefined);

    const handleImageUpload = async () => {
        const storageRef = ref(storage, `profile-pictures/${currentUser._id}`)
        const metaData = { contentType: uploadedImage.current.type };
        console.log(`profile-pictures/${currentUser._id}`);

        const uploadTask = uploadBytesResumable(storageRef, uploadedImage.current, metaData);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast("Upload inprogress..", {
                    toastId: 'picuploadinprogress',
                });
            },
            (error) => {
                console.log(error.message);
                toast("Failed Uploading :: " + error.message);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    console.log(downloadURL);
                    // setImageSRC(downloadURL);
                    dispatch(updateUserProfilePic({
                        currentUserId: currentUser._id,
                        profile_pic: downloadURL
                    }));
                    toast("Uploaded Successfully");

                } catch (error) {
                    console.log(error.message);
                    toast("Failed Uploading :: " + error.message);

                }
            }
        );
    };

    return (
        <div>
            {currentUser.profile_pic && <img
                src={currentUser.profile_pic}
                alt='profile'
                className='img-fluid profile-pic-small'
            />}
            <label className='profile-image-input' for='image-upload'>
                <FontAwesomeIcon icon={faCircleArrowUp} className='mx-1' />
                Upload File
                <input
                    type="file"
                    id="image-upload"
                    onChange={(e) => {
                        uploadedImage.current = e.target.files[0];
                        handleImageUpload();
                    }}
                    hidden
                />
            </label>

        </div>
    );
}

export default UserProfileUpload;


{/* <div
                style={{
                    height: "160px",
                    width: "160px",
                    border: "1px dashed black"
                }}
                onClick={() => imageUploader.current.click()}
            >
                <img
                    ref={uploadedImage}
                    src={currentUser.profilePic}
                    style={{
                        width: "10rem",
                        height: "10rem",
                        position: "acsolute"
                    }}
                /> */}


// const handleImageUpload = e => {
//     const [file] = e.target.files;
//     if (file) {
//         const reader = new FileReader();
//         const { current } = uploadedImage;
//         current.file = file;
//         reader.onload = e => {
//             current.src = e.target.result;
//         };
//         reader.onloadend = () =>{
//             dispatch(updateUserProfilePic({image:reader.result, id: props.userId}));
//         }
//         reader.readAsDataURL(file);
//     }
// };