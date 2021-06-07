import React from 'react';

import onlineIcon from '../images/onlineIcon.png';


const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Chatter<span role="img" aria-label="emoji">💬</span></h1>
      <h2>Welcome to your chatroom</h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People online:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;