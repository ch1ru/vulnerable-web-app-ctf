import React from "react";
import { useRef, useState, useEffect, forwardRef } from "react";
import "../styles/login.css";
import { axiosPublic } from '../api/config';
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LOGIN_URL = '/auth';

export default function Login() {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = "/home";

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
            

            const response = await axiosPublic.post(LOGIN_URL, JSON.stringify({user, pwd}), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            });

            const accessToken = response?.data?.data.accessToken;

            const roles = response?.data?.roles;
            //setAuth({ user, pwd, roles, accessToken });
            Cookies.set('jwt', accessToken);
            
            setUser('');
            setPwd('');

            navigate(from, { replace: true });
        }
        catch(err) {
            if(!err?.response) {
                setErrMsg("No server response");
                console.log(err)
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
            else {
                setErrMsg("Login failed");
                setOpenSnackbar(true);
            }

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
                <h1>Login</h1>
                <h3>Enter your username & password to log in</h3>
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
                        Log in
                    </button>

                    <div className="forgotPass">
                        <NavLink to={'/signup'}><a>Need to create an account?</a></NavLink>
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