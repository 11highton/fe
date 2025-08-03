import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Home from './ui/pages/Home'
import NotFound from './ui/pages/NotFound'
import Chat from './ui/pages/Chat'
import Post from './ui/pages/Post'
import Login from './ui/pages/Login'
import Signup from './ui/pages/Signup'
import Splash from './ui/pages/Splash'
import Search from './ui/pages/Search'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/splash' element={<Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/search' element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
