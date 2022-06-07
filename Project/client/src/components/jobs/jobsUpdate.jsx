import React, { Component } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';
import { Button } from '@material-ui/core';

class JobsUpdate extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            course: '',
            coursecourse: '',
            coursecode: '',
            studytype: '',
            examform: '',
            date: '',
            deadline: '',
            place: '',
            tags: '',
            apply: 0,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateJob = this.handleUpdateJob.bind(this);
    }

    componentDidMount = async () => {
            const { id } = this.state;
            const job = await api.getJobById(id);
            
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
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });
    }

    handleUpdateJob = async (event) => {
        event.preventDefault();
        
        const { id, course, coursename, coursecode, studytype, examform, date, deadline, place, tags, apply} = this.state;
        const payload = { course, coursename, coursecode, studytype, examform, date, deadline, place, tags, apply };
            await api.updateJobById(id, payload).then(res => {
            window.alert(`Job updated successfully!`);
            this.setState({
                course: '',
                coursecourse: '',
                coursecode: '',
                studytype: '',
                examform: '',
                date: '',
                deadline: '',
                place: '',
                tags: '',
                apply: 0,
            })
            window.location.href = `/job-overview`;
        })   
    }

    //function to convert the date format so the calender input form can read it
    convertISOString(ISOString) {
        const date = new Date(ISOString);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return year + '-' + month + '-' + dt;
    }

    render() {
        const { course, coursename, coursecode, studytype, examform, date, deadline, place, tags } = this.state;
        
        return (
            <>
                 <div className='formbox'>
                    <h2>Add Job</h2>
                    <div className='form'>
                    <form onSubmit={this.handleUpdateJob}>
                        <label>Course:
                            <input
                            name='course'
                            value={course}
                            onChange={this.handleInputChange}
                            type='text'
                            required
                            placeholder='Link to the course'/>
                        </label>

                        <label>Course name:
                            <input
                            name='coursename'
                            value={coursename}
                            onChange={this.handleInputChange}
                            type='text'
                            required
                            placeholder='Course name'/>
                        </label>

                        <label>Coursecode:
                            <input
                            name='coursecode'
                            value={coursecode}
                            onChange={this.handleInputChange}
                            type='text'
                            required
                            placeholder='Coursecode'/>
                        </label>

                        <label>Studytype:
                        <select name='studytype' required value={studytype} onChange={this.handleInputChange}>
                                <option value='Bachelor'>Bachelor</option>
                                <option value='Master'>Master</option>
                                <option value='PhD'>Phd</option>
                                <option value='One year programme'>One year programme</option>
                                <option value='Other'>Other</option>
                            </select>
                        </label>

                        <label>Exam form:
                            <input
                            name='examform'
                            value={examform}
                            onChange={this.handleInputChange}
                            type='text'
                            required
                            placeholder='Exam form'/>
                        </label>

                        <label>Exam date:
                        <input
                            name='date'
                            value={date}
                            onChange={this.handleInputChange}
                            type='date'
                            required
                            placeholder='Exam date'/>
                        </label>

                        <label>Examination deadline:
                            <input
                            name='deadline'
                            value={deadline}
                            onChange={this.handleInputChange}
                            type='date'
                            required
                            placeholder='Examination deadline'/>
                            
                        </label>

                        <label>Place:
                            <input
                            name='place'
                            value={place}
                            onChange={this.handleInputChange}
                            type='text'
                            required
                            placeholder='Place'/>
                        </label>

                        <label>Tag:
                        <select name='tags' required value={tags} onChange={this.handleInputChange}>
                                <option value='Aesthetics, Fine Art and Music Studies'>Aesthetics, Fine Art and Music Studies</option>
                                <option value='Econmics, Management and Administration'>Econmics, Management and Administration</option>
                                <option value='Fisheries'>Fisheries</option>
                                <option value='History, Religion, Culture and Ideas'>History, Religion, Culture and Ideas</option>
                                <option value='Information Technology og informatics'>Information Technology og informatics</option>
                                <option value='Languages ans Literature'>Languages ans Literature</option>
                                <option value='Mathematics and Natural Science'>Mathematics and Natural Science</option>
                                <option value='Media Studies and Communication'>Media Studies and Communication</option>
                                <option value='Medicine, Health and Social Studies'>Medicine, Health and Social Studies</option>
                                <option value='Pedagogics'>Pedagogics</option>
                                <option value='Social Sciences and Psychology'>Social Sciences and Psychology</option>
                                <option value='Sport Sciences'>Sport Sciences</option>
                                <option value='Teacher Education'>Teacher Education</option>
                                <option value='Technology, Engineering and Architecture'>Technology, Engineering and Architecture</option>
                            </select>
                        </label>
                        
                        <div className="button">
                        <input className='submitButton' type='submit' value='Update job' id='button-primary' />
                        </div>
                    </form>
                    </div>
                </div>
                    
                    <Button href={`/job-overview`} id="cancel">Cancel</Button>
                    </>
        )
    }
}

export default JobsUpdate;