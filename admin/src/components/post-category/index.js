import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {API_BASE_URL} from "../../config";
import Pagination from "../pagination";
import {login} from "../../redux/userSlice";
import ToastMessage from "../ToastMessage";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




function PostCategoryList(){
    // auth
    const token = useSelector((state) => state.user.token)
    const isLoggedIn = useSelector((state) => state.user.login)
    const navigate = useNavigate();
    // category
    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    // create and edit
    const [modalVisibility, setModalVisibility] = useState("none");
    const [editMode, setEditMode] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    // toaster
    const [showToaster, setShowToaster] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        status: "",
    })


    useEffect( ()=>{
        if (isLoggedIn == 'false'){
            navigate("/login")
        }
        setLoader(true)
        getCategoryList()

    } , [currentPage])


    // modal form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // create item
        if (!editMode){
            axios.post(API_BASE_URL+'api/categories', {
                title: formData.title,
                status: 1,
            }).then((response) => {
                setShowToaster(true)
                if (response.data.status) {
                    // clear form data
                    formData.title = '';
                    setModalVisibility("none")
                    setMessageType("success")
                    setMessage("Category created Successfully")
                    getCategoryList();
                }
            }).catch((err) => {
                setMessageType("error")
                setMessage("Something went wrong")
                console.log(err.response.data.errors.title.message)
                setValidationErrors(err.response.data.errors)
                setShowToaster(false)

            })
        }else {
            // update item
            axios.put(API_BASE_URL+'api/categories/'+formData.id, {
                title: formData.title,
                status: formData.status,
            }).then((response) => {
                setShowToaster(true)
                setEditMode(false)
                if (response.data.status) {
                    // clear form data
                    formData.title = '';
                    formData.status = '';
                    setModalVisibility("none")
                    setMessageType("success")
                    setMessage("Category updated Successfully")
                    getCategoryList();
                }
            }).catch((err) => {
                setMessageType("error")
                setMessage("Something went wrong")
                console.log(err.response.data.errors.title.message)
                setValidationErrors(err.response.data.errors)
                setShowToaster(false)
            })
        }

    }

    // open modal
    const openModal = () =>{
        formData.title = '';
        let modalState = modalVisibility == "none" ? "block" : "none";
        setModalVisibility(modalState);
        setValidationErrors({});
        setEditMode(false);
        setShowToaster(false)
    }

    // item delete
    const getItemById = (id) => {
        setEditMode(true);
        setShowToaster(false)
        axios.get(API_BASE_URL+'api/categories/'+id)
            .then(function (response) {
                // handle success
                setFormData({
                    'title' : response.data.data.title,
                    'status' : response.data.data.status,
                    'id' : response.data.data._id,
                })
                setModalVisibility("block");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }

    // item delete
    const deleteItemById = (id) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(API_BASE_URL+'api/categories/'+id)
                    .then(function (response) {
                        // handle success
                        MySwal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getCategoryList();

                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        MySwal.fire({
                            title: 'Opps!',
                            text: "Fail to Delete!",
                            icon: 'warning',
                        })
                    })
                    .finally(function () {
                        // always executed
                    });
            }
        })

    }

    // load data according to page click
    const paginate = (pageNumber) =>{
        setShowToaster(false);
        setCurrentPage(pageNumber)
    }

    // get category list
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
        }).catch(function (error) {
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
                        { showToaster &&  <ToastMessage messageType={messageType} message={message}/> }
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col">
                                            <h3 className="card-title">Post Category List</h3>
                                        </div>
                                        <div className="col">
                                            <div className="text-right">
                                                <button type="button" className="btn btn-sm btn-info" onClick={openModal}>
                                                    <i className="fa fa-plus"></i> Add New
                                                </button>
                                            </div>
                                        </div>

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
                                                        <a  className="btn btn-sm btn-warning ml-1"
                                                            onClick={()=> getItemById(category._id)}>
                                                            <i className="fa fa-edit"></i>
                                                        </a>
                                                        <a  className="btn btn-sm btn-danger ml-1"
                                                            onClick={()=> deleteItemById(category._id)}>
                                                        <i className="fa fa-trash"></i>
                                                        </a>
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

                {/*create/edit Modal*/}
                <div className="modal" id="createModal" style={{display: modalVisibility}} aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">{editMode ? 'Edit' : 'Add'} Category</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={openModal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group mb-3">
                                        <label>Title</label>
                                        <input type="text" name="title" className={`form-control rounded-0 ${validationErrors.title && 'is-invalid'}`}
                                               onChange={(e) => setFormData({...formData, title: e.target.value})}
                                               value={formData.title}
                                               placeholder="Post Category Title">
                                        </input>
                                        { validationErrors.title && <span id="exampleInputEmail1-error" className="error invalid-feedback">{validationErrors.title.message.substring(4)}</span>}

                                    </div>

                                    { editMode &&
                                        <div className="form-group">
                                            <label htmlFor="exampleSelectRounded0">Status</label>
                                            <select className="custom-select rounded-0" id="exampleSelectRounded0"
                                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                    value={formData.status} >
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </div>
                                    }
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={openModal}>Close</button>
                                    <button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Save'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
    );
}

export default PostCategoryList