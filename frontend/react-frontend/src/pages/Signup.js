import React from "react";
import { useRef, useState, useEffect, forwardRef } from "react";
import "../styles/login.css";
import { axiosPublic } from '../api/config';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const REGISTER_URL = '/register';

export default function Signup() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const login = "/login";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPublic.post(REGISTER_URL, JSON.stringify({user, pwd}), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            });

            navigate(login, { replace: true });
        }
        catch(err) {
            if(!err?.response) {
                setErrMsg("No server response");
                setOpenSnackbar(true);
            }
            else if(err.response?.status === 400) {
                setErrMsg("Missing username or password");
                setOpenSnackbar(true);
            }
            else if(err.response?.status === 401) {
                setErrMsg('Bad username or password');
                setOpenSnackbar(true);
            }
            else if(err.response?.status === 404) {
                setErrMsg('User already exists');
                setOpenSnackbar(true);
            }
            else {
                setErrMsg("Login failed");
                setOpenSnackbar(true);
            }

            errRef.current.focus();

        }
        
    }

    const handleCloseSnackbar = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };


    return (
        <>
        <div className="area" >
            
            </div >
        <div className="login">
            <form onSubmit={handleSubmit} className="form fadeIn">
                <img />
                <h1>Create New Account</h1>
                <h3>Enter a new username & password</h3>
                <div className="img-overlay"></div>
                    <div className="inputs">
                        <input 
                            id="username" 
                            className={errMsg !== "" ? "errorFrame" : "normalFrame"}
                            type="text" 
                            placeholder="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <input 
                            id="password" 
                            className={errMsg !== "" ? "errorFrame" : "normalFrame"}
                            type="password" 
                            placeholder="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>

                    <button className="loginBtn" onClick={handleSubmit}>
                        Create account
                    </button>

                    <div className="forgotPass">
                        <NavLink to={'/login'}><a>Already have an account?</a></NavLink>
                    </div>

            </form> 

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} TransitionComponent={Slide} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleCloseSnackbar} severity={"error"} sx={{ width: '100%', boxShadow: 1 }}>
            {errMsg}
            </Alert>
            </Snackbar>
        </div>
        
        
    </>
    )
}