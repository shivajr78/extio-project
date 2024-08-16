import React, { useState } from "react";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import GoogleImg from "../../assets/images/google.svg";

function SignIn() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", { email });
            localStorage.setItem('email', email);
            localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
            console.log('Permissions:', response.data.permissions);
            history.push("/template/my-task/react/hr-dashboard");
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
        }
    };

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
                    <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Sign in</h1>
                        <span>Free access to our dashboard.</span>
                    </div>
                    <div className="col-12 text-center mb-4">
                        <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
                            <span className="d-flex justify-content-center align-items-center">
                                <img className="avatar xs me-2" src={GoogleImg} alt="Google" />
                                Sign in with Google
                            </span>
                        </a>
                        <span className="dividers text-muted mt-4">OR</span>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <div className="form-label">
                                <span className="d-flex justify-content-between align-items-center">
                                    Password
                                    <Link className="text-secondary" to="password-reset">Forgot Password?</Link>
                                </span>
                            </div>
                            <input type="password" className="form-control form-control-lg" placeholder="***************" />
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">SIGN IN</button>
                    </div>
                    {error && <div className="col-12 text-center mt-2 text-danger">{error}</div>}
                    <div className="col-12 text-center mt-4">
                        <span className="text-muted">Don't have an account yet? <a href="sign-up" className="text-secondary">Sign up here</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
