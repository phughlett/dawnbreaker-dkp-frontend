import "./App.css";
import FillerDisplay from './displays/FillerDisplay'
import SessionList from './displays/SessionList'
import RaidSession from './displays/RaidSession'
import Ledger from './displays/Ledger'
import { useState } from "react";
import AppContext from './contexts/AppContext';
import { Routes, Route, useNavigate, Link } from "react-router-dom";

function App() {
  const API = "http://52.20.246.180:8080"
  const PROD ="http://52.20.246.180:8080";
  const navigate = useNavigate();

  const [session, setSession] = useState('');
  const [sessionOptions, setSessionOptions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [raidTeams, setRaidTeams] = useState([]);


  function getActiveSessions() {
    fetch(`${API}/session`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setSessionOptions(data))
      .catch((err) => console.log(err));
  }

  function getCharacters() {
    fetch(`${API}/characters`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((err) => console.log(err));
  }


  function getRaidTeams() {
    fetch(`${API}/raidteam`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setRaidTeams(data))
      .catch((err) => console.log(err));
  }


  function NoMatch() {

    const linkStyle = {
      color: '#61dafb',
      margin: '1em'
    }
    return (
      <div className="App-header">
        <h2>You must be lost!</h2>
        <p>
          <Link style={linkStyle} to="/">Go to the home page</Link>
        </p>
      </div>
    )
  }

  let contextObj = {
    API,
    session,
    setSession,
    navigate,
    sessionOptions,
    setSessionOptions,
    getActiveSessions,
    characters,
    setCharacters,
    getCharacters,
    raidTeams,
    setRaidTeams,
    getRaidTeams

  }

  return (
    <AppContext.Provider value={contextObj}>
      <Routes>
        <Route path='/' element={<SessionList/>}/>
        <Route path='/sessions' element={<SessionList/>}/>
        <Route path='/ledger' element={<Ledger/>}/>
        <Route path='/sessions/:id' element={<RaidSession />}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>

    </AppContext.Provider>
  );
}

export default App;
