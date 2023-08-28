import { useSelector } from 'react-redux';
import { useRef, useState } from "react";
import { selectCurrentUser, setCurrentUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { updateUserProfilePic, selectUserById } from "../users/usersSlice";
import { useEffect } from "react";
import { getImageSRC } from '../../utils/getImageSRC';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const UserProfileUpload = (props) => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [imageSRC, setImageSRC] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const fileUploadRef = useRef(null);

    useEffect(() => {
        async function getImage () {
            const imageDownload = await getImageSRC(currentUser.profilePic);
            setImageSRC(imageDownload);
        }
        getImage();
    }, [currentUser.profilePic]);

    const initiateImgUpload = () => {
        fileUploadRef.current.click();
    }

    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        //rename the file as the current user id
        //call a cloud function which uploads the new pic, deletes the old one,
        //and updates the userData profilePic field
    };

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle>
                    <img 
                        src={imageSRC}
                        alt='profile'
                        style={{width: '10em'}}
                    />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <label 
                            onClick={initiateImgUpload}
                        >
                            Upload new profile picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-profile-img"
                            name='upload-profile-img'
                            onChange={handleImageUpload}
                            style={{ display: 'none'}}
                            ref={fileUploadRef}
                        />
                    </DropdownItem>
                    <DropdownItem>
                        Delete profile pic
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{display: "none"}}
            />

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