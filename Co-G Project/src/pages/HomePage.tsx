import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Smartphone,
  Brain,
  Users,
  TrendingUp,
  Shield,
  Heart,
  ArrowRight,
  Play,
  BookOpen,
  BarChart3 } from
'lucide-react';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles animation
    const createParticle = () => {
      if (!heroRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';

      heroRef.current.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 4000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  const features = [
  {
    icon: Smartphone,
    title: 'Smart Usage Tracking',
    description: 'Monitor your daily smartphone usage with detailed insights and patterns.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Brain,
    title: 'Cognitive Wellness',
    description: 'Improve focus and mental clarity through mindful technology usage.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with like-minded individuals on the journey to digital wellness.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Visualize your improvement with comprehensive charts and reports.',
    color: 'from-orange-500 to-red-500'
  }];


  const stats = [
  { value: '1000+', label: 'Active Users', icon: Users },
  { value: '50%', label: 'Usage Reduction', icon: TrendingUp },
  { value: '24/7', label: 'Support', icon: Shield },
  { value: '95%', label: 'Success Rate', icon: Heart }];


  return (
    <div className="min-h-screen" data-id="ogsf05kuj" data-path="src/pages/HomePage.tsx">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-green-900" data-id="6mrfjkj8v" data-path="src/pages/HomePage.tsx">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20" data-id="fnzfdkxmm" data-path="src/pages/HomePage.tsx">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" data-id="q16tiei6i" data-path="src/pages/HomePage.tsx"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" data-id="zjfc7g2d8" data-path="src/pages/HomePage.tsx"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" data-id="t5nitehqy" data-path="src/pages/HomePage.tsx"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-id="8o1lqh9qf" data-path="src/pages/HomePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }} data-id="6tysvzehc" data-path="src/pages/HomePage.tsx">

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }} data-id="q6r7snxju" data-path="src/pages/HomePage.tsx">

              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" data-id="w79t0zqch" data-path="src/pages/HomePage.tsx">
                Cognitive
              </span>
              <br data-id="1z5ra2dyd" data-path="src/pages/HomePage.tsx" />
              <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent" data-id="j9i2dyrwf" data-path="src/pages/HomePage.tsx">
                Guardian
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }} data-id="wzh8uu2ad" data-path="src/pages/HomePage.tsx">

              Rebalance Your Digital Life. Empowering rural Indian youth to build 
              a healthier relationship with technology through mindful usage tracking 
              and wellness monitoring.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }} data-id="tlbfjiz09" data-path="src/pages/HomePage.tsx">

              <Link to="/register" data-id="m8zorfmup" data-path="src/pages/HomePage.tsx">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 hover:border-white/40 btn-glow btn-pulse" data-id="5igrdx4jl" data-path="src/pages/HomePage.tsx">

                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" data-id="7qvkyc7lm" data-path="src/pages/HomePage.tsx" />
                </Button>
              </Link>
              
              <Link to="/videos" data-id="xo2wxkntq" data-path="src/pages/HomePage.tsx">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm shadow-xl btn-outline-enhanced" data-id="19e13z3dd" data-path="src/pages/HomePage.tsx">

                  <Play className="mr-2 h-5 w-5" data-id="mnux0owxz" data-path="src/pages/HomePage.tsx" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }} data-id="akg030orz" data-path="src/pages/HomePage.tsx">

          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center" data-id="jxkt6o37u" data-path="src/pages/HomePage.tsx">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" data-id="qpa0mgyb8" data-path="src/pages/HomePage.tsx"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" data-id="53zcjp78b" data-path="src/pages/HomePage.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="0b9nzqz75" data-path="src/pages/HomePage.tsx">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} data-id="fxijqc1yx" data-path="src/pages/HomePage.tsx">

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-id="5ifwh2t4f" data-path="src/pages/HomePage.tsx">
              Why Choose 
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" data-id="ro80bkdr9" data-path="src/pages/HomePage.tsx"> Cognitive Guardian</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="4pbngghua" data-path="src/pages/HomePage.tsx">
              Our comprehensive platform combines cutting-edge technology with proven wellness strategies 
              to help you develop a healthier relationship with your smartphone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-id="q8bm0mm67" data-path="src/pages/HomePage.tsx">
            {features.map((feature, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group" data-id="mtf24vpgr" data-path="src/pages/HomePage.tsx">

                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300" data-id="7sih2kdql" data-path="src/pages/HomePage.tsx">
                  <CardContent className="p-6 text-center" data-id="5r0p5k560" data-path="src/pages/HomePage.tsx">
                    <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} data-id="fn0d20f5k" data-path="src/pages/HomePage.tsx">

                      <feature.icon className="h-8 w-8 text-white" data-id="bqmjs4bp3" data-path="src/pages/HomePage.tsx" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3" data-id="fqgd9nnmr" data-path="src/pages/HomePage.tsx">{feature.title}</h3>
                    <p className="text-gray-600" data-id="uh19qup6n" data-path="src/pages/HomePage.tsx">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50" data-id="huiec17lu" data-path="src/pages/HomePage.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="sz5c2wt1q" data-path="src/pages/HomePage.tsx">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} data-id="577mkgwqw" data-path="src/pages/HomePage.tsx">

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-id="pj3or3ipn" data-path="src/pages/HomePage.tsx">
              Making a Real Impact
            </h2>
            <p className="text-xl text-gray-600" data-id="cxoiggl6j" data-path="src/pages/HomePage.tsx">
              Join thousands of users who have transformed their digital habits
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-id="3g673k5tr" data-path="src/pages/HomePage.tsx">
            {stats.map((stat, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center" data-id="ias3ibx7m" data-path="src/pages/HomePage.tsx">

                <div className="bg-white rounded-lg p-6 shadow-lg" data-id="0qluf088t" data-path="src/pages/HomePage.tsx">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" data-id="j4du14lgx" data-path="src/pages/HomePage.tsx" />
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-id="0q97vv78z" data-path="src/pages/HomePage.tsx">{stat.value}</div>
                  <div className="text-gray-600 font-medium" data-id="cay48i35e" data-path="src/pages/HomePage.tsx">{stat.label}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600" data-id="0yap76ayq" data-path="src/pages/HomePage.tsx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-id="cw3vlv2nf" data-path="src/pages/HomePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} data-id="qekvvbslu" data-path="src/pages/HomePage.tsx">

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" data-id="0oe619x21" data-path="src/pages/HomePage.tsx">
              Ready to Transform Your Digital Life?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto" data-id="3u980rqdb" data-path="src/pages/HomePage.tsx">
              Start your journey towards mindful technology usage today. Track your progress, 
              build healthier habits, and join a community committed to digital wellness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-id="whesyfj4s" data-path="src/pages/HomePage.tsx">
              <Link to="/register" data-id="6v0gfc272" data-path="src/pages/HomePage.tsx">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-white/20 btn-glow" data-id="k51l34rug" data-path="src/pages/HomePage.tsx">

                  <BarChart3 className="mr-2 h-5 w-5" data-id="8chuqw88r" data-path="src/pages/HomePage.tsx" />
                  Start Tracking Now
                </Button>
              </Link>
              
              <Link to="/tips" data-id="4xpm316yp" data-path="src/pages/HomePage.tsx">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm shadow-xl btn-outline-enhanced" data-id="q22mc05l8" data-path="src/pages/HomePage.tsx">

                  <BookOpen className="mr-2 h-5 w-5" data-id="3g3z48uuf" data-path="src/pages/HomePage.tsx" />
                  Explore Tips
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

};

export default HomePage;