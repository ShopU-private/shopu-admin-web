import React, { useState } from 'react';
import UsersList from './UsersList';
import CreateUser from './CreateUser';

const Users: React.FC = () => {
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleCreateUser = () => {
    setView('create');
  };

  const handleBack = () => {
    setView('list');
  };

  return (
    <>
      {view === 'list' && <UsersList onCreateUser={handleCreateUser} />}
      {view === 'create' && <CreateUser onBack={handleBack} />}
    </>
  );
};

export default Users;