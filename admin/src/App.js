import logo from './logo.svg';
//import './App.css';
import Navbar from "./components/header/navbar";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar";
import {Routes, Route, Link, useLocation, Navigate} from "react-router-dom";
import AdminDashboard from "./components/dashboard/admin";
import UserList from "./components/users";
import PostList from "./components/posts";
import PostCategoryList from "./components/post-category";
import Login from "./components/auth/login";

function App() {
    const location = useLocation();
    const currentRoute = location.pathname;
  return (
    <div className="App">
        { currentRoute == '/login' ?
            <div>
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                </Routes>
            </div> :
            <div className="wrapper">
                <Navbar></Navbar>
                <Sidebar/>
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard v1</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/login" />} />
                        <Route path="/dashboard" exact element={<AdminDashboard />} />
                        <Route path="/users" exact element={<UserList />} />
                        <Route path="/posts" exact element={<PostList />} />
                        <Route path="/categories" exact element={<PostCategoryList />} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        }

    </div>
  );
}

export default App;
