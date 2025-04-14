// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../Sanityclient/client';

function Header() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "groupMember"]{ _id, name }`)
      .then((data) => setMembers(data))
      .catch(console.error);
  }, []);

  return (
    <header style={{ backgroundColor: '#333', padding: '10px 20px', color: '#fff', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ margin: 0 }}>Group 7</h1>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Hjem</Link>
        {members.map((member) => (
          <Link key={member._id} to={`/profile/${member._id}`} style={{ color: '#fff', textDecoration: 'none' }}>
            {member.name.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
