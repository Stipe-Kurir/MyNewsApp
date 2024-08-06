import './App.css';
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import Category from './pages/Category/Category';
import Article from './pages/Article/Article';
import { AppProvider } from './context/AppContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
  {
    path: '/:category',
    element: <Category />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
]);


function App() {
  return (
    <AppProvider>
    <div className="AppContainer">
        <RouterProvider router={router} />
    </div>
    </AppProvider>
  );
}

export default App;
