import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Home from './ui/pages/Home'
import NotFound from './ui/pages/NotFound'
import Chat from './ui/pages/Chat'
import Post from './ui/pages/Post'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/post' element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
