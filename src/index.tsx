import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import { Provider } from 'react-redux';
import store from 'store/store';
import { GlobalStyle } from 'assets/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Dark from 'assets/themes/Dark';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={Dark}>
      <GlobalStyle />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
