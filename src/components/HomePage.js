import React, { useState, useEffect } from 'react';
import client from '../Sanityclient/client';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';

function HomePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "groupMember"]{
        _id,
        name,
        email,
        "imageUrl": image.asset->url,
        logEntries
      }`)
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

      {}
      <section style={{ marginTop: '60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Arbeidslogg</h2>
        <ul style={{ maxWidth: '800px', margin: '0 auto', listStyle: 'none', padding: '0' }}>
          {
            members
              .flatMap(member =>
                (member.logEntries || []).map(entry => ({
                  ...entry,
                  memberName: member.name,
                }))
              )
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((entry, index) => (
                <li key={index} style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#415A77', borderRadius: '8px' }}>
                  <p style={{ margin: 0 }}>
                    <strong>{new Date(entry.date).toLocaleDateString('nb-NO')}</strong> - {entry.memberName}
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>{entry.entry}</p>
                </li>
              ))
          }
        </ul>
      </section>
    </main>
  );
}

export default HomePage;
