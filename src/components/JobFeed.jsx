import React, { Component } from 'react';

class JobFeed extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="jobFeed">
                <JobFeedElem />
			</div>
		);
	}
}

class JobFeedElem extends Component {
	constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    }
  };

  componentWillMount() {
   fetch("http://localhost:8080/api/feed")
        .then((res) => {
          console.log("MainPage.jsx fetch /feed raw res: ", res);
          return res.json();
        })
        .then((feed) => {
          console.log("MainPage.jsx fetch /feed: ", feed);
          this.setState({
            jobs: feed,
          });
        })
        .catch((err) => console.log(`error when fetching feed data: ${err}`));
  };

	render() {
    const jobs = [];
    const jobList = this.state.jobs;
    jobList.forEach((job, i) => {
    jobs.push(
      <div className="jobContainer">
        <button key={`job-${i}`} id={`job-${i}`}>
          {job.title.replace(/\<.*?>/mig, '').replace(/developer.*$/mig, 'Developer').replace(/engineer.*$/mig, 'Engineer')}
        </button>
        <br />
      </div>
    );
    })
		return (
			<div className="jobFeedElem">
                {/* <img alt="coming soon" />
                <div className="jobElemTitle">                
                    <h1>Job Title</h1>
                    <h2>Company</h2>
                    <h3>Location</h3>
                </div> */}
                <p>Your Job Feed</p>
                <div className="jobLIst">
                  {jobs}
                </div>
			</div>
		);
	}
}

export default JobFeed;
