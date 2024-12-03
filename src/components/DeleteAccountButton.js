import React from "react";
import { useUser } from "../contexts/useUser";

const DeleteAccountButton = () =>{
    const { deleteAccount } = useUser();
    return(
        <button className="delete-button" onClick={() => {
            deleteAccount();

        }
        }>Delete account</button>
    )
}

export default DeleteAccountButton;