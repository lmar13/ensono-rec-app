import React from 'react';
import ReactDOM from 'react-dom';
import InputData from './InputData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputData />, div);
  ReactDOM.unmountComponentAtNode(div);
});
