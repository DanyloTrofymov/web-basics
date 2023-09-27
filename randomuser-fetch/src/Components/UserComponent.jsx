// src/RandomUserComponent.tsx
import React from 'react';
import './UserComponent.css';

const UserComponent = ({ userData }) => {
  return (

    <div className="UserCard">
      <img src={userData.picture.large} alt="User" />
      <h2>Random User Data:</h2>
      <p>Cell: {userData.cell}</p>
      <p>City: {userData.location.city}</p>
      <p>Country: {userData.location.country}</p>
      <p>Postcode: {userData.location.postcode}</p>
    </div>

  );
};

export default UserComponent;
