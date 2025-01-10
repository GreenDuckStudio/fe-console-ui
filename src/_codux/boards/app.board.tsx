import React from 'react';
import App from '@/App';
import { createBoard } from '@wixc3/react-board';
import '../../App.scss';
import '../../index.scss';

export default createBoard({
  name: 'App',
  Board: () => (
    <div id="root">
      <App />
    </div>
  ),
  environmentProps: {
    windowHeight: 307,
    windowWidth: 602
  }
});
