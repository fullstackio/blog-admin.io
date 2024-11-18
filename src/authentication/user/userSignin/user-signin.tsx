import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import authBg from "./../../../assets/images/auth-cover-bg.jpg";
import authLogo from "./../../../assets/images/Google_Gemini_logo_200white.png";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";

const UserSignin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      <div className="auth_row">
        <div className="left-auth-bg auth_col_60">
          <div className="loging_content_section">
            <div className="top_header"><Link to='/'><img src={authLogo} alt="Auth Logo"></img></Link></div>
            <div className="middle_body">
              <h3>Jump start your project with LOGO</h3>
              
              <p>LOGO comes with a complete set of UI components crafted with Tailwind CSS, it fulfilled most of the use case to create modern and beautiful UI and application</p>
            </div>
            <div className="bottom_footer">Copyright © 2024 LOGO</div>
          </div>
        </div>
        <div className="auth_col_40 auth-flex-middle">
          <div className="form_main_wrapper">
            <div className="form_header_heading">
            <h1>Welcome back!</h1>
            <span>Please enter your credentials to sign in!</span>
            </div>
            
            <form>
              
              <div className="flex flex-column gap-2 full-width">
                <label htmlFor="username">User name</label>
                <InputText className="full-input"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />
            </div>

              <div className="flex flex-column gap-2 full-width">
                
                <label htmlFor="password">Password</label>
                <Password className="full-input"
                    inputId="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    toggleMask />
              </div>
              <div className="form_footer_wrapper">
                <div className="flex gap-2">
                  
                    <Checkbox inputId="checked" onChange={e => setChecked(e.checked || false)} checked={checked}></Checkbox>
                  <label htmlFor="checked" className="ml-2">Remember me</label>
                </div>
                <div className="reset_pass_link">
                  <Link to="/auth/user/forgot-password">Forgot Password?</Link>
                </div>
              </div>
              
              <div className="flex flex-column gap-2 full-width">
              <Button label="Submit" className="signinbtn" onClick={handleSubmit} />
             </div>
              
              <div className="signup_link"><small>Don't have an account yet? <Link to="/auth/user/signup">Sign up</Link></small></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;
