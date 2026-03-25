
import './App.css'
import NavBar from './componants/NavBar/NavBar'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './componants/Layout/Layout'
import Home from './componants/Home/Home'
import Contact from './componants/Contact/Contact'
import NotFound from './componants/Not found/NotFound'
import MovieDetails from './componants/Home/MovieDetails/MovieDetails'
import People from './componants/People/People'
import ActorDetails from './componants/People/ActorDetails'

const allRoutes = createBrowserRouter([


  {
    path: '/', element: <Layout />, children: [
      {
        index: true, element: <Home />
      },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'people', element: <People /> },
      { path: 'actor/:id', element: <ActorDetails /> },  

      { path: 'Contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ]

  },



])

function App() {


  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  )
}

export default App
