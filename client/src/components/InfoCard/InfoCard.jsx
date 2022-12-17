import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);


  const handleLogOut = ()=> {
    dispatch(logout())
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profil Bilgileri</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Durum</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Yaşadığın yer </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Mesleğin </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Çıkış Yap</button>
    </div>
  );
};

export default InfoCard;
