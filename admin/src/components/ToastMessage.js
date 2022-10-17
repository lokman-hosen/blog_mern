import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastMessage({message}){
    console.log('toast')

    //const notify = () => toast("Wow so easy!");
    toast.success(message, {
        toastId: 'success',
    })
    return <ToastContainer />
}

export default ToastMessage