import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'; // ✅ Əlavə et
import store from './redux/reducer/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<GoogleOAuthProvider clientId="1234567890-xxxx.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter> {/* ✅ Router konteksti buradan başlanır */}
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
