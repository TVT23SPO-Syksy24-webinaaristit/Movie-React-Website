import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default function UserProvider({children}) {
    const userFromSessionStorage = sessionStorage.getItem("user");
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : {email: "", username: ""});

    const signUp = async (userinput) => {
        setUser(userinput);
        //(console.log(userinput));
        const json = JSON.stringify(userinput);
        //(console.log(json));
        const headers = {headers: {"Content-Type":"application/json"}}
        try {
            await axios.post(url + "/user/register", json, headers);
            setUser({email: "", password: ""});
        } catch (error) {
            throw error;
        };
    };

    const signIn = async (userinput) => {
        setUser(userinput);
        const json = JSON.stringify(userinput);
        const headers = {headers: {"Content-Type":"application/json"}}

        try {
            const response = await axios.post(url + "/user/login", json, headers);

            const token = response.data.token;
            setUser(response.data);
            sessionStorage.setItem("user", JSON.stringify(response.data));
            //console.log(response.data);
        } catch(error) {
            setUser({email: "", password: "", id: null});
            throw error
        }
    }
    
    const logOut = async () => {
        setUser({email: "", password: ""});
        sessionStorage.setItem("user", JSON.stringify({"email": "","username": ""}));
        window.location.reload();
    }

    const deleteAccount = async()=>{
        const headers = {headers: {Authorization: user.token}}
        try{
            await axios.get(url + `/user/delete/${user.id}`,headers)   
            logOut();
            alert("Account has been deleted");
        } catch(error){
            throw error.response.data;
        }
    }

    const fetchUserDetails = async (userId) => {
        try {
          const response = await axios.get(`${url}/user/${userId}`);
          return response.data.rows[0];
        } catch (error) {
          console.error("Error fetching user details:", error);
          throw error;
        }
      };
    

    return (
        <UserContext.Provider value={{user,setUser,signUp,signIn,logOut,deleteAccount, fetchUserDetails}}>
            {children}
        </UserContext.Provider>
    )
};