import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddPlan from './components/AddPlan';
import RoomList from './components/RoomList';
import UpdateProduct from './components/UpdateComponent';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Nav />
     <Routes>
       <Route element={<PrivateComponent />}>
       <Route path="/" element={<RoomList />} />
       <Route path="/add" element={<AddPlan />} />
       <Route path="/update/:id" element={<UpdateProduct />} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       <Route path="/profile" element={<Profile />} />
       </Route>

       <Route path="/signup" element={<SignUp />} />
       <Route path="/login" element={<Login />} />

     </Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
