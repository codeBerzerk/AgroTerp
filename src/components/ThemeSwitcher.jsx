import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../features/theme/themeSlice';
import '../styles/ThemeSwitcher.scss';

const ThemeSwitcher = () => {
    const theme = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();

    return (
        <div className="theme-switcher">
            <button onClick={() => dispatch(toggle())}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
