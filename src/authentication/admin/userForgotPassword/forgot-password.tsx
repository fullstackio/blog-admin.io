import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import authLogo from "./../../../assets/images/Google_Gemini_logo_200white.png";
import "./forgotpass.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

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
            <h1>Forgot Password</h1>
            <span>Please enter your email address to receive a verification code</span>
            </div>
            
            <form>
              
            
            <div className="flex flex-column gap-2 full-width">
                <label htmlFor="username">Email Id</label>
                <InputText className="full-input"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />
            </div>

              
              
              <div className="flex flex-column gap-2 full-width">
              <Button label="Get Verification Code" className="signinbtn" />
              </div>
              <div className="signup_link"><small>Back to <Link to="/auth/user/signin">Sign in</Link></small></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
