import React from 'react';

function ProfileCard({ member }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '200px',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    }}
    // hover effect
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {member.imageUrl && (
        <img
          src={member.imageUrl}
          alt={member.name}
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
        />
      )}
      <h3 style={{ margin: '10px 0' }}>{member.name}</h3>
      <p style={{ color: '#777', fontSize: '0.9rem' }}>{member.email}</p>
    </div>
  );
}

export default ProfileCard;
