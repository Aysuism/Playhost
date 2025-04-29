import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthTest = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Clear everything first
    localStorage.clear();
    
    // Set perfect admin credentials
    localStorage.setItem('loggedInUser', JSON.stringify({
      username: 'Admin',
      email: 'admin@blabla.com',
      role: 'admin' // This is crucial
    }));
    
    localStorage.setItem('adminAccess', 'true');
    
    // Force redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Debugger</h1>
      <div style={{ margin: '20px 0', padding: '10px', background: '#eee' }}>
        <h3>Current Auth State:</h3>
        <pre>
          {JSON.stringify(JSON.parse(localStorage.getItem('loggedInUser') || '{}'), null, 2)}
        </pre>
      </div>
      
      <button 
        onClick={handleAdminLogin}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        SIMULATE ADMIN LOGIN
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ padding: '10px 20px', background: '#4CAF50', color: 'white' }}
        >
          TEST DASHBOARD ACCESS
        </button>
      </div>
    </div>
  );
};

export default AuthTest;