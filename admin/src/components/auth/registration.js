import react from 'react'
function Registration(){
    return(
        <div className="register-box">
            <div className="register-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>

            <div className="card">
                <div className="card-body register-card-body">
                    <p className="login-box-msg">Register a new membership</p>

                    <form action="../../index.html" method="post">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Full name"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Retype password"></input>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree"></input>
                                        <label htmlFor="agreeTerms">
                                            I agree to the <a href="#">terms</a>
                                        </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Registration