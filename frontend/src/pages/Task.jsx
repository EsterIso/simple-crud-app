import React, { useState, useEffect } from 'react';
import Nav from '../components/layout/Nav/Nav.jsx';
import '../index.css';
import AddTask from '../components/layout/Task/addTask.jsx';


const Task = () => {
    const menuItems = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Tasks', href: '/task' },
      { name: 'Contact', href: '/contact' }
    ];

  return (
    <div className="app">
        <Nav menuItems={menuItems} logo="TaskTrack" />
        <AddTask />
    
    </div>
  );
};

export default Task;