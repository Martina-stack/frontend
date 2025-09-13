import { useState, useEffect } from 'react';
import './App.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from './api.js';

import GramSabhaDashboard from './GramSabhaDashboard';
import CommunityDashboard from './CommunityDashboard';
import SDLCDashboard from './SDLCDashboard';
import DLCDashboard from './DLCDashboard';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // ---------------------- existing state ----------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // ---------------------- NEW state for switching screens ----------------------
  const [view, setView] = useState("login"); // "login" | "signup" | "forgot"

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

  const onSubmit = async () => {
    try {
      let res = await login({ email, password, role });
      localStorage.setItem("jwt_token", res.data.token);
      console.log(localStorage.getItem("jwt_token"));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------------- Form submission ----------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && email && password && role) {
      setLoggedIn(true);
    }
  }

  // ---------------------- Logout ----------------------
  function handleLogout() {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    setRole('');
    setView("login");
  }

  // ---------------------- Dashboards ----------------------
  function renderDashboard() {
    switch (role) {
      case "gram-sabha":
        return <GramSabhaDashboard onLogout={handleLogout} />;
      case "community":
        return <CommunityDashboard onLogout={handleLogout} />;
      case "sdlc":
        return <SDLCDashboard onLogout={handleLogout} />;
      case "dlc":
        return <DLCDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  }

  // ---------------------- Reusable input fields ----------------------
  const EmailInput = (
    <>
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
    </>
  );

  const PasswordInput = (
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
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
      {errors.password && <div className="login-error">{errors.password}</div>}
    </div>
  );

  // ---------------------- Screen layouts ----------------------
  function renderAuthForms() {
    return (
      <div className="login-container">
        <div className="login-card">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src="/logo.jpg" alt="Logo"
              style={{ width: 85, height: 85, display: 'block', margin: '0 auto 12px auto', objectFit: 'contain' }} />
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#222' }}>FRA Digitizer</h1>
            <h1 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#222' }}>Sign in to your account to continue</h1>
          </div>
          {loginError && <div className="login-error" style={{ marginBottom: 16 }}>{loginError}</div>}

          {view === "login" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {EmailInput}
              {PasswordInput}
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
              <button
                type="submit"
                disabled={Object.keys(errors).length > 0 || !email || !password || !role}
                className="login-button"
              >
                Login
              </button>

              {/* ---- Links to other views ---- */}
              <p className="text-center text-gray-500 mt-4">
                <button
                  type="button"
                  className="login-link"
                  style={{ color: "Green", textDecoration: "underline" }}
                  onClick={() => setView("forgot")}
                >
                  Forgot password?
                </button>
              </p>
              <p className="text-center text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="login-link"
                  style={{ color: 'Green', textDecoration: "underline" }}
                  onClick={() => setView("signup")}
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {view === "signup" && (
            <form
              onSubmit={e => { e.preventDefault(); alert("Sign-up logic here"); setView("login"); }}
              className="space-y-4"
            >
              {EmailInput}
              {PasswordInput}
              <div>
                <label className="block text-gray-700 font-medium">Confirm Password</label>
                <input type={showPassword ? 'text' : 'password'} className="login-input" required />
              </div>
              <button type="submit" className="login-button">Create Account</button>
              <p className="text-center text-gray-500 mt-4">
                Already have an account?{' '}
                <button type="button" className="login-link" onClick={() => setView("login")}>Back to Login</button>
              </p>
            </form>
          )}

          {view === "forgot" && (
            <form
              onSubmit={e => { e.preventDefault(); alert("Password reset link sent"); setView("login"); }}
              className="space-y-4"
            >
              {EmailInput}
              <button type="submit" className="login-button">Send Reset Link</button>
              <p className="text-center text-gray-500 mt-4">
                Remembered your password?{' '}
                <button type="button" className="login-link" onClick={() => setView("login")}>Back to Login</button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ---------------------- Main render ----------------------
  return (
    <div>
      {!loggedIn ? renderAuthForms() : renderDashboard()}
    </div>
  );
}

export default LoginPage;