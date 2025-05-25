import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Smartphone,
  Menu,
  X,
  Home,
  Lightbulb,
  Video,
  BookOpen,
  Quote,
  BarChart3,
  Heart,
  Phone,
  LogOut,
  User } from
'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/tips', label: 'Tips', icon: Lightbulb },
  { path: '/videos', label: 'Videos', icon: Video },
  { path: '/articles', label: 'Articles', icon: BookOpen },
  { path: '/quotes', label: 'Quotes', icon: Quote },
  { path: '/tracker', label: 'Tracker', icon: BarChart3, protected: true },
  { path: '/lifestyle', label: 'Lifestyle', icon: Heart, protected: true },
  { path: '/contact', label: 'Contact', icon: Phone }];


  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50" data-id="17kmu3t3e" data-path="src/components/Layout.tsx">
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50" data-id="1uwojbt0q" data-path="src/components/Layout.tsx">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="c56dhzoiy" data-path="src/components/Layout.tsx">
          <div className="flex justify-between items-center h-16" data-id="njlp5tsts" data-path="src/components/Layout.tsx">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" data-id="ii1a1w758" data-path="src/components/Layout.tsx">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg" data-id="zveonqme4" data-path="src/components/Layout.tsx">

                <Smartphone className="h-6 w-6 text-white" data-id="cpbjwqgas" data-path="src/components/Layout.tsx" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" data-id="c0zt3wwr4" data-path="src/components/Layout.tsx">
                CO-G
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" data-id="tihefoib9" data-path="src/components/Layout.tsx">
              {navItems.map(({ path, label, icon: Icon, protected: isProtected }) => {
                if (isProtected && !isAuthenticated) return null;

                return (
                  <Link key={path} to={path} data-id="ejylv743t" data-path="src/components/Layout.tsx">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActivePath(path) ?
                      'bg-gradient-to-r from-green-500 to-blue-500 text-white' :
                      'text-gray-700 hover:bg-gray-100'}`
                      } data-id="ke7082fi8" data-path="src/components/Layout.tsx">

                      <Icon className="h-4 w-4" data-id="3j2pjbcat" data-path="src/components/Layout.tsx" />
                      <span className="text-sm font-medium" data-id="j9ydz3g2i" data-path="src/components/Layout.tsx">{label}</span>
                    </motion.div>
                  </Link>);

              })}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2" data-id="p81ujvg9b" data-path="src/components/Layout.tsx">
              {isAuthenticated ?
              <div className="flex items-center space-x-3" data-id="d7zxghu0y" data-path="src/components/Layout.tsx">
                  <div className="flex items-center space-x-2 text-gray-700" data-id="thanrvio7" data-path="src/components/Layout.tsx">
                    <User className="h-4 w-4" data-id="gxa777uhe" data-path="src/components/Layout.tsx" />
                    <span className="text-sm font-medium" data-id="6327ide5h" data-path="src/components/Layout.tsx">{user?.name}</span>
                  </div>
                  <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50" data-id="xdn00ns0y" data-path="src/components/Layout.tsx">

                    <LogOut className="h-4 w-4 mr-2" data-id="5fvbhfjq6" data-path="src/components/Layout.tsx" />
                    Logout
                  </Button>
                </div> :

              <div className="flex items-center space-x-2" data-id="vfyku1x53" data-path="src/components/Layout.tsx">
                  <Link to="/login" data-id="0wldfxnhe" data-path="src/components/Layout.tsx">
                    <Button variant="outline" size="sm" data-id="s6v2gucak" data-path="src/components/Layout.tsx">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" data-id="04bb9n5wo" data-path="src/components/Layout.tsx">
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500" data-id="lgzlynsp4" data-path="src/components/Layout.tsx">
                      Register
                    </Button>
                  </Link>
                </div>
              }
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100" data-id="supikrgcj" data-path="src/components/Layout.tsx">

              {isMobileMenuOpen ? <X className="h-6 w-6" data-id="jykpxj306" data-path="src/components/Layout.tsx" /> : <Menu className="h-6 w-6" data-id="t0pbdta83" data-path="src/components/Layout.tsx" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence data-id="bhajqi5pv" data-path="src/components/Layout.tsx">
          {isMobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-lg" data-id="zw5ugs0hs" data-path="src/components/Layout.tsx">

              <div className="px-4 py-2 space-y-1" data-id="g4x44a8gs" data-path="src/components/Layout.tsx">
                {navItems.map(({ path, label, icon: Icon, protected: isProtected }) => {
                if (isProtected && !isAuthenticated) return null;

                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActivePath(path) ?
                    'bg-gradient-to-r from-green-500 to-blue-500 text-white' :
                    'text-gray-700 hover:bg-gray-100'}`
                    } data-id="kom994l87" data-path="src/components/Layout.tsx">

                      <Icon className="h-5 w-5" data-id="knl7ey8ri" data-path="src/components/Layout.tsx" />
                      <span className="font-medium" data-id="fqmgc3ftx" data-path="src/components/Layout.tsx">{label}</span>
                    </Link>);

              })}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-2 border-t" data-id="htgzcz0es" data-path="src/components/Layout.tsx">
                  {isAuthenticated ?
                <div className="space-y-2" data-id="0rhal1phn" data-path="src/components/Layout.tsx">
                      <div className="flex items-center space-x-2 px-3 py-2 text-gray-700" data-id="5k2hioddq" data-path="src/components/Layout.tsx">
                        <User className="h-5 w-5" data-id="t34b6t8ms" data-path="src/components/Layout.tsx" />
                        <span className="font-medium" data-id="8gf154psz" data-path="src/components/Layout.tsx">{user?.name}</span>
                      </div>
                      <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50" data-id="loudgog4w" data-path="src/components/Layout.tsx">

                        <LogOut className="h-5 w-5" data-id="8pjvnedxh" data-path="src/components/Layout.tsx" />
                        <span className="font-medium" data-id="5v11dm3tz" data-path="src/components/Layout.tsx">Logout</span>
                      </button>
                    </div> :

                <div className="space-y-2" data-id="lkc0arkee" data-path="src/components/Layout.tsx">
                      <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" data-id="30tizteta" data-path="src/components/Layout.tsx">

                        Login
                      </Link>
                      <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-center bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg" data-id="mom4pcy0w" data-path="src/components/Layout.tsx">

                        Register
                      </Link>
                    </div>
                }
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1" data-id="hb243rd7a" data-path="src/components/Layout.tsx">
        <Outlet data-id="6q11klym4" data-path="src/components/Layout.tsx" />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 text-white py-12" data-id="r3dlniuyo" data-path="src/components/Layout.tsx">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="l8g7b8xz7" data-path="src/components/Layout.tsx">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-id="6txa5lhre" data-path="src/components/Layout.tsx">
            <div className="col-span-1 md:col-span-2" data-id="qz2x9xnc5" data-path="src/components/Layout.tsx">
              <div className="flex items-center space-x-2 mb-4" data-id="ykhhy4bj8" data-path="src/components/Layout.tsx">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg" data-id="outygobje" data-path="src/components/Layout.tsx">
                  <Smartphone className="h-6 w-6 text-white" data-id="zoz6fju9t" data-path="src/components/Layout.tsx" />
                </div>
                <span className="text-xl font-bold" data-id="g12zsb8xl" data-path="src/components/Layout.tsx">Cognitive Guardian</span>
              </div>
              <p className="text-gray-300 mb-4" data-id="bwbto3863" data-path="src/components/Layout.tsx">
                Empowering rural Indian youth to develop a healthy relationship with technology 
                through mindful smartphone usage tracking and wellness monitoring.
              </p>
              <p className="text-gray-400 text-sm" data-id="7lnm84ulj" data-path="src/components/Layout.tsx">
                © 2024 Cognitive Guardian. All rights reserved.
              </p>
            </div>

            <div data-id="j644jkfi4" data-path="src/components/Layout.tsx">
              <h3 className="text-lg font-semibold mb-4" data-id="fopim4tdn" data-path="src/components/Layout.tsx">Quick Links</h3>
              <ul className="space-y-2" data-id="c62tw233e" data-path="src/components/Layout.tsx">
                <li data-id="ejttkgxl0" data-path="src/components/Layout.tsx"><Link to="/" className="text-gray-300 hover:text-white transition-colors" data-id="7hc8pem6o" data-path="src/components/Layout.tsx">Home</Link></li>
                <li data-id="nm1epuufv" data-path="src/components/Layout.tsx"><Link to="/tips" className="text-gray-300 hover:text-white transition-colors" data-id="nr91zo7ff" data-path="src/components/Layout.tsx">Tips</Link></li>
                <li data-id="1q5vguxa7" data-path="src/components/Layout.tsx"><Link to="/videos" className="text-gray-300 hover:text-white transition-colors" data-id="xihwfh0hq" data-path="src/components/Layout.tsx">Videos</Link></li>
                <li data-id="poiq2a3d2" data-path="src/components/Layout.tsx"><Link to="/articles" className="text-gray-300 hover:text-white transition-colors" data-id="xhc1m4kbd" data-path="src/components/Layout.tsx">Articles</Link></li>
              </ul>
            </div>

            <div data-id="8rjuj3sqp" data-path="src/components/Layout.tsx">
              <h3 className="text-lg font-semibold mb-4" data-id="nlpmqp3mu" data-path="src/components/Layout.tsx">Support</h3>
              <ul className="space-y-2" data-id="8zgk52a65" data-path="src/components/Layout.tsx">
                <li data-id="f6g65fe2m" data-path="src/components/Layout.tsx"><Link to="/contact" className="text-gray-300 hover:text-white transition-colors" data-id="1z14p5w6h" data-path="src/components/Layout.tsx">Contact Us</Link></li>
                <li data-id="dlcywz54t" data-path="src/components/Layout.tsx"><Link to="/quotes" className="text-gray-300 hover:text-white transition-colors" data-id="pekr8dst6" data-path="src/components/Layout.tsx">Daily Quotes</Link></li>
                {isAuthenticated &&
                <>
                    <li data-id="zjw2vv1ye" data-path="src/components/Layout.tsx"><Link to="/tracker" className="text-gray-300 hover:text-white transition-colors" data-id="825vmmbim" data-path="src/components/Layout.tsx">Usage Tracker</Link></li>
                    <li data-id="439qmzu2c" data-path="src/components/Layout.tsx"><Link to="/lifestyle" className="text-gray-300 hover:text-white transition-colors" data-id="lu0dvswge" data-path="src/components/Layout.tsx">Lifestyle Monitor</Link></li>
                  </>
                }
              </ul>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>);

};

export default Layout;