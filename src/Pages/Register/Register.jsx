import { Link } from "react-router-dom";

const Register = () => {

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

                                <form>

                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                                    <span className="h1 fw-bold mb-0">Logo</span>
                                </div>

                                <h5 className="fw-normal mb-1 pb-2" style={{letterSpacing: "1px"}}>Create new account</h5>

                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                    <input type="email" id="form2Example17" className="form-control form-control-lg" />
                                </div>

                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form2Example27">Password Confirmation</label>
                                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                                </div>

                                <div className="pt-1 mb-2">
                                    <button className="btn btn-dark btn-lg btn-block" type="button">Register</button>
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

