import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/cover.jpg";
import "./ProfileCard.css";

const ProfileCard = () => {
  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>Ali Osman</span>
        <span>İşsiz</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Takip Edenler</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1</span>
            <span>Takipçiler</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>Benim Profile</span>}
    </div>
  );
};

export default ProfileCard;