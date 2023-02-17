import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
const NavBar = () => {
const [isloadingsubmit, setIsLoadingsubmit] = useState(false);
const nav = useNavigate();

const handleClick = (e) =>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8000/api/logout').then(response => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        nav('/login')
        swal('Logged out successfully');
        }).catch(error =>{
            setIsLoadingsubmit(false); 
            if(error.response.status === 401){
                swal(error.response.data.message);
            }else{
                swal(error);
            } 
        })
  
}


return (
<>
    <nav className="navbar navbar-light bg-dark py-3 mb-2">
        <div className="container d-flex">
            <Link to="/feed" className="navbar-brand text-white">Logo Name</Link>            
            <button type="button" onClick={handleClick} disabled={isloadingsubmit} className="form-control w-auto ">
                {isloadingsubmit ? <div className="spinner-border text-info" role="status"></div> : 'Logout' }
            </button>
        </div>
    </nav>
</>
);
}

export default NavBar;
