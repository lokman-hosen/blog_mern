import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {API_BASE_URL} from "../../config";
import Pagination from "../pagination";
import {login} from "../../redux/userSlice";

function PostCategoryList(){
    const token = useSelector((state) => state.user.token)
    const isLoggedIn = useSelector((state) => state.user.login)
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [modalVisibility, setModalVisibility] = useState("none");

    //create modal
    const [formData, setFormData] = useState({
        title: "",
        status: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8800/api/categories', {
            title: formData.title,
            status: formData.password,
        }).then((response) => {
            if (response.data.status) {
                // clear form data
                formData.title = '';
                setModalVisibility("none")
                getCategoryList();
            }
        }).catch((err) => {
            console.log(err)

        })

    }
    const createModal = () =>{
        let modalState = modalVisibility == "none" ? "block" : "none";
        setModalVisibility(modalState);
    }

    useEffect( ()=>{
        if (isLoggedIn == 'false'){
            navigate("/login")
        }
        setLoader(true)
        getCategoryList()

    } , [currentPage])

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    function getCategoryList(){
        axios.get(API_BASE_URL+'api/categories?page='+currentPage, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then(function (response) {
            setCategories(response.data.data)
            setTotalRecord(response.data.totalRecord)
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
    }





    return(
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Post Category List</h3>
                                <div className="input-group input-group-sm pt-1 mr-2">
                                    <button type="button" className="btn btn-sm btn-info" onClick={createModal}>
                                        <i className="fa fa-plus"></i> Add New
                                    </button>
                                </div>
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
                                                <tr key={category._id}>
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
                                <Pagination totalRecord={totalRecord} paginate={paginate} currentPage={currentPage}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="createModal" style={{display: modalVisibility}} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Large Modal</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={createModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input type="text" name="title" className="form-control"
                                           onChange={(e) => setFormData({...formData, title: e.target.value})}
                                           value={formData.title}
                                           placeholder="Post Category Title">

                                    </input>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={createModal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default PostCategoryList