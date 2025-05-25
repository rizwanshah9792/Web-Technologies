import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend } from
'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Heart,
  Moon,
  Utensils,
  Dumbbell,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Save,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle } from
'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LifestyleEntry {
  id: string;
  date: string;
  sleep: {
    hours: number;
    quality: number; // 1-5 scale
    notes: string;
  };
  diet: {
    meals: string[];
    water: number; // glasses
    notes: string;
  };
  exercise: {
    activities: {name: string;duration: number;completed: boolean;}[];
    notes: string;
  };
  mood: number; // 1-5 scale
  screenFreeTime: number; // minutes
}

const LifestylePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lifestyleData, setLifestyleData] = useState<LifestyleEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<LifestyleEntry>>({
    sleep: { hours: 0, quality: 3, notes: '' },
    diet: { meals: [], water: 0, notes: '' },
    exercise: {
      activities: [
      { name: 'Morning Walk', duration: 30, completed: false },
      { name: 'Yoga/Stretching', duration: 15, completed: false },
      { name: 'Outdoor Activity', duration: 60, completed: false },
      { name: 'Strength Training', duration: 45, completed: false }],

      notes: ''
    },
    mood: 3,
    screenFreeTime: 0
  });

  const [newMeal, setNewMeal] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access lifestyle tracking.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Load existing data from localStorage
    const savedData = localStorage.getItem(`cognitiveGuardianLifestyle_${user?.id}`);
    if (savedData) {
      setLifestyleData(JSON.parse(savedData));
    }
  }, [isAuthenticated, user, navigate, toast]);

  const saveEntry = () => {
    if (!currentEntry.sleep?.hours && !currentEntry.diet?.water && !currentEntry.screenFreeTime) {
      toast({
        title: "Validation Error",
        description: "Please enter at least some lifestyle data.",
        variant: "destructive"
      });
      return;
    }

    const newEntry: LifestyleEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      sleep: currentEntry.sleep || { hours: 0, quality: 3, notes: '' },
      diet: currentEntry.diet || { meals: [], water: 0, notes: '' },
      exercise: currentEntry.exercise || { activities: [], notes: '' },
      mood: currentEntry.mood || 3,
      screenFreeTime: currentEntry.screenFreeTime || 0
    };

    const updatedData = [newEntry, ...lifestyleData];
    setLifestyleData(updatedData);
    localStorage.setItem(`cognitiveGuardianLifestyle_${user?.id}`, JSON.stringify(updatedData));

    // Reset form
    setCurrentEntry({
      sleep: { hours: 0, quality: 3, notes: '' },
      diet: { meals: [], water: 0, notes: '' },
      exercise: {
        activities: [
        { name: 'Morning Walk', duration: 30, completed: false },
        { name: 'Yoga/Stretching', duration: 15, completed: false },
        { name: 'Outdoor Activity', duration: 60, completed: false },
        { name: 'Strength Training', duration: 45, completed: false }],

        notes: ''
      },
      mood: 3,
      screenFreeTime: 0
    });

    toast({
      title: "Entry Saved!",
      description: "Your lifestyle data has been recorded successfully."
    });
  };

  const addMeal = () => {
    if (newMeal.trim()) {
      setCurrentEntry({
        ...currentEntry,
        diet: {
          ...currentEntry.diet!,
          meals: [...(currentEntry.diet?.meals || []), newMeal.trim()]
        }
      });
      setNewMeal('');
    }
  };

  const removeMeal = (index: number) => {
    const updatedMeals = currentEntry.diet?.meals?.filter((_, i) => i !== index) || [];
    setCurrentEntry({
      ...currentEntry,
      diet: {
        ...currentEntry.diet!,
        meals: updatedMeals
      }
    });
  };

  const toggleExercise = (index: number) => {
    const updatedActivities = [...(currentEntry.exercise?.activities || [])];
    updatedActivities[index].completed = !updatedActivities[index].completed;
    setCurrentEntry({
      ...currentEntry,
      exercise: {
        ...currentEntry.exercise!,
        activities: updatedActivities
      }
    });
  };

  // Chart data for last 7 days
  const last7Days = lifestyleData.
  slice(0, 7).
  reverse().
  map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    sleep: entry.sleep.hours,
    water: entry.diet.water,
    exercise: entry.exercise.activities.filter((a) => a.completed).length,
    mood: entry.mood,
    screenFree: entry.screenFreeTime / 60 // convert to hours
  }));

  const chartData = {
    labels: last7Days.map((day) => day.date),
    datasets: [
    {
      label: 'Sleep (hours)',
      data: last7Days.map((day) => day.sleep),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2
    },
    {
      label: 'Water (glasses)',
      data: last7Days.map((day) => day.water),
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2
    },
    {
      label: 'Exercise Activities',
      data: last7Days.map((day) => day.exercise),
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 2
    },
    {
      label: 'Screen-Free Time (hours)',
      data: last7Days.map((day) => day.screenFree),
      backgroundColor: 'rgba(147, 51, 234, 0.8)',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 2
    }]

  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Weekly Lifestyle Trends'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Calculate averages
  const averages = lifestyleData.length > 0 ? {
    sleep: lifestyleData.reduce((sum, entry) => sum + entry.sleep.hours, 0) / lifestyleData.length,
    water: lifestyleData.reduce((sum, entry) => sum + entry.diet.water, 0) / lifestyleData.length,
    mood: lifestyleData.reduce((sum, entry) => sum + entry.mood, 0) / lifestyleData.length,
    exercise: lifestyleData.reduce((sum, entry) =>
    sum + entry.exercise.activities.filter((a) => a.completed).length, 0
    ) / lifestyleData.length
  } : { sleep: 0, water: 0, mood: 0, exercise: 0 };

  const todayEntry = lifestyleData.find((entry) => entry.date === new Date().toISOString().split('T')[0]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12" data-id="wf9prk422" data-path="src/pages/LifestylePage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="ny34mbrpy" data-path="src/pages/LifestylePage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="2y3wh4p5v" data-path="src/pages/LifestylePage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="uc2sdeix5" data-path="src/pages/LifestylePage.tsx">
            Lifestyle 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent" data-id="d17kkzj0i" data-path="src/pages/LifestylePage.tsx"> Monitor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="a99diewbd" data-path="src/pages/LifestylePage.tsx">
            Track your holistic wellness journey, {user?.name}! Monitor sleep, diet, exercise, 
            and screen-free time to build balanced digital habits.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-id="gmuxn9k2j" data-path="src/pages/LifestylePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} data-id="cbug2aydr" data-path="src/pages/LifestylePage.tsx">

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white" data-id="kysw22qq4" data-path="src/pages/LifestylePage.tsx">
              <CardContent className="p-6" data-id="xoakoh6rb" data-path="src/pages/LifestylePage.tsx">
                <div className="flex items-center justify-between" data-id="ajdue85d4" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="63u2unjg8" data-path="src/pages/LifestylePage.tsx">
                    <p className="text-blue-100 text-sm font-medium" data-id="mapoy5hl4" data-path="src/pages/LifestylePage.tsx">Sleep Average</p>
                    <p className="text-2xl font-bold" data-id="gmou2oywm" data-path="src/pages/LifestylePage.tsx">{averages.sleep.toFixed(1)}h</p>
                  </div>
                  <Moon className="h-8 w-8 text-blue-100" data-id="jw0rwpaqy" data-path="src/pages/LifestylePage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} data-id="9vup3vxrd" data-path="src/pages/LifestylePage.tsx">

            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-teal-500 text-white" data-id="pi48jcn4e" data-path="src/pages/LifestylePage.tsx">
              <CardContent className="p-6" data-id="qxtcgs4ff" data-path="src/pages/LifestylePage.tsx">
                <div className="flex items-center justify-between" data-id="058x2vn51" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="6oftkka3m" data-path="src/pages/LifestylePage.tsx">
                    <p className="text-green-100 text-sm font-medium" data-id="42q948omx" data-path="src/pages/LifestylePage.tsx">Water Intake</p>
                    <p className="text-2xl font-bold" data-id="zheakilg5" data-path="src/pages/LifestylePage.tsx">{averages.water.toFixed(1)} glasses</p>
                  </div>
                  <Utensils className="h-8 w-8 text-green-100" data-id="7czrbbpfz" data-path="src/pages/LifestylePage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} data-id="w3j4i9ns0" data-path="src/pages/LifestylePage.tsx">

            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-pink-500 text-white" data-id="8ggyu79sa" data-path="src/pages/LifestylePage.tsx">
              <CardContent className="p-6" data-id="39l1u7bfe" data-path="src/pages/LifestylePage.tsx">
                <div className="flex items-center justify-between" data-id="fbqe51n4g" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="4y17i80uw" data-path="src/pages/LifestylePage.tsx">
                    <p className="text-red-100 text-sm font-medium" data-id="f8ukanpmp" data-path="src/pages/LifestylePage.tsx">Exercise</p>
                    <p className="text-2xl font-bold" data-id="yqxn2jb7y" data-path="src/pages/LifestylePage.tsx">{averages.exercise.toFixed(1)} activities</p>
                  </div>
                  <Dumbbell className="h-8 w-8 text-red-100" data-id="g8ngs7en0" data-path="src/pages/LifestylePage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} data-id="dm10gsudl" data-path="src/pages/LifestylePage.tsx">

            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white" data-id="o6s8st71h" data-path="src/pages/LifestylePage.tsx">
              <CardContent className="p-6" data-id="pontp7a0f" data-path="src/pages/LifestylePage.tsx">
                <div className="flex items-center justify-between" data-id="r1c1is4dn" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="452qzr8i2" data-path="src/pages/LifestylePage.tsx">
                    <p className="text-purple-100 text-sm font-medium" data-id="w7pyuaj7m" data-path="src/pages/LifestylePage.tsx">Mood Average</p>
                    <p className="text-2xl font-bold" data-id="f4hdlnfhc" data-path="src/pages/LifestylePage.tsx">{averages.mood.toFixed(1)}/5</p>
                  </div>
                  <Heart className="h-8 w-8 text-purple-100" data-id="61rcu2flx" data-path="src/pages/LifestylePage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="jycgzkab3" data-path="src/pages/LifestylePage.tsx">
          {/* Data Entry Form */}
          <div className="lg:col-span-2" data-id="hy3gl4pbo" data-path="src/pages/LifestylePage.tsx">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6" data-id="gwyln6bk7" data-path="src/pages/LifestylePage.tsx">

              {/* Sleep Tracking */}
              <Card className="border-0 shadow-xl" data-id="zkhjx62a6" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="a2hfelz0m" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle className="flex items-center space-x-2" data-id="3mnzbpwq7" data-path="src/pages/LifestylePage.tsx">
                    <Moon className="h-6 w-6 text-blue-600" data-id="mxkvkkmuc" data-path="src/pages/LifestylePage.tsx" />
                    <span data-id="cu5ewxbfr" data-path="src/pages/LifestylePage.tsx">Sleep Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4" data-id="825uottqj" data-path="src/pages/LifestylePage.tsx">
                  <div className="grid grid-cols-2 gap-4" data-id="z3x10x9nn" data-path="src/pages/LifestylePage.tsx">
                    <div data-id="rfhuuqw35" data-path="src/pages/LifestylePage.tsx">
                      <Label htmlFor="sleepHours" data-id="lsnanzgr9" data-path="src/pages/LifestylePage.tsx">Hours of Sleep</Label>
                      <Input
                        id="sleepHours"
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={currentEntry.sleep?.hours || ''}
                        onChange={(e) => setCurrentEntry({
                          ...currentEntry,
                          sleep: { ...currentEntry.sleep!, hours: parseFloat(e.target.value) || 0 }
                        })}
                        placeholder="8.5" data-id="5qok01wwh" data-path="src/pages/LifestylePage.tsx" />

                    </div>
                    <div data-id="iau42sh8t" data-path="src/pages/LifestylePage.tsx">
                      <Label htmlFor="sleepQuality" data-id="e4gxt220o" data-path="src/pages/LifestylePage.tsx">Sleep Quality (1-5)</Label>
                      <Input
                        id="sleepQuality"
                        type="number"
                        min="1"
                        max="5"
                        value={currentEntry.sleep?.quality || ''}
                        onChange={(e) => setCurrentEntry({
                          ...currentEntry,
                          sleep: { ...currentEntry.sleep!, quality: parseInt(e.target.value) || 3 }
                        })}
                        placeholder="3" data-id="wujydvndl" data-path="src/pages/LifestylePage.tsx" />

                    </div>
                  </div>
                  <div data-id="o0ao73usc" data-path="src/pages/LifestylePage.tsx">
                    <Label htmlFor="sleepNotes" data-id="9pvnmswpy" data-path="src/pages/LifestylePage.tsx">Sleep Notes</Label>
                    <Textarea
                      id="sleepNotes"
                      value={currentEntry.sleep?.notes || ''}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        sleep: { ...currentEntry.sleep!, notes: e.target.value }
                      })}
                      placeholder="How was your sleep? Any factors that affected it?"
                      rows={2} data-id="umwizkfyr" data-path="src/pages/LifestylePage.tsx" />

                  </div>
                </CardContent>
              </Card>

              {/* Diet Tracking */}
              <Card className="border-0 shadow-xl" data-id="fgtk3y2xx" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="vyhxl0ydo" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle className="flex items-center space-x-2" data-id="yvb8f4cr9" data-path="src/pages/LifestylePage.tsx">
                    <Utensils className="h-6 w-6 text-green-600" data-id="esrk217yk" data-path="src/pages/LifestylePage.tsx" />
                    <span data-id="owm6g2q5k" data-path="src/pages/LifestylePage.tsx">Diet & Nutrition</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4" data-id="xiw7leqv0" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="ittukmgs4" data-path="src/pages/LifestylePage.tsx">
                    <Label htmlFor="water" data-id="envu85opl" data-path="src/pages/LifestylePage.tsx">Water Intake (glasses)</Label>
                    <Input
                      id="water"
                      type="number"
                      min="0"
                      value={currentEntry.diet?.water || ''}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        diet: { ...currentEntry.diet!, water: parseInt(e.target.value) || 0 }
                      })}
                      placeholder="8" data-id="ijyqp8tac" data-path="src/pages/LifestylePage.tsx" />

                  </div>
                  
                  <div data-id="4g9gin9vv" data-path="src/pages/LifestylePage.tsx">
                    <Label data-id="p6lvg8j3n" data-path="src/pages/LifestylePage.tsx">Meals & Snacks</Label>
                    <div className="flex space-x-2 mt-2" data-id="eut6whaml" data-path="src/pages/LifestylePage.tsx">
                      <Input
                        value={newMeal}
                        onChange={(e) => setNewMeal(e.target.value)}
                        placeholder="Add a meal or snack"
                        onKeyPress={(e) => e.key === 'Enter' && addMeal()} data-id="4f843k01q" data-path="src/pages/LifestylePage.tsx" />

                      <Button onClick={addMeal} size="sm" data-id="ho14wx07p" data-path="src/pages/LifestylePage.tsx">
                        <Plus className="h-4 w-4" data-id="y035ljskl" data-path="src/pages/LifestylePage.tsx" />
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1" data-id="zgak2y89c" data-path="src/pages/LifestylePage.tsx">
                      {currentEntry.diet?.meals?.map((meal, index) =>
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded" data-id="7duvuuh22" data-path="src/pages/LifestylePage.tsx">
                          <span className="text-sm" data-id="lf68ibkuw" data-path="src/pages/LifestylePage.tsx">{meal}</span>
                          <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMeal(index)} data-id="go1720s6h" data-path="src/pages/LifestylePage.tsx">

                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div data-id="y2h1zs1dn" data-path="src/pages/LifestylePage.tsx">
                    <Label htmlFor="dietNotes" data-id="ku4kp12yi" data-path="src/pages/LifestylePage.tsx">Diet Notes</Label>
                    <Textarea
                      id="dietNotes"
                      value={currentEntry.diet?.notes || ''}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        diet: { ...currentEntry.diet!, notes: e.target.value }
                      })}
                      placeholder="How did you feel about your eating today?"
                      rows={2} data-id="ojna0aqsf" data-path="src/pages/LifestylePage.tsx" />

                  </div>
                </CardContent>
              </Card>

              {/* Exercise Tracking */}
              <Card className="border-0 shadow-xl" data-id="vug9rqzei" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="oysgzi23j" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle className="flex items-center space-x-2" data-id="ovcfj1re8" data-path="src/pages/LifestylePage.tsx">
                    <Dumbbell className="h-6 w-6 text-red-600" data-id="7phlgfqsm" data-path="src/pages/LifestylePage.tsx" />
                    <span data-id="tvub94a63" data-path="src/pages/LifestylePage.tsx">Exercise & Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4" data-id="lsjnac1go" data-path="src/pages/LifestylePage.tsx">
                  <div data-id="u3oi5z1qa" data-path="src/pages/LifestylePage.tsx">
                    <Label data-id="jnw5wiyt8" data-path="src/pages/LifestylePage.tsx">Activities Completed</Label>
                    <div className="space-y-2 mt-2" data-id="l7gc4chv1" data-path="src/pages/LifestylePage.tsx">
                      {currentEntry.exercise?.activities?.map((activity, index) =>
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" data-id="qa89nty2o" data-path="src/pages/LifestylePage.tsx">
                          <div className="flex items-center space-x-3" data-id="94n19mbk0" data-path="src/pages/LifestylePage.tsx">
                            <Checkbox
                            checked={activity.completed}
                            onCheckedChange={() => toggleExercise(index)} data-id="qoy5av87h" data-path="src/pages/LifestylePage.tsx" />

                            <div data-id="f6n75vtkx" data-path="src/pages/LifestylePage.tsx">
                              <p className="font-medium" data-id="cba0uqqdq" data-path="src/pages/LifestylePage.tsx">{activity.name}</p>
                              <p className="text-sm text-gray-600" data-id="o665gzmae" data-path="src/pages/LifestylePage.tsx">{activity.duration} minutes</p>
                            </div>
                          </div>
                          {activity.completed &&
                        <CheckCircle className="h-5 w-5 text-green-500" data-id="tokczmpwr" data-path="src/pages/LifestylePage.tsx" />
                        }
                        </div>
                      )}
                    </div>
                  </div>

                  <div data-id="3fgscl6cm" data-path="src/pages/LifestylePage.tsx">
                    <Label htmlFor="exerciseNotes" data-id="a4dvjiw3f" data-path="src/pages/LifestylePage.tsx">Exercise Notes</Label>
                    <Textarea
                      id="exerciseNotes"
                      value={currentEntry.exercise?.notes || ''}
                      onChange={(e) => setCurrentEntry({
                        ...currentEntry,
                        exercise: { ...currentEntry.exercise!, notes: e.target.value }
                      })}
                      placeholder="How did your activities go? Any challenges or achievements?"
                      rows={2} data-id="904dswa62" data-path="src/pages/LifestylePage.tsx" />

                  </div>
                </CardContent>
              </Card>

              {/* Mood & Screen-Free Time */}
              <Card className="border-0 shadow-xl" data-id="wbj4jk92a" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="ix9i90rtm" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle className="flex items-center space-x-2" data-id="t2iuvawbl" data-path="src/pages/LifestylePage.tsx">
                    <Heart className="h-6 w-6 text-purple-600" data-id="jimllps4f" data-path="src/pages/LifestylePage.tsx" />
                    <span data-id="xycqhnust" data-path="src/pages/LifestylePage.tsx">Mood & Digital Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4" data-id="aa26rn74l" data-path="src/pages/LifestylePage.tsx">
                  <div className="grid grid-cols-2 gap-4" data-id="dzkhup5gz" data-path="src/pages/LifestylePage.tsx">
                    <div data-id="tvy3531ku" data-path="src/pages/LifestylePage.tsx">
                      <Label htmlFor="mood" data-id="lsd8kfwet" data-path="src/pages/LifestylePage.tsx">Overall Mood (1-5)</Label>
                      <Input
                        id="mood"
                        type="number"
                        min="1"
                        max="5"
                        value={currentEntry.mood || ''}
                        onChange={(e) => setCurrentEntry({
                          ...currentEntry,
                          mood: parseInt(e.target.value) || 3
                        })}
                        placeholder="3" data-id="fotx20qyn" data-path="src/pages/LifestylePage.tsx" />

                    </div>
                    <div data-id="i13cotkmz" data-path="src/pages/LifestylePage.tsx">
                      <Label htmlFor="screenFree" data-id="10ayukmke" data-path="src/pages/LifestylePage.tsx">Screen-Free Time (minutes)</Label>
                      <Input
                        id="screenFree"
                        type="number"
                        min="0"
                        value={currentEntry.screenFreeTime || ''}
                        onChange={(e) => setCurrentEntry({
                          ...currentEntry,
                          screenFreeTime: parseInt(e.target.value) || 0
                        })}
                        placeholder="120" data-id="o5qd5b645" data-path="src/pages/LifestylePage.tsx" />

                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={saveEntry} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-lg py-6" data-id="x56frbsw5" data-path="src/pages/LifestylePage.tsx">
                <Save className="h-5 w-5 mr-2" data-id="9uix0wfrm" data-path="src/pages/LifestylePage.tsx" />
                Save Today's Lifestyle Data
              </Button>
            </motion.div>
          </div>

          {/* Charts and Progress */}
          <div className="lg:col-span-1" data-id="iv2tv1tkk" data-path="src/pages/LifestylePage.tsx">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6" data-id="v32z0mrao" data-path="src/pages/LifestylePage.tsx">

              {/* Chart */}
              <Card className="border-0 shadow-xl" data-id="qsvdcxt9x" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="ffh4d5o80" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle data-id="d71avvpas" data-path="src/pages/LifestylePage.tsx">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent data-id="9ys7jbti7" data-path="src/pages/LifestylePage.tsx">
                  {lifestyleData.length > 0 ?
                  <div className="h-64" data-id="2iesyqst9" data-path="src/pages/LifestylePage.tsx">
                      <Bar data={chartData} options={chartOptions} data-id="g95krkwb5" data-path="src/pages/LifestylePage.tsx" />
                    </div> :

                  <div className="h-64 flex items-center justify-center" data-id="a2uim48b2" data-path="src/pages/LifestylePage.tsx">
                      <div className="text-center" data-id="v3f9occ1a" data-path="src/pages/LifestylePage.tsx">
                        <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" data-id="osfoxkhqp" data-path="src/pages/LifestylePage.tsx" />
                        <p className="text-gray-500" data-id="iynofzqsq" data-path="src/pages/LifestylePage.tsx">Start logging to see trends!</p>
                      </div>
                    </div>
                  }
                </CardContent>
              </Card>

              {/* Today's Progress */}
              {todayEntry &&
              <Card className="border-0 shadow-xl" data-id="1znddjacv" data-path="src/pages/LifestylePage.tsx">
                  <CardHeader data-id="e3il1aghf" data-path="src/pages/LifestylePage.tsx">
                    <CardTitle data-id="alvwn18sg" data-path="src/pages/LifestylePage.tsx">Today's Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4" data-id="i714tbc5q" data-path="src/pages/LifestylePage.tsx">
                    <div data-id="230xuj02j" data-path="src/pages/LifestylePage.tsx">
                      <div className="flex justify-between mb-2" data-id="pr7k3altv" data-path="src/pages/LifestylePage.tsx">
                        <span className="text-sm font-medium" data-id="7xgb5m9g3" data-path="src/pages/LifestylePage.tsx">Sleep Goal</span>
                        <span className="text-sm" data-id="4if9cu48b" data-path="src/pages/LifestylePage.tsx">{todayEntry.sleep.hours}/8h</span>
                      </div>
                      <Progress value={todayEntry.sleep.hours / 8 * 100} className="h-2" data-id="wbx5qg3t8" data-path="src/pages/LifestylePage.tsx" />
                    </div>
                    
                    <div data-id="wz08pv977" data-path="src/pages/LifestylePage.tsx">
                      <div className="flex justify-between mb-2" data-id="7tjbrvdy2" data-path="src/pages/LifestylePage.tsx">
                        <span className="text-sm font-medium" data-id="1macd8l3m" data-path="src/pages/LifestylePage.tsx">Water Goal</span>
                        <span className="text-sm" data-id="7yxlf702c" data-path="src/pages/LifestylePage.tsx">{todayEntry.diet.water}/8 glasses</span>
                      </div>
                      <Progress value={todayEntry.diet.water / 8 * 100} className="h-2" data-id="4km0tzmbd" data-path="src/pages/LifestylePage.tsx" />
                    </div>
                    
                    <div data-id="lgh8nks96" data-path="src/pages/LifestylePage.tsx">
                      <div className="flex justify-between mb-2" data-id="ptv90ytuc" data-path="src/pages/LifestylePage.tsx">
                        <span className="text-sm font-medium" data-id="1i5kdzpyb" data-path="src/pages/LifestylePage.tsx">Exercise Activities</span>
                        <span className="text-sm" data-id="r54xlt9w3" data-path="src/pages/LifestylePage.tsx">
                          {todayEntry.exercise.activities.filter((a) => a.completed).length}/
                          {todayEntry.exercise.activities.length}
                        </span>
                      </div>
                      <Progress
                      value={todayEntry.exercise.activities.filter((a) => a.completed).length /
                      todayEntry.exercise.activities.length * 100}
                      className="h-2" data-id="8cdp9gx3i" data-path="src/pages/LifestylePage.tsx" />

                    </div>
                  </CardContent>
                </Card>
              }

              {/* Achievements */}
              <Card className="border-0 shadow-xl" data-id="xw5zyljkm" data-path="src/pages/LifestylePage.tsx">
                <CardHeader data-id="v1jpyvtuj" data-path="src/pages/LifestylePage.tsx">
                  <CardTitle className="flex items-center space-x-2" data-id="5tht103zp" data-path="src/pages/LifestylePage.tsx">
                    <Award className="h-6 w-6 text-yellow-600" data-id="0ovgjpdgy" data-path="src/pages/LifestylePage.tsx" />
                    <span data-id="ia8xptm35" data-path="src/pages/LifestylePage.tsx">Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent data-id="64dyvs8yb" data-path="src/pages/LifestylePage.tsx">
                  <div className="space-y-2" data-id="bdxr0fsvm" data-path="src/pages/LifestylePage.tsx">
                    {lifestyleData.length >= 7 &&
                    <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded" data-id="fy7bc4rns" data-path="src/pages/LifestylePage.tsx">
                        <Award className="h-4 w-4 text-yellow-600" data-id="n1hw01a3h" data-path="src/pages/LifestylePage.tsx" />
                        <span className="text-sm font-medium" data-id="l9my7i3jf" data-path="src/pages/LifestylePage.tsx">7-Day Streak!</span>
                      </div>
                    }
                    {averages.sleep >= 7 &&
                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded" data-id="9izmun0i9" data-path="src/pages/LifestylePage.tsx">
                        <Moon className="h-4 w-4 text-blue-600" data-id="6deqbue2d" data-path="src/pages/LifestylePage.tsx" />
                        <span className="text-sm font-medium" data-id="8odih0vhl" data-path="src/pages/LifestylePage.tsx">Sleep Champion</span>
                      </div>
                    }
                    {averages.water >= 6 &&
                    <div className="flex items-center space-x-2 p-2 bg-green-50 rounded" data-id="npcji9xxq" data-path="src/pages/LifestylePage.tsx">
                        <Utensils className="h-4 w-4 text-green-600" data-id="76ulwcdhi" data-path="src/pages/LifestylePage.tsx" />
                        <span className="text-sm font-medium" data-id="hv3xtvp7t" data-path="src/pages/LifestylePage.tsx">Hydration Hero</span>
                      </div>
                    }
                    {averages.exercise >= 2 &&
                    <div className="flex items-center space-x-2 p-2 bg-red-50 rounded" data-id="t998wb3sv" data-path="src/pages/LifestylePage.tsx">
                        <Dumbbell className="h-4 w-4 text-red-600" data-id="y1fkbl8vt" data-path="src/pages/LifestylePage.tsx" />
                        <span className="text-sm font-medium" data-id="48u11rjzq" data-path="src/pages/LifestylePage.tsx">Fitness Enthusiast</span>
                      </div>
                    }
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);

};

export default LifestylePage;