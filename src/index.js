import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/store.js'; // Import your Redux store
import App from './App';
import Dataprovider from '../src/components/Dataprovider';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap your App with Provider */}
      <Dataprovider>
        <App />
      </Dataprovider>
    </Provider>
  </React.StrictMode>
);


