import { useEffect , useState} from 'react';

import { Routes , Route } from 'react-router-dom';

import { UserContext } from './UserContext';
import LandingPage from './LandingPage';
import NavBar from './NavBar';
import Login from './Login'
import OpenLibrary from './OpenLibrary';
import BrowseUsers from './BrowseUsers';
import UserForm from './UserForm';
import UserPage from './UserPage';
import BrowseBooks from './BrowseBooks';
import BookPage from './BookPage';

function App() {
  const [user, setUser] = useState(undefined)
  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() =>{
    fetch('/users').then(r => r.json()).then(u => setUsers(u))
    fetch('/books').then(r => r.json()).then(b => setBooks(b))
    fetch('/me').then(r => r.json()).then( u => setUser(u))
  }, [])



  function handleUsers(newUser){
    setUsers([newUser, ...users])
  }

  function addBook(bookObj){
    setBooks([bookObj , ...books])
  }

  return (
    <div className="App">
      <UserContext.Provider value = {user}>

        <NavBar setUser={setUser}/>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/library' element={<BrowseBooks books={books} />}/>
          <Route path='/librarysearch' element={<OpenLibrary addBook={addBook} />} />
          <Route path='/books/:id' element={<BookPage books={books}/>} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/signup' element={<UserForm handleUsers={handleUsers} />} />
          <Route path='/readers' element={<BrowseUsers users={users}/>} />
          <Route path='/readers/:id' element={<UserPage users={users} />}/>
        </Routes>

      </UserContext.Provider>
    </div>
  );
}

export default App;
