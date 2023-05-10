import React from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LabelIcon from "@mui/icons-material/Label";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
   const submitHandler = async (e) => {
     e.preventDefault();
     const newPost = {
       userId: user._id,
       desc: desc.current.value,
     };
     if (file) {
       const data = new FormData();
       const fileName = Date.now() + file.name;
       data.append("name", fileName);
       data.append("file", file);
       newPost.img = fileName;
       console.log(newPost);
       try {
         await axios.post("/upload", data);
       } catch (err) {}
     }
     try {
       await axios.post("/posts", newPost);
       window.location.reload();
     } catch (err) {}
   };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileimg"
          />
          <input
            type="text"
            placeholder="share what you want to express"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <label htmlFor="file" className="shareOption">
            <PermMediaIcon className="shareIcon shareIcon1" />
            <span className="shareOptionText">Photo & Video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg,.avif"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="shareOption">
            <LabelIcon className="shareIcon shareIcon2" />
            <span className="shareOptionText">Tag</span>
          </div>
          <div className="shareOption">
            <RoomIcon className="shareIcon shareIcon3" />
            <span className="shareOptionText">Location</span>
          </div>
          <div className="shareOption">
            <EmojiEmotionsIcon className="shareIcon shareIcon4" />
            <span className="shareOptionText">Feelings</span>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
