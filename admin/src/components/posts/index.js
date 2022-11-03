import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "../pagination";
import {API_BASE_URL} from "../../config";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ToastMessage from "../ToastMessage";
import Loader from "../Loader";

function PostList(){
    const token = useSelector((state) => state.user.token)
    const isLoggedIn = useSelector((state) => state.user.login)

    const navigate = useNavigate();
    //posts
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    // create and edit
    const imageInputRef = React.useRef();
    const [modalVisibility, setModalVisibility] = useState("none");
    const [editMode, setEditMode] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    // toaster
    const [showToaster, setShowToaster] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
        author: "634e7c93b654f301477aba01",
        categories: [],
        status: "",
        fileUpload: true,
    })


    useEffect( ()=>{
        if (isLoggedIn == 'false'){
            navigate("/login")
        }
        setLoader(true)
        getItemList()

    } , [currentPage])

    // modal form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // create item
        if (!editMode){
            const data = {}
            axios.post(API_BASE_URL+'api/posts', {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                author: formData.author,
                categories: formData.categories,
            },{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+token
                }
            }).then((response) => {
                setShowToaster(true)
                if (response.data.status) {
                    imageInputRef.current.value = "";
                    // clear form data
                    formData.title = ''
                    formData.description = ''
                    formData.image = ''
                    formData.categories = []
                    setModalVisibility("none")
                    setMessageType("success")
                    setMessage("Post created Successfully")
                    getItemList();
                }
            }).catch((err) => {
                setMessageType("error")
                setMessage("Something went wrong")
                setValidationErrors(err.response.data.errors)
                setShowToaster(false)

            })
        }else {
            // update item
            axios.put(API_BASE_URL+'api/posts/'+formData.id, {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                author: "634e7c93b654f301477aba01",
                categories: formData.categories,
                status: formData.status,
                file_upload: formData.file_upload,
            }, {
                headers: {
                    'Content-Type': formData.file_upload ? 'multipart/form-data' : 'application/json',
                    'Authorization': 'Bearer '+token
                }
            }).then((response) => {
                setShowToaster(true)
                setEditMode(false)
                if (response.data.status) {
                    // clear form data
                    imageInputRef.current.value = "";
                    formData.title = ''
                    formData.description = ''
                    formData.image = ''
                    formData.categories = []
                    formData.file_upload = false
                    setModalVisibility("none")
                    setMessageType("success")
                    setMessage("Post updated Successfully")
                    getItemList();
                }
            }).catch((err) => {
                setMessageType("error")
                setMessage("Something went wrong")
                setValidationErrors(err.response.data.errors)
                setShowToaster(false)
            })
        }

    }

    function getItemList(){
        axios.get(API_BASE_URL+'api/posts?page='+currentPage, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        })
            .then(function (response) {
                setPosts(response.data.data)
                setTotalRecord(response.data.totalRecord)
                setLoader(false)
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
                if (error.response.data.message == 'Authentication Fail'){
                    localStorage.setItem('login', false)
                    // navigate("/login")
                }
            })
            .then(function () {
                // always executed
            });
    }

    function getCategoryList(){
        axios.get(API_BASE_URL+'api/categories?page=1', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        })
            .then(function (response) {
                setCategoryList(response.data.data)
                setLoader(false)
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
                if (error.response.data.message == 'Authentication Fail'){
                    localStorage.setItem('login', false)
                    // navigate("/login")
                }
            })
            .then(function () {
                // always executed
            });
    }

    // open modal
    const openModal = () =>{
        setLoader(true)
         getCategoryList();
        formData.title = ''
        formData.description = ''
        formData.image = ''
        formData.categories = []
        let modalState = modalVisibility == "none" ? "block" : "none";
        setModalVisibility(modalState);
        setValidationErrors({});
        setEditMode(false);
        setShowToaster(false)
        setLoader(false)
    }

    // get single item
    const getItemById = (id) => {
        setLoader(true)
        setEditMode(true);
        setShowToaster(false)
        axios.get(API_BASE_URL+'api/posts/'+id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then( function (response) {
            // handle success
             getCategoryList();
             //const array = response.data.data.description;
            const categoryIds = response.data.data.categories.map(x => {
                return x._id;
            });
            setFormData({
                'title' : response.data.data.title,
                'description' : response.data.data.description,
                'categories' : categoryIds,
                'image' : "",
                'status' : response.data.data.status,
                'id' : response.data.data._id,
                'file_upload' : false,
            })
            setLoader(false)
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
                axios.delete(API_BASE_URL+'api/posts/'+id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    }
                }).then(function (response) {
                    // handle success
                    MySwal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    getItemList();

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

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    // store categories
    const handleCategoryChange = (e) =>{
        setFormData({...formData, categories: [...e.target.selectedOptions].map(o => o.value)})
    }

    // store file
    const handleFileSelect = (e) =>{
        setFormData({...formData, image: e.target.files[0], file_upload: true})
    }
    return(
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-12 ${loader && 'overlay'}`}>
                        { loader && <Loader/>}
                        { showToaster &&  <ToastMessage messageType={messageType} message={message}/> }
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="card-title">Post List</h3>
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
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Author</th>
                                        <th>Created AT</th>
                                        <th>Status</th>
                                        <th className="text-center table-action">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{minHeight: '200px'}}>
                                    {posts.length > 0 ?
                                        posts.map((post,index) =>
                                            <tr key={post._id}>
                                                <td>{((currentPage-1)*10)+index+1}</td>
                                                <td><img src={API_BASE_URL+post.image} style={{width: "50px", height: "50px"}} /></td>
                                                <td>{post.title}</td>
                                                <td>{post.description.substring(0, 150)}</td>
                                                <td>{post.author.name}</td>
                                                <td>{post.createdAt}</td>
                                                <td>
                                                    {post.status == 1 ?
                                                        <span className="badge bg-success">Active</span>
                                                        :<span className="badge bg-danger">Inactive</span>
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    <a  className="btn btn-xs btn-warning ml-1" onClick={()=> getItemById(post._id)}>
                                                        <i className="fa fa-edit"></i>
                                                    </a>
                                                    <Link target="_blank" className="btn btn-xs btn-info ml-1" to={`/posts/${post._id}`}>
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                    <a  className="btn btn-xs btn-danger ml-1"> <i className="fa fa-trash"></i></a>
                                                </td>
                                            </tr>
                                        ) : <tr><td colSpan="7" className="text-center">
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

            {/*create/edit modal*/}
            <div className="modal" id="createModal" style={{display: modalVisibility}} aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">{editMode ? 'Edit' : 'Add'} Post</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={openModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Title<span className="text-danger">*</span></label>
                                            <input type="text" name="title" className={`form-control rounded-0 ${validationErrors.title && 'is-invalid'}`}
                                                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                   value={formData.title}
                                                   placeholder="Post Title">
                                            </input>
                                            { validationErrors.title && <span id="exampleInputEmail1-error" className="error invalid-feedback">{validationErrors.title.message.substring(4)}</span>}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Categories<span className="text-danger">*</span></label>
                                            <select className="form-select form-control multiselect" value={formData.categories} name="categories[]" multiple={true} aria-label="multiple select example"
                                                    onChange={handleCategoryChange}
                                            >
                                                { categoryList.length > 0 &&
                                                    categoryList.map((category) =>
                                                        <option value={category._id} key={category._id} style={{paddingTop:"4px"}}>{category.title}</option>
                                                    )
                                                }
                                            </select>
                                            { validationErrors.categories && <span id="exampleInputEmail1-error" className="error invalid-feedback">{validationErrors.categories.message.substring(4)}</span>}

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Description<span className="text-danger">*</span></label>
                                            <textarea name="description" className={`form-control rounded-0 ${validationErrors.description && 'is-invalid'}`}
                                                      value={formData.description}
                                                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                      placeholder="Post Description">
                                             </textarea>
                                            { validationErrors.description && <span id="exampleInputEmail1-error" className="error invalid-feedback">{validationErrors.description.message.substring(4)}</span>}

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="formFile" className="form-label">Image<span className="text-danger">*</span></label>
                                            <input className={`form-control rounded-0 ${validationErrors.image && 'is-invalid'}`} name="image" type="file" id="formFile"
                                                   onChange={handleFileSelect}
                                                   ref={imageInputRef}
                                                   // onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                            ></input>
                                            { validationErrors.image && <span id="exampleInputEmail1-error" className="error invalid-feedback">{validationErrors.image.message.substring(4)}</span>}

                                        </div>
                                    </div>


                                    { editMode &&
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleSelectRounded0">Status<span className="text-danger">*</span></label>
                                                <select className="custom-select rounded-0" id="exampleSelectRounded0"
                                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                        value={formData.status} >
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </select>
                                            </div>
                                        </div>

                                    }
                                </div>
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

export default PostList