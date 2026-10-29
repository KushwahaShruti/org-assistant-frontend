import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserRound } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { User } from '../../types/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (role: User['role']) => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      await login(email, password, undefined, role);
      navigate('/');
    } catch {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="text-center mb-6">
        {/* <div className="flex justify-center items-center w-12 h-12 bg-primary text-white rounded-md mx-auto mb-4">
          <Building2 size={24} />
        </div> */}
        <h1 className="text-2xl font-bold text-text-main mb-1">Welcome Back</h1>
        <p className="text-text-muted text-sm">Sign in to your organization knowledge base</p>
      </div>

      <div className="bg-cards rounded-lg shadow-md border border-border p-8">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-main">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-border rounded-md font-inherit text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-main">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-border rounded-md font-inherit text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && <span className="text-error text-xs">{error}</span>}

          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
          </div>

          <div className="mt-2">
            <p className="text-sm font-medium text-text-main mb-2">Sign in as</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLogin('user')}
                className="flex items-center justify-center gap-2 p-3 bg-primary text-white border-none rounded-md font-semibold text-sm cursor-pointer transition-colors hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <UserRound size={17} />
                {isLoading ? 'Signing In...' : 'User Sign In'}
              </button>
              <button
                type="button"
                onClick={() => handleLogin('superadmin')}
                className="flex items-center justify-center gap-2 p-3 bg-slate-800 text-white border-none rounded-md font-semibold text-sm cursor-pointer transition-colors hover:bg-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <ShieldCheck size={17} />
                {isLoading ? 'Signing In...' : 'Admin Sign In'}
              </button>
            </div>
          </div>

          <div className="text-center mt-4 text-sm text-text-muted">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
