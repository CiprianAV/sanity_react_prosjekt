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
    <main style={{ padding: '20px', backgroundColor: '#1B263B', minHeight: '100vh', color: '#E0E1DD' }}>
      <section>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Gruppemedlemmer</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {members.map(member => (
            <Link key={member._id} to={`/profile/${member._id}`} style={{ textDecoration: 'none' }}>
              <ProfileCard member={member} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
