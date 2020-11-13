import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <App radius={50} margin={10}/>
   </React.StrictMode>,
   document.getElementById('root')
);

