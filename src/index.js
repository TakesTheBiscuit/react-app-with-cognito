import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import App from './App';
import MyComponent from './MyComponent';
import MyMap from './MyMap';
import Counter from './features/counter/Counter';

import store from './store'
import { Provider } from 'react-redux'



import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <Counter/>
        <MyComponent />

        <MyMap someProp="SomeValue"/>
        <MyMap someProp="SomeValue2"/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
