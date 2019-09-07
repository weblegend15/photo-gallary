/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { HomePage } from './views/HomePage'

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={HomePage} />
        </BrowserRouter>
    )
}

export default App
