import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
  }

  componentWillReceiveProps() {

  }

  render() {
    return (
      <div>
        <h4>Notification</h4>
        <ListGroup>
          {this.props.data.map((prop, index) => {
            return (<ListGroup.Item key={`${index}`} variant="primary">
              {prop.message}
            </ListGroup.Item>);
          })}
        </ListGroup>
      </div>
    );
  }
}

// const Notification = (props) => {
//   const data = props.data.filter(prop => prop.type === 'log');

  
// }

export default Notification;
