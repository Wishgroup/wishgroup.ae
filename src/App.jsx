import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Home2 from './pages/Home2'
import Portfolio1 from './pages/Portfolio1'
import Portfolio2 from './pages/Portfolio2'
import Portfolio3 from './pages/Portfolio3'
import Services from './pages/Services'
import Service from './pages/Service'
import Blog from './pages/Blog'
import Publication from './pages/Publication'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Project1 from './pages/Project1'
import Project2 from './pages/Project2'
import Project3 from './pages/Project3'
import Project4 from './pages/Project4'
import Project5 from './pages/Project5'
import Project6 from './pages/Project6'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Layout>
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
          <Route path="/project-1" element={<Project1 />} />
          <Route path="/project-2" element={<Project2 />} />
          <Route path="/project-3" element={<Project3 />} />
          <Route path="/project-4" element={<Project4 />} />
          <Route path="/project-5" element={<Project5 />} />
          <Route path="/project-6" element={<Project6 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

