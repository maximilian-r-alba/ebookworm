import { useEffect , useState} from 'react';

import { Routes , Route } from 'react-router-dom';

import { UserContext } from './UserContext';
import LandingPage from './LandingPage';
import NavBar from './NavBar';
import Login from './Login'
import OpenLibrary from './OpenLibrary';

function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() =>{
    fetch('/users').then(r => r.json()).then(console.log)
  }, [])


  return (
    <div className="App">
      <UserContext.Provider value = {user}>

        <NavBar setUser={setUser}/>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/librarysearch' element={<OpenLibrary />} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
