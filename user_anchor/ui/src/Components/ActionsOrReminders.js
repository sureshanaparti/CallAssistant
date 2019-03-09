import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ActionModal from './ActionModal';
import Linkify from 'react-linkify'

class ActionsOrReminders extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };

    this.data = props.data;
  }

  handleClose() {
    console.log("in close");
    this.setState({ show: false });
  }

  handleShow(prop) {
    console.log("in show");
    this.setState({ show: true });
    this.modalData = prop;
  }

  render() {
    const data = this.props.data.filter(data => data.type === 'action');
    return (
      <div>
        <h4>Actions</h4>
        <ListGroup variant='flush'>
          {data.map((prop, index) => {
            console.log('action', prop);
            return (<ListGroup.Item variant="primary" key={`${index}`}>
              <Linkify>{typeof prop.message === 'object' ? JSON.stringify(prop.message) : prop.message}</Linkify>
              {(prop.action === 'url' || prop.action === 'meeting') && <Button variant="primary" size = "sm"  className = "float-right" onClick={this.handleShow.bind(this, prop)}>
                view
              </Button> }
              {this.state.show && <ActionModal modalData={this.modalData} handleClose={this.handleClose}/>}
            </ListGroup.Item>);
          })}
        </ListGroup>
      </div>
    );
  }
}

//const ActionsOrReminders = (props) => {
  //const data = props.data.filter(prop => prop.type === 'action'); 
//}

export default ActionsOrReminders;
