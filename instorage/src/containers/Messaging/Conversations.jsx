import React from 'react';
import ConversationItem from './ConversationItem';
import { withAuthorization } from '../../Session';
import FirebaseManager from '../../api/routes/firebaseManager.js'
import { withRouter } from "react-router-dom";
const firebase = require("firebase");
require("firebase/firestore");


class Conversations extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      conversations: []
    }
  }

  componentDidMount(){
    const _this = this;
    const { auth } = this.props.firebase;
    var uid = auth.currentUser.uid;
    console.log('user uid ' + uid);
    
    firebase.firestore()
      .collection('chatRooms')
      .where('participants', 'array-contains', uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const userB = (uid == data.participants[0]) ? data.participants[1] : data.participants[0];
          console.log('userB ' + userB);
          FirebaseManager.getUserProfile(userB)
          .then(res => {
            console.log(res);
            console.log('members ' + data.members);
            // console.log('roomName ' + data.roomName);
            const prevState = _this.state;
            if(typeof res._profilePicURL === 'undefined') {
              console.log('undefined pp');
              prevState.conversations.push({id: doc.id, label: res._name, userB: userB, profile: 'https://cutecatsinhats-x7v0etsjgzjvirs3.netdna-ssl.com/wp-content/uploads/2016/01/Nala-the-cat-shark-hat.jpg'});
            }else{
              prevState.conversations.push({id: doc.id, label: res._name, userB: userB, profile: res._profilePicURL});
            }
            _this.setState(prevState);
          })
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    console.log('render!');
    console.log(this.state.conversations);
    return(
      <div className="my20">
        {this.state.conversations.map((item, idx) => {
            console.log(item);
            console.log("item!");
            firebase.firestore()
              .collection('charRoom')
              .doc(item.id)
              .collection('messages')
            return(
              <div 
              key={idx}
              // onClick={(e) => {
              //   e.stopPropagation();
              //   console.log('chat!')
              //   this.props.history.push('/chat/' + item.userB)
              // }}
              > 
                <ConversationItem
                  userB={item.userB}
                  profile={item.profile}
                  label={item.label}
                  body={item.body}
                  timestamp={item.timestamp}
                />
              </div>
            );
        })}
        {/* firebase SDK */}
        <script src="/__/firebase/6.4.0/firebase-app.js"></script>
        <script src="/__/firebase/6.4.0/firebase-auth.js"></script>
        <script src="/__/firebase/6.4.0/firebase-storage.js"></script>
        <script src="/__/firebase/6.4.0/firebase-messaging.js"></script>
        <script src="/__/firebase/6.4.0/firebase-firestore.js"></script>
        <script src="/__/firebase/6.4.0/firebase-performance.js"></script> 
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withRouter(withAuthorization(condition)(Conversations));
