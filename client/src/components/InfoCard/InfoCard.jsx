import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Bilgileriniz</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Durum</b>
        </span>
        <span>ilişkisi var</span>
      </div>

      <div className="info">
        <span>
          <b>yaşadığın yer</b>
        </span>
        <span>Elazıg</span>
      </div>

      <div className="info">
        <span>
          <b>Çalışıyor </b>
        </span>
        <span>Fırat Üniversitesi</span>
      </div>

      <button className="button logout-button">Çıkış Yap</button>
    </div>
  );
};

export default InfoCard;