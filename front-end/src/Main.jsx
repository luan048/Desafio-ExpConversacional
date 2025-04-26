import React from "react";
import { StrictMode } from "react";
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import MainPage from "../MainPage/MainPage";

createRoot(document.getElementById('root')).render(
    <MainPage/>
)