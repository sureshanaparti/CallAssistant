import React from 'React';
import ListGroup from 'react-bootstrap/ListGroup';

class ChatBot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputEn: '',
      messages: []
    };

    // Refs
    this.listGroups = React.createRef();

    // Bindings
    this.changeVal = this.changeVal.bind(this);
    this.handleInputData = this.handleInputData.bind(this);
  }

  changeVal(ev) {
    this.setState({
    [ev.target.name]: ev.target.value
    });
  }
    
  handleInputData(ev) {
    if (ev.keyCode === 13) {
      const messages = [].concat(this.state.messages);
      messages.push(ev.target.value);
      this.setState({
        messages,
        inputEn: ''
      });
      console.log(this.listGroups);
      const shouldScroll = this.listGroups.current.scrollTop + this.listGroups.current.clientHeight === this.listGroups.current.scrollHeight;
      if (shouldScroll) {
        this.listGroups.current.scrollTop = this.listGroups.current.scrollHeight;
      }
    }
  }

  render() {
    return (
      <div className='chat'>

        <button type='button' className='title btn-block' id='closeChatButton' onClick={this.props.closeChatBot}>ChatBot</button>
        <div className='listGroupsContainer'>
          <div className='listGroups' ref={this.listGroups}>
            <ListGroup>
              {this.state.messages.map(message => (
                <ListGroup.Item>{message}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <input type="text" name='inputEn' className='textButton' onKeyUp={this.handleInputData} onChange={this.changeVal.bind(this)} value={this.state.inputEn}/>
      </div>
    );
  }
}

export default ChatBot;