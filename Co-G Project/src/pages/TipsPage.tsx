import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Smartphone,
  Brain,
  Heart,
  Book,
  Users,
  Clock,
  Shield,
  Zap,
  Filter,
  X } from
'lucide-react';

interface Tip {
  id: number;
  title: string;
  description: string;
  category: 'all' | 'study' | 'health' | 'productivity';
  icon: React.ComponentType<any>;
  color: string;
}

const TipsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'study' | 'health' | 'productivity'>('all');

  const tips: Tip[] = [
  {
    id: 1,
    title: 'Set App Time Limits',
    description: 'Use built-in screen time controls to limit social media and gaming apps to 1-2 hours daily.',
    category: 'productivity',
    icon: Clock,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 2,
    title: 'Create Phone-Free Study Zones',
    description: 'Designate specific areas in your home where phones are not allowed during study time.',
    category: 'study',
    icon: Book,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 3,
    title: 'Practice Digital Mindfulness',
    description: 'Before picking up your phone, pause and ask yourself: "What am I trying to accomplish?"',
    category: 'health',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: 'Use Focus Mode',
    description: 'Enable focus or do-not-disturb mode during important tasks to avoid distractions.',
    category: 'productivity',
    icon: Shield,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Morning Phone-Free Hour',
    description: 'Start your day without immediately checking your phone. Use this time for meditation or planning.',
    category: 'health',
    icon: Heart,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 6,
    title: 'Study Groups Over Solo Scrolling',
    description: 'Replace mindless scrolling with study groups or educational discussions with friends.',
    category: 'study',
    icon: Users,
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 7,
    title: 'Night Mode & Early Sleep',
    description: 'Use night mode and stop screen time 1 hour before bed to improve sleep quality.',
    category: 'health',
    icon: Smartphone,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 8,
    title: 'Productive App Swaps',
    description: 'Replace entertainment apps with educational ones like language learning or skill development.',
    category: 'productivity',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  }];


  const categories = [
  { key: 'all', label: 'All Tips', count: tips.length },
  { key: 'study', label: 'Study', count: tips.filter((tip) => tip.category === 'study').length },
  { key: 'health', label: 'Health', count: tips.filter((tip) => tip.category === 'health').length },
  { key: 'productivity', label: 'Productivity', count: tips.filter((tip) => tip.category === 'productivity').length }];


  const filteredTips = activeFilter === 'all' ?
  tips :
  tips.filter((tip) => tip.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12" data-id="r3qlxwiy4" data-path="src/pages/TipsPage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="4hp13zgqy" data-path="src/pages/TipsPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="d9utsozzy" data-path="src/pages/TipsPage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="qyt1gcw1e" data-path="src/pages/TipsPage.tsx">
            Smart Phone Usage 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" data-id="vq40gg78p" data-path="src/pages/TipsPage.tsx"> Tips</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="2gcflk0w4" data-path="src/pages/TipsPage.tsx">
            Discover practical strategies to develop a healthier relationship with your smartphone 
            and boost your productivity, focus, and overall well-being.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} data-id="emxyrn2b3" data-path="src/pages/TipsPage.tsx">

          {categories.map((category) =>
          <Button
            key={category.key}
            onClick={() => setActiveFilter(category.key as any)}
            variant={activeFilter === category.key ? "default" : "outline"}
            size="lg"
            className={`transition-all duration-300 transform hover:scale-105 ${
            activeFilter === category.key ?
            'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' :
            'hover:bg-gray-100'}`
            } data-id="3r7bb3jw4" data-path="src/pages/TipsPage.tsx">

              <Filter className="mr-2 h-4 w-4" data-id="30x2hmzqi" data-path="src/pages/TipsPage.tsx" />
              {category.label}
              <span className="ml-2 px-2 py-1 text-xs bg-white bg-opacity-20 rounded-full" data-id="hgliq8zz3" data-path="src/pages/TipsPage.tsx">
                {category.count}
              </span>
            </Button>
          )}
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-id="0pd8rkj5o" data-path="src/pages/TipsPage.tsx">
          <AnimatePresence mode="wait" data-id="0fnpl133t" data-path="src/pages/TipsPage.tsx">
            {filteredTips.map((tip, index) =>
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              className="group" data-id="e72iq0qz1" data-path="src/pages/TipsPage.tsx">

                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm" data-id="srhs57oxx" data-path="src/pages/TipsPage.tsx">
                  <CardHeader className="pb-4" data-id="bdpww5qhp" data-path="src/pages/TipsPage.tsx">
                    <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }} data-id="5n1mc5mmw" data-path="src/pages/TipsPage.tsx">

                      <tip.icon className="h-8 w-8 text-white" data-id="2shxl1s8q" data-path="src/pages/TipsPage.tsx" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-300" data-id="8ivokx2ks" data-path="src/pages/TipsPage.tsx">
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0" data-id="mty4z43ld" data-path="src/pages/TipsPage.tsx">
                    <p className="text-gray-600 text-center leading-relaxed" data-id="8hga0jlt9" data-path="src/pages/TipsPage.tsx">
                      {tip.description}
                    </p>
                    
                    {/* Category Badge */}
                    <div className="flex justify-center mt-4" data-id="3zv771tfg" data-path="src/pages/TipsPage.tsx">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${tip.color} text-white`} data-id="7lmqsjbpd" data-path="src/pages/TipsPage.tsx">
                        {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        <AnimatePresence data-id="6473o3mpl" data-path="src/pages/TipsPage.tsx">
          {filteredTips.length === 0 &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12" data-id="g9ke84o5q" data-path="src/pages/TipsPage.tsx">

              <X className="h-16 w-16 text-gray-400 mx-auto mb-4" data-id="wjvf3xusl" data-path="src/pages/TipsPage.tsx" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2" data-id="jtf28qr78" data-path="src/pages/TipsPage.tsx">No tips found</h3>
              <p className="text-gray-500" data-id="vu5mh618y" data-path="src/pages/TipsPage.tsx">Try selecting a different category</p>
            </motion.div>
          }
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} data-id="rcdumz7hg" data-path="src/pages/TipsPage.tsx">

          <h2 className="text-3xl font-bold mb-4" data-id="1onoarwyq" data-path="src/pages/TipsPage.tsx">Ready to Put These Tips into Action?</h2>
          <p className="text-xl mb-6 opacity-90" data-id="pyjh0t6yh" data-path="src/pages/TipsPage.tsx">
            Start tracking your smartphone usage and see real improvements in your digital wellness.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105" data-id="ccgb8jc9u" data-path="src/pages/TipsPage.tsx">

            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </div>);

};

export default TipsPage;