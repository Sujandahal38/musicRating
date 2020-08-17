import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme/theme';
import { Provider } from 'react-redux'
import store  from './store/store'

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);
