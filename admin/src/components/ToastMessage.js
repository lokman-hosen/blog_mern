import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastMessage({message}){
    console.log('toast')

    //const notify = () => toast("Wow so easy!");
    toast.success('Produto removido com sucesso', {
        toastId: 'success',
    })
    return(
        <div>

            <ToastContainer />

        </div>
    )
}

export default ToastMessage