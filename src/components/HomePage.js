import React, { useState, useEffect } from 'react';
import client from '../Sanityclient/client';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';

function HomePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "groupMember"]{ _id, name, email, "imageUrl": image.asset->url }`)
      .then((data) => setMembers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gruppemedlemmer</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {members.map(member => (
          <Link key={member._id} to={`/profile/${member._id}`} style={{ textDecoration: 'none' }}>
            <ProfileCard member={member} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
