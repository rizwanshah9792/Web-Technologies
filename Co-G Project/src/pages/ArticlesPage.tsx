import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Clock,
  User,
  Calendar,
  X,
  Share,
  BookmarkPlus,
  ArrowRight } from
'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  publishDate: string;
  category: string;
  thumbnail: string;
  tags: string[];
}

const ArticlesPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
  {
    id: 1,
    title: 'The Hidden Cost of Smartphone Addiction in Rural India',
    excerpt: 'Exploring how excessive smartphone use affects educational outcomes and mental health among rural Indian youth.',
    content: `
        <h2>The Digital Divide Reality</h2>
        <p>In rural India, smartphones have become both a gateway to opportunity and a potential barrier to personal growth. While these devices provide unprecedented access to information and connectivity, they also present unique challenges for young people navigating their educational and personal development.</p>
        
        <h3>Educational Impact</h3>
        <p>Research shows that students who spend more than 3 hours daily on non-educational smartphone activities score 15-20% lower on academic assessments. This is particularly concerning in rural areas where educational resources are already limited.</p>
        
        <h3>Mental Health Considerations</h3>
        <p>The constant connectivity can lead to:</p>
        <ul>
          <li>Increased anxiety and FOMO (Fear of Missing Out)</li>
          <li>Disrupted sleep patterns affecting cognitive function</li>
          <li>Reduced face-to-face social interactions</li>
          <li>Decreased attention span and focus issues</li>
        </ul>
        
        <h3>Finding Balance</h3>
        <p>The goal isn't to eliminate smartphone use but to create a healthy, intentional relationship with technology. This includes setting boundaries, using apps mindfully, and prioritizing real-world experiences and relationships.</p>
        
        <blockquote>"Technology should amplify human capability, not replace human connection." - Digital Wellness Expert</blockquote>
        
        <h3>Practical Solutions</h3>
        <p>Communities across rural India are implementing various strategies:</p>
        <ul>
          <li>Digital literacy programs that include wellness components</li>
          <li>Peer support groups for healthy tech habits</li>
          <li>Integration of mindfulness practices in daily routines</li>
          <li>Creation of tech-free spaces and times</li>
        </ul>
      `,
    author: 'Dr. Priya Sharma',
    readTime: '8 min read',
    publishDate: 'March 15, 2024',
    category: 'Mental Health',
    thumbnail: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=800&h=600&fit=crop',
    tags: ['Digital Wellness', 'Rural India', 'Mental Health', 'Education']
  },
  {
    id: 2,
    title: 'Building Digital Mindfulness: A Guide for Students',
    excerpt: 'Practical strategies to develop awareness and intention in your technology use while maintaining academic excellence.',
    content: `
        <h2>Understanding Digital Mindfulness</h2>
        <p>Digital mindfulness is the practice of being conscious and intentional about how, when, and why we use technology. For students, this skill is crucial for academic success and personal well-being.</p>
        
        <h3>The Mindful Approach</h3>
        <p>Before reaching for your phone, ask yourself:</p>
        <ul>
          <li>What am I hoping to accomplish?</li>
          <li>How am I feeling right now?</li>
          <li>Is this the best use of my time?</li>
          <li>Will this activity support my goals?</li>
        </ul>
        
        <h3>Creating Intentional Tech Habits</h3>
        <p>Develop routines that support your wellbeing:</p>
        
        <h4>Morning Routine</h4>
        <p>Start your day without immediately checking your phone. Instead:</p>
        <ul>
          <li>Take 5 deep breaths</li>
          <li>Set three intentions for the day</li>
          <li>Review your schedule and priorities</li>
          <li>Only then check essential messages</li>
        </ul>
        
        <h4>Study Sessions</h4>
        <p>Optimize your focus with these techniques:</p>
        <ul>
          <li>Use the Pomodoro Technique (25 min focus, 5 min break)</li>
          <li>Keep your phone in another room or in airplane mode</li>
          <li>Use website blockers for distracting sites</li>
          <li>Practice single-tasking</li>
        </ul>
        
        <h4>Evening Wind-down</h4>
        <p>Prepare for quality sleep:</p>
        <ul>
          <li>Set a digital sunset 1 hour before bed</li>
          <li>Use blue light filters on all devices</li>
          <li>Replace scrolling with reading or journaling</li>
          <li>Charge devices outside the bedroom</li>
        </ul>
        
        <h3>The 5-4-3-2-1 Grounding Technique</h3>
        <p>When you feel overwhelmed by digital stimulation, try this mindfulness exercise:</p>
        <ul>
          <li>5 things you can see</li>
          <li>4 things you can touch</li>
          <li>3 things you can hear</li>
          <li>2 things you can smell</li>
          <li>1 thing you can taste</li>
        </ul>
        
        <p>This brings you back to the present moment and away from digital distractions.</p>
      `,
    author: 'Rajesh Kumar',
    readTime: '6 min read',
    publishDate: 'March 10, 2024',
    category: 'Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    tags: ['Mindfulness', 'Study Tips', 'Productivity', 'Digital Wellness']
  },
  {
    id: 3,
    title: 'Community-Based Approaches to Digital Wellness',
    excerpt: 'How rural communities are coming together to create supportive environments for healthy technology use.',
    content: `
        <h2>The Power of Community</h2>
        <p>Individual efforts to manage smartphone use are more effective when supported by community initiatives. Rural Indian communities are pioneering innovative approaches to collective digital wellness.</p>
        
        <h3>Successful Community Programs</h3>
        
        <h4>Village Digital Sabbath</h4>
        <p>Several villages have instituted weekly "digital sabbath" periods where community members agree to put away devices and engage in traditional activities:</p>
        <ul>
          <li>Storytelling sessions with elders</li>
          <li>Group cooking and shared meals</li>
          <li>Traditional games and sports</li>
          <li>Community gardening projects</li>
        </ul>
        
        <h4>Peer Support Circles</h4>
        <p>Young people form small groups to:</p>
        <ul>
          <li>Share challenges with device management</li>
          <li>Celebrate milestones in healthy usage</li>
          <li>Practice accountability partnerships</li>
          <li>Learn new coping strategies together</li>
        </ul>
        
        <h4>Family Digital Agreements</h4>
        <p>Families create household rules that apply to everyone:</p>
        <ul>
          <li>No devices during meals</li>
          <li>Designated homework/study times without distractions</li>
          <li>Family activity time without screens</li>
          <li>Shared charging stations outside bedrooms</li>
        </ul>
        
        <h3>Educational Integration</h3>
        <p>Schools are incorporating digital wellness into their curricula:</p>
        <ul>
          <li>Classes on media literacy and critical thinking</li>
          <li>Workshops on time management and goal setting</li>
          <li>Mindfulness and stress reduction techniques</li>
          <li>Technology ethics and responsible use discussions</li>
        </ul>
        
        <h3>Creating Supportive Environments</h3>
        <p>Communities are redesigning physical spaces to encourage face-to-face interaction:</p>
        <ul>
          <li>Device-free community centers</li>
          <li>Outdoor learning and gathering spaces</li>
          <li>Libraries with quiet study zones</li>
          <li>Recreation areas for traditional activities</li>
        </ul>
        
        <h3>Measuring Success</h3>
        <p>Communities track their progress through:</p>
        <ul>
          <li>Regular wellness surveys</li>
          <li>Academic performance monitoring</li>
          <li>Mental health check-ins</li>
          <li>Community engagement levels</li>
        </ul>
        
        <blockquote>"When we work together, individual challenges become community strengths." - Village Elder</blockquote>
        
        <h3>Getting Started in Your Community</h3>
        <p>Steps to initiate digital wellness programs:</p>
        <ol>
          <li>Start with awareness and education</li>
          <li>Form a core group of committed individuals</li>
          <li>Begin with small, achievable goals</li>
          <li>Celebrate early wins to build momentum</li>
          <li>Adapt strategies to local culture and needs</li>
        </ol>
      `,
    author: 'Meera Patel',
    readTime: '10 min read',
    publishDate: 'March 5, 2024',
    category: 'Community',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    tags: ['Community', 'Rural Development', 'Digital Wellness', 'Social Support']
  }];


  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12" data-id="cikr2bwyu" data-path="src/pages/ArticlesPage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="7s89u3wev" data-path="src/pages/ArticlesPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="h44gmhf38" data-path="src/pages/ArticlesPage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="wlq8ls36k" data-path="src/pages/ArticlesPage.tsx">
            Insightful 
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" data-id="csfpsbp9p" data-path="src/pages/ArticlesPage.tsx"> Articles</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="lazvrvfch" data-path="src/pages/ArticlesPage.tsx">
            Deep dive into expert insights, research findings, and real-world stories about 
            digital wellness and smartphone usage in rural communities.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-id="5d3kfx88k" data-path="src/pages/ArticlesPage.tsx">
          {articles.map((article, index) =>
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="group" data-id="lnl46b8d0" data-path="src/pages/ArticlesPage.tsx">

              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden" data-id="2p5wk8zo0" data-path="src/pages/ArticlesPage.tsx">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden" data-id="vx8xkkdbn" data-path="src/pages/ArticlesPage.tsx">
                  <motion.img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" data-id="k4binp8jn" data-path="src/pages/ArticlesPage.tsx" />

                  <div className="absolute top-4 left-4" data-id="71gf5o38g" data-path="src/pages/ArticlesPage.tsx">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-90 text-gray-800" data-id="58ey4pib2" data-path="src/pages/ArticlesPage.tsx">
                      {article.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-4" data-id="d8y2tn9hl" data-path="src/pages/ArticlesPage.tsx">
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300" data-id="9mpantspb" data-path="src/pages/ArticlesPage.tsx">
                    {article.title}
                  </CardTitle>
                  
                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500" data-id="ld1981c92" data-path="src/pages/ArticlesPage.tsx">
                    <div className="flex items-center" data-id="g2t5l7l9m" data-path="src/pages/ArticlesPage.tsx">
                      <User className="h-4 w-4 mr-1" data-id="yjah5zoqz" data-path="src/pages/ArticlesPage.tsx" />
                      {article.author}
                    </div>
                    <div className="flex items-center" data-id="7nqme81fg" data-path="src/pages/ArticlesPage.tsx">
                      <Clock className="h-4 w-4 mr-1" data-id="yipojviqc" data-path="src/pages/ArticlesPage.tsx" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500" data-id="2erm6zn8u" data-path="src/pages/ArticlesPage.tsx">
                    <Calendar className="h-4 w-4 mr-1" data-id="vjplpcz9v" data-path="src/pages/ArticlesPage.tsx" />
                    {article.publishDate}
                  </div>
                </CardHeader>

                <CardContent className="pt-0" data-id="9qzes7dcp" data-path="src/pages/ArticlesPage.tsx">
                  <p className="text-gray-600 mb-4 line-clamp-3" data-id="lgjiht8fo" data-path="src/pages/ArticlesPage.tsx">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4" data-id="xa3yr09u6" data-path="src/pages/ArticlesPage.tsx">
                    {article.tags.map((tag, tagIndex) =>
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full" data-id="j7s46yht2" data-path="src/pages/ArticlesPage.tsx">

                        {tag}
                      </span>
                  )}
                  </div>

                  <Button
                  onClick={() => openArticle(article)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white group-hover:scale-105 transition-transform duration-300" data-id="wjoa67qha" data-path="src/pages/ArticlesPage.tsx">

                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" data-id="823d3spf3" data-path="src/pages/ArticlesPage.tsx" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} data-id="s4h6sc6je" data-path="src/pages/ArticlesPage.tsx">

          <h2 className="text-3xl font-bold mb-4" data-id="lcfdwx9n3" data-path="src/pages/ArticlesPage.tsx">Stay Updated with Latest Insights</h2>
          <p className="text-xl mb-6 opacity-90" data-id="5kmijx383" data-path="src/pages/ArticlesPage.tsx">
            Get weekly articles and tips delivered to your inbox to support your digital wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="gxsxx9mdg" data-path="src/pages/ArticlesPage.tsx">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105" data-id="o4c5v50qg" data-path="src/pages/ArticlesPage.tsx">

              <BookmarkPlus className="mr-2 h-5 w-5" data-id="91zceu5l1" data-path="src/pages/ArticlesPage.tsx" />
              Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={closeArticle} data-id="6o12t8j8x" data-path="src/pages/ArticlesPage.tsx">
        <DialogContent className="max-w-4xl max-h-[90vh] p-0" data-id="g79o7ad1i" data-path="src/pages/ArticlesPage.tsx">
          {selectedArticle &&
          <>
              <DialogHeader className="p-6 pb-0" data-id="r9iu8rxbj" data-path="src/pages/ArticlesPage.tsx">
                <div className="flex justify-between items-start" data-id="e2d3c0vd4" data-path="src/pages/ArticlesPage.tsx">
                  <div className="flex-1" data-id="hazu0vdfm" data-path="src/pages/ArticlesPage.tsx">
                    <div className="flex items-center space-x-4 mb-2" data-id="oojx5tgih" data-path="src/pages/ArticlesPage.tsx">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white" data-id="6rw32xivs" data-path="src/pages/ArticlesPage.tsx">
                        {selectedArticle.category}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-gray-500" data-id="ws2pfx0bf" data-path="src/pages/ArticlesPage.tsx">
                        <div className="flex items-center" data-id="4vpy93h09" data-path="src/pages/ArticlesPage.tsx">
                          <Clock className="h-4 w-4 mr-1" data-id="m7fetb4wr" data-path="src/pages/ArticlesPage.tsx" />
                          {selectedArticle.readTime}
                        </div>
                        <div className="flex items-center" data-id="vrpegle02" data-path="src/pages/ArticlesPage.tsx">
                          <Calendar className="h-4 w-4 mr-1" data-id="sheymdr9q" data-path="src/pages/ArticlesPage.tsx" />
                          {selectedArticle.publishDate}
                        </div>
                      </div>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2" data-id="ecunygycr" data-path="src/pages/ArticlesPage.tsx">
                      {selectedArticle.title}
                    </DialogTitle>
                    <div className="flex items-center text-gray-600" data-id="wwch8wjdv" data-path="src/pages/ArticlesPage.tsx">
                      <User className="h-4 w-4 mr-2" data-id="j8cw1md3w" data-path="src/pages/ArticlesPage.tsx" />
                      <span className="font-medium" data-id="gyci6k3s0" data-path="src/pages/ArticlesPage.tsx">By {selectedArticle.author}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4" data-id="gu32frvx9" data-path="src/pages/ArticlesPage.tsx">
                    <Button variant="outline" size="sm" data-id="u7bvr1x49" data-path="src/pages/ArticlesPage.tsx">
                      <Share className="h-4 w-4" data-id="jfftmhbfi" data-path="src/pages/ArticlesPage.tsx" />
                    </Button>
                    <Button variant="outline" size="sm" data-id="5257y1ski" data-path="src/pages/ArticlesPage.tsx">
                      <BookmarkPlus className="h-4 w-4" data-id="5matmb1lh" data-path="src/pages/ArticlesPage.tsx" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              
              <ScrollArea className="flex-1 px-6 pb-6" data-id="s8tih2ubc" data-path="src/pages/ArticlesPage.tsx">
                <div className="mb-6" data-id="y2gjknk4d" data-path="src/pages/ArticlesPage.tsx">
                  <img
                  src={selectedArticle.thumbnail}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg" data-id="ag3584j4o" data-path="src/pages/ArticlesPage.tsx" />

                </div>
                
                <div
                className="prose prose-lg max-w-none article-content"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }} data-id="yca561di8" data-path="src/pages/ArticlesPage.tsx" />

                
                <div className="mt-8 pt-6 border-t" data-id="qezfhgiyr" data-path="src/pages/ArticlesPage.tsx">
                  <h4 className="font-semibold mb-2" data-id="gektiesj5" data-path="src/pages/ArticlesPage.tsx">Tags:</h4>
                  <div className="flex flex-wrap gap-2" data-id="wusiy98b1" data-path="src/pages/ArticlesPage.tsx">
                    {selectedArticle.tags.map((tag, index) =>
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full" data-id="bk4105ryq" data-path="src/pages/ArticlesPage.tsx">

                        {tag}
                      </span>
                  )}
                  </div>
                </div>
              </ScrollArea>
            </>
          }
        </DialogContent>
      </Dialog>
    </div>);

};

export default ArticlesPage;