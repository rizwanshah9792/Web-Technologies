import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Smartphone,
  ArrowRight,
  CheckCircle } from
'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }

    if (!agreeToTerms) {
      toast({
        title: "Validation Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Cognitive Guardian. Your journey to digital wellness begins now."
        });
        navigate('/tracker');
      } else {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists.",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-id="pol8ayod2" data-path="src/pages/RegisterPage.tsx">
      <div className="max-w-md w-full space-y-8" data-id="mpudvwbml" data-path="src/pages/RegisterPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="yjefw3vbq" data-path="src/pages/RegisterPage.tsx">

          <Link to="/" className="flex items-center justify-center space-x-2 mb-6" data-id="ucqke07t3" data-path="src/pages/RegisterPage.tsx">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg" data-id="aqlz7eesh" data-path="src/pages/RegisterPage.tsx">

              <Smartphone className="h-8 w-8 text-white" data-id="bh2r5vzym" data-path="src/pages/RegisterPage.tsx" />
            </motion.div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" data-id="z8jw9d6w7" data-path="src/pages/RegisterPage.tsx">
              Cognitive Guardian
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2" data-id="bynuid00c" data-path="src/pages/RegisterPage.tsx">
            Join Our Community
          </h2>
          <p className="text-gray-600" data-id="tbquwvm1e" data-path="src/pages/RegisterPage.tsx">
            Start your journey towards mindful technology use
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} data-id="a02pa861g" data-path="src/pages/RegisterPage.tsx">

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm" data-id="czbc1ohyf" data-path="src/pages/RegisterPage.tsx">
            <CardHeader className="space-y-1 pb-6" data-id="7el4wy896" data-path="src/pages/RegisterPage.tsx">
              <CardTitle className="text-2xl font-bold text-center text-gray-900" data-id="0ktt4okf1" data-path="src/pages/RegisterPage.tsx">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent data-id="0fem5r3fl" data-path="src/pages/RegisterPage.tsx">
              <form onSubmit={handleSubmit} className="space-y-6" data-id="3sqlhw15s" data-path="src/pages/RegisterPage.tsx">
                {/* Name Field */}
                <div className="space-y-2" data-id="rtsl4gzpu" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700" data-id="ek880vnh1" data-path="src/pages/RegisterPage.tsx">
                    Full Name
                  </Label>
                  <div className="relative" data-id="k2jde0skm" data-path="src/pages/RegisterPage.tsx">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="quy2a2ywe" data-path="src/pages/RegisterPage.tsx" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required data-id="ofmviddfj" data-path="src/pages/RegisterPage.tsx" />

                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2" data-id="i5n6rkb4v" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700" data-id="u5rp3g27x" data-path="src/pages/RegisterPage.tsx">
                    Email Address
                  </Label>
                  <div className="relative" data-id="9m1uujloc" data-path="src/pages/RegisterPage.tsx">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="bk8zsleke" data-path="src/pages/RegisterPage.tsx" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required data-id="7x0x9kzid" data-path="src/pages/RegisterPage.tsx" />

                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2" data-id="oect2nmf3" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700" data-id="qeehnzz6l" data-path="src/pages/RegisterPage.tsx">
                    Password
                  </Label>
                  <div className="relative" data-id="pzfcoc8ob" data-path="src/pages/RegisterPage.tsx">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="t9hhh3rfn" data-path="src/pages/RegisterPage.tsx" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required data-id="icgdl7f9g" data-path="src/pages/RegisterPage.tsx" />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" data-id="f53bme4r8" data-path="src/pages/RegisterPage.tsx">

                      {showPassword ? <EyeOff className="h-5 w-5" data-id="noj90x6nj" data-path="src/pages/RegisterPage.tsx" /> : <Eye className="h-5 w-5" data-id="i45w4zme4" data-path="src/pages/RegisterPage.tsx" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500" data-id="0ezyyh9ge" data-path="src/pages/RegisterPage.tsx">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2" data-id="0kxi3l3bh" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700" data-id="ocblvnz7p" data-path="src/pages/RegisterPage.tsx">
                    Confirm Password
                  </Label>
                  <div className="relative" data-id="8djrhwinm" data-path="src/pages/RegisterPage.tsx">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" data-id="gy2pclpuj" data-path="src/pages/RegisterPage.tsx" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required data-id="unb9v5aam" data-path="src/pages/RegisterPage.tsx" />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" data-id="olg0w4myu" data-path="src/pages/RegisterPage.tsx">

                      {showConfirmPassword ? <EyeOff className="h-5 w-5" data-id="umd4hshgg" data-path="src/pages/RegisterPage.tsx" /> : <Eye className="h-5 w-5" data-id="21y8laknj" data-path="src/pages/RegisterPage.tsx" />}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3" data-id="xgf1kso8v" data-path="src/pages/RegisterPage.tsx">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="mt-1" data-id="x6gslbkec" data-path="src/pages/RegisterPage.tsx" />

                  <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed" data-id="z1xz7vd7p" data-path="src/pages/RegisterPage.tsx">
                    I agree to the{' '}
                    <Link to="/terms" className="text-green-600 hover:text-green-500 underline" data-id="fh5hawagj" data-path="src/pages/RegisterPage.tsx">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-green-600 hover:text-green-500 underline" data-id="uw3yv2osr" data-path="src/pages/RegisterPage.tsx">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" data-id="eo1i0yvnq" data-path="src/pages/RegisterPage.tsx">

                  {isLoading ?
                  <div className="flex items-center" data-id="9uj51cky2" data-path="src/pages/RegisterPage.tsx">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" data-id="y0nmjd9x3" data-path="src/pages/RegisterPage.tsx"></div>
                      Creating Account...
                    </div> :

                  <div className="flex items-center" data-id="ne4ts9k9x" data-path="src/pages/RegisterPage.tsx">
                      <CheckCircle className="h-5 w-5 mr-2" data-id="cv2jhrh9v" data-path="src/pages/RegisterPage.tsx" />
                      Create Account
                      <ArrowRight className="h-5 w-5 ml-2" data-id="43cl5rtxa" data-path="src/pages/RegisterPage.tsx" />
                    </div>
                  }
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center" data-id="112rnav5d" data-path="src/pages/RegisterPage.tsx">
                <p className="text-sm text-gray-600" data-id="6e6iwlp8m" data-path="src/pages/RegisterPage.tsx">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300" data-id="vh7ln08zj" data-path="src/pages/RegisterPage.tsx">

                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }} data-id="i9dselpox" data-path="src/pages/RegisterPage.tsx">

          <p className="text-sm text-gray-600 font-medium" data-id="dmuej3nnp" data-path="src/pages/RegisterPage.tsx">
            What you'll get with your free account:
          </p>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600" data-id="xg8eh01cg" data-path="src/pages/RegisterPage.tsx">
            <div className="flex items-center justify-center space-x-2" data-id="hf5mq3t0r" data-path="src/pages/RegisterPage.tsx">
              <CheckCircle className="h-4 w-4 text-green-500" data-id="ghr2ojttg" data-path="src/pages/RegisterPage.tsx" />
              <span data-id="dg72fd65a" data-path="src/pages/RegisterPage.tsx">Daily smartphone usage tracking</span>
            </div>
            <div className="flex items-center justify-center space-x-2" data-id="ciqhqs99c" data-path="src/pages/RegisterPage.tsx">
              <CheckCircle className="h-4 w-4 text-green-500" data-id="wwkvpyq0x" data-path="src/pages/RegisterPage.tsx" />
              <span data-id="qou238qaz" data-path="src/pages/RegisterPage.tsx">Personalized wellness insights</span>
            </div>
            <div className="flex items-center justify-center space-x-2" data-id="x4aydhrgt" data-path="src/pages/RegisterPage.tsx">
              <CheckCircle className="h-4 w-4 text-green-500" data-id="nazxs0k6j" data-path="src/pages/RegisterPage.tsx" />
              <span data-id="tkyttcoha" data-path="src/pages/RegisterPage.tsx">Progress visualization charts</span>
            </div>
            <div className="flex items-center justify-center space-x-2" data-id="st2ggi2xq" data-path="src/pages/RegisterPage.tsx">
              <CheckCircle className="h-4 w-4 text-green-500" data-id="x75ddfgsq" data-path="src/pages/RegisterPage.tsx" />
              <span data-id="21pse0os6" data-path="src/pages/RegisterPage.tsx">Lifestyle tracking tools</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

};

export default RegisterPage;