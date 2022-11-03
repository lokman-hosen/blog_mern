import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {API_BASE_URL} from "../../config";
import Loader from "../Loader";

function PostDetail(){
    let params = useParams();
    const token = useSelector((state) => state.user.token)
    const isLoggedIn = useSelector((state) => state.user.login)

    const navigate = useNavigate();
    //posts
    const [post, setPost] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect( ()=>{
        if (isLoggedIn == 'false'){
            navigate("/login")
        }
        setLoader(true)
        getItemById(params.id)
    } , [params.id])




    // get single item
    const getItemById = (id) => {
        setLoader(true)
         axios.get(API_BASE_URL+'api/posts/'+id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then( function (response) {
            // handle success
            setPost(response.data.data)
            setLoader(false)
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }



    return(
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className={`col-12 ${loader && 'overlay'}`}>
                            { loader && <Loader/>}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="card-title">Post Detail</h3>
                                    </div>
                                    <div className="col">
                                        <div className="text-right">
                                            <Link to="/posts" type="button" className="btn btn-sm btn-info">
                                                <i className="fa fa-undo"></i> Posts
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h2>{post.title}</h2>
                                        <h5>
                                            <i className="far fa-user"></i> {post.author?.name}
                                            <i className="far fa-clock ml-2"></i> {Date(post.createdAt)}
                                        </h5>
                                        <h5> Categories :
                                            { post.categories?.length > 0 &&
                                                post.categories.map((category)=>
                                                    <span className="badge badge-info ml-1">{category.title}</span>
                                                )
                                            }
                                        </h5>
                                        <br/>
                                        <img className="img-fluid" src={API_BASE_URL+post?.image} alt="Author Image"/>
                                        <br/><br/>
                                        <p><b>Details : </b> {post.description}</p>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default PostDetail