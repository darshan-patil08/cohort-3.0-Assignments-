import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Fake network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="auth-card">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded bg-indigo-accent flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4">
            S
          </div>
          <h1 className="font-display font-bold text-3xl mb-2">Welcome Back</h1>
          <p className="text-text-light-muted dark:text-text-muted text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Email</label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold">Password</label>
              <a href="#" className="text-xs font-semibold text-indigo-accent hover:underline">Forgot password?</a>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 mt-2 shadow-accent-glow" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-text-light-muted dark:text-text-muted mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
