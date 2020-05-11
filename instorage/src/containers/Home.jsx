import React from 'react';
import {HostHome, ClientHome, MoverHome} from './';
import { withAuthorization } from '../Session';

// import ClientHome from './containers/ClientHome';
// import MoverHome from './containers/MoverHome';
import FirebaseManager from "../api/routes/firebaseManager";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			userId: "",
			userType: "",
		});
	}

	componentDidMount() {
		const { auth } = this.props.firebase;
		console.log(auth.currentUser.uid);
		this.setState({ userId : auth.currentUser.uid })
		this.getUser(auth.currentUser.uid );
	}

	getUser = userId => {
    FirebaseManager.getUserProfile(userId)
      .then(user =>
        {
          console.log(user)
          this.setState({
            userType : user._userType
        	})
      	}
      );
  }


  render() {
		return(
			<div>
				{
					(this.state.userType === 'client') && <ClientHome/>
				} {
					(this.state.userType === 'host') && <HostHome/>
				} {
					(this.state.userType === 'mover') && <MoverHome/>
				}
			</div>
		)
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
