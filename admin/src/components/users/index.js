import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function UserList(){
    const token = useSelector((state) => state.user.token)
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    useEffect( ()=>{
        axios.get('http://localhost:8800/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        }).then(function (response) {
                if (response.data.status){
                    setUsers(response.data.data)
                    setLoader(false)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error.response.data);
                if (error.response.data.message == 'Authentication Fail'){
                    navigate("/login")
                }
            })
            .then(function () {
                // always executed
            });
    } , [])
    return(
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Bordered Table</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Join At</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody  style={{minHeight: '200px'}}>
                                    {!loader ?
                                            users.map((user,index) =>
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.user_type}</td>
                                                    <td>{user.createdAt}</td>
                                                    <td>
                                                        {user.status == 1 ?
                                                            <span className="badge bg-success">Active</span>
                                                            :<span className="badge bg-danger">Inactive</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <a  className="btn btn-sm btn-warning ml-1"> <i className="fa fa-edit"></i></a>
                                                        <a  className="btn btn-sm btn-info ml-1"> <i className="fa fa-eye"></i></a>
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
                                    <li className="page-item"><a className="page-link" href="#">«</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">»</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserList