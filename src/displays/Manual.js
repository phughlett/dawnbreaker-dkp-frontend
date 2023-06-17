import AppContext from "../contexts/AppContext";
import { useState, useEffect, useContext } from "react";
import HomeTable from "../components/home/HomeTable";
import NavBar from "../components/appbar/NavBar";
import { Button, Typography } from "@mui/material";

export default function Manual() {
  const [file, setFile] = useState();
  const [fileSet, setFileSet] = useState(false);

  let {
    API,
    setSession,
    session,
    sessionOptions,
    setSessionOptions,
    characters,
    getCharacters,
    getRaidTeams,
    raidTeams,
  } = useContext(AppContext);

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      let data = reader.result;

      let dataArray = data.split(/\r?\n/);
      let objArray = [];
      for (let i = 0; i < dataArray.length; ++i) {
        let obj = {};
        let currRow = dataArray[i].split(",");

        obj.name = currRow[0]; //name
        obj.raid_team = currRow[1]; //raidteam
        obj.class = currRow[2]; //class
        obj.dkp = currRow[3]; //DKP
        objArray.push(obj);
      }

      let body = JSON.stringify(objArray);

      fetch(`${API}/characters/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            let data = await response.json();
            alert(data);
            return [];
          }
        })
        .catch((err) => console.log(err));
    };
  }

  function handleSquishSubmit(event){
    event.preventDefault()

    fetch(`${API}/admin/squish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          let data = await response.json();
          alert(data);
          return [];
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <NavBar pageName={"Dawnbreaker DKP"} />
      <Typography variant="h3">Manual Upload</Typography>
      <input type="file" name="file" onChange={(e) => handleChange(e)} />
      <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
        Upload
      </Button>
      <br></br>
      <Typography sx={{mt: 4}} variant="h3">DKP Squish</Typography>
      <Button variant="outlined" onClick={(e) => handleSquishSubmit(e)}>
        {" "}
        DKP Squish
      </Button>
    </>
  );
}
