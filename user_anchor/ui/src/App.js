import React, { Fragment } from "react";
import Notification from './Components/Notification';
import ActionsOrReminders from './Components/ActionsOrReminders';
import data from './Data';
import ChatBot from './Components/ChatBot';
import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotificationPane: false,
      showChatBot: false
    }

    this.data = data;

    // Creating ref
    this.sideBar = React.createRef();
    this.main = React.createRef();
    this.chatbot = React.createRef();
    this.chatBotContainer = React.createRef();

    // Binding methods
    this.showNotificationPane = this.showNotificationPane.bind(this);
    this.openChatBot = this.openChatBot.bind(this);
    this.closeChatBot = this.closeChatBot.bind(this);
  }

  showNotificationPane() {
    const { showNotificationPane } = this.state;
    if (showNotificationPane) {
      this.sideBar.current.style.width = "0";
      this.main.current.style.marginRight = "0";
      this.chatbot.current.style.margin = "10px";
    } else {
      this.sideBar.current.style.width = "30%";
      this.main.current.style.marginRight = "30%";
      this.chatbot.current.style.marginRight = "32%";
    }
    this.setState({
      showNotificationPane: !showNotificationPane
    })
  }

  openChatBot() {
    this.chatbot.current.style.display = 'none';
    this.chatBotContainer.current.style.display = 'block';
    this.setState({
      showChatBot: true
    });
  }

  closeChatBot() {
    this.chatBotContainer.current.style.display = 'none';
    this.chatbot.current.style.display = 'block';
    this.setState({
      showChatBot: false
    })
  }

  render() {
    console.log('chatBot', ChatBot);
    return (
      <Fragment>
        <header>
          <strong>Bittu</strong>
          <button type="button" className='openbtn' onClick={this.showNotificationPane}>&#9776;</button>
        </header>
        <section id='section'>
          <div className='sidebar'  ref={this.sideBar}>
            <Notification data={ this.data }/>
          </div>
          <div id='main' ref={this.main}>
            <ActionsOrReminders data={ this.data }/>
          </div>
        </section>
        <button
          className='btn btn-info'
          id='chatbot'
          ref={this.chatbot}
          onClick={this.openChatBot}
        >
          ChatBot
        </button>
        <div id='chatBotContainer' ref={this.chatBotContainer}>
          {this.state.showChatBot &&
            <ChatBot 
              closeChatBot={this.closeChatBot.bind(this)}
          />}
        </div>
      </Fragment>
    );
  }
}

export default App;
