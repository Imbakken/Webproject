import { Link } from "react-router-dom";
import React, { Component } from 'react';
import BigLogo from "../../assets/logo.png";
import api from '../../api/api';


//footer component with ntnu logo and group number
class Homepage extends Component{
    constructor(props) {
    super(props);
    this.state = {
        jobs: [],
    }
}

componentDidMount = async () => {
    await api.getAllJobs().then(jobs => { 
        this.setState({
            jobs: jobs.data.data,
        })
    })
}

notification (jobs) {

    const applied = [];

    return (
        <div id="notification">
            {applied.length > -1 && <p>There are {applied.length} {applied.length === 1 ? "job" : "jobs"} applied for{applied.toString()}</p> }  
        </div>
    );
}

   render() {
        return (
                <div className="main-content">
                    <h1>Find a second examiner for your course</h1>

                    <div className="homepage-content">
                        <p>{this.notification(this.state.jobs)}</p>
                        <p>There are {this.state.jobs.length} jobs in the system right now</p>
                    </div>

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