import AppContext from '../contexts/AppContext'
import {useState, useEffect, useContext} from 'react';
import HomeTable from '../components/home/HomeTable'
import NavBar from '../components/appbar/NavBar'
import Typography from '@mui/material/Typography';


export default function Home(){

  let {API, setSession, session, sessionOptions, setSessionOptions, characters, getCharacters, getRaidTeams, raidTeams} = useContext(AppContext);

  useEffect(() => {
    getCharacters();
    getRaidTeams();
  }, [])

  raidTeams.map((raidTeam) => {

  })



  //get characters


  return(
    <>
    <NavBar/>
    <Typography variant='h3'></Typography>
    <HomeTable characters={characters} raidTeam={"Weekday Raid"} />
    </>


  )
}