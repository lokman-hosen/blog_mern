import logo from './logo.svg';
//import './App.css';
import Navbar from "./components/header/navbar";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar";
import ContentWrapper from "./components/content-wrapper/content_wrapper";

function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebar/>
            <ContentWrapper/>
            <Footer/>
        </div>
    </div>
  );
}

export default App;
