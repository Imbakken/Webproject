import { Link } from "react-router-dom";
import React, { Component } from 'react';
import BigLogo from "../../assets/logo.png";

//footer component with ntnu logo and group number
class Homepage extends Component{
   render() {
        return (
                <div className="main-content">
                <h1>Find a second examiner for your course</h1>

                <div className="link-container">
                <Link to="/login">Please login to continue</Link>
                </div>

                <div className="logo">
                    <img src={BigLogo} alt="Logo"></img>
                </div>

            </div>
            )
    }
}
export default Homepage;