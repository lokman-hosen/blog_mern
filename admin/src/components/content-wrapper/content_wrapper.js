import react from 'react'
import AdminDashboard from "../dashboard/admin";
import UserList from "../users";
function ContentWrapper(){
    return(
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
            <AdminDashboard/>
            <UserList></UserList>
        </div>
    );
}
export default ContentWrapper