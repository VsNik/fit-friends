import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';

import { store } from './app/store';
import App from './app/app';
import './assets/styles/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTop } from './app/components/scroll-top';
import { getAccessToken } from './app/services/token';
import { checkAuthAction } from './app/store/auth/async-actions';

if (getAccessToken()) {
  store.dispatch(checkAuthAction());
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
