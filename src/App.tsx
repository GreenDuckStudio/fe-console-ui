import React from 'react';
import { useState } from 'react';
import './App.scss';
import { Bar } from './components/bar/bar';
import { Effects } from './components/effects/effects';
import { I18nextProvider } from 'react-i18next';

import i18n from './lang/i18n';

function App() {
  const [input, setInput] = useState('');

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App App_div1" id="root">
        <Bar
          onInputChange={(input) => {
            setInput(input);
          }}></Bar>
        <Effects searchInput={input}></Effects>
      </div>
    </I18nextProvider>
  );
}

export default App;
