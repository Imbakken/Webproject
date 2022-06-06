import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { displayTime } from '../../utils/helpers';
import waterAlert from '../../assets/water-alert.png';
import checkIcon from '../../assets/illustrations/check.png';
import JobsUpdate from './jobsUpdate';

class DisplayJobs extends Component {
    static contextType = AuthContext;
    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            jobs: [],
            columns: [],
            isLoading: false,
            boxHover: '',
            sortType: 'nextwater',
            updatejob: false,
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

    //if water button is clicked the lastwatered variable is set to today and updates through back end
    waterJob = async (id, name, building, room, waterschedule, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing ) => {
        const lastwatered = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };
            await api.updateJobById(id, payload).then(res => {
            window.location.reload();
        })
    }

    seeJob(id) {
        window.location.href = `/job-page/${id}`;
    }

    //checking if job was last watered today
    checkLastWatering(job){
        const today = new Date();

        const lastWater = new Date(job.lastwatered);

        let water;

        if(lastWater.getDate() === today.getDate() && lastWater.getMonth() === today.getMonth() && lastWater.getFullYear() === today.getFullYear()) {
            water = true;
        }
        return water;
    }

    //checking if next water is today or has already passed 
    checkWatering(job) {
        const today = new Date();

        const nextWater = new Date(job.nextwatering);

        let water;

        if(nextWater < today) {
            water = true;
        }
        return water;
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

           return <div id= "jobCard" key={index} name={`boxHover${index}`} onMouseEnter={ e => this.trueDisplay(e, index)} onMouseLeave={this.falseDisplay}>
                {this.context.isEmployee && job.flags > 0 && 
                    <span className='job-warning' id='warning-count'>{job.flags}</span>
                }
                {this.context.isEmployee && this.checkWatering(job) &&
                    <span className='water-warning' id='water-warning'><img src={waterAlert} alt='Water Alert'/></span>
                }
                {this.context.isEmployee && this.checkLastWatering(job) &&
                    <span className='water-warning' id='water-warning'><img src={checkIcon} alt='Check Icon'/></span>
                }
               <Button onClick={() => this.seeJob(job._id)}>
                <h3>{job.name}</h3>
                <div id="extraInfo">
                {this.context.isEmployee && <p>Next watering: {displayTime(job.nextwatering)}</p>}
                {this.context.isEmployee && <p>Building: {job.building}</p>}
                {this.context.isEmployee && <p>Room: {job.room}</p>}
                </div>
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
                    onClick={() => this.deleteJob(job._id, job.name)}
                >Delete</Button> }
                {this.context.isEmployee && !this.checkLastWatering(job) &&
                <Button
                    id="water"
                    aria-label="water"
                    color="primary"   
                    onClick={() => this.waterJob(job._id, job.name, job.building, job.room, job.waterschedule, job.fertilizer, job.flags, job.fertilizerschedule, job.lastfertilized, job.nextfertilizing)}                
                >Water</Button> }
            </div>
        })
    }

    //sorting by either next watering, next fertilizing, room or number of flags
    sortJobsBy = (sort) => {

        let sorted;

        if(sort === 'nextwater'){
            sorted = [...this.state.jobs].sort((a, b) => a.nextwatering.split('-').join().localeCompare(b.nextwatering.split('-').join()));
        }
        else if(sort === 'nextfertilize'){
            sorted = [...this.state.jobs].sort((a, b) => a.nextfertilizing.split('-').join().localeCompare(b.nextfertilizing.split('-').join()));
        }
        else if(sort === 'room'){
            sorted = [...this.state.jobs].sort((a, b) => a.room.localeCompare(b.room));
        }
        else if(sort === 'flag') {
            sorted = [...this.state.jobs].sort((a, b) => b.flags - a.flags);
        }

        return sorted;

    }

    //notification on top of the page for watering, fertilizing and flags
    notification (job) {
        const today = new Date();  
        const todaysWater = [];
        const todaysFertilize = [];
        const jobName = [];
        const jobNameFertilize = [];

        const flagged = [];

        for (let i = 0; i < job.length; i++){
            const dateWater = new Date(job[i]["nextwatering"]);
            const dateFertilize = new Date(job[i]["nextfertilizing"]);

            if(dateWater < today) { 
                todaysWater.push(job[i]);
                jobName.push(' ' + job[i]['name'] + '   (' + job[i]['room'] + ')');
            }
            
            if(dateFertilize < today) {
                
                todaysFertilize.push(job[i]);
                jobNameFertilize.push(' ' + job[i]['name'] + '(' + job[i]['room'] + ')');
            }
            
            if(job[i]['flags'] > 0){
                flagged.push(' ' + job[i]['name'] + '(' + job[i]['room'] + ')');
            }
        }
        return (
            <div id="notification">
                {flagged.length > 0 && <p>There is {flagged.length} flagged {flagged.length === 1 ? "job" : "jobss"} on campus: {flagged.toString()}</p> }
                <p>There is {todaysWater.length === 0 ? "no" : todaysWater.length} {todaysWater.length === 1 ? "job" : "jobss"} that needs to be watered{todaysWater.length === 0 ? '.' : ':'}</p>
                <p>{jobName.toString()}</p>
                <p>There is {todaysFertilize.length === 0 ? "no" : todaysFertilize.length} {todaysFertilize.length === 1 ? "job" : "jobs"} that needs to be fertilized today{todaysFertilize.length === 0 ? '.' : ':'}</p>
                <p>{jobNameFertilize.toString()}</p>
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
                        <div id='flag'>
                            <span id='warning-count-regular'>1</span>
                            <p>Number of flags on the job.</p>
                        </div>
                    
                        <div id='needwater'>
                            <img src={waterAlert} alt='Water Alert'/>
                            <p>job needs water now.</p>
                        </div>

                        <div id='fullwater'>
                            <img src={checkIcon} alt='Water Alert'/>
                            <p>job has been watered today.</p>
                        </div>
                    </div>
                    }
                    <p>Sort by:</p>
                    <select onChange = {this.change} value={this.state.sortType} id="jobsort">
                        <option value="nextwater">Next watering</option>
                        <option value="room">Room</option>
                        <option value="nextfertilize">Next fertilizing</option>
                        { this.context.isEmployee && 
                            <option value="flag">Flags</option>
                        }
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