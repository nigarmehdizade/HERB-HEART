
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
      {darkMode ? <FaSun color="#fff" /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
