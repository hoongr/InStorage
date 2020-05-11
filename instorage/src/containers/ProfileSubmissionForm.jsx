import React from 'react';
import './SubmissionForm.css';
import { withAuthorization } from '../Session';
import FirebaseManager from "../api/routes/firebaseManager";

class ProfileSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      	// userId: "",
      	// email: "",
    	// fullName: "",
    	// venmo: "",
    	// phoneNum: "",
    	// college: "",
		// bio: "",
		user: {
			userId: "",
			email: "",
			fullName: "",
			venmo: "",
			phoneNum: "",
			college: "",
			bio: "",
		}
    })
  }

  componentDidMount() {
    const { auth } = this.props.firebase;

    this.setState({
    //   userId: auth.currentUser.uid,
	//   email: auth.currentUser.email
	  user: {
		  ...this.state.user,
		  userId: auth.currentUser.uid,
		  email: auth.currentUser.email
	  }
    });
  }

  change = (e) => {
  	this.setState({
  		[e.target.name]: e.target.value
  	});
  };

  onSubmit = (e) => {
  	e.preventDefault();
  	console.log(this.state);
    this.addUser();
  	this.setState({
		user: {
			fullName: '',
			venmo: '',
			phoneNum: '',
			college: '',
			bio: ''
		}
  	});
  };

  addUser = () => {
    FirebaseManager.addUserProfile(this.state.user);
  }

  render() {
    return(
    	<div className="primary">
    		<h1>Profile Submission</h1>
	      	<div className="fields">
	      		<label>Full Name</label>
	      		<br/>
		      	<input
		      		name="fullName"
		      		value={this.state.user.fullName}
		      		onChange={e => this.change(e)}
		      	/>
		      	<br/>
		      	<label>Venmo</label>
		      	<br/>
		      	<input
		      		name="venmo"
		      		value={this.state.user.venmo}
		      		onChange={e => this.change(e)}
		      	/>
		      	<br/>
		      	<label>Phone Number</label>
		      	<br/>
		      	<input
		      		name="phoneNum"
		      		value={this.state.user.phoneNum}
		      		onChange={e => this.change(e)}
		      	/>
		      	<br/>
		      	<label>College</label>
		      	<br/>
		      	<input
		      		name="college"
		      		value={this.state.user.college}
		      		onChange={e => this.change(e)}
		      	/>
		      	<br/>
		      	<label>About</label>
		      	<br/>
		      	<textarea
		      		name="bio"
		      		value={this.state.user.bio}
		      		onChange={e => this.change(e)}
		      	/>
		      	<br/>
		      	<button className="btn-submit" onClick={e => this.onSubmit(e)}>Save</button>
	      	</div>
    	</div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfileSubmissionForm);
