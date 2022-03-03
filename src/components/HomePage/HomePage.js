import React from 'react';
import TopNavBar from './TopNavBar';
import './HomePage.css';
import MainTime from './MainTime';
import AddTask from './AddTask';
import UserMenu from './UserMenu';
const HomePage = () => {
    return (
        <div>
            <TopNavBar></TopNavBar>
            <MainTime></MainTime>
            <AddTask></AddTask>
            {/* <UserMenu></UserMenu> */}
        </div>
    );
};

export default HomePage;