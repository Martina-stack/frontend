import { useState } from 'react';
import './App.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate, Link } from 'react-router-dom';
import api from './api.js';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email';
    if (password.length < 6) newErrors.password = 'Password too short';
    if (password !== confirmPassword) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.signup({ email, password }); // your signup API
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      alert('Error creating account');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo.jpg" alt="Logo"
            style={{ width: 85, height: 85, display: 'block', margin: '0 auto 12px auto', objectFit: 'contain' }} />
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#222' }}>FRA Digitizer</h1>
          <h1 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#222' }}>Create your account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="login-input" />
            {errors.email && <div className="login-error">{errors.email}</div>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
            {errors.password && <div className="login-error">{errors.password}</div>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="login-input"
            />
            {errors.confirm && <div className="login-error">{errors.confirm}</div>}
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          <Link to="/login" style={{ color: 'green', textDecoration: 'underline' }}>Already have an account? Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
