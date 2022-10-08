import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {API_BASE_URL} from "../../config";

function PostCategoryList(){
    const token = useSelector((state) => state.user.token)
    const isLoggedIn = useSelector((state) => state.user.login)
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalPage, setTotalPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    useEffect( ()=>{
        if (isLoggedIn == 'false'){
            navigate("/login")
        }
        setLoader(true)

        axios.get(API_BASE_URL+'api/categories?page='+currentPage, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then(function (response) {
                setCategories(response.data.data)
                //setPages()
            pageNumber(response.data.totalRecord)
                setLoader(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                if (error.response.data.message == 'Authentication Fail'){
                    localStorage.setItem('login', false)
                }
            })
            .then(function () {
                // always executed
            });
    } , [currentPage])

   function pageNumber(totalRecord){
        let pageNumbers =[];
        //if total record 24 then made page 3
        let totalPageNumber = Number.isInteger(totalRecord/10) ? totalRecord/10 : totalRecord/10 +1;
        // if page is 3.4 then made this 3 for lst page
       setLastPage(Number.isInteger(totalPageNumber) ? totalPageNumber : totalPageNumber.toString().split(".")[0])
       // create page number array to generate pagination
       for (let i = 1; i <= totalPageNumber; i++) {
            pageNumbers.push(i);
        }
       setTotalPage(pageNumbers);
    }
    return(
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Post Category List</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Created AT</th>
                                        <th>Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody  style={{minHeight: '200px'}}>
                                    {!loader ?
                                        categories.map((category,index) =>
                                                <tr>
                                                    <td>{((currentPage-1)*10)+index+1}</td>
                                                    <td>{category.title}</td>
                                                    <td>{category.createdAt}</td>
                                                    <td>
                                                        {category.status == 1 ?
                                                            <span className="badge bg-success">Active</span>
                                                            :<span className="badge bg-danger">Inactive</span>
                                                        }
                                                    </td>
                                                    <td className="text-center">
                                                        <a  className="btn btn-sm btn-warning ml-1"> <i className="fa fa-edit"></i></a>
                                                        <a  className="btn btn-sm btn-danger ml-1"> <i className="fa fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            ) : <tr><td colSpan="7" className="text-center">
                                                <i className="fas fa-spinner fa-spin fa-3x"></i>
                                            </td></tr>
                                    }

                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer clearfix">
                                <ul className="pagination pagination-sm m-0 float-right">
                                    <li className="page-item">
                                        <a className="page-link" onClick={()=> setCurrentPage(1)}>«</a>
                                    </li>
                                    {
                                        totalPage.map((page) =>
                                            <li className={`page-item ${page == currentPage ? 'active' : ''}`}>
                                                <a className="page-link active" onClick={()=> setCurrentPage(page)}>{page}</a>
                                            </li>
                                        )
                                    }
                                    <li className="page-item">
                                        <a className="page-link" onClick={()=> setCurrentPage(lastPage)}>»</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostCategoryList