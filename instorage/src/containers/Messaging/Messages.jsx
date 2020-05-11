import React from 'react';
import { ChatFeed, ChatBubble, BubbleGroup, Message } from 'react-chat-ui';
import { withAuthorization } from '../../Session';
import FirebaseManager from '../../api/routes/firebaseManager.js'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const users = {
  0: 'You',
  1: 'Evan',
};

const customBubble = props => (
  <div>
    <p>{`${props.message.senderName} ${props.message.id ? 'says' : 'said'}: ${
      props.message.message
    }`}</p>
  </div>
);

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        // new Message({
        //   id: 1,
        //   message: 'Hey! Evan here.',
        //   // senderName: 'Evan',
        // }),
      ],
      useCustomBubble: false,
      curr_user: 0,
    };
    this.loadMessages();
  }

  onPress(user) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = '';
    return true;
  }

  isThisMe(uid) {
    console.log("uid " + uid);
    console.log("curr id " + firebase.auth().currentUser.uid);
    if(uid == firebase.auth().currentUser.uid) {
      console.log("this message is from me");
      return 0;
    } else {
      console.log("this message is not from me");
      return 1;
    }
  }

  loadMessages() {
    console.log('loading');
    // Create the query to load the messages and listen for new ones.
    // const queryDocumentSnapshot = null;
    console.log([firebase.auth().currentUser.uid, this.props.match.params.userB]);
    console.log([firebase.auth().currentUser.uid + '_' + this.props.match.params.userB, this.props.match.params.userB + '_' + firebase.auth().currentUser.uid]);
    firebase.firestore()
                    .collection('chatRooms')
                    .where('members', 'array-contains-any', [firebase.auth().currentUser.uid + '_' + this.props.match.params.userB, this.props.match.params.userB + '_' + firebase.auth().currentUser.uid])
                    .orderBy("timestamp", "desc")
                    .limit(1)
                    .get()
                    .then(querySnapshot => {
                      if (!querySnapshot.empty) {
                          //We know there is one doc in the querySnapshot
                          console.log('chatRoom found!');
                          const queryDocumentSnapshot = querySnapshot.docs[0];
                          const chatRoomId = queryDocumentSnapshot.id;
                          this.setState({chatRoomId: chatRoomId});
                          const _this = this;
                          firebase.firestore()
                            .collection('chatRooms')
                            .doc(chatRoomId)
                            .collection('messages')
                            .orderBy('timestamp', 'asc')
                            .onSnapshot(function(snapshot) {
                            snapshot.docChanges().forEach(function(change) {
                              console.log('snapshot!')
                              if (change.type === 'removed') {
                                console.log('trying to delete message!')
                                // deleteMessage(change.doc.id);
                              } else if(change.type === 'added') {
                                var message = change.doc.data();
                                console.log(change.type);
                                console.log(message);
                                _this.displayMessage(_this.isThisMe(message.uid), message.message);
                              }
                            });
                          });
                      } else {
                          console.log("No chatRoom found, creating new chatRoom...");
                          FirebaseManager.getUserProfile(this.props.match.params.userB)
                          .then(res => {
                            if(res == null){
                              console.log('cant find user');
                              return;
                            }else{
                              firebase.firestore().collection('chatRooms').add({
                                roomName: res._name,
                                members: [firebase.auth().currentUser.uid + '_' + this.props.match.params.userB, this.props.match.params.userB + '_' + firebase.auth().currentUser.uid],
                                participants: [firebase.auth().currentUser.uid, this.props.match.params.userB],
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                              }).catch(function(error) {
                                console.error('Error writing new message to database', error);
                              });
                              this.loadMessages();
                            };
                          });
                      }
                    });
    
  }

  displayMessage(recipient, message){
    console.log("displayMessage(): " + recipient + " " + message);
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      // senderName: users[recipient],
    });
    prevState.messages.push(newMessage);
    this.setState(prevState);
  }

  pushMessage(recipient, message) {
    // Add a new message entry to the database.
    firebase.firestore().collection('chatRooms').doc(this.state.chatRoomId).collection('messages').add({ 
      uid: firebase.auth().currentUser.uid,
      // senderName: users[recipient],
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
    console.log("pushMessage(): " + recipient + " " + message);
  }

  render() {
    // if(firebase.auth().currentUser != null){
    //   console.log("current user uid: " + firebase.auth().currentUser.uid);
    // }
    return (
      <div className="vh90">
        <div className="p20 h100 flex_col justify-between chatfeed-wrapper">
          <ChatFeed
            chatBubble={this.state.useCustomBubble && customBubble}
            messages={this.state.messages} // Boolean: list of message objects
            showSenderName
          />

          <form onSubmit={e => this.onMessageSubmit(e)}>
            <input
              ref={m => {
                this.message = m;
              }}
              placeholder="Type a message, then press Enter..."
              className="message-input w100"
            />
          </form>
        </div>
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
export default withAuthorization(condition)(Messages);
