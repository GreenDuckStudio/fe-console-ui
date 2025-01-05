import React from 'react';
import App from '@/App';
import { createBoard } from '@wixc3/react-board';
import '../../App.scss';

export default createBoard({
  name: 'App',
  Board: () => (
    <div id="root">
      <App />
    </div>
  ),
  environmentProps: {
    windowHeight: 424,
    windowWidth: 602
  }
});
