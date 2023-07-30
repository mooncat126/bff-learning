import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface UsersProps {
  users: User[];
}

const Users: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const deleteUser = async (id: number) => {
    alert(id);
    await axios.delete(`http://localhost:3001/users/${id}`);
    const updatedUsers = await axios.get<User[]>('http://localhost:3001/users');
    setUsers(updatedUsers.data);
  };

  const resetUsers = async () => {
    await axios.post('http://localhost:3001/users/reset');
    const updatedUsers = await axios.get<User[]>('http://localhost:3001/users');
    setUsers(updatedUsers.data);
  };
  
  return (
    <div>
      <h1>Users:</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
      <button onClick={resetUsers}>Reset</button>
    </div>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps<UsersProps> = async () => {
  const res = await axios.get<User[]>('http://localhost:3001/users');
  return { props: { users: res.data } };
};
