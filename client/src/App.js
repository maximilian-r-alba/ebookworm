import { useEffect , useState} from 'react';
import { createPortal } from 'react-dom';
import { Routes , Route } from 'react-router-dom';
import styled from 'styled-components';

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
import BookForm from './BookForm';
import FormContainer from './FormContainer';
import ReviewForm from './ReviewForm';
import BrowseChats from './BrowseChats';
import Chatroom from './Chatroom';

 
function App() {
 
  const [user, setUser] = useState(undefined)
  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [chatrooms, setChatrooms] = useState([])
  const [form, setForm] = useState()
  const [formView, setFormView] = useState(false)
  const portalSite = document.getElementById('portalSite')
  const overlay = document.getElementById('overlay')

  useEffect(() => {
    fetch('/me').then(r => {
      if(r.ok){
        r.json().then( u => setUser(u))
      }
    }
    )
  },[])

  useEffect(() =>{
    fetch('/users').then(r => r.json()).then(u => setUsers(u))
    fetch('/books').then(r => r.json()).then(b => setBooks(b))
    fetch('chatrooms').then(r => r.json()).then(c => setChatrooms(c))
  }, [])

 
  useEffect(() => {
  
    if(user ){
      
      const filterUsers = users.filter((u) => u.id !== user.id)
      setUsers([{...user}, ...filterUsers])
    }
  }, [user])

  function handleUsers(newUser){
    setUsers([newUser, ...users])
  }

  function calcRating(book){

    return parseFloat((book.reviews.map((r) => r.rating).reduce((total, current) => total+current , 0)/book.reviews.filter((r) => r.rating !== 0 ).length).toFixed(2))
  }

function formatUser(review, book, isDelete){
 
  const filterBooks = books.filter((b) => b.id !== book.id)
  const bookReviews = book.reviews.filter((r) => r.id !== review.id)
  const filterUserReviews = user.reviews.filter((r) => r.id !== review.id)
  const filterUserBooks = user.books.filter((b) => b.id !== book.id)
  if(isDelete){
    

    setUser({...user, 'books': filterUserBooks, 'reviews': filterUserReviews})
    setBooks([{...book, 'reviews':bookReviews, 'rating':calcRating(book)}, ...filterBooks])
  }

  else{

    const newBookObj = {...book, 'reviews': [{...review}, ...bookReviews]}

  newBookObj['rating'] = calcRating(newBookObj)

  setBooks([ newBookObj, ...filterBooks])
  setUser({...user, 'books': [newBookObj , ...filterUserBooks], 'reviews': [review, ...filterUserReviews]})

  }
}

function deleteUser(user){

  const filterUsers = users.filter((u) => u.id !== user.id)
  setUsers(filterUsers)

  const filterBookReviews = books.map((book) => {
    const filterReviews = book.reviews.filter((review) => review.user_id !== user.id)
    

    return {...book, 'rating':calcRating({...book, 'reviews':filterReviews}), 'reviews':filterReviews}
  })

  setBooks(filterBookReviews)

  setUser(undefined)

}


  function addBook(bookObj){
    setBooks([bookObj , ...books])
  }

  function handleFormContainer(request , book){
    
    const form = () => {
      switch(request){
        case 'login':
          return <Login setUser={setUser} setFormView={setFormView} />
        case 'review':
          return <ReviewForm formatUser={formatUser} book={book} setFormView={setFormView}/>
        case 'user':
          return <UserForm user={user} handleUsers={handleUsers} setFormView={setFormView} />
    }}
    setForm(form)
    setFormView(true)
  }

  return (
    <div id='portalSite' className="App">
      <UserContext.Provider value = {user}>

        <NavBar user={user} handleFormContainer={handleFormContainer} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<LandingPage handleUsers={handleUsers}/>} />
          <Route path='/library' element={<BrowseBooks books={books} />}/>
          <Route path='/librarysearch' element={<OpenLibrary addBook={addBook} />} />
          <Route path='/books/:id' element={<BookPage formatUser={formatUser} user={user} users={users} books={books} handleFormContainer={handleFormContainer}/>} />
          {/* <Route path='/login' element={<Login setUser={setUser}/>} /> */}
          <Route path='/signup' element={<UserForm handleUsers={handleUsers} />} />
          <Route exact path='/readers' element={<BrowseUsers users={users}/>} />
          <Route path='/readers/:id' element={<UserPage currentUser={user} users={users} formatUser={formatUser} deleteUser={deleteUser} books={books} handleFormContainer={handleFormContainer} />}/>
          <Route path='/chatrooms' element={<BrowseChats chatrooms={chatrooms} />} />
          <Route path='/chatrooms/:id' element={<Chatroom user={user}  chatrooms={chatrooms} users={users} />} />
        </Routes>

        {formView ? createPortal(<FormContainer form={form}/>, portalSite)  : <></>}
        {formView ? createPortal(<OverlayDiv active={formView}></OverlayDiv>, overlay) : <></>}

      </UserContext.Provider>
    </div>
  );
}

export default App;

const OverlayDiv = styled.div`
    background:black;
    display: ${(props) => !props.active ? 'none' : ''}; 
    position: fixed;  
    top: 0;                  
    right: 0;             
    bottom: 0;
    left: 0;
    opacity: 0.3;
    margin: 0;
`