import React from "react";
import { useUser } from "../contexts/useUser";

const DeleteAccountButton = () =>{
    const { deleteAccount } = useUser();
    return(
        <button onClick={() => {
            deleteAccount();

        }
        }>JUUPAJ UU HEI HEI</button>
    )
}

export default DeleteAccountButton;