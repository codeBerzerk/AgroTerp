import React, { useState } from 'react';
import '../styles/Navbar.scss';
import {useSelector} from "react-redux";

function Navbar() {
    const theme = useSelector((state) => state.theme.value);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);

    };

    return (
        <nav className={`navbar ${theme} ${isCollapsed ? 'collapsed' : ''}` }>
            <div className="navbar-container">
                <button onClick={toggleCollapse} className="toggle-btn">
                    {isCollapsed ? '➡️' : '⬅️'}
                </button>
                <div className="menu-items">
                    <div className="menu-item">
                        <span className="icon">🏠</span>
                        {!isCollapsed && <span className="text">Домашня</span>}
                    </div>
                    <div className="menu-item">
                        <span className="icon">⚙️</span>
                        {!isCollapsed && <span className="text">Налаштування</span>}
                    </div>
                    <div className="menu-item">
                        <span className="icon">✅</span>
                        {!isCollapsed && <span className="text">Текст</span>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
