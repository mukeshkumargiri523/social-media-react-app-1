import React, { useContext, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );
   const handleClick = async () => {
     try {
       if (followed) {
         await axios.put(`/users/${user._id}/unfollow`, {
           userId: currentUser._id,
         });
         dispatch({ type: "UNFOLLOW", payload: user._id });
       } else {
         await axios.put(`/users/${user._id}/follow`, {
           userId: currentUser._id,
         });
         dispatch({ type: "FOLLOW", payload: user._id });
       }
       setFollowed(!followed);
     } catch (err) {}
   };
  const HomeRightBar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b> Ritesh Sahoo </b> and <b>2 other</b> friends have birthday
            today.
          </span>
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h2 className="rightbarProfileTitle rightbarProfileTitle1 ">
          User Information
        </h2>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <h2 className="rightbarProfileTitle rightbarProfileTitle2">
          User Friends
        </h2>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/11.avif`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Roshan Kumar</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/12.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Rakesh Mishra</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/13.avif`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Rajesh Das</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/14.avif`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Pritesh Singh</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/15.avif`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Lalit Chhetri</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/16.avif`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Sachet Joshi</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
