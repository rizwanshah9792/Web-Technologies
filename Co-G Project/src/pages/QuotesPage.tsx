import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  Quote,
  Heart,
  Share,
  Copy,
  Download,
  Sparkles,
  Brain } from
'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteData {
  id: number;
  text: string;
  author: string;
  category: string;
  color: string;
}

const QuotesPage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const quotes: QuoteData[] = [
  {
    id: 1,
    text: "The real problem of humanity is the following: we have paleolithic emotions, medieval institutions, and god-like technology.",
    author: "E.O. Wilson",
    category: "Technology",
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    text: "Technology is a useful servant but a dangerous master.",
    author: "Christian Lous Lange",
    category: "Wisdom",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    text: "The art of living lies less in eliminating our troubles than in growing with them.",
    author: "Bernard M. Baruch",
    category: "Growth",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    text: "Your smartphone has already replaced your camera, your calendar, your alarm clock. Don't let it replace your family.",
    author: "Unknown",
    category: "Family",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    text: "The best way to take control over people and control them utterly is to take a little of their freedom at a time.",
    author: "Adolf Hitler",
    category: "Freedom",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 6,
    text: "Mindfulness is about being fully awake in our lives. It is about perceiving the exquisite vividness of each moment.",
    author: "Jon Kabat-Zinn",
    category: "Mindfulness",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 7,
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "Present",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 8,
    text: "Digital minimalism is a philosophy of technology use in which you focus your online time on a small number of carefully selected activities.",
    author: "Cal Newport",
    category: "Minimalism",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 9,
    text: "The ultimate goal of technology, the telos of techne, is to replace a natural world that's indifferent to our wishes.",
    author: "Michael Pollan",
    category: "Nature",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 10,
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "Habits",
    color: "from-violet-500 to-purple-500"
  },
  {
    id: 11,
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
    category: "Mental Health",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: 12,
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Simplicity",
    color: "from-teal-500 to-cyan-500"
  }];


  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('cognitiveGuardianFavoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Show a random quote on load
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    setIsLoading(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  const toggleFavorite = (quoteId: number) => {
    const updatedFavorites = favorites.includes(quoteId) ?
    favorites.filter((id) => id !== quoteId) :
    [...favorites, quoteId];

    setFavorites(updatedFavorites);
    localStorage.setItem('cognitiveGuardianFavoriteQuotes', JSON.stringify(updatedFavorites));

    toast({
      title: favorites.includes(quoteId) ? "Removed from favorites" : "Added to favorites",
      description: "Quote saved to your collection"
    });
  };

  const copyQuote = () => {
    if (currentQuote) {
      const text = `"${currentQuote.text}" - ${currentQuote.author}`;
      navigator.clipboard.writeText(text);
      toast({
        title: "Quote copied!",
        description: "Quote has been copied to your clipboard"
      });
    }
  };

  const shareQuote = () => {
    if (currentQuote && navigator.share) {
      navigator.share({
        title: 'Inspiring Quote from Cognitive Guardian',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
        url: window.location.href
      });
    } else {
      copyQuote();
    }
  };

  const downloadQuote = () => {
    if (currentQuote) {
      // Create a simple text file download
      const text = `"${currentQuote.text}"\n\n- ${currentQuote.author}\n\nCategory: ${currentQuote.category}\n\nFrom: Cognitive Guardian`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quote-${currentQuote.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Quote downloaded!",
        description: "Quote saved as text file"
      });
    }
  };

  const favoriteQuotes = quotes.filter((quote) => favorites.includes(quote.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12" data-id="a2j8iuosm" data-path="src/pages/QuotesPage.tsx">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-id="jh4l6kvmb" data-path="src/pages/QuotesPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="ri35nf5bc" data-path="src/pages/QuotesPage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="9tvwhtdri" data-path="src/pages/QuotesPage.tsx">
            Daily 
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent" data-id="i5g05ww1u" data-path="src/pages/QuotesPage.tsx"> Inspiration</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-id="7wc2th7s6" data-path="src/pages/QuotesPage.tsx">
            Find motivation and wisdom to guide your journey towards mindful technology use 
            and digital wellness.
          </p>
        </motion.div>

        {/* Main Quote Display */}
        <div className="mb-12" data-id="0cnc8g7mn" data-path="src/pages/QuotesPage.tsx">
          <AnimatePresence mode="wait" data-id="0dy48cmpd" data-path="src/pages/QuotesPage.tsx">
            {currentQuote &&
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }} data-id="nlw98xam1" data-path="src/pages/QuotesPage.tsx">

                <Card className="border-0 shadow-2xl overflow-hidden" data-id="3i77thk7u" data-path="src/pages/QuotesPage.tsx">
                  <div className={`h-2 bg-gradient-to-r ${currentQuote.color}`} data-id="og0oyp64l" data-path="src/pages/QuotesPage.tsx"></div>
                  <CardContent className="p-8 md:p-12" data-id="f5r2bcbs7" data-path="src/pages/QuotesPage.tsx">
                    <div className="text-center" data-id="yw6wgjshu" data-path="src/pages/QuotesPage.tsx">
                      <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${currentQuote.color} flex items-center justify-center`} data-id="dvo05yr3f" data-path="src/pages/QuotesPage.tsx">

                        <Quote className="h-8 w-8 text-white" data-id="80zj5c4os" data-path="src/pages/QuotesPage.tsx" />
                      </motion.div>
                      
                      <motion.blockquote
                      className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }} data-id="1d1e86228" data-path="src/pages/QuotesPage.tsx">

                        "{currentQuote.text}"
                      </motion.blockquote>
                      
                      <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6" data-id="6byk2pyht" data-path="src/pages/QuotesPage.tsx">

                        <p className="text-lg text-gray-600 font-medium" data-id="fuwiyziz2" data-path="src/pages/QuotesPage.tsx">
                          — {currentQuote.author}
                        </p>
                        <span className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full bg-gradient-to-r ${currentQuote.color} text-white`} data-id="5ro7uonfr" data-path="src/pages/QuotesPage.tsx">
                          {currentQuote.category}
                        </span>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                      className="flex flex-wrap justify-center gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }} data-id="tlbsxg5w0" data-path="src/pages/QuotesPage.tsx">

                        <Button
                        onClick={() => toggleFavorite(currentQuote.id)}
                        variant={favorites.includes(currentQuote.id) ? "default" : "outline"}
                        className={`${
                        favorites.includes(currentQuote.id) ?
                        `bg-gradient-to-r ${currentQuote.color} text-white` :
                        ''}`
                        } data-id="py9lwb4xm" data-path="src/pages/QuotesPage.tsx">

                          <Heart
                          className={`h-4 w-4 mr-2 ${
                          favorites.includes(currentQuote.id) ? 'fill-current' : ''}`
                          } data-id="lrwe8icz2" data-path="src/pages/QuotesPage.tsx" />

                          {favorites.includes(currentQuote.id) ? 'Favorited' : 'Favorite'}
                        </Button>
                        
                        <Button onClick={copyQuote} variant="outline" data-id="dbhlkvs24" data-path="src/pages/QuotesPage.tsx">
                          <Copy className="h-4 w-4 mr-2" data-id="9q07pq73q" data-path="src/pages/QuotesPage.tsx" />
                          Copy
                        </Button>
                        
                        <Button onClick={shareQuote} variant="outline" data-id="cbrj4fjpm" data-path="src/pages/QuotesPage.tsx">
                          <Share className="h-4 w-4 mr-2" data-id="f2ru2yfnk" data-path="src/pages/QuotesPage.tsx" />
                          Share
                        </Button>
                        
                        <Button onClick={downloadQuote} variant="outline" data-id="va74kmeb3" data-path="src/pages/QuotesPage.tsx">
                          <Download className="h-4 w-4 mr-2" data-id="vvp63cq7x" data-path="src/pages/QuotesPage.tsx" />
                          Download
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* New Quote Button */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }} data-id="cs6qy5r7v" data-path="src/pages/QuotesPage.tsx">

          <Button
            onClick={getRandomQuote}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl" data-id="0m56bccg4" data-path="src/pages/QuotesPage.tsx">

            {isLoading ?
            <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" data-id="auqhd4ljw" data-path="src/pages/QuotesPage.tsx" />
                Finding Inspiration...
              </> :

            <>
                <Sparkles className="h-5 w-5 mr-2" data-id="8x05b9qr9" data-path="src/pages/QuotesPage.tsx" />
                New Quote
              </>
            }
          </Button>
        </motion.div>

        {/* Favorite Quotes Section */}
        {favoriteQuotes.length > 0 &&
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }} data-id="m6nq7jxn9" data-path="src/pages/QuotesPage.tsx">

            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" data-id="0i8lsb85g" data-path="src/pages/QuotesPage.tsx">
              Your Favorite Quotes
              <Heart className="inline-block ml-2 h-8 w-8 text-red-500 fill-current" data-id="36vtfoxw1" data-path="src/pages/QuotesPage.tsx" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="58315ym9p" data-path="src/pages/QuotesPage.tsx">
              {favoriteQuotes.map((quote, index) =>
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }} data-id="h9pi0xrk2" data-path="src/pages/QuotesPage.tsx">

                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300" data-id="aytcq65pe" data-path="src/pages/QuotesPage.tsx">
                    <div className={`h-1 bg-gradient-to-r ${quote.color}`} data-id="fv59x0ski" data-path="src/pages/QuotesPage.tsx"></div>
                    <CardContent className="p-6" data-id="oe9ni2vix" data-path="src/pages/QuotesPage.tsx">
                      <blockquote className="text-lg font-medium text-gray-800 mb-4" data-id="ndi6y5olf" data-path="src/pages/QuotesPage.tsx">
                        "{quote.text}"
                      </blockquote>
                      <div className="flex justify-between items-center" data-id="eqjaks29j" data-path="src/pages/QuotesPage.tsx">
                        <div data-id="i7969lrgs" data-path="src/pages/QuotesPage.tsx">
                          <p className="text-gray-600 font-medium" data-id="zalmhkq7y" data-path="src/pages/QuotesPage.tsx">— {quote.author}</p>
                          <span className={`inline-block px-2 py-1 mt-1 text-xs font-semibold rounded-full bg-gradient-to-r ${quote.color} text-white`} data-id="271v1jha9" data-path="src/pages/QuotesPage.tsx">
                            {quote.category}
                          </span>
                        </div>
                        <Button
                      onClick={() => toggleFavorite(quote.id)}
                      variant="ghost"
                      size="sm" data-id="6tlzyyt02" data-path="src/pages/QuotesPage.tsx">

                          <Heart className="h-4 w-4 text-red-500 fill-current" data-id="l5c6eh7xw" data-path="src/pages/QuotesPage.tsx" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            )}
            </div>
          </motion.div>
        }

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} data-id="tlv7p60yp" data-path="src/pages/QuotesPage.tsx">

          <Brain className="h-12 w-12 mx-auto mb-4" data-id="2ekk7l00l" data-path="src/pages/QuotesPage.tsx" />
          <h2 className="text-3xl font-bold mb-4" data-id="axy55n4pb" data-path="src/pages/QuotesPage.tsx">Start Your Mindful Journey</h2>
          <p className="text-xl mb-6 opacity-90" data-id="0uauk8f17" data-path="src/pages/QuotesPage.tsx">
            Let these words of wisdom guide you towards a more balanced digital life.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105" data-id="5ug6wa7eo" data-path="src/pages/QuotesPage.tsx">

            Begin Tracking Your Progress
          </Button>
        </motion.div>
      </div>
    </div>);

};

export default QuotesPage;