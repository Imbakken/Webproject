import React, { Component } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';

class JobsInsert extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            course: '',
            coursecourse: '',
            coursecode: '',
            studytype: '',
            examform: '',
            date: '',
            deadline: '',
            place: '',
            tags: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });

    }

    deleteJob(id, coursename) {
        if(window.confirm(`Do you want to delete the job ${coursename} permanently?`)){
            api.deleteJobById(this.context.generateHeaders(), id);
            window.location.reload();
        }
    } 

    //adding job by sending the data to the back end
    handleSubmit = async (event) => {
        event.preventDefault();
        const { course, coursecourse, coursecode, studytype, examform, date, deadline, place } = this.state;

        const payload = { course, coursecourse, coursecode, studytype, examform, date, deadline, place };

        if(this.validateInput() === 'fillAllFields'){
            window.alert('Please fill out all the input fields.');
        }
        else if(this.validateInput() === 'valid'){
            await api.insertJob(this.context.generateHeaders(), payload)
            .then(res => {
                if(res.status === 201){
                window.alert(`Job inserted successfully!`)
                
                    this.setState({
                        course: '',
                        coursename: '',
                        coursecode: '',
                        studytype: '',
                        examform: '',
                        date: '',
                        deadline: '',
                        place: '',
                        tags: '',
                    });
                    window.location.reload();
                }
            })
            .catch(err => { console.log(err) })
            }
    }

    validateInput(){
        if(!this.state.course || !this.state.coursename || !this.state.coursecode || !this.state.studytype || !this.state.examform || !this.state.date || !this.state.deadline || !this.state.place || !this.state.tags  ){
            return 'fillAllFields';
        }
        else{
            return 'valid';
        }
    }

    render() {
        return (
            <>
                <div className='formbox'>
                    <h2>Add Job</h2>
                    <div className='form'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Course:
                            <input
                            name='course'
                            value={this.state.course}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Link to the course'/>
                        </label>

                        <label>Course name:
                            <input
                            name='coursename'
                            value={this.state.coursename}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Course name'/>
                        </label>

                        <label>Coursecode:
                            <input
                            name='coursecode'
                            value={this.state.coursecode}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Coursecode'/>
                        </label>

                        <label>Studytype:
                        <select name='studytype' value={this.state.studytype} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
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
                            value={this.state.examform}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Exam form'/>
                        </label>

                        <label>Exam date:
                        <input
                            name='date'
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            type='date'
                            placeholder='Exam date'/>
                        </label>

                        <label>Examination deadline:
                            <input
                            name='deadline'
                            value={this.state.deadline}
                            onChange={this.handleInputChange}
                            type='date'
                            placeholder='Examination deadline'/>
                            
                        </label>

                        <label>Place:
                            <input
                            name='place'
                            value={this.state.place}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Place'/>
                        </label>

                        <label>Tag:
                        <select name='tags' value={this.state.tags} onChange={this.handleInputChange}>
                                <option defaultValue=''></option>
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
                        <input className='submitButton' type='submit' value='Add job' id='button-primary' />
                        </div>
                    </form>
                    </div>
                </div>
            </>
        );
    }
}

export default JobsInsert;