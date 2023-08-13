import React from "react";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { selectCurrentUser, setCurrentUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { updateUserProfilePic,selectUserById } from "../users/usersSlice";
import { useEffect } from "react";

const UserProfileUpload = (props) => {
    const currentUser = useSelector(selectCurrentUser);
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const dispatch = useDispatch();

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.onloadend = () =>{
                dispatch(updateUserProfilePic({image:reader.result, id: props.userId}));
            }
            reader.readAsDataURL(file);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                    display: "none"
                }}
            />
            <div
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
                />
            </div>
            Click to upload Image
        </div>
    );
}

export default UserProfileUpload;