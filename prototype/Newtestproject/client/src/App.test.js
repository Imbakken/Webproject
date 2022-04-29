import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// export code to User.js after the code is implemented 

const mongoose = require ('mongoose')
const UserSchema = mongoose.Schema({
      firstName: {
            type: String,
            required: [true, 'Please add a name']
      },
      middleName: {
            type: String,
            required: [false, 'Please add if you have a middlename']
      },
      surName: {
            type: String,
            required: [true, 'Please add a surname']
      },
      emailAddress: {
            type: String,
            required: [true, 'Please add your email-address'],
            unique: true
      },
      fieldOfEducation: {
            type: String,
            required: [true, 'Please add your field of education']
      },
      degree: {
            type: String,
            required: [true, 'Please add your degree']
      },
      School: {
            type: String,
            required: [true, 'Please add your school']
      },
      Password: {
            type: String,
            required: [true, 'Please add a password']
      },
      
},
{
      timestamps: true
})

module.exports = mongoose.model('User', 'UserSchema')
