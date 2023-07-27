import axios from 'axios';

export default function Users({ users }) {
  return (
    <div>
      <h1>Users:</h1>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3001/users');
  return { props: { users: res.data } };
}
