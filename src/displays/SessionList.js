import {useEffect, useContext} from 'react';
import SessionTable from '../components/raidsession/SessionTable'
import AppContext from '../contexts/AppContext';

export default function SessionList(){

  let {sessionOptions, getActiveSessions, navigate} = useContext(AppContext);

  useEffect(()=>{
    getActiveSessions();
  },[])



  return(
    <>
    <h1>Sessions</h1>
    <SessionTable data={sessionOptions} navigate={navigate}/>
    </>
  )
}