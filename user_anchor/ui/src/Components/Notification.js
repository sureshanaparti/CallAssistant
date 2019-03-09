import React from 'react';
import { ListGroup, Card} from 'react-bootstrap';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data;
  }

  render() {
    const data = this.props.data.map(prop => {
      if (prop.source === 'nlp') {
        prop.variant = 'dark'
      } else if (prop.source === 'action_handler') {
        prop.variant = 'light';
      } else if (prop.source === 'CallServer') {
        prop.variant = 'warning'
      } else {
        prop.variant = 'primary';
      }

      if (prop.type === 'error') {
        prop.variant = 'danger';
      }
    });
    return (
      <div>
        <h4>Notification</h4>
        <ListGroup>
          {this.props.data.map((prop, index) => {
            console.log('notifictaion', prop);
            return (<ListGroup.Item key={`${index}`} variant={prop.variant}>
              <Card>
                <Card.Header>{prop.source}</Card.Header>
                <Card.Body>
                  {typeof prop.message === 'object' ? JSON.stringify(prop.message) : prop.message}
                </Card.Body>
              </Card>
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
