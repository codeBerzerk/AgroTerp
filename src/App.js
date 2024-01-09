import React, {useEffect} from 'react';
import ThemeSwitcher from "./components/ThemeSwitcher";
import Navbar from './components/Navbar';
import './App.scss';
import {useSelector} from "react-redux";
import CabinetManager from "./components/CabinetManager";

function App() {
    const theme = useSelector((state) => state.theme.value);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
            <div className="App">
                <ThemeSwitcher />
                <Navbar />
                <CabinetManager />
            </div>
    );
}

export default App;
