const data = [
  {
    message: {
      'help': 'po',
      po: 'asd'
    },
    type: 'action'
  },{
    message: 'hello 2',
    type: 'error',
    source: 'nlp'
  },{
    message: 'hello 3 this contains url https://facebook.com',
    type: 'action'
  },{
    message: 'hello 4',
    type: 'log',
    source: 'action_handler'
  },{
    message: 'hello 5',
    type: 'action',
    action: 'url',
    url: 'https://facebook.com'
  },{
    message: 'hello 6',
    type: 'log',
    source: 'nlp'
  },{
    message: 'hello 7',
    type: 'action'
  },{
    message: 'hello 6 eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    type: 'log'
  },{
    message: 'hello 8',
    type: 'action'
  },{
    message: 'hello 9',
    type: 'log'
  },{
    message: 'hello 10',
    type: 'action'
  },{
    message: 'hello 11',
    type: 'log'
  },{
    message: 'hello 12',
    type: 'log'
  },{
    message: 'hello 13',
    type: 'log'
  },{
    message: 'hello 14',
    type: 'log'
  }
];

export default data;