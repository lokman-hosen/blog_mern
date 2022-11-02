import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loader(){
   return(
       <div className="page-loader">
           <i className="fas fa-spinner fa-spin fa-3x"></i>
       </div>
   );
}

export default Loader