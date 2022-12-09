import { Modal, useMantineTheme } from "@mantine/core";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="İsmin"
          />

          <input
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Soy İsmin"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Nerde Çalşıyorsun?"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="Yaşadıgın yer"
          />

          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Şehir"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="İlişki durumun"
          />
        </div>


        <div>
            Profil Resmi
            <input type="file" name='profileImg'/>
            Kapak Resmi
            <input type="file" name="coverImg" />
        </div>

        <button className="button infoButton">Güncelle</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;