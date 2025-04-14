// src/components/ProfileDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../Sanityclient/client';

function ProfileDetail() {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "groupMember" && _id == $id][0]{
          _id,
          name,
          email,
          bio,
          interests,
          "imageUrl": image.asset->url,
          logEntries
        }`,
        { id }
      )
      .then((data) => setMember(data))
      .catch(console.error);
  }, [id]);

  if (!member) {
    return <main style={{ padding: '20px' }}>Laster...</main>;
  }

  return (
    <>
      {/* Inline media query styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .profile-layout {
              flex-direction: column;
            }
            .profile-left, .profile-right {
              max-width: 100% !important;
              width: 100%;
            }
          }
        `}
      </style>

      <main style={{ padding: '20px', backgroundColor: '#1B263B', color: '#fff', minHeight: '100vh' }}>
        <section className="profile-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <aside className="profile-left" style={{ flex: '1', maxWidth: '300px', backgroundColor: '#0D1B2A', padding: '20px', borderRadius: '8px' }}>
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt={member.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
              />
            )}
            <h2 style={{ marginBottom: '10px' }}>{member.name}</h2>
            <p><strong>E-post:</strong> {member.email}</p>
            <p><strong>Bio:</strong> {member.bio}</p>
          </aside>
          <section className="profile-right" style={{ flex: '2', minWidth: '300px', backgroundColor: '#0D1B2A', padding: '20px', borderRadius: '8px'  }}>
            <article style={{ marginBottom: '30px' }}>
              <h3>Interesser</h3>
              <ul>
                {member.interests?.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </article>

            <article>
              <h3>Loggoverføringer</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {member.logEntries?.map((entry, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.entry}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}

export default ProfileDetail;

