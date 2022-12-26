import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFound } from './pages/NotFound/NotFound';
import { CartPage } from './pages/CartPage/CartPage';
import { Restaurant } from './components/Restaurant/Restaurant';
import { Menu } from './components/Menu/Menu';
import { Reviews } from './components/Reviews/Reviews';
import { DishesPage } from './pages/DishesPage/DishesPage';
import { DishPage } from './pages/DishPage/DishPage';

export const App: FC = () => (
  <div>
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Layout>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/restaurant' element={<RestaurantPage />}>
                <Route path=':restaurantId' element={<Restaurant />}>
                  <Route index element={<Navigate to='menu' replace />} />
                  <Route path='menu' element={<Menu />} />
                  <Route path='reviews' element={<Reviews />} />
                </Route>
              </Route>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/dishes' element={<DishesPage />} />
              <Route path='/dish/:dishId' element={<DishPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </Provider>
    </BrowserRouter>
  </div>
);
