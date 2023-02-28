import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '../styles/account.css';
import Cookies from "js-cookie";
import { axiosPublic } from "../api/config";

export default function Account() {

    const jwt = Cookies.get('jwt');

    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const getUser = async () => {
        const response = await axiosPublic.get(`/user`, { params: {jwt: jwt}}, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
        });

        setName(response?.data?.data.name);
        setIsAdmin(response?.data?.data.isAdmin);
    }

    useEffect(() => {

        getUser();
        
    })

    const getFlag = async (e) => {
        e.preventDefault();

        try {

            let jwt = Cookies.get('jwt');

            const response = await axiosPublic.get(`/flag`, { params: {jwt: jwt}}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            });

            const flag = response?.data?.data.flag;
            alert(flag);

        }
        catch(err) {
            console.log(err)

        }
        
    }

    return (
        <>
            <Header title={"Account"} />
            <div className="body-account">
                <div className="profile" style={{background: 'black', display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '30%', marginRight: '30%'}}>
                    {isAdmin ?
                    <div>
                    <div>
                        <h1>{name}</h1>
                        <h3>2/3 god, 1/3 man and the admin of secrets of mesopotamia</h3>
                    </div>
                    <div>
                        <img style={{marginTop: '1.5rem'}} className='profile-pic' src={'https://vignette.wikia.nocookie.net/rehero/images/1/1e/Gilgamesh.jpg/revision/latest?cb=20180404004944'}></img>
                    </div>
                    </div>
                    :
                    <div>
                    <div>
                        <h1>{name}</h1>
                        <h3>Servant of the gods</h3>
                    </div>
                    <div>
                        <img style={{marginTop: '1.5rem'}} className='profile-pic' src={'https://i.etsystatic.com/8729767/r/il/357870/1604678139/il_fullxfull.1604678139_ns4a.jpg'}></img>
                    </div>
                    </div>
                    }

                    {isAdmin ? 
                    <button style={{width: '6rem', height: '4rem', alignSelf: 'center', background: '#009688', color: 'white'}} onClick={getFlag}>
                        Get Secret Flag
                    </button>
                    :
                    <></>
                    }

                    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '5rem', marginRight: '5rem'}}>
                        <p>Enable 2fa</p>
                        <label className="toggle" for="2faToggle">
                        <input className="toggle__input" type="checkbox" id="2faToggle" />
                        <div className="toggle__fill"></div>
                    </label>
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '5rem', marginRight: '5rem'}}>
                        <p>Receive email notifications</p>
                        <label className="toggle" for="2faToggle2">
                        <input className="toggle__input" type="checkbox" id="2faToggle2" />
                        <div className="toggle__fill"></div>
                    </label>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '5rem', marginRight: '5rem'}}>
                        <p>Public profile</p>
                        <label className="toggle" for="2faToggle4">
                        <input className="toggle__input" type="checkbox" id="2faToggle4" />
                        <div className="toggle__fill"></div>
                    </label>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '5rem', marginRight: '5rem'}}>
                        <p>Newsletter</p>
                        <label className="toggle" for="2faToggle3">
                        <input className="toggle__input" type="checkbox" id="2faToggle3" />
                        <div className="toggle__fill"></div>
                    </label>
                    </div>
                    
                    <p style={{color: 'white'}}>Any problems speak to the admin Gilgamesh ~ gilgamesh@mesopotamiansecrets.com</p>
                    
                </div>

                
            </div>
            
        </>
    )
}