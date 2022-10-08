import react from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/userSlice";

function Sidebar(){
    const name = useSelector((state) => state.user.name)
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const logoutUser = (e) => {
        e.preventDefault();
        // remove user info from local storage
        localStorage.setItem('name', null)
        localStorage.setItem('email', null)
        localStorage.setItem('login', false)
        localStorage.setItem('token', null)

        navigate("/login")
    }


        return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" ></img>
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"></img>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{name}</a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"></input>
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>Users</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-address-book"></i>
                                <p>
                                    Posts Management
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="posts" className="nav-link active">
                                        <i className="fas fa-book  nav-icon"></i>
                                        <p>Post</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="categories" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Post Category</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/*<li className="nav-item menu-open">*/}
                        {/*    <a href="#" className="nav-link active">*/}
                        {/*        <i className="nav-icon fas fa-tachometer-alt"></i>*/}
                        {/*        <p>*/}
                        {/*            Dashboard*/}
                        {/*            <i className="right fas fa-angle-left"></i>*/}
                        {/*        </p>*/}
                        {/*    </a>*/}
                        {/*    <ul className="nav nav-treeview">*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="./index.html" className="nav-link active">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>Dashboard v1</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="./index2.html" className="nav-link">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>Dashboard v2</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="./index3.html" className="nav-link">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>Dashboard v3</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}


                        <li className="nav-item">
                            <a href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Widgets
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a onClick={logoutUser} className="nav-link" style={{
                                cursor: 'pointer'
                            }}>
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Logout
                                </p>
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default Sidebar