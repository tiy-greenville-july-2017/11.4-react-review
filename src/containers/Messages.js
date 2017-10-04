import React from 'react';

import BaseLayout from '../layouts/Base';
import Card, {CardBody} from '../components/Card';
import User from '../models/user';
import MessageCollection, {Message} from '../models/message';


class MessageContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      messageCollection: new MessageCollection()
    }
  }

  componentWillMount(){
    let messageCollection = this.state.messageCollection;
    messageCollection.fetch().then(() => {
      this.setState({messageCollection: messageCollection});
    });
  }

  addMessage = (messageData) => {
    let message = new Message(messageData);
    message.setPointer('owner', '_User', User.current().id);

    let acl = {'*': {'read': true, 'write': false}};
    acl[User.current().id] = {
      "read": true,
      "write": true,
    };
    message.set('ACL', acl);

    let messageCollection = this.state.messageCollection;
    messageCollection.create(message);
    this.setState({messageCollection: messageCollection});
  }

  render(){
    return (
      <BaseLayout>
        <Card title="Recent Messages">
          <MessageList messageCollection={this.state.messageCollection} />
          <CardBody className="t-b">
            <MessageForm addMessage={this.addMessage} />
          </CardBody>
        </Card>
      </BaseLayout>
    )
  }
}

function MessageList(props){
  let user = User.current();

  let listItems = props.messageCollection.map((message) => {
    let ownerId = message.get('owner').objectId;
    let messageClass = (ownerId == user.id ? 'my-message' : 'other-message');

    return (
      <li className={messageClass} key={message.cid}>
        <strong>{message.get('owner').username}</strong>:
        {message.get('body')}
      </li>
    );
  });

  // <li>
  //     <div class="chat-img"><img src="../assets/images/users/1.jpg" alt="user"></div>
  //     <div class="chat-content">
  //         <h5>James Anderson</h5>
  //         <div class="box bg-light-info">Lorem Ipsum is simply dummy text of the printing &amp; type setting industry.</div>
  //     </div>
  //     <div class="chat-time">10:56 am</div>
  // </li>

  return (
    <div className="chat-box">
      <ul className="chat-list">
        {listItems}
      </ul>
    </div>
  );
}

class MessageForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      'body': ''
    };
  }

  _onChange = (e) => {
    this.setState({body: e.target.value});
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this.props.addMessage(this.state);
    this.setState({body: ''});
  }

  render(){
    // <div class="card-body b-t">
    //     <div class="row">
    //         <div class="col-8">
    //             <textarea placeholder="Type your message here" class="form-control b-0"></textarea>
    //         </div>
    //         <div class="col-4 text-right">
    //             <button type="button" class="btn btn-info btn-circle btn-lg"><i class="fa fa-paper-plane-o"></i> </button>
    //         </div>
    //     </div>
    // </div>

    return (
      <form onSubmit={this._onSubmit}>
        <input onChange={this._onChange} value={this.state.body} type="text" name="body" />
        <button className="btn btn-primary" type="submit">Say It!</button>
      </form>
    )
  }
}

export default MessageContainer;
