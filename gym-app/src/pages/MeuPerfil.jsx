import React, { useEffect, useState } from 'react';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError('Erro ao carregar o perfil.');
        }
      } catch {
        setError('Erro de conexão com o servidor.');
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div>
      <h2>Perfil</h2>
      <p><strong>Nome:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Cargo:</strong> {profile.tag}</p>
    </div>
  );
};

export default Profile;
