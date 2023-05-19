import AppContext from '../contexts/AppContext'
import {useState, useEffect, useContext} from 'react';
import HomeTable from '../components/home/HomeTable'
import NavBar from '../components/appbar/NavBar'

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
    <h1>Raids</h1>
    <HomeTable characters={characters} raidTeam={"Weekday Raid"} />
    </>


  )
}