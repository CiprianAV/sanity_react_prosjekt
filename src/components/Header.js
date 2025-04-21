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
    <header style={{
      backgroundColor: '#0D1B2A',
      padding: '20px',
      color: '#fff',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <h1 style={{ margin: 0, fontSize: '1.8rem' }}>UIN25_Gruppe39</h1>
      </Link>
      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '15px',
          margin: 0,
          padding: 0
        }}>
          <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Hjem</Link></li>
          {members.map((member) => (
            <li key={member._id}>
              <Link to={`/profile/${member._id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                {member.name.split(" ")[0]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
