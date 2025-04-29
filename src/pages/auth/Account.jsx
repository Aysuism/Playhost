import { useSelector } from 'react-redux';

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Account Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default AccountPage;