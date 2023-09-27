import React, { useState } from 'react';
import fetchRandomUser from './Services/FetchUserService';
import './App.css';
import UserComponent from './Components/UserComponent.jsx';

function App() {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchRandomUser();
      setUserData([data, ...userData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="App">
      <div className='UserCardContainer'>
        {userData.map((user, index) => (
          <UserComponent userData={user} key={index} />
        ))}
      </div>
      <button onClick={fetchData} className='LoadMoreButton' > <i className="fa fa-download"></i></button>
    </div>
  );
}

export default App;
