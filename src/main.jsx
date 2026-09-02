import { StrictMode, useState, useEffect } from 'react';
import './assets/sass/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/aos/dist/aos.css';

import { createRoot } from 'react-dom/client';
import Router from './router/Router.jsx';

import LangProvider from './context/LangContext.jsx';
import ThemeProvider from './context/ThemeContext.jsx';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './dashboard/tools/store/store.js';

import { CartProvider } from 'react-use-cart';
import { WishlistProvider } from 'react-use-wishlist';
import Loader from './preloader/Loader.jsx';


const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Router />
      </div>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <CartProvider>
          <WishlistProvider>
            <ThemeProvider>
              <LangProvider>
                <AppWrapper />
              </LangProvider>
            </ThemeProvider>
          </WishlistProvider>
        </CartProvider>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);