import {Button} from "@mui/material"
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";



export default function LogoutButton() {


  let { setAdmin, navigate } = useContext(AppContext);


  const handleLogout = () => {
    setAdmin(null)
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/")
  };

  return (

      <Button onClick={() => handleLogout()} color="inherit">
        Logout
      </Button>


  );
}
