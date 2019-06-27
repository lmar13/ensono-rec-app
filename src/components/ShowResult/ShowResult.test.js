import React from 'react';
import ReactDOM from 'react-dom';
import ShowResult from './ShowResult';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShowResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});
