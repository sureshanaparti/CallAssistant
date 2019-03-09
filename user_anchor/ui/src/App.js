import React, { Fragment } from "react";
import Notification from './Components/Notification';
import ActionsOrReminders from './Components/ActionsOrReminders';
import data from './Data';
import { Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotificationPane: false
    }

    this.data = data;

    // Creating ref
    this.sideBar = React.createRef();
    this.main = React.createRef();

    this.showNotificationPane = this.showNotificationPane.bind(this);
  }

  showNotificationPane() {
    const { showNotificationPane } = this.state;
    if (showNotificationPane) {
      this.sideBar.current.style.width = "0";
      this.main.current.style.marginRight = "0";
    } else {
      this.sideBar.current.style.width = "30%";
      this.main.current.style.marginRight = "30%";
    }
    this.setState({
      showNotificationPane: !showNotificationPane
    })
  }

  render() {
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
        
      </Fragment>
    );
  }
}

export default App;
