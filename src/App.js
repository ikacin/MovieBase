import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GlobalStyle from './globalStyles';
import HomePage from '../src/pages/HomePage/HomePage'
import {MyContext, MyProvider} from "./store/Store";

const App = () => {
    return (
        <>
            <MyProvider>
                <MyContext.Consumer>
                    {({state}) => (
                        <div className="App">
                            <GlobalStyle/>
                            <Router>
                                <Routes>
                                    {/*<Route exact path="/" element={state.authorization ? <Components /> : <Redirect to="/login" />} />*/}
                                    <Route path="/HomePage" element={<HomePage/>}/>
                                </Routes>
                            </Router>
                        </div>
                    )}
                </MyContext.Consumer>
            </MyProvider>
        </>
    );
}

export default App;
