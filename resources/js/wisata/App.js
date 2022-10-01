import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Index from './frontend';
import Add from './frontend/add';
import Detail from './frontend/detail';
import Edit from './frontend/edit';

function App() {
    return (
        <Router className="App__container">
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/add" element={<Add />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/detail/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default App;

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}
