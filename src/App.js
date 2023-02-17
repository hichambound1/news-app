import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import Feed from './Pages/Feed/Feed';
import axios from 'axios';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ?  `Bearer ${token}` : '';
    return config;
});
function App() {
  return (
    <Router>
      <div className="h-screen">
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register"  element={<Register />} />

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
