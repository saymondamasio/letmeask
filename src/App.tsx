import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
