import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Smartphone,
  ArrowRight,
  User } from
'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in."
        });
        navigate('/tracker');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-id="jaqqurmtu" data-path="src/pages/LoginPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="lg2y0n1h4" data-path="src/pages/LoginPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="cr5gtavd5" data-path="src/pages/LoginPage.tsx">

          <Link to="/" className="flex items-center justify-center space-x-2 mb-6" data-id="rqwkqehhf" data-path="src/pages/LoginPage.tsx">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg" data-id="2kcub7eqo" data-path="src/pages/LoginPage.tsx">

              <Smartphone className="h-8 w-8 text-white" data-id="2quzglvi6" data-path="src/pages/LoginPage.tsx" />
            </motion.div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="1u6s5qio3" data-path="src/pages/LoginPage.tsx">
              Cognitive Guardian
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2" data-id="ub7b76rjx" data-path="src/pages/LoginPage.tsx">
            Welcome Back
          </h2>
          <p className="text-gray-600" data-id="xan0q77pl" data-path="src/pages/LoginPage.tsx">
            Sign in to continue your digital wellness journey
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} data-id="9vky28g5w" data-path="src/pages/LoginPage.tsx">

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm" data-id="d8rs3o62g" data-path="src/pages/LoginPage.tsx">
            <CardHeader className="space-y-1 pb-6" data-id="7ze140dlp" data-path="src/pages/LoginPage.tsx">
              <CardTitle className="text-2xl font-bold text-center text-gray-900" data-id="vdo87xgzs" data-path="src/pages/LoginPage.tsx">
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent data-id="d089kk4hu" data-path="src/pages/LoginPage.tsx">
              <form onSubmit={handleSubmit} className="space-y-6" data-id="jrarc688h" data-path="src/pages/LoginPage.tsx">
                {/* Email Field */}
                <div className="space-y-2" data-id="oxvn4qdce" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700" data-id="2onkbhsp4" data-path="src/pages/LoginPage.tsx">
                    Email Address
                  </Label>
                  <div className="relative" data-id="r7ph5792i" data-path="src/pages/LoginPage.tsx">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="zkf39ervv" data-path="src/pages/LoginPage.tsx" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required data-id="im5oj74fh" data-path="src/pages/LoginPage.tsx" />

                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2" data-id="4b63ame6r" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700" data-id="mdtkao3m7" data-path="src/pages/LoginPage.tsx">
                    Password
                  </Label>
                  <div className="relative" data-id="l7znrje7n" data-path="src/pages/LoginPage.tsx">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="8w8yyk39l" data-path="src/pages/LoginPage.tsx" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required data-id="tw12czld1" data-path="src/pages/LoginPage.tsx" />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" data-id="gmafgko8i" data-path="src/pages/LoginPage.tsx">

                      {showPassword ? <EyeOff className="h-5 w-5" data-id="bb2ptn7t6" data-path="src/pages/LoginPage.tsx" /> : <Eye className="h-5 w-5" data-id="lubz4bzjz" data-path="src/pages/LoginPage.tsx" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" data-id="37ga2vdh3" data-path="src/pages/LoginPage.tsx">

                  {isLoading ?
                  <div className="flex items-center" data-id="y7fn4dqxg" data-path="src/pages/LoginPage.tsx">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" data-id="hqfaxbyvt" data-path="src/pages/LoginPage.tsx"></div>
                      Signing In...
                    </div> :

                  <div className="flex items-center" data-id="ujd6u9l49" data-path="src/pages/LoginPage.tsx">
                      <User className="h-5 w-5 mr-2" data-id="8rotrsz9v" data-path="src/pages/LoginPage.tsx" />
                      Sign In
                      <ArrowRight className="h-5 w-5 ml-2" data-id="6jcu6n5oi" data-path="src/pages/LoginPage.tsx" />
                    </div>
                  }
                </Button>
              </form>

              {/* Demo Account Info */}
              <motion.div
                className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }} data-id="sfe2ou623" data-path="src/pages/LoginPage.tsx">

                <p className="text-sm text-blue-800 font-medium mb-2" data-id="77738rzym" data-path="src/pages/LoginPage.tsx">Demo Account:</p>
                <p className="text-xs text-blue-600" data-id="vdykiw6my" data-path="src/pages/LoginPage.tsx">
                  Email: demo@cognitiveGuardian.com<br data-id="j34ww2uhm" data-path="src/pages/LoginPage.tsx" />
                  Password: demo123
                </p>
              </motion.div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center" data-id="tdsmikiqa" data-path="src/pages/LoginPage.tsx">
                <p className="text-sm text-gray-600" data-id="cmhichqjq" data-path="src/pages/LoginPage.tsx">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300" data-id="f90n3dwf2" data-path="src/pages/LoginPage.tsx">

                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }} data-id="qt377fmk1" data-path="src/pages/LoginPage.tsx">

          <p className="text-sm text-gray-600" data-id="23um1lta0" data-path="src/pages/LoginPage.tsx">
            Join thousands of users improving their digital wellness
          </p>
        </motion.div>
      </div>
    </div>);

};

export default LoginPage;