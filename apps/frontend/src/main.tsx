import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './app/app';
import './assets/styles/style.css';
import { ScrollTop } from './app/components/scroll-top';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
