import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

const Register = () => {
    const [email, setEmail] = useState('');
    const [errormail, setErrormail] = useState('');

    const [name, setName] = useState('');
    const [errorname, setErrorname] = useState('');
    
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errorpassword, setErrorpassword] = useState('');
    
    const [error, setError] = useState('');
    
    const [isloadingsubmit, setIsLoadingsubmit] = useState(false);

    const nav = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('auth_token');
        if(token){
            nav('/feed');
        }else{
            nav('/login');
        }
    },[nav])
    const handleSubmit = e => {        
        e.preventDefault();
        setIsLoadingsubmit(true);
        axios.defaults.withCredentials = true;
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
        .then(response => {
            axios.post('http://127.0.0.1:8000/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            }).then(response => {
                    setErrormail('')
                    setErrorname('')
                    setErrorpassword('')
                    setError('')
                    localStorage.setItem('auth_token',response.data.token)
                    localStorage.setItem('auth_user', JSON.stringify(response.data.user))
                    setIsLoadingsubmit(false);
                    swal("your account created succefully");
                    nav('/feed');
         
            }).catch(error =>{
                setIsLoadingsubmit(false);

                if(error.response.status === 401){
                    swal(error.response.data.message);
                    setError(error.response.data.message)
                }
                if(error.response.data.errors){
                    setErrorname(error.response.data.errors.name)
                    setErrormail(error.response.data.errors.email)
                    setErrorpassword(error.response.data.errors.password)
                }
            }
            )
        });
    }

    return (
        <>
           <section className="vh-100" style={{backgroundColor: "rgb(100 100 100)"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem"}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                alt="login form"  style={{borderRadius: "1rem 0 0 1rem",maxWidth:"100%",height:"100%"}} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                            <div className="card-body p-2 p-lg-5 text-black">

                                <form onSubmit={handleSubmit}> 

                                    <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                                        <span className="h1 fw-bold mb-0">Logo</span>
                                    </div>

                                    <h5 className="fw-normal mb-1 pb-2" style={{letterSpacing: "1px"}}>Create new account</h5>
                                    <span className="text-danger">{error}</span>
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="email">Name</label>
                                        <input 
                                            type="name" id="name" 
                                            value={name}
                                            onChange={e => setName(e.target.value)} 
                                            className="form-control form-control-md" 
                                        />
                                        <span className="text-danger">{errorname}</span>
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="email">Email address</label>
                                        <input 
                                            type="email" id="email" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                            className="form-control form-control-md" 
                                        />
                                        <span className="text-danger">{errormail}</span>
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="form-control form-control-md" 
                                            value={password}  onChange={e => setPassword(e.target.value)}    
                                        />
                                        <span className="text-danger">{errorpassword}</span>
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="password_confirmation">Password Confirmation</label>
                                        <input type="password" id="password_confirmation"
                                         value={password_confirmation}  onChange={e => setPasswordConfirmation(e.target.value)}
                                        className="form-control form-control-md" />
                                        {/* <span className="text-danger">{errorpassword}</span> */}
                                    </div>

                                    <div className="pt-1 mb-2">
                                        <button className="btn btn-dark btn-lg btn-block" disabled={isloadingsubmit} type="submit">
                                            {isloadingsubmit ? <div className="spinner-border text-info" role="status"></div> : 'Register' }
                                        </button>
                                    </div>
                                    <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>You have an account? <Link to="/login"
                                        style={{color: "#393f81"}}>Log in  here</Link> </p> 
                                </form>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;

