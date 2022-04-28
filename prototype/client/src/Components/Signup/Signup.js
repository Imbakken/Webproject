import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

function Signup() {

    //! Hooks
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = () => {
        const { email, password, confirmPassword } = user;
        if (email && password && (password === confirmPassword)) {
            axios.post("http://localhost:3030/register", user).then(res => { console.log(res); });
        } else {
            alert("Please enter the values");
        }
    }

    return (
        <>
            <div className="scontainer">
                <div className="sbackground">
                    <div className="sbox">
                        <h2 className="sheading1">Create a new <br /><strong>NiceShuffle</strong> Account</h2>
                        <form className="sinputContainer">
                            <div className="semailContainer">
                                <div className="siconContainer">
                                </div>
                                <input title="Please enter the valid email address" className="semailInput" type="text" name='email' value={user.email} onChange={handleChange} required />
                                <span className="sfloatingEmail">Email</span>
                            </div>
                            <div className="spwdContainer">
                                <div className="siconContainer">
                                </div>
                                <input id="pwdInput" name="password" value={user.password} onChange={handleChange} title="Please provide the strong password" className="spwdInput" type="password"
                                    required />
                                <span className="sfloatingPwd">Password</span>
                                {/* <LockIcon/> */}
                            </div>
                            <div className="scpwdContainer">
                                <div className="siconContainer">
                                </div>
                                <input className="scpwdInput" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} title="Your password must be same as above" id="pwdInput1"
                                    type="password" required />
                                <span className="sfloatingCPwd">Confirm Password</span>
                            </div>

                            <button type="submit" className="sbtn" onClick={register}>Create Account</button>
                        </form>
                        <div className="sroute">Already have an account? <a href="/login">Login</a></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;