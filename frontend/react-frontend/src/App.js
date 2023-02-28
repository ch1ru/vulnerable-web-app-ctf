import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RequireAuth from './components/auth/RequireAuth';
import Logout from './pages/Logout';
import Account from './pages/Account';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          
          <Route path='/' element={ <Home /> } />
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={ <Logout /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={ <NotFound />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;