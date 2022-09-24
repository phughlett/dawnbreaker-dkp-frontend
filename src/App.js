import "./App.css";
import FillerDisplay from './displays/FillerDisplay'
import { useState } from "react";
import AppContext from './contexts/AppContext';
import { Routes, Route, useNavigate, Link } from "react-router-dom";

function App() {
  const API = 'http://localhost:8080'
  const PROD ="http://52.20.246.180:8080";
  const navigate = useNavigate;

  const [session, setSession] = useState('');


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
    navigate

  }

  return (
    <AppContext.Provider value={contextObj}>
      <Routes>
        <Route path='/' element={<FillerDisplay/>}/>
        {/* <Route path='/sessions' element={}/> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>

    </AppContext.Provider>
  );
}

export default App;
