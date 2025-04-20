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
      <style>
        {`
          @media (max-width: 768px) {
            .profile-wrapper {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .profile-image {
              margin-bottom: 20px;
              margin-left: 6%;
            }
            .info-section {
              align-items: center;
            }
          }
        `}
      </style>

      <main style={{ padding: '30px', backgroundColor: '#1B263B', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <section className="profile-wrapper" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div className="profile-image" style={{ flexShrink: 0 }}>
              {member.imageUrl && (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  style={{ width: '400px', borderRadius: '26px' }}
                />
              )}
            </div>

            <div className="info-section" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h2>{member.name}</h2>
              <p><strong>E-post:</strong> {member.email}</p>
              <p><strong>Bio:</strong> {member.bio}</p>
              <div>
                <h3>Interesser</h3>
                <ul>
                  {member.interests?.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section style={{ backgroundColor: '#0D1B2A', padding: '20px', borderRadius: '8px' }}>
            <h3>Loggoverføringer</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {member.logEntries?.map((entry, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.entry}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default ProfileDetail;
