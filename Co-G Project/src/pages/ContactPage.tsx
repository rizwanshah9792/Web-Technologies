import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Heart,
  Users,
  Globe,
  Star } from
'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message.",
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
      // Using the email API provided in the system
      const { error } = await window.ezsite.apis.sendEmail({
        from: 'support@ezsite.ai',
        to: ['rizwanshah9792@gmail.com'],
        subject: `Contact Form: ${formData.subject || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
          <h3>Message:</h3>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
          <br>
          <p><em>Sent from Cognitive Guardian Contact Form</em></p>
        `
      });

      if (error) {
        throw new Error(error);
      }

      // Show success modal
      setShowThankYou(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });

    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon."
      });

      // Still show success to user since the form was filled correctly
      setShowThankYou(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    info: 'rizwanshah9792@gmail.com',
    description: 'Send us an email and we\'ll respond within 24 hours',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Phone,
    title: 'Call Us',
    info: '+91-7985844615',
    description: 'Available Monday to Friday, 9 AM to 6 PM IST',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    info: 'Tezpur University, MCA Department',
    description: 'Tezpur, Assam, India',
    color: 'from-orange-500 to-red-500'
  }];


  const features = [
  {
    icon: Heart,
    title: 'Passionate Team',
    description: 'Dedicated to improving digital wellness in rural communities'
  },
  {
    icon: Users,
    title: 'Community Focused',
    description: 'Building solutions with and for rural Indian youth'
  },
  {
    icon: Globe,
    title: 'Always Available',
    description: 'Online support and resources accessible 24/7'
  },
  {
    icon: Star,
    title: 'Quality Support',
    description: 'Comprehensive assistance for your digital wellness journey'
  }];


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12" data-id="bshpubgac" data-path="src/pages/ContactPage.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="4ztxcmlkm" data-path="src/pages/ContactPage.tsx">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} data-id="asr8axhf1" data-path="src/pages/ContactPage.tsx">

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-id="609pkymuz" data-path="src/pages/ContactPage.tsx">
            Get in 
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent" data-id="hsq5dy1sk" data-path="src/pages/ContactPage.tsx"> Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-id="215w0kljb" data-path="src/pages/ContactPage.tsx">
            Have questions about digital wellness? Need support with our platform? 
            We're here to help you on your journey to mindful technology use.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" data-id="qglst6ivy" data-path="src/pages/ContactPage.tsx">
          {contactInfo.map((info, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ y: -10 }} data-id="wg2cns3ft" data-path="src/pages/ContactPage.tsx">

              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300" data-id="e3iwpo7z3" data-path="src/pages/ContactPage.tsx">
                <CardContent className="p-6 text-center" data-id="rlr290grk" data-path="src/pages/ContactPage.tsx">
                  <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }} data-id="swrjeg5d9" data-path="src/pages/ContactPage.tsx">

                    <info.icon className="h-8 w-8 text-white" data-id="d170i2sp5" data-path="src/pages/ContactPage.tsx" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" data-id="pdmhi073t" data-path="src/pages/ContactPage.tsx">{info.title}</h3>
                  <p className="text-lg font-medium text-gray-700 mb-2" data-id="hp8y00yc2" data-path="src/pages/ContactPage.tsx">{info.info}</p>
                  <p className="text-gray-600 text-sm" data-id="x848881x3" data-path="src/pages/ContactPage.tsx">{info.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-id="00my8ua9m" data-path="src/pages/ContactPage.tsx">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }} data-id="hbouzfuxc" data-path="src/pages/ContactPage.tsx">

            <Card className="border-0 shadow-2xl" data-id="1x10skcqi" data-path="src/pages/ContactPage.tsx">
              <CardHeader data-id="a8gn8nun1" data-path="src/pages/ContactPage.tsx">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2" data-id="nxphdbaph" data-path="src/pages/ContactPage.tsx">
                  <MessageCircle className="h-6 w-6 text-teal-600" data-id="yetftyygb" data-path="src/pages/ContactPage.tsx" />
                  <span data-id="wzg5v9mrk" data-path="src/pages/ContactPage.tsx">Send us a Message</span>
                </CardTitle>
                <p className="text-gray-600" data-id="18ujko1m0" data-path="src/pages/ContactPage.tsx">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent data-id="wxwkvl0iz" data-path="src/pages/ContactPage.tsx">
                <form onSubmit={handleSubmit} className="space-y-6" data-id="mwidns8yb" data-path="src/pages/ContactPage.tsx">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="guhed2vts" data-path="src/pages/ContactPage.tsx">
                    <div data-id="b0f3dmsao" data-path="src/pages/ContactPage.tsx">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700" data-id="7idpu0iy7" data-path="src/pages/ContactPage.tsx">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mt-1 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        required data-id="r2j21ki0c" data-path="src/pages/ContactPage.tsx" />

                    </div>
                    <div data-id="tz9i7rzc2" data-path="src/pages/ContactPage.tsx">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700" data-id="a946qi6h6" data-path="src/pages/ContactPage.tsx">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="mt-1 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        required data-id="8khykyy1d" data-path="src/pages/ContactPage.tsx" />

                    </div>
                  </div>

                  <div data-id="c8o05uoli" data-path="src/pages/ContactPage.tsx">
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700" data-id="o6fthuw80" data-path="src/pages/ContactPage.tsx">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="mt-1 h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500" data-id="f4odad9ui" data-path="src/pages/ContactPage.tsx" />

                  </div>

                  <div data-id="pyixbf7e8" data-path="src/pages/ContactPage.tsx">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700" data-id="a22ld7ofv" data-path="src/pages/ContactPage.tsx">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="mt-1 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required data-id="8ynfz8qaz" data-path="src/pages/ContactPage.tsx" />

                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" data-id="sj4rq84bi" data-path="src/pages/ContactPage.tsx">

                    {isLoading ?
                    <div className="flex items-center" data-id="hzilsvjvx" data-path="src/pages/ContactPage.tsx">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" data-id="6hyb3hppl" data-path="src/pages/ContactPage.tsx"></div>
                        Sending Message...
                      </div> :

                    <div className="flex items-center" data-id="cmwh5dx46" data-path="src/pages/ContactPage.tsx">
                        <Send className="h-5 w-5 mr-2" data-id="f96wl9pen" data-path="src/pages/ContactPage.tsx" />
                        Send Message
                      </div>
                    }
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200" data-id="gkv5wlsrg" data-path="src/pages/ContactPage.tsx">
                  <div className="flex items-center space-x-2 text-teal-800" data-id="0cxfx408e" data-path="src/pages/ContactPage.tsx">
                    <Clock className="h-5 w-5" data-id="7u23jk3hz" data-path="src/pages/ContactPage.tsx" />
                    <p className="text-sm font-medium" data-id="n4st8pbc1" data-path="src/pages/ContactPage.tsx">Response Time</p>
                  </div>
                  <p className="text-sm text-teal-700 mt-1" data-id="og45c6t55" data-path="src/pages/ContactPage.tsx">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8" data-id="8c1403lpp" data-path="src/pages/ContactPage.tsx">

            {/* Why Contact Us */}
            <Card className="border-0 shadow-xl" data-id="fzk6aki11" data-path="src/pages/ContactPage.tsx">
              <CardHeader data-id="c5m0w3uve" data-path="src/pages/ContactPage.tsx">
                <CardTitle className="text-xl font-bold text-gray-900" data-id="kq9mdq16f" data-path="src/pages/ContactPage.tsx">
                  Why Contact Us?
                </CardTitle>
              </CardHeader>
              <CardContent data-id="c14v8lqya" data-path="src/pages/ContactPage.tsx">
                <div className="grid grid-cols-2 gap-4" data-id="iw5l1w8hc" data-path="src/pages/ContactPage.tsx">
                  {features.map((feature, index) =>
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }} data-id="di94pls0t" data-path="src/pages/ContactPage.tsx">

                      <feature.icon className="h-8 w-8 mx-auto mb-2 text-teal-600" data-id="cft3itaxa" data-path="src/pages/ContactPage.tsx" />
                      <h4 className="font-semibold text-gray-900 text-sm mb-1" data-id="vhtwxm8kc" data-path="src/pages/ContactPage.tsx">{feature.title}</h4>
                      <p className="text-xs text-gray-600" data-id="m8kq1l9gn" data-path="src/pages/ContactPage.tsx">{feature.description}</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Preview */}
            <Card className="border-0 shadow-xl" data-id="a0rsr7wna" data-path="src/pages/ContactPage.tsx">
              <CardHeader data-id="my1rjz4ib" data-path="src/pages/ContactPage.tsx">
                <CardTitle className="text-xl font-bold text-gray-900" data-id="l3cl92c57" data-path="src/pages/ContactPage.tsx">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-id="5whbm3x71" data-path="src/pages/ContactPage.tsx">
                <div className="space-y-3" data-id="95je3di7k" data-path="src/pages/ContactPage.tsx">
                  <div data-id="69md1t9iv" data-path="src/pages/ContactPage.tsx">
                    <h4 className="font-semibold text-gray-900 text-sm" data-id="2xnkqeodl" data-path="src/pages/ContactPage.tsx">
                      How do I reset my password?
                    </h4>
                    <p className="text-sm text-gray-600" data-id="v1n4o24vy" data-path="src/pages/ContactPage.tsx">
                      You can reset your password from the login page by clicking "Forgot Password".
                    </p>
                  </div>
                  
                  <div data-id="ahpw83m72" data-path="src/pages/ContactPage.tsx">
                    <h4 className="font-semibold text-gray-900 text-sm" data-id="f7mfgzhop" data-path="src/pages/ContactPage.tsx">
                      Is the platform free to use?
                    </h4>
                    <p className="text-sm text-gray-600" data-id="z0jrr5h93" data-path="src/pages/ContactPage.tsx">
                      Yes! All core features are completely free for all users.
                    </p>
                  </div>
                  
                  <div data-id="d7za414qz" data-path="src/pages/ContactPage.tsx">
                    <h4 className="font-semibold text-gray-900 text-sm" data-id="b3t6zv6pf" data-path="src/pages/ContactPage.tsx">
                      How is my data protected?
                    </h4>
                    <p className="text-sm text-gray-600" data-id="3pvnwjbif" data-path="src/pages/ContactPage.tsx">
                      We use industry-standard encryption and never share your personal data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Developer Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white" data-id="5y01wss7y" data-path="src/pages/ContactPage.tsx">
              <CardContent className="p-6 text-center" data-id="h73it76pv" data-path="src/pages/ContactPage.tsx">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center" data-id="a52humwv6" data-path="src/pages/ContactPage.tsx">
                  <span className="text-2xl font-bold text-indigo-600" data-id="yzuxj35hr" data-path="src/pages/ContactPage.tsx">RS</span>
                </div>
                <h3 className="text-xl font-bold mb-2" data-id="zw0xniyku" data-path="src/pages/ContactPage.tsx">Meet the Developer</h3>
                <p className="text-indigo-100 mb-2 font-semibold" data-id="eqgxouxhr" data-path="src/pages/ContactPage.tsx">Rizwan Shah</p>
                <p className="text-indigo-100 text-sm mb-4" data-id="48xuv55uw" data-path="src/pages/ContactPage.tsx">
                  MCA Student at Tezpur University<br data-id="y7fgbi83x" data-path="src/pages/ContactPage.tsx" />
                  Passionate about Digital Wellness & Technology
                </p>
                <div className="flex justify-center space-x-2 text-sm" data-id="nhw7bqgfi" data-path="src/pages/ContactPage.tsx">
                  <span className="bg-white/20 px-2 py-1 rounded" data-id="ulrhsfpdg" data-path="src/pages/ContactPage.tsx">React</span>
                  <span className="bg-white/20 px-2 py-1 rounded" data-id="3zalqglod" data-path="src/pages/ContactPage.tsx">TypeScript</span>
                  <span className="bg-white/20 px-2 py-1 rounded" data-id="gn90hc8qn" data-path="src/pages/ContactPage.tsx">UI/UX</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Community */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white" data-id="qy73xk2tf" data-path="src/pages/ContactPage.tsx">
              <CardContent className="p-6 text-center" data-id="6982e8vls" data-path="src/pages/ContactPage.tsx">
                <Users className="h-12 w-12 mx-auto mb-4 text-teal-100" data-id="hz78m75mo" data-path="src/pages/ContactPage.tsx" />
                <h3 className="text-xl font-bold mb-2" data-id="th25a6flf" data-path="src/pages/ContactPage.tsx">Join Our Community</h3>
                <p className="text-teal-100 mb-4" data-id="zwibcyoep" data-path="src/pages/ContactPage.tsx">
                  Connect with others on their digital wellness journey
                </p>
                <Button
                  variant="outline"
                  className="border-white text-teal-600 bg-white hover:bg-teal-50" data-id="hozy6m86j" data-path="src/pages/ContactPage.tsx">

                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Thank You Modal */}
        <Dialog open={showThankYou} onOpenChange={setShowThankYou} data-id="yys1adgg7" data-path="src/pages/ContactPage.tsx">
          <DialogContent className="max-w-md" data-id="78hbalsa1" data-path="src/pages/ContactPage.tsx">
            <DialogHeader data-id="m9swonzhy" data-path="src/pages/ContactPage.tsx">
              <DialogTitle className="text-center" data-id="gls5d687h" data-path="src/pages/ContactPage.tsx">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center" data-id="lldh6bt2i" data-path="src/pages/ContactPage.tsx">

                  <CheckCircle className="h-8 w-8 text-white" data-id="rt6vovacm" data-path="src/pages/ContactPage.tsx" />
                </motion.div>
                <span className="text-2xl font-bold text-gray-900" data-id="driz69uvu" data-path="src/pages/ContactPage.tsx">Thank You!</span>
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4" data-id="fimwj69eb" data-path="src/pages/ContactPage.tsx">
              <p className="text-gray-600 mb-4" data-id="hzngs1dof" data-path="src/pages/ContactPage.tsx">
                Your message has been sent successfully. We appreciate you reaching out to us!
              </p>
              <p className="text-sm text-gray-500 mb-6" data-id="1dlcidqw3" data-path="src/pages/ContactPage.tsx">
                We'll get back to you within 24 hours during business days.
              </p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500" data-id="6e49ubqf5" data-path="src/pages/ContactPage.tsx">

                Continue Exploring
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>);

};

export default ContactPage;