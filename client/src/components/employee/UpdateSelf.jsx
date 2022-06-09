import React, { Component } from 'react';
import api from '../../api/api';
import { Button } from '@material-ui/core';
import { getUser } from '../../utils/storage';
import { AuthContext } from '../../utils/Auth';

class UsersUpdate extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            id: getUser(),
            name: '',
            surname: '',
            email: '',
            role: '',
            description: '',
            workplace: '',
            experience: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }

    componentDidMount = async () => {
        const id = this.state.id._id;
        const user = await api.getUserById(this.context.generateHeaders(), id);

        this.setState({
            name: user.data.data.name,
            surname: user.data.data.surname,
            email: user.data.data.email,
            role: user.data.data.role,
            description: user.data.data.description,
            workplace: user.data.data.workplace,
            experience: user.data.data.experience,
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

    handleUpdateUser = async (event) => {

        event.preventDefault();
        const id = this.state.id._id;
        const { name, surname, email, role, description, workplace, experience } = this.state;
        const payload = { name, surname, email, role, description, workplace, experience };

        //Sending authentication header, id and payload to back end function
            await api.updateUserById(this.context.generateHeaders(), id, payload).then(res => {
            window.alert(`User updated successfully!`);
            this.setState({
                name: '',
                surname: '',
                email: '',
                description: '',
                workplace: '',
                experience: ''
            })
            window.location.href = `/profile`;
        })   
    }

    

    render() {
        const { name, surname, email, role, description, workplace, experience } = this.state;

        return (
            <>
            <div className='formbox'>
                <h2>Edit user:</h2>
                    <div className='form'>
                        <form id="updateSelf" onSubmit={this.handleUpdateUser}>
                            
                            <label>First Name:</label>
                            <input 
                            required
                            type="text" 
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                            placeholder="First Name"
                            />

                            <label>Last Name:</label>
                            <input
                            required 
                            type="text" 
                            name="surname" 
                            value={surname}
                            onChange={this.handleInputChange}
                            placeholder="Last Name"
                            />

                            {this.context.isManager &&
                            <label>Email: 
                            <input
                            required 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={this.handleInputChange}
                            placeholder="Email"
                            /></label> }

                            {this.context.isAdmin &&
                            <label>
                            Role: 
                            <select required name="role" value={role} onChange={this.handleInputChange}>
                                <option value='employee'>Employee</option>
                                <option value='admin'>Admin</option>
                            </select>
                            </label>
                            }

                            {this.context.isEmployee &&
                            <label>Description:
                            <textarea
                            required 
                            type="text" 
                            name="description" 
                            value={description}
                            onChange={this.handleInputChange}
                            placeholder= "Enter your description"
                            rows="3"
                            /></label>
                            }

                            {this.context.isEmployee &&
                            <label>Workplace:
                            <input
                            required 
                            type="text" 
                            name="workplace" 
                            value={workplace}
                            onChange={this.handleInputChange}
                            placeholder="Workplace"
                            /></label>
                            }

                            {this.context.isEmployee &&
                            <label>Experience:
                            <input
                            required 
                            type="text" 
                            name="experience" 
                            value={experience}
                            onChange={this.handleInputChange}
                            placeholder="Experience"
                            /></label>
                            }

                            <div className="button">
                            <input className='submitButton' type='submit' value='Update user' id='button-primary' />
                            </div>

                            <Button href={`/profile`} id="cancel">Cancel</Button>
                        </form>
                    </div>
                </div>
                    </>
        )
    }
}

export default UsersUpdate;