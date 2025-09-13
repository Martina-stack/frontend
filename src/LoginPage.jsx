import { useState, useEffect } from 'react';
import './App.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from './api.js';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const emailRef = document.querySelector('#email');
    if (emailRef) emailRef.focus();
  }, []);

  function validateField(field, value) {
    const newErrors = { ...errors };
    if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) newErrors.email = 'Please enter a valid email.';
    else delete newErrors.email;
    if (field === 'password' && value.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    else delete newErrors.password;
    if (field === 'role' && !value) newErrors.role = 'Please select a role.';
    else delete newErrors.role;
    setErrors(newErrors);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password || !role || Object.keys(errors).length > 0) return;

    try {
      const res = await api.login({ email, password, role });
      localStorage.setItem('jwt_token', res.data.token);

      switch(role) {
        case 'gram-sabha': navigate('/dashboard/gram-sabha'); break;
        case 'community': navigate('/dashboard/community'); break;
        case 'sdlc': navigate('/dashboard/sdlc'); break;
        case 'dlc': navigate('/dashboard/dlc'); break;
        default: navigate('/');
      }
    } catch (err) {
      setLoginError('Invalid credentials or server error.');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo.jpg" alt="Logo"
            style={{ width: 85, height: 85, display: 'block', margin: '0 auto 12px auto', objectFit: 'contain' }} />
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#222' }}>FRA Digitizer</h1>
          <h1 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#222' }}>Sign in to your account</h1>
        </div>

        {loginError && <div className="login-error" style={{ marginBottom: 16 }}>{loginError}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); validateField('email', e.target.value); }}
              className={'login-input' + (errors.email ? ' error' : '')}
              required
            />
            {errors.email && <div className="login-error">{errors.email}</div>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); validateField('password', e.target.value); }}
              className={'login-input' + (errors.password ? ' error' : '')}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
            {errors.password && <div className="login-error">{errors.password}</div>}
          </div>

          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium">Role</label>
            <select
              id="role"
              value={role}
              onChange={e => { setRole(e.target.value); validateField('role', e.target.value); }}
              className={'login-input custom-select-arrow' + (errors.role ? ' error' : '')}
              required
            >
              <option value="">Select your role</option>
              <option value="gram-sabha">Gram Sabha Member</option>
              <option value="community">Community User</option>
              <option value="sdlc">SDLC Official</option>
              <option value="dlc">DLC Official</option>
            </select>
            {errors.role && <div className="login-error">{errors.role}</div>}
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          <Link to="/signup" style={{ color: 'green', textDecoration: 'underline' }}>Don't have an account? Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
