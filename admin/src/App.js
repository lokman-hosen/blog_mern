import logo from './logo.svg';
//import './App.css';
import Navbar from "./components/header/navbar";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar";
import ContentWrapper from "./components/content-wrapper/content_wrapper";
import { Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./components/dashboard/admin";
import UserList from "./components/users";
import {Axios} from "axios";
//Axios.defaults.baseURL = "http://localhost:8800/";

function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebar/>
            {/*<ContentWrapper/>*/}
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
                    <Route path="/" exact element={<AdminDashboard />} />
                    <Route path="/users" exact element={<UserList />} />
                </Routes>
                {/*<AdminDashboard/>*/}
                {/*<UserList></UserList>*/}
            </div>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
