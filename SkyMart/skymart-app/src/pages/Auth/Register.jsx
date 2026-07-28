import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Fake network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to create account');
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
          <h1 className="font-display font-bold text-3xl mb-2">Create Account</h1>
          <p className="text-text-light-muted dark:text-text-muted text-sm">
            Join SkyMart to start shopping
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Full Name</label>
            <Input 
              type="text" 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <label className="block text-sm font-semibold mb-1.5">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full h-12 mt-2 shadow-accent-glow" isLoading={isLoading}>
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-text-light-muted dark:text-text-muted mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
