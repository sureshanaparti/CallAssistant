import React, { Fragment } from "react";
import Notification from './Components/Notification';
import ActionsOrReminders from './Components/ActionsOrReminders';
import data from './Data';
import Websocket from 'react-websocket';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotificationPane: true,
      data: []
    }

    // Creating ref
    this.sideBar = React.createRef();
    this.main = React.createRef();

    // Method Bindings
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

  handleSocketData(data) {
    let result = JSON.parse(data);
    if (!result.connection) {

      let datain = this.state.data;

      datain.unshift({
        message: result.message,
        type: result.type,
        source: result.source
      });

      this.setState({
          data: datain
      });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <header>
          <strong>Bittu</strong>
          <button type="button" className='openbtn' onClick={this.showNotificationPane}>&#9776;</button>
        </header>
        <section id='section'>
          <div className='sidebar'  ref={this.sideBar} style={{width: '30%'}}>
            <Notification data={ data }/>
          </div>
          <div id='main' ref={this.main} style={{marginRight: '30%'}}>
            <ActionsOrReminders data={ data }/>
          </div>
        </section>
        <Websocket url='ws://localhost:3000'
            onMessage={this.handleSocketData.bind(this)}
            />
      </Fragment>
    );
  }
}

export default App;
