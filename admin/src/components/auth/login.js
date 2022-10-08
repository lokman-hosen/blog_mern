import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {login} from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Login(){
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8800/api/auth/login', {
            email: formData.email,
            password: formData.password,
        })
            .then((response) => {
                if (response.data.status) {
                    localStorage.setItem('name', response.data.data.name)
                    localStorage.setItem('email', response.data.data.email)
                    localStorage.setItem('login', true)
                    localStorage.setItem('token', response.data.token)
                    dispatch(login({
                        'name' : response.data.data.name,
                        'email' : response.data.data.email,
                        'login' : true,
                        'token' : response.data.token,
                    }))

                    // clear form data
                    formData.name = '';
                    formData.password = '';
                    navigate("/dashboard")
                }
            })
            .catch((err) => {
                console.log(err)

            })

    }


    return(
        <div className="login-box">
            <div className="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="email" name="email" className="form-control"
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   value={formData.email}
                                   placeholder="Email">

                            </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" name="password" className="form-control"
                                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                                   value={formData.password}
                                   placeholder="Password">

                            </input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Login