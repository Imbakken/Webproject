import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { setWaterLevel, waterLevelBar, displayTime } from '../../utils/helpers';
import JobsUpdate from './jobsUpdate';


class Jobpage extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            building: '',
            room: '',
            waterlevel: '',
            waterschedule: '',
            lastwatered: '',
            nextwatering: '',
            fertilizer: '',
            fertilizerschedule: '',
            lastfertilized: '',
            nextfertilizing: '',
            flags: 0,
            allJobs: [],
            updateJob: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    componentDidMount = async () => {
            const { id } = this.state;

            const job = await api.getJobById(id);

            await api.getAllJobs().then(jobs => {
                this.setState({
                    allJobs: jobs.data
                })
            })

            this.setState({
                name: job.data.data.name,
                building: job.data.data.building,
                room: job.data.data.room,
                waterlevel: setWaterLevel(job.data.data.lastwatered, job.data.data.waterschedule),
                waterschedule: job.data.data.waterschedule,
                lastwatered: job.data.data.lastwatered,
                nextwatering: job.data.data.nextwatering,
                fertilizer: job.data.data.fertilizer,
                flags: job.data.data.flags,
                fertilizerschedule: job.data.data.fertilizerschedule,
                lastfertilized: job.data.data.lastfertilized,
                nextfertilizing: job.data.data.nextfertilizing
            })

            this.selectJob();
    }

    //creating a dropdown list with all the jobs
    selectJob = () => {
        var select = document.getElementById("selectJob"); 
        var options = this.state.allJobs.data;

        for(var i = 0; i < options.length; i++) {
            var opt = options[i]['name'] + ', ' + options[i]['room'];
            var value = options[i]['_id'];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = value;
            select.appendChild(el);
            
        }
    }

    //setting the state based on the selected job
    onDropdownSelected = (e) => {
        const jobs = this.state.allJobs.data;

        for (let i = 0; i < jobs.length; i++) {
            if(e.target.value === jobs[i]['_id']){
                this.setState({
                    id: jobs[i]['_id'],
                    name: jobs[i]['name'],
                    building: jobs[i]['building'],
                    room: jobs[i]['room'],
                    waterlevel: setWaterLevel(jobs[i]['lastwatered'], jobs[i]['waterschedule']),
                    waterschedule: jobs[i]['waterschedule'],
                    lastwatered: jobs[i]['lastwatered'],
                    nextwatering: jobs[i]['nextwatering'],
                    fertilizer: jobs[i]['fertilizer'],
                    flags: jobs[i]['flags'],
                    fertilizerschedule: jobs[i]['fertilizerschedule'],
                    lastfertilized: jobs[i]['lastfertilized'],
                    nextfertilizing: jobs[i]['nextfertilizing']
                })
            }
        }
        //here you will see the current selected value of the select input
    }

    waterJob = async () => {
        const { id, name, building, room, waterschedule, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        const lastwatered = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };
            await api.updateJobById(id, payload).then(res => {
            window.alert(`Job watered successfully!`);
            window.location.reload();
        })
    }

    fertilizeJob = async () => {
        const { id, name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule } = this.state;

        const lastfertilized = new Date();

        const payload = { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule, lastfertilized };
            await api.updateJobById(id, payload).then(res => {
            window.alert(`Job fertilized successfully!`);
            window.location.reload();
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });
    }

    removeFlag = async (id) => {
        const { name, building, room, waterschedule, lastwatered, fertilizer, nextwatering, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        let flags = this.state.flags;

        flags = 0;
        
        const payload = { name, building, room, waterschedule, lastwatered, fertilizer, nextwatering, flags, fertilizerschedule, lastfertilized, nextfertilizing };

        await api.updateJobById(id, payload).then(res => {
            window.location.reload();
        })
    }

    //function for adding a flag to the job
    flagJob = async (id) => {

        const { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, fertilizerschedule, lastfertilized, nextfertilizing } = this.state;

        let flags = this.state.flags;

        flags ++;
        
        const payload = { name, building, room, waterschedule, lastwatered, nextwatering, fertilizer, flags, fertilizerschedule, lastfertilized, nextfertilizing };

        await api.updateJobById(id, payload).then(res => {
            window.alert('Job has been flagged, someone will take a look at it.');
            window.location.reload();
        })
    }
    
    updateJob() {
        this.setState({
            updateJob: true
        })   
    }

    render() {
        const { id, name, building, room, waterlevel, lastwatered, fertilizer, nextwatering, flags, lastfertilized, nextfertilizing, updateJob } = this.state;
            return (
                <>
                {updateJob &&
                    <div className="jobs">
                        <JobsUpdate id={id} />
                    </div>
                }
                
                {!updateJob &&
                <div>    
                    <p>Select job:</p>
                    <select id = "selectJob" onChange = {this.onDropdownSelected}>
                        <option value={this.state.id}>{this.state.name}, {this.state.room}</option>
                    </select>
                    
                    <figure id="activeJob">
                        {flags > 0 && 
                        <p>This job has been flagged {flags} {flags === 1 ? 'time' : 'times'}.</p>
                        }
                        {this.context.isEmployee && flags > 0 &&
                        <Button
                        id="remove-flag"
                        aria-label="remove-flag"
                        color="primary"
                        onClick={() => this.removeFlag(id)}
                    >Remove flags</Button> }
                    <h2>{name}</h2>
                        <p>Building: {building}</p>
                        <p>Room: {room}</p>
                        <p>Water level: {waterlevel}</p>
                        <div id="waterLevelBar">
                            {waterLevelBar(waterlevel)}
                        </div>
                        <p>Last watered: {displayTime(lastwatered)}</p>
                        <p>Next watering: {displayTime(nextwatering)}</p>
                        <p>Fertilizer: {fertilizer}</p>
                        <p>Last fertilized: {displayTime(lastfertilized)}</p>
                        <p>Next fertilizing: {displayTime(nextfertilizing)}</p>
                        {!this.context.isEmployee && this.context.isAuthFunc &&
                        <p>Does this job need water or fertilizer now? <br /> 
                            Let us know below:</p> }
                        {!this.context.isEmployee &&
                        <Button
                            id="flag"
                            aria-label="flag"
                            color="primary"   
                            onClick={() => this.flagJob(id)}
                        >Flag this job</Button> }
                        {this.context.isEmployee &&
                        <Button
                            id="water"
                            aria-label="water"
                            color="primary"   
                            onClick={() => this.waterJob()}                
                        >Water</Button> }
                        {this.context.isEmployee &&
                        <Button
                            id="fertilize"
                            aria-label="fertilize"
                            color="primary"   
                            onClick={() => this.fertilizeJob()}                
                        >Fertilize</Button>}
                        {this.context.isEmployee &&
                            <Button
                            id="update"
                            aria-label="update"
                            color="primary"
                            onClick={() => this.updateJob()}
                            >Update</Button>
                         }
                        <Button id="back" href={`/job-overview`}>Back</Button>
                    </figure>
                </div>
                }
                </>
            )
    }

}

export default Jobpage;