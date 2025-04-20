import React from 'react';

function ProfileCard({ member }) {
  return (
    <article style={{
      backgroundColor: '#415A77',
      color: '#E0E1DD',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      padding: '16px',
      margin: '16px',
      maxWidth: '220px',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
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
      <p style={{ fontSize: '0.9rem' }}>{member.email}</p>
    </article>
  );
}

export default ProfileCard;
