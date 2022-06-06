import React, { Component } from 'react';
import Hedda from "../../assets/illustrations/hedda2.png";
import Richard from "../../assets/illustrations/richard.png";
import Ida from "../../assets/illustrations/ida2.png";

class Projectinfo extends Component {

    render() {
        return (
            <div id="project">
                 <h1>About the page</h1>
    <div className="about">
        <div className="about-container">
            <p>In this project, we have created a meeting place where teachers can find a second examiner for their
                course.
                After logging in, teachers have the opportunity to create a profile, then post a job advertisement,
                and see
                other people's job advertisements.
                They are able to register a request for a second examiner with details about the course, the dates,
                the expected workload and see for which own requests other teachers have suggested themselves as
                potential
                second examiners,
                suggest themselves as the second examiner for one or more of the published requests, classify a
                request with
                a tag, accept a suggestion and more.
                The administrators can add, update and delete users. They can also create user accounts for teachers
                and
                modify user accounts for teachers.</p>

            <h2>We have used different tools for developing our website.</h2>
            <div className="tools-list">
                <div className="tools-programming">
                    <h3>Programming languages</h3>
                    <ul className="tool">
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>Node.js</li>
                        <li>MongoDB</li>
                        <li>Express.js</li>
                        <li>React</li>
                    </ul>
                </div>
                <div className="tools-design">
                    <h3>Design tool</h3>
                    <ul className="tools">
                        <li>Figma</li>
                        <li>Adobe InDesign</li>
                        <li>Adobe Illustrator</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="aboutus-container">
            <div className="personalia-container">
                <div className="personalia-img">
                    <img src={Hedda} alt="Picture of Hedda"></img>
                </div>
                <h3>Hedda Olimb</h3>
                <p>My name is Hedda Olimb, I’m 22 years old from Hadeland, and I’m in my second year of Web Development
                    Bachelor (BWU) at NTNU Gjøvik.
                    My hobbies include drawing, flowers, training, series/movies and animals - but most of all dogs.
                    I have experience with HTML, CSS and MySql from high school, but I like the frontend and design part
                    within BWU best.</p>
            </div>
            <div className="personalia-container">
                <div className="personalia-img">
                    <img src={Richard} alt="Picture of Richard"></img>
                </div>
                <h3>Richard Langtinn</h3>
                <p>My name is Richard Langtinn. I'm 26 years old and I'm in my second year as a Web Development student
                    at
                    NTNU Gjøvik.
                    I also have an authorization as a pharmacy technician.
                    I am from Trondheim and my hobbies include video games, cooking, traveling and photography.</p>
            </div>
            <div className="personalia-container">
                <div className="personalia-img">
                    <img src={Ida} alt="Picture of Ida"></img>
                </div>
                <h3>Ida Marie Joakimsen Bakken</h3>
                <p>My name is Ida Marie Joakimsen Bakken. I’m 25 years old and I’m in my second year as a Webdevelopment
                    student at NTNU Gjøvik. I have a bachelor's degree in design from before and think frontend and the
                    user
                    side is most
                    interesting. </p>
            </div>
        </div>
    </div>
</div>
        )
    }
}

export default Projectinfo;