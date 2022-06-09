import React, { Component } from 'react';
import DisplayJobs from './DisplayJobs';

class Joboverview extends Component {
    render() {
        return (
            <div id="jobOverview">
                <div className="jobs">
                    <DisplayJobs />
                </div>
            </div>
        )
    }
}

export default Joboverview;