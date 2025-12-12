import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Route-level code splitting to keep the initial bundle lean
const Home = lazy(() => import('./pages/Home'))
const Home2 = lazy(() => import('./pages/Home2'))
const Portfolio1 = lazy(() => import('./pages/Portfolio1'))
const Portfolio2 = lazy(() => import('./pages/Portfolio2'))
const Portfolio3 = lazy(() => import('./pages/Portfolio3'))
const Services = lazy(() => import('./pages/Services'))
const Service = lazy(() => import('./pages/Service'))
const Blog = lazy(() => import('./pages/Blog'))
const Publication = lazy(() => import('./pages/Publication'))
const Team = lazy(() => import('./pages/Team'))
const Contact = lazy(() => import('./pages/Contact'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Project1 = lazy(() => import('./pages/Project1'))
const Project2 = lazy(() => import('./pages/Project2'))
const Project3 = lazy(() => import('./pages/Project3'))
const Project4 = lazy(() => import('./pages/Project4'))
const Project5 = lazy(() => import('./pages/Project5'))
const Project6 = lazy(() => import('./pages/Project6'))
const Attendance = lazy(() => import('./pages/Attendance'))
const News = lazy(() => import('./pages/News'))
const Careers = lazy(() => import('./pages/Careers'))
const Country = lazy(() => import('./pages/Country'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#3C4C59'
  }}>
    <div>Loading...</div>
  </div>
)

// AUTH0 DISABLED - Component to handle Auth0 redirect after authentication
// Uncomment below to re-enable
// const AuthRedirectHandler = () => {
//   const { isAuthenticated, isLoading } = useAuth0()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       // Check for stored returnTo path
//       const returnTo = sessionStorage.getItem('auth0_returnTo')
//       if (returnTo) {
//         sessionStorage.removeItem('auth0_returnTo')
//         // Use a small delay to ensure Auth0 state is fully restored
//         setTimeout(() => {
//           navigate(returnTo, { replace: true })
//         }, 100)
//       }
//     }
//   }, [isAuthenticated, isLoading, navigate])

//   return null
// }

function App() {
  return (
    <Router>
      {/* <AuthRedirectHandler /> AUTH0 DISABLED */}
      <Layout>
        <Suspense fallback={<div className="page-loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home-2" element={<Home2 />} />
            <Route path="/portfolio-1" element={<Portfolio1 />} />
            <Route path="/portfolio-2" element={<Portfolio2 />} />
            <Route path="/portfolio-3" element={<Portfolio3 />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/publication" element={<Publication />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/news" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/country/:countryCode" element={<Country />} />
            <Route 
              path="/project-1" 
              element={
                <ProtectedRoute>
                  <Project1 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-2" 
              element={
                <ProtectedRoute>
                  <Project2 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-3" 
              element={
                <ProtectedRoute>
                  <Project3 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-4" 
              element={
                <ProtectedRoute>
                  <Project4 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-5" 
              element={
                <ProtectedRoute>
                  <Project5 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-6" 
              element={
                <ProtectedRoute>
                  <Project6 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance" 
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App

