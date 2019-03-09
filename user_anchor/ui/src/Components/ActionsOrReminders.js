import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ActionsOrReminders = (props) => {
  const data = props.data.filter(prop => prop.type === 'action');

  return (
    <div>
      <h4>Actions</h4>
      <ListGroup variant='flush'>
        {data.map((prop, index) => {
          return (<ListGroup.Item variant="primary" key={`${index}`}>
            {prop.message}
          </ListGroup.Item>);
        })}
      </ListGroup>
    </div>
  );
}

export default ActionsOrReminders;
