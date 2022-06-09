import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import JobsUpdate from './jobsUpdate';

class DisplayJobs extends Component {
    static contextType = AuthContext;
    
    constructor(props) {
        super(props)
        this.state = {
            coursename: '',
            jobs: [],
            columns: [],
            isLoading: false,
            boxHover: '',
            sortType: 'date',
            updateJob: false,
            updateId: ''
        }
        this.trueDisplay = this.trueDisplay.bind(this)
        this.falseDisplay = this.falseDisplay.bind(this)
        this.change = this.change.bind(this)
    }

    trueDisplay(e, index){
        this.setState({
            boxHover: index
        })
    }
    falseDisplay(){
        this.setState({boxHover: ''})
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true });
        await api.getAllJobs().then(jobs => { 
            this.setState({
                jobs: jobs.data.data,
                isLoading: false,
            })
        })
        this.dispJobs();
    }
    
    updateJob(id) {
        this.setState({
            updateJob: true,
            updateId: id
        })
    }

    deleteJob(id, coursename) {
        if(window.confirm(`Do you want to delete the job ${coursename} permanently?`)){
            api.deleteJobById(this.context.generateHeaders(), id);
            window.location.reload();
        }
    }

    seeJob(id) {
        window.location.href = `/job-page/${id}`;
    }

    //creating a div to display each job 
    dispJobs = () => {
        const jobs = this.state.jobs;
        const job = [];

        for (let i = 0; i < jobs.length; i++){
            job.push(jobs[i]);
        }

        const sorted = this.sortJobsBy(this.state.sortType);

        return sorted.map((job, index)  => {

           return <div id= "jobCard" key={index} coursename={`boxHover${index}`} onMouseEnter={ e => this.trueDisplay(e, index)} onMouseLeave={this.falseDisplay}>
                {job.apply > 0 && 
                    <span className='job-warning' id='warning-count'>{job.apply}</span>
                }
               <Button onClick={() => this.seeJob(job._id)}>
                <h3>{job.coursename}</h3>
                </Button>
                
                {this.context.isEmployee &&
                <Button
                    id="update"
                    aria-label="update"
                    color="primary"
                    onClick= {() => this.updateJob(job._id)}
                >Update</Button> }
                {this.context.isAdmin &&
                <Button
                    id="delete"
                    aria-label="delete"
                    color="secondary"
                    onClick={() => this.deleteJob(job._id, job.coursename)}
                >Delete</Button> }
            </div>
        })
    }

    sortJobsBy = (sort) => {

        let sorted;

        if(sort === 'date'){
            sorted = [...this.state.jobs].sort((a, b) => (a > b) ? 1 : -1);
        }
        else if(sort === 'apply') {
            sorted = [...this.state.jobs].sort((a, b) => b.apply - a.apply);
        }

        return sorted;

    }


    notification (job) {

        const applied = [];

        for (let i = 0; i < job.length; i++){
            
            if(job[i]['apply'] > 0){
                applied.push('(' + job[i]['coursecode'] + ')');
            }
        }
        return (
            <div id="notification">
                {applied.length > -1 && <p>There are {applied.length} {applied.length === 1 ? "job" : "jobs"} applied for.</p> }  
            </div>
        );
    }

    //function for changing the sorting
    change(event){
        this.setState({
            sortType: event.target.value
        });
    }

    render() {
        return (
            <>
            {!this.state.updateJob&&
                <>
                <h2>Overview of all jobs</h2>
                <div id="alljobs">
                    {this.context.isAuth &&
                    this.notification(this.state.jobs)
                    }
                    <p>There are {this.state.jobs.length} jobs in the system right now</p>
                    {this.context.isEmployee &&
                    <label>Sort by:
                    <select onChange = {this.change} value={this.state.sortType} id="jobsort">
                        <option value="date">Date</option>
                        <option value="apply">Applies</option>
                    </select>
                    </label>
                    }
                    {this.context.isEmployee &&
                    <div id="dispJobs">
                        {this.dispJobs(this.state.jobs)}
                    </div>
                    }
                </div>
                </>}
                {this.state.updateJob &&
                <JobsUpdate id={ this.state.updateId }/>}
                </>
            )
        }
}

export default DisplayJobs;