const User         = require('../models/user-model');
const Job          = require('../models/job-model');
const nodemailer   = require('nodemailer');
const crypto       = require('crypto');
const bcrypt       = require('bcrypt');

require('dotenv').config();

//inserting user to database
createUser = async (req, res) => {
    if(!req.body){
        return res.status(400).json({
            error: 'You need to fill the input fields'
        });
    }    
    
    const { name, surname, email, role, password } = req.body;

    let checkEmail = await User.exists({ email });

    if (!checkEmail) {
        const user = await User.create({ name, surname, email, role, password });

        return res.status(201).json({
            message: 'User added successfully',
            user: user
        });
    }
    else{
        return res.status(400).json({
            error: 'Email already in use'
        });
    }
}

//inserting job to database 

createJob = async (req, res) => {
    if(!req.body){
        return res.status(400).json({
            error: 'You need to fill the input fields'
        });
    }
    
    const { course, coursename, coursecode, studytype, examform, date, deadline, place, tags } = req.body;
    const apply = 0;
    
    let checkCoursecode = await Job.exists({ coursecode });

    if (!checkCoursecode) {

        const job = await Job.create({ course, coursename, coursecode, studytype, examform, date, deadline, place, tags, apply });

        return res.status(201).json({
            message: 'Job added successfully',
            job: job
        });
     }
     else{
        return res.status(400).json({
            error: 'Job already exists in database'
        });
    } 
} 

/*
createJob = async (req, res) => {
    
    
    try {
      const job = await Job.create({
        course: req.body.course,
        coursename: req.body.coursename,
        coursecode: req.body.coursecode,
        studytype: req.body.studytype,
        examform: req.body.examform,
        date: req.body.date,
        deadline: req.body.deadline,
        place: req.body.place,
        tags: req.body.tags,
        apply: req.body.apply
      });
      res.status(201).json(job);
    } catch (error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  };
  */


//updating user
updateUser= async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name, 
            surname: req.body.surname, 
            email: req.body.email, 
            role: req.body.role 
        }
      );
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(404).json("Id not found");
    }
  };

//updating job
updateJob= async (req, res) => {
    try {
      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        {
            course: req.body.course, 
            coursename: req.body.coursename, 
            coursecode: req.body.coursecode, 
            studytype: req.body.studytype, 
            examform: req.body.examform, 
            date: req.body.date, 
            deadline: req.body.deadline, 
            place: req.body.place, 
            tags: req.body.tags, 
            apply: req.body.apply
        }
      );
      res.status(200).json(job);
    } catch (error) {
      console.log(error.message);
      res.status(404).json("Id not found");
    }
  };

//deleting user
deleteUser = async (req, res) => {
    try {
    const user = await User.findOne({ _id: req.params.id });
        await user.delete();
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.log(err.message);
        res.status(404).json("Id not found");
    }
};

//deleting job
deleteJob = async (req, res) => {
    try {
    const job = await Job.findOne({ _id: req.params.id });
        await job.delete();
        res.status(200).json({ success: true, data: job });
    } catch (err) {
        console.log(err.message);
        res.status(404).json("Id not found");
    }
};

//retrieving user based on id
getUserById = async (req, res) => {
    try {
    const user = await User.findOne({ _id: req.params.id });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err });
    }
    };

//retrieving job based on id
getJobById = async (req, res) => {
    try {
    const job = await Job.findOne({ _id: req.params.id });
        res.status(200).json({ success: true, data: job });
    } catch (err) {
        res.status(400).json({ success: false, message: err });
    }
    };

//retrieving all users
getUsers = async (req, res) => {
    try {
      const users = await User.find();
  
      if (users.length !== 0) {
        return res.status(200).json({ success: true, data: users });
      } else {
        res.status(404);
        throw new Error("Users not found");
      }
  } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  };


//retrieving all jobs
getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
  
      if (jobs.length !== 0) {
        return res.status(200).json({ success: true, data: jobs });
      } else {
        res.status(404);
        throw new Error("Jobs not found");
      }
  } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  };


//sending reset password email with unique link
forgotPassword = async (req, res)=> {
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
        console.error(req.body.email);
        const token = crypto.randomBytes(20).toString('hex');
        await User.findOneAndUpdate({
            email: req.body.email },
            {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 7200000,
            })
            
        .then((user) => {
        if (user === null) {
            console.error('email not in database');
            res.status(403).send('email not in db');
        } else {
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jobskolentnu@gmail.com',
                pass: 'Passordpassord',
            },
            });
    
            const mailOptions = {
            from: 'jobskolentnu@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `https://deployment-lol.herokuapp.com/reset/${token}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };
            console.log('sending mail');
    
            transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json(token);
                console.log(token);
                
            }
            });
        }
    });   
};

//Checking if reset password token is valid or invalid
resetPassword = async (req,res) => {
    User.find({
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: {
            $gt: Date.now(),
          },
      }).then((user) => {
        if (user == null) {
          res.status(403).send('password reset link is invalid or has expired.');
        } else {
          res.status(200).send({
            email: user.email,
            message: 'password reset link is valid',
          });
        }
    });
}

//updating the password with the new password, after hashing it
UpdatePasswordviaEmail = async (req, res) => {
    const body = req.body;
    const user = await User.find({ resetPasswordToken: body.token });                
    
    if (user === null) {
          res.status(403).send('password reset link is invalid or has expired');
        } 
        else if (user !== null) {
          const newHashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.findOneAndUpdate({ resetPasswordToken: body.token }, { $set: {
                password: newHashedPassword
              }}, function (err, user) {
                  if(user){
                    res.status(200).json({
                        message: 'password updated',
                        user: user 
                    });
                  }else if(err) {
                    return res.status(400).json({
                        message: 'An error occured'
                    });
                  }
              });
            }
            else {
          res.status(401).json('no user exists in db to update');
        }
}

module.exports = {
    createUser,
    createJob,
    updateUser,
    updateJob,
    deleteUser,
    deleteJob,
    getUsers,
    getJobs,
    getUserById,
    getJobById,
    forgotPassword,
    resetPassword,
    UpdatePasswordviaEmail,
};