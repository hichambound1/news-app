import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBar from "../../Component/NavBar";

const Feed = () => {
const nav = useNavigate();
const [isloadingsubmit, setIsLoadingsubmit] = useState(false);
const [articles, setArticles] = useState([]);
const [keyword, setKeyword] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem('auth_token');
    setIsLoadingsubmit(true)
    if(token){
      nav('/feed');
    }else{
      nav('/login');
    }
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    .then(response => {
      axios.get('http://127.0.0.1:8000/api/feed', {
            }).then(response => { 
                setIsLoadingsubmit(false);
                setArticles(response.data);    
            }).catch(error =>{
                setIsLoadingsubmit(false)
                swal("error when getting data");        
            })
        });
},[nav])
const handleSearch = e => {        
  e.preventDefault();
  setIsLoadingsubmit(true);
  axios.defaults.withCredentials = true;
  axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
  .then(response => {
      axios.get('http://127.0.0.1:8000/api/feed?keyword='+keyword, {
      }).then(response => {
              setIsLoadingsubmit(false);
              setArticles(response.data); 
      }).catch(error =>{
          setIsLoadingsubmit(false);
          swal("error when filtering data");
      }
      )
  });
}

return (
<>
<NavBar/>
<div className="container">
{
  isloadingsubmit 
  && 
  <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
  </div>
}
  {/* filter */}
  <section className="my-2">
    <input type="text" name="keyword" className="form-control w-auto" placeholder="search by keyword" value={keyword} onChange={e => setKeyword(e.target.value)}  />
    <br />
    <button className="btn btn-dark" onClick={handleSearch}>Search</button>
  </section>

  <section>
    <div className="row gx-lg-5">
    { articles &&  articles.map((article,key)=>(
        
      <div key={key} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <div>
          <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
            data-mdb-ripple-color="light"style={{Height:"200px"}}>
            <img src={article.image} alt=""  className="img-fluid" />
            <Link to={article.url}>
              <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
            </Link>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <Link to={article.url} className="text-info">
                <i className="fas fa-plane"></i>
                {article.source}
              </Link>
            </div>

            <div className="col-6 text-end">
              <u> {article.created_at}</u>
            </div>
          </div>
          <Link to={article.url} className="text-dark">
            <h5>{article.title}</h5>

            <p>
              {article.description}
            </p>
          </Link>         
        </div>
      </div>
    ))}
    </div>
  </section>

</div>
</>
);
}

export default Feed;
