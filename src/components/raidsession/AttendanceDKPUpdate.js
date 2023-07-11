import {useState, useContext} from "react";
import {Button, TextField} from "@mui/material"
import AppContext from '../../contexts/AppContext';
import { useParams } from "react-router-dom";


export default function AttendanceDKPUpdate(props) {
  let {API} = useContext(AppContext);
  const [dkpAmount, setDkpAmount] = useState(10);

  let { id } = useParams();





  function updateDkpAward() {
    let body = { dkpAmount, action: "UPDATE_AWARD_DKP"};

    body = JSON.stringify(body)

    fetch(`${API}/session/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    .then(async (response) => {
        if(response.ok){
          let data = await response.json()
          props.setSessionData(data)
        }else{
          let data = await response.json()
          alert(data.message)
        }
      })
    .catch((err) => {
        console.log(err)
      });
  }


  return (
    <>
      <TextField id='dkpAwardAmount' defaultValue={dkpAmount} onChange={(e) => setDkpAmount(e.target.value)} variant="outlined" label={"DKP Award Amount"} type="number" />
      <Button onClick={()=>updateDkpAward()}variant="outlined">Update DKP Award Amount </Button>

    </>
  );
}
