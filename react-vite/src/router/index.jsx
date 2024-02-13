import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Boards from '../pages/Boards/Boards';
import Authors from '../pages/Authors/Authors';
import SpecificBoard from '../pages/SpecificBoard/SpecificBoard';
import Book from '../pages/Book/Book';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginFormPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "boards",
        element: <Boards />,
      },
      {
        path: "authors",
        element: <Authors />
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "boards/:boardId",
        element: <SpecificBoard />,
      },
      {
        path: "books/:bookId",
        element: <Book />
      }
    ],
  },
]);
