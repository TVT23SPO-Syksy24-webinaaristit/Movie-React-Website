import React, { useState } from 'react'
import './Authentication.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const Authentication = () => {

  const [action, setAction] = useState('Log In')

  return (
    <div className = 'container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action==="Log In"?<div></div>:<div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name"/>
        </div>}
        <div className="input">
          <img src={email_icon} alt=""  />
          <input type="email" placeholder="Email"/>
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input type="password" placeholder="Password"/>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here</span></div>}
      <div className="submit-container">
        <div className={action==="Log In"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Log In")}}>Log In</div>
      </div>
    </div>
  )
}

export default Authentication