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
            coursecode: '',
            jobs: [],
            columns: [],
            isLoading: false,
            boxHover: '',
            sortType: 'apply',
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

    deleteJob(id, name) {
        if(window.confirm(`Do you want to delete the job ${name} permanently?`)){
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

        return sorted.map((job, index) => {

           return <div id= "jobCard" key={index} coursecode={`boxHover${index}`} onMouseEnter={ e => this.trueDisplay(e, index)} onMouseLeave={this.falseDisplay}>
                {this.context.isEmployee && job.apply > 0 && 
                    <span className='job-warning' id='warning-count'>{job.apply}</span>
                }
               <Button onClick={() => this.seeJob(job._id)}>
                <h3>{job.coursecode}</h3>
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
                    onClick={() => this.deleteJob(job._id, job.coursecode)}
                >Delete</Button> }
            </div>
        })
    }

    //sorting by either next watering, next fertilizing, room or number of flags
    sortJobsBy = (sort) => {

        let sorted;
       
        if(sort === 'date'){
            sorted = [...this.state.jobs].sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
        } /*
        else if(sort === 'deadline'){
            sorted = [...this.state.jobs].sort((a, b) => a.deadline.split('-').join().localeCompare(b.deadline.split('-').join()));
        }
        else if(sort === 'tags'){
            sorted = [...this.state.jobs].sort((a, b) => a.room.localeCompare(b.tags));
        }*/
        else if(sort === 'apply') {
            sorted = [...this.state.jobs].sort((a, b) => b.apply - a.apply);
        }

        return sorted;

    }

    //notification on top of the page for watering, fertilizing and flags
    notification (job) {

        const applied = [];
        const jobCoursecode = [];

        for (let i = 0; i < job.length; i++){
            
            if(job[i]['apply'] > 0){
                applied.push(' ' + job[i]['course'] + '(' + job[i]['coursecode'] + ')');
            }
        }
        return (
            <div id="notification">
                {applied.length > 0 && <p>There is {applied.length} applied {applied.length === 1 ? "job" : "jobs"} on campus: {applied.toString()}</p> }
                <p>{jobCoursecode.toString()}</p>
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
                    {this.context.isEmployee &&
                    this.notification(this.state.jobs)
                    }
                    <p> {this.state.jobs.length} jobs are currently on campus.</p>
                    {this.context.isJob &&
                    <div id='icon-explain'>
                        <div id='apply'>
                            <span id='warning-count-regular'>1</span>
                            <p>Number of applies on the job.</p>
                        </div>
                    </div>
                    }
                    <p>Sort by:</p>
                    <select onChange = {this.change} value={this.state.sortType} id="jobsort">
                        <option value="date">Date</option>
                        <option value="deadline">Deadline</option>
                        <option value="tags">Tags</option>
                        <option value="apply">Applies</option>
                    </select>
                    <div id="dispJobs">
                        {this.dispJobs(this.state.jobs)}
                    </div>
                </div>
                </>}
                {this.state.updateJob &&
                    <JobsUpdate id={ this.state.updateId }/>
                }
                </>
            )
        }
}

export default DisplayJobs;