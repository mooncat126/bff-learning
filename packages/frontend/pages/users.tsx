import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

interface User {
  id: number;
  name: string;
}

interface UsersProps {
  users: User[];
}

const Users: FC<UsersProps> = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div>
         {user.name}
        </div>
      ))}
    </div>
  );
}

export default Users;

export const getServerSideProps: GetServerSideProps<UsersProps> = async () => {
  const res = await axios.get<User[]>('http://localhost:3001/users');
  return { props: { users: res.data } };
};
