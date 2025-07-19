import { Route, Routes } from 'react-router'
import './App.css'
import Home from './dashboard/Home'
import Cards from './dashboard/Cards'
import Login from './component/auth/Login'
import PrivateRoute from './component/auth/PrivateRoute'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
