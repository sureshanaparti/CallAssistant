import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ActionModal from './ActionModal';

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

  componentWillReceiveProps() {

  }

  render() {
    const data = this.props.data.filter(data => data.type === 'action');
    return (
      <div>
        <h4>Actions</h4>
        <ListGroup variant='flush'>
          {data.map((prop, index) => {
            return (<ListGroup.Item variant="primary" key={`${index}`}>
              {prop.message}
              <Button variant="primary" size = "sm"  className = "float-right" onClick={this.handleShow.bind(this, prop)}>
              view
              </Button>
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
