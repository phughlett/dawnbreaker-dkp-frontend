import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SessionList from "./displays/SessionList";
import RaidSession from "./displays/RaidSession";
import PersonalPage from "./displays/PersonalPage";
import Characters from "./displays/Characters";
import Manual from "./displays/Manual";
import Home from "./displays/Home";
import Teams from "./displays/Teams";
import Ledger from "./displays/Ledger";
import { useState, useEffect } from "react";
import AppContext from "./contexts/AppContext";
import getCookie from "./helperFunctions/helperFunctions.js";
import {
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

function App() {

  const API = "https://api.dawnbreaker.app:8080";
  const navigate = useNavigate();

  const [session, setSession] = useState("");
  const [sessionOptions, setSessionOptions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [raidTeams, setRaidTeams] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);

  const [admin, setAdmin] = useState(getCookie("admin"));


  useEffect(() => {
    getCharacters()
    getRaidTeams()
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

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

  function getLedgerData() {
    fetch(`${API}/ledger`, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 400) {
          navigate("/");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setLedgerData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const NoMatch = () => {
    const linkStyle = {
      color: "#61dafb",
      margin: "1em",
    }

    return (

      <div className="App-header">
        <h2>You must be lost!</h2>
        <p>
          <Link style={linkStyle} to="/">
            Go to the home page
          </Link>
        </p>
      </div>

    );
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
    getRaidTeams,
    admin,
    setAdmin,
    ledgerData,
    setLedgerData,
    getLedgerData,
    NoMatch
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppContext.Provider value={contextObj}>
      <Routes>
        <Route path="/" element={<Home />} />
        {admin ? <Route path="/sessions" element={<SessionList />} /> : <></>}
        {admin ? <Route path="/sessions/:id" element={<RaidSession />} /> : <></>}
        {admin ? <Route path="/characters" element={<Characters />} /> : <></>}
        {admin ? <Route path="/teams" element={<Teams />} /> : <></>}
        {admin ? <Route path="/admin" element={<Manual />} /> : <></>}
        <Route path="/ledger" element={<Ledger />} />
        {characters.map((char) =><Route key={`${char.name}`} path={`/${char.name}`} element={<PersonalPage character={char} />} />)}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
