import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>1001FİLM</h1>
          <h6>Dünyanın her yerindeki filmleri keşfedin</h6>
        </div>
      </div>

      <LogIn/>
    </div>
  );
};
function LogIn() {
    return (
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>GİRİŞ YAP</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
            />
          </div>
  
          <div>
              <span style={{ fontSize: "12px" }}>
              Hesabınız yok mu? Kaydolun
              </span>
            <button className="button infoButton">GİRİŞ YAP</button>
          </div>
        </form>
      </div>
    );
  }
function SignUp() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Giriş Yap</h3>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
          />
        </div>

        <div>
            <span style={{fontSize: '12px'}}>Zaten hesabınız var mı. Giriş yap </span>
        </div>
        <button className="button infoButton" type="submit">Girş Yap</button>
      </form>
    </div>
  );
}

export default Auth;