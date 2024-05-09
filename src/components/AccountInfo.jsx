import { useState, useEffect } from "react"
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import MyLotsList from "./MyLotsList";

function AccountInfo({isAuthenticated}) {
    const [userLots, setUserLots] = useState([]);
    const [cookie, setCookies, removeCookies] = useCookies('id');
  return (
    <>
        {isAuthenticated?
        <div>
          <h1 style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>My Lots</h1>
          <MyLotsList id={cookie.id}/>
        </div>
        :<h3>Please Authenticate</h3>}
    </>
  )
}

export default AccountInfo
