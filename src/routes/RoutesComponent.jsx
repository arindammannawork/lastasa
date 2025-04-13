import React from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from '../pages/LandingPage'
import AboutPage from '../pages/About'

function RoutesComponent() {
    return (
        <>

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </>
    )
}

export default RoutesComponent