import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'default-passive-events'
ReactDOM.render(
  <React.Suspense  fallback={<div>loading...</div>}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);
reportWebVitals();
