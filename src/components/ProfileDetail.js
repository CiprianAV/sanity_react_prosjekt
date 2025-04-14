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
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{member.name}</h1>
      <p>Email: {member.email}</p>
      {member.imageUrl && (
        <img src={member.imageUrl} alt={member.name} style={{ width: '200px', borderRadius: '8px' }} />
      )}
      <p>Bio: {member.bio}</p>
      <h3>Interests</h3>
      <ul>
        {member.interests?.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
      <h3>Log Entries</h3>
      <ul>
        {member.logEntries?.map((entry, index) => (
          <li key={index}>
            <strong>{new Date(entry.date).toLocaleDateString()}:</strong> {entry.entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileDetail;
