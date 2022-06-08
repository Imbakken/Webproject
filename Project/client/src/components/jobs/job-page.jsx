import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import JobsUpdate from './jobsUpdate';


class Jobpage extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            course: '',
            coursename: '',
            coursecode: '',
            studytype: '',
            examform: '',
            date: '',
            deadline: '',
            place: '',
            tags: '',
            apply: 0,
            allJobs: [],
            updateJob: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    componentDidMount = async () => {

            const job = await api.getAllJobs();

            await api.getAllJobs().then(jobs => {
                this.setState({
                    allJobs: jobs.data
                })
            })

            this.setState({
                course: job.data.data.course,
                coursename: job.data.data.coursename,
                coursecode: job.data.data.coursecode,
                studytype: job.data.data.studytype,
                examform: job.data.data.examform,
                date: job.data.data.date,
                deadline: job.data.data.deadline,
                place: job.data.data.place,
                tags: job.data.data.tags,
                apply: job.data.data.apply,
            })

            this.selectJob();
    }

    //creating a dropdown list with all the jobs
    selectJob = () => {
        var select = document.getElementById("selectJob"); 
        var options = this.state.allJobs.data;

        for(var i = 0; i < options.length; i++) {
            var opt = options[i]['coursename'];
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
                    course: jobs[i]['course'],
                    coursename: jobs[i]['coursename'],
                    coursecode: jobs[i]['coursecode'],
                    studytype: jobs[i]['studytype'],
                    examform: jobs[i]['examform'],
                    date: jobs[i]['date'],
                    deadline: jobs[i]['deadline'],
                    place: jobs[i]['place'],
                    tags: jobs[i]['tags'],
                    apply: jobs[i]['apply']
                })
            }
        }
    } 

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });
    }

    
    removeApply = async (id) => {
        const { course, coursename, coursecode, studytype, examform, date, place, deadline, tags } = this.state;

        let apply = this.state.apply;

        apply = 0;
        
        const payload = { course, coursename, coursecode, studytype, examform, date, place, deadline, tags, apply };

        await api.updateJobById(id, payload).then(res => {
            window.location.reload();
        })
    }

    //function for adding an apply to the job
    applyJob = async (id) => {

        const { course, coursename, coursecode, studytype, examform, date, place, deadline, tags } = this.state;

        let apply = this.state.apply;

        apply ++;
        
        const payload = { course, coursename, coursecode, studytype, examform, date, place, deadline, tags, apply };

        await api.updateJobById(id, payload).then(res => {
            window.alert('Job has been applied for, someone will take a look at it.');
            window.location.reload();
        })
    }

    updateJob() {
        this.setState({
            updateJob: true
        })   
    }

    render() {
        const { id, course, coursename, coursecode, studytype, examform, date, place, deadline, tags, updateJob, apply } = this.state;
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
                        <option value={this.state.id}></option>
                    </select>
                    <figure id="activeJob">
                        {apply > 0 && 
                        <p>This job has been applied for {apply} {apply === 1 ? 'time' : 'times'}.</p>
                        }
                        {this.context.isAdmin && apply > 0 &&
                        <Button
                        id="remove-apply"
                        aria-label="remove-apply"
                        color="primary"
                        onClick={() => this.removeApply(id)}
                        >Remove apply</Button> }
                        
                        <h2>{coursename}</h2>
                        <p>Link: {course}</p>
                        <p>Coursecode: {coursecode}</p>
                        <p>Studytype: {studytype}</p>
                        <p>Examform: {examform}</p>
                        <p>Date: {date}</p>
                        <p>Deadline: {deadline}</p>
                        <p>Place: {place}</p>
                        <p>Tags: {tags}</p>
                        {this.context.isEmployee &&
                        <Button
                            id="apply"
                            aria-label="apply"
                            color="primary"   
                            onClick={() => this.applyJob(id)}
                        >Apply for this job</Button> 
                        }  
                        {this.context.isEmployee &&
                        <Button
                            id="update"
                            aria-label="update"
                            color="primary"
                            onClick={() => this.updateJob()}
                        >Update</Button>}
                      <Button id="back" href={`/job-overview`}>Back</Button>
    
                    </figure>
                </div>
                }
                </>
            )
    }

}

export default Jobpage;