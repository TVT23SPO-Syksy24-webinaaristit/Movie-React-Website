import React from "react";
import './LogOutButton.css';
import { useUser } from "../contexts/useUser";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
    const navigate = useNavigate();
    const {user,logOut} = useUser();
    const handleClick = () => {
        navigate("/");
        logOut();
    }

     return(
        <>
        {user && user.token ? 
            (<button className="LogOutButton" onClick={handleClick}>Log Out</button>)
            :
            (null)
        }
        </>
    );
};

export default LogOutButton;