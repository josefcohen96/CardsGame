import React from 'react';
import './App.css'; // You can customize the styles here
import RoomComponent from './components/roomComponent'; // Import the RoomComponent

function App() {
  return (
    <div className="App">
      <h1>Cards Game</h1>
      <RoomComponent />  {/* Render the RoomComponent */}
    </div>
  );
}

export default App;
