import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import MainPage from "./MainPage";


const App = () => {

    return (
        <Routes>
            <Route path="*">
                <Route index element={<MainPage />} />

            </Route>
        </Routes>
    )
}

export default () => {
    return (
        <App />
    );
};

