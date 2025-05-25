import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement } from
'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Smartphone,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Plus,
  Save,
  Award,
  AlertCircle } from
'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface UsageEntry {
  id: string;
  date: string;
  hours: number;
  minutes: number;
  notes: string;
  apps: {name: string;time: number;}[];
}

const TrackerPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [usageData, setUsageData] = useState<UsageEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({
    hours: '',
    minutes: '',
    notes: '',
    apps: [
    { name: 'Social Media', time: 0 },
    { name: 'Gaming', time: 0 },
    { name: 'Entertainment', time: 0 },
    { name: 'Education', time: 0 },
    { name: 'Productivity', time: 0 },
    { name: 'Other', time: 0 }]

  });
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'doughnut'>('line');

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the tracker.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Load existing data from localStorage
    const savedData = localStorage.getItem(`cognitiveGuardianUsage_${user?.id}`);
    if (savedData) {
      setUsageData(JSON.parse(savedData));
    }
  }, [isAuthenticated, user, navigate, toast]);

  const saveEntry = () => {
    if (!currentEntry.hours && !currentEntry.minutes) {
      toast({
        title: "Validation Error",
        description: "Please enter at least some time data.",
        variant: "destructive"
      });
      return;
    }

    const totalMinutes = parseInt(currentEntry.hours || '0') * 60 + parseInt(currentEntry.minutes || '0');

    const newEntry: UsageEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      hours: parseInt(currentEntry.hours || '0'),
      minutes: parseInt(currentEntry.minutes || '0'),
      notes: currentEntry.notes,
      apps: currentEntry.apps.filter((app) => app.time > 0)
    };

    const updatedData = [newEntry, ...usageData];
    setUsageData(updatedData);
    localStorage.setItem(`cognitiveGuardianUsage_${user?.id}`, JSON.stringify(updatedData));

    // Reset form
    setCurrentEntry({
      hours: '',
      minutes: '',
      notes: '',
      apps: [
      { name: 'Social Media', time: 0 },
      { name: 'Gaming', time: 0 },
      { name: 'Entertainment', time: 0 },
      { name: 'Education', time: 0 },
      { name: 'Productivity', time: 0 },
      { name: 'Other', time: 0 }]

    });

    toast({
      title: "Entry Saved!",
      description: "Your usage data has been recorded successfully."
    });
  };

  const updateAppTime = (appIndex: number, time: number) => {
    const updatedApps = [...currentEntry.apps];
    updatedApps[appIndex].time = time;
    setCurrentEntry({ ...currentEntry, apps: updatedApps });
  };

  // Chart data preparation
  const last7Days = usageData.
  slice(0, 7).
  reverse().
  map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    total: entry.hours + entry.minutes / 60
  }));

  const lineChartData = {
    labels: last7Days.map((day) => day.date),
    datasets: [
    {
      label: 'Daily Usage (Hours)',
      data: last7Days.map((day) => day.total),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }]

  };

  const barChartData = {
    labels: last7Days.map((day) => day.date),
    datasets: [
    {
      label: 'Daily Usage (Hours)',
      data: last7Days.map((day) => day.total),
      backgroundColor: [
      'rgba(239, 68, 68, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(147, 51, 234, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(20, 184, 166, 0.8)'],

      borderColor: [
      'rgba(239, 68, 68, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(34, 197, 94, 1)',
      'rgba(59, 130, 246, 1)',
      'rgba(147, 51, 234, 1)',
      'rgba(236, 72, 153, 1)',
      'rgba(20, 184, 166, 1)'],

      borderWidth: 2
    }]

  };

  // App usage breakdown for doughnut chart
  const appUsageData = usageData.
  slice(0, 7).
  reduce((acc, entry) => {
    entry.apps.forEach((app) => {
      acc[app.name] = (acc[app.name] || 0) + app.time;
    });
    return acc;
  }, {} as Record<string, number>);

  const doughnutData = {
    labels: Object.keys(appUsageData),
    datasets: [
    {
      data: Object.values(appUsageData),
      backgroundColor: [
      '#ef4444',
      '#f59e0b',
      '#22c55e',
      '#3b82f6',
      '#8b5cf6',
      '#ec4899'],

      borderWidth: 2,
      borderColor: '#ffffff'
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
        text: 'Phone Usage Trends'
      }
    },
    scales: selectedChart !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      }
    } : {}
  };

  // Calculate statistics
  const averageUsage = usageData.length > 0 ?
  usageData.reduce((sum, entry) => sum + entry.hours + entry.minutes / 60, 0) / usageData.length :
  0;

  const todayUsage = usageData.find((entry) => entry.date === new Date().toISOString().split('T')[0]);
  const yesterdayUsage = usageData.find((entry) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return entry.date === yesterday.toISOString().split('T')[0];
  });

  const trend = todayUsage && yesterdayUsage ?
  todayUsage.hours + todayUsage.minutes / 60 - (yesterdayUsage.hours + yesterdayUsage.minutes / 60) :
  0;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12" data-id="nhjxtojvk" data-path="src/pages/TrackerPage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="iqvtbxw7j" data-path="src/pages/TrackerPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="c9t5ap427" data-path="src/pages/TrackerPage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="xd6v9ic3n" data-path="src/pages/TrackerPage.tsx">
            Usage 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="s6qs63mny" data-path="src/pages/TrackerPage.tsx"> Tracker</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="pz0q9oakj" data-path="src/pages/TrackerPage.tsx">
            Welcome back, {user?.name}! Track your daily smartphone usage and monitor your progress 
            towards healthier digital habits.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8" data-id="ncw7q751w" data-path="src/pages/TrackerPage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} data-id="j97q0bbq2" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white" data-id="xki99c79s" data-path="src/pages/TrackerPage.tsx">
              <CardContent className="p-6" data-id="5lm0r3ju9" data-path="src/pages/TrackerPage.tsx">
                <div className="flex items-center justify-between" data-id="xamub2hku" data-path="src/pages/TrackerPage.tsx">
                  <div data-id="x24n2j0lb" data-path="src/pages/TrackerPage.tsx">
                    <p className="text-blue-100 text-sm font-medium" data-id="q32nf3qhk" data-path="src/pages/TrackerPage.tsx">Today's Usage</p>
                    <p className="text-2xl font-bold" data-id="t9kjxpo65" data-path="src/pages/TrackerPage.tsx">
                      {todayUsage ?
                      `${todayUsage.hours}h ${todayUsage.minutes}m` :
                      'No data'
                      }
                    </p>
                  </div>
                  <Smartphone className="h-8 w-8 text-blue-100" data-id="p8xaz0m7l" data-path="src/pages/TrackerPage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} data-id="u1o997dzq" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-lg" data-id="30rg2ka0s" data-path="src/pages/TrackerPage.tsx">
              <CardContent className="p-6" data-id="chxgzs9un" data-path="src/pages/TrackerPage.tsx">
                <div className="flex items-center justify-between" data-id="mf7fhbqek" data-path="src/pages/TrackerPage.tsx">
                  <div data-id="mfko4far6" data-path="src/pages/TrackerPage.tsx">
                    <p className="text-gray-600 text-sm font-medium" data-id="e07lhwge7" data-path="src/pages/TrackerPage.tsx">Weekly Average</p>
                    <p className="text-2xl font-bold text-gray-900" data-id="qfvnu7ud2" data-path="src/pages/TrackerPage.tsx">
                      {averageUsage.toFixed(1)}h
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400" data-id="oietqh0xj" data-path="src/pages/TrackerPage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} data-id="o2armzvhn" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-lg" data-id="q8c5wyd4x" data-path="src/pages/TrackerPage.tsx">
              <CardContent className="p-6" data-id="mj78p05la" data-path="src/pages/TrackerPage.tsx">
                <div className="flex items-center justify-between" data-id="as5i1hgib" data-path="src/pages/TrackerPage.tsx">
                  <div data-id="o9h98ml8h" data-path="src/pages/TrackerPage.tsx">
                    <p className="text-gray-600 text-sm font-medium" data-id="annt55e3b" data-path="src/pages/TrackerPage.tsx">Trend</p>
                    <p className={`text-2xl font-bold ${trend >= 0 ? 'text-red-500' : 'text-green-500'}`} data-id="94pgt8asv" data-path="src/pages/TrackerPage.tsx">
                      {trend >= 0 ? '+' : ''}{trend.toFixed(1)}h
                    </p>
                  </div>
                  {trend >= 0 ?
                  <TrendingUp className="h-8 w-8 text-red-400" data-id="8s9tjofho" data-path="src/pages/TrackerPage.tsx" /> :

                  <TrendingDown className="h-8 w-8 text-green-400" data-id="4619l6abj" data-path="src/pages/TrackerPage.tsx" />
                  }
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} data-id="jevtiedyh" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-lg" data-id="ln7gstrgg" data-path="src/pages/TrackerPage.tsx">
              <CardContent className="p-6" data-id="4hq7etnbl" data-path="src/pages/TrackerPage.tsx">
                <div className="flex items-center justify-between" data-id="hlbgc2gp3" data-path="src/pages/TrackerPage.tsx">
                  <div data-id="l3dolk10z" data-path="src/pages/TrackerPage.tsx">
                    <p className="text-gray-600 text-sm font-medium" data-id="7brdpxuf5" data-path="src/pages/TrackerPage.tsx">Entries</p>
                    <p className="text-2xl font-bold text-gray-900" data-id="ed66484cz" data-path="src/pages/TrackerPage.tsx">{usageData.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" data-id="415amkmpk" data-path="src/pages/TrackerPage.tsx" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-id="2tiww00gf" data-path="src/pages/TrackerPage.tsx">
          {/* Data Entry Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }} data-id="cwtarvble" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-xl" data-id="79wf0znnf" data-path="src/pages/TrackerPage.tsx">
              <CardHeader data-id="1s1ca7u8w" data-path="src/pages/TrackerPage.tsx">
                <CardTitle className="flex items-center space-x-2" data-id="5l1rwcs2u" data-path="src/pages/TrackerPage.tsx">
                  <Plus className="h-6 w-6 text-blue-600" data-id="js32emee2" data-path="src/pages/TrackerPage.tsx" />
                  <span data-id="brgad7clc" data-path="src/pages/TrackerPage.tsx">Log Today's Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6" data-id="uzilzh3wq" data-path="src/pages/TrackerPage.tsx">
                {/* Time Input */}
                <div className="grid grid-cols-2 gap-4" data-id="xe4gutal3" data-path="src/pages/TrackerPage.tsx">
                  <div data-id="e2du29gt2" data-path="src/pages/TrackerPage.tsx">
                    <Label htmlFor="hours" data-id="pkb9p0w76" data-path="src/pages/TrackerPage.tsx">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="24"
                      value={currentEntry.hours}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, hours: e.target.value })}
                      placeholder="0" data-id="5hywyygzd" data-path="src/pages/TrackerPage.tsx" />

                  </div>
                  <div data-id="crmm0a29t" data-path="src/pages/TrackerPage.tsx">
                    <Label htmlFor="minutes" data-id="rk42jqr4x" data-path="src/pages/TrackerPage.tsx">Minutes</Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={currentEntry.minutes}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, minutes: e.target.value })}
                      placeholder="0" data-id="dp8usa8wj" data-path="src/pages/TrackerPage.tsx" />

                  </div>
                </div>

                {/* App Usage Breakdown */}
                <div data-id="2rpqp0c3e" data-path="src/pages/TrackerPage.tsx">
                  <Label data-id="3y8um0a06" data-path="src/pages/TrackerPage.tsx">App Category Usage (minutes)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2" data-id="gr8buriws" data-path="src/pages/TrackerPage.tsx">
                    {currentEntry.apps.map((app, index) =>
                    <div key={app.name} className="flex items-center space-x-2" data-id="2xo75wjb5" data-path="src/pages/TrackerPage.tsx">
                        <Label className="text-sm flex-1" data-id="ktudv151o" data-path="src/pages/TrackerPage.tsx">{app.name}</Label>
                        <Input
                        type="number"
                        min="0"
                        value={app.time}
                        onChange={(e) => updateAppTime(index, parseInt(e.target.value) || 0)}
                        className="w-20"
                        placeholder="0" data-id="o99o46ye4" data-path="src/pages/TrackerPage.tsx" />

                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div data-id="0258s33lf" data-path="src/pages/TrackerPage.tsx">
                  <Label htmlFor="notes" data-id="rn3k8uvqa" data-path="src/pages/TrackerPage.tsx">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                    placeholder="How did you feel about your usage today? Any patterns you noticed?"
                    rows={3} data-id="vlg49ndd3" data-path="src/pages/TrackerPage.tsx" />

                </div>

                <Button onClick={saveEntry} className="w-full bg-gradient-to-r from-blue-500 to-purple-500" data-id="04em9p01a" data-path="src/pages/TrackerPage.tsx">
                  <Save className="h-4 w-4 mr-2" data-id="2wjeecrno" data-path="src/pages/TrackerPage.tsx" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }} data-id="l17sjo0s8" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-xl" data-id="6snd5d5jp" data-path="src/pages/TrackerPage.tsx">
              <CardHeader data-id="qjseq1wsd" data-path="src/pages/TrackerPage.tsx">
                <div className="flex justify-between items-center" data-id="uiux3los2" data-path="src/pages/TrackerPage.tsx">
                  <CardTitle data-id="v6iccj856" data-path="src/pages/TrackerPage.tsx">Usage Analytics</CardTitle>
                  <div className="flex space-x-2" data-id="fdd15bgw2" data-path="src/pages/TrackerPage.tsx">
                    <Button
                      size="sm"
                      variant={selectedChart === 'line' ? 'default' : 'outline'}
                      onClick={() => setSelectedChart('line')} data-id="ky6w1ua9h" data-path="src/pages/TrackerPage.tsx">

                      <LineChart className="h-4 w-4" data-id="49z8uuad7" data-path="src/pages/TrackerPage.tsx" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedChart === 'bar' ? 'default' : 'outline'}
                      onClick={() => setSelectedChart('bar')} data-id="llw2a2psu" data-path="src/pages/TrackerPage.tsx">

                      <BarChart3 className="h-4 w-4" data-id="4sk05q6xi" data-path="src/pages/TrackerPage.tsx" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedChart === 'doughnut' ? 'default' : 'outline'}
                      onClick={() => setSelectedChart('doughnut')} data-id="4ou240zcz" data-path="src/pages/TrackerPage.tsx">

                      <PieChart className="h-4 w-4" data-id="jyojtutwb" data-path="src/pages/TrackerPage.tsx" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent data-id="gnmgghr1j" data-path="src/pages/TrackerPage.tsx">
                {usageData.length > 0 ?
                <div className="h-80" data-id="hg275s4yo" data-path="src/pages/TrackerPage.tsx">
                    {selectedChart === 'line' &&
                  <Line data={lineChartData} options={chartOptions} data-id="wzt8fmusu" data-path="src/pages/TrackerPage.tsx" />
                  }
                    {selectedChart === 'bar' &&
                  <Bar data={barChartData} options={chartOptions} data-id="ni0qagr3n" data-path="src/pages/TrackerPage.tsx" />
                  }
                    {selectedChart === 'doughnut' && Object.keys(appUsageData).length > 0 &&
                  <Doughnut data={doughnutData} options={chartOptions} data-id="15bxo449a" data-path="src/pages/TrackerPage.tsx" />
                  }
                  </div> :

                <div className="h-80 flex items-center justify-center" data-id="wz4hb2qnh" data-path="src/pages/TrackerPage.tsx">
                    <div className="text-center" data-id="309uuym4u" data-path="src/pages/TrackerPage.tsx">
                      <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" data-id="790zie8ju" data-path="src/pages/TrackerPage.tsx" />
                      <p className="text-gray-500" data-id="du4frvqot" data-path="src/pages/TrackerPage.tsx">No data yet. Start logging your usage!</p>
                    </div>
                  </div>
                }
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Entries */}
        {usageData.length > 0 &&
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8" data-id="mmonfp87r" data-path="src/pages/TrackerPage.tsx">

            <Card className="border-0 shadow-xl" data-id="oktzo4leb" data-path="src/pages/TrackerPage.tsx">
              <CardHeader data-id="ev28723jm" data-path="src/pages/TrackerPage.tsx">
                <CardTitle data-id="eslvv44cn" data-path="src/pages/TrackerPage.tsx">Recent Entries</CardTitle>
              </CardHeader>
              <CardContent data-id="d3onjqkyo" data-path="src/pages/TrackerPage.tsx">
                <div className="space-y-4" data-id="bn69ecsbo" data-path="src/pages/TrackerPage.tsx">
                  {usageData.slice(0, 5).map((entry) =>
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" data-id="ae0sz214k" data-path="src/pages/TrackerPage.tsx">
                      <div className="flex-1" data-id="6qhmp17e0" data-path="src/pages/TrackerPage.tsx">
                        <div className="flex items-center space-x-4" data-id="csbb3ny7d" data-path="src/pages/TrackerPage.tsx">
                          <div data-id="mnksio1qv" data-path="src/pages/TrackerPage.tsx">
                            <p className="font-medium text-gray-900" data-id="delhyd7my" data-path="src/pages/TrackerPage.tsx">
                              {new Date(entry.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600" data-id="qnmd5pjss" data-path="src/pages/TrackerPage.tsx">
                              {entry.hours}h {entry.minutes}m total usage
                            </p>
                          </div>
                          {entry.notes &&
                      <div className="flex-1" data-id="t7kaxpm6g" data-path="src/pages/TrackerPage.tsx">
                              <p className="text-sm text-gray-600 italic" data-id="6dtm0gdjg" data-path="src/pages/TrackerPage.tsx">"{entry.notes}"</p>
                            </div>
                      }
                        </div>
                      </div>
                      <div className="text-right" data-id="f3dw6ue18" data-path="src/pages/TrackerPage.tsx">
                        {entry.apps.length > 0 &&
                    <div className="text-xs text-gray-500" data-id="5drdp83fd" data-path="src/pages/TrackerPage.tsx">
                            {entry.apps.map((app) => `${app.name}: ${app.time}m`).join(', ')}
                          </div>
                    }
                      </div>
                    </div>
                )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        }
      </div>
    </div>);

};

export default TrackerPage;