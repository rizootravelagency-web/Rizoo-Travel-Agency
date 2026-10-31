import React, { useState } from 'react';
import { User } from '../../types';
import { X, Lock, Phone, Mail, User as UserIcon, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from '../common/Logo';

interface LoginRegisterModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [authMode, setAuthMode] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('7007303250');
  const [email, setEmail] = useState('candidate@example.com');
  const [password, setPassword] = useState('RizooPass123');
  const [fullName, setFullName] = useState('Mohd Rehan Khan');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setOtpCode('8921'); // Simulated OTP autofill for instant convenience
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const user: User = {
        id: 'user-' + Date.now(),
        fullName: fullName || 'Mohd Rehan Khan',
        mobileNumber: mobileNumber || '7007303250',
        email: email || 'rehan.khan98@gmail.com',
        city: 'Maharajganj',
        state: 'Uttar Pradesh',
        education: '12th Pass (Intermediate)',
        experience: '2 Years Warehouse and Material Handling',
        skills: ['Material Handling', 'Loading', 'Inventory Counting'],
        registeredAt: new Date().toISOString(),
        status: 'Active',
      };
      onLoginSuccess(user);
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: User = {
      id: 'user-demo-1',
      fullName: 'Mohd Rehan Khan',
      mobileNumber: '9839123456',
      email: 'rehan.khan98@gmail.com',
      preferredCategory: 'wh-labour',
      preferredCountry: 'sa',
      city: 'Maharajganj',
      state: 'Uttar Pradesh',
      education: '12th Pass (Intermediate)',
      experience: '2 Years Warehouse and Material Handling',
      skills: ['Pallet Jack', 'Packing', 'Loading'],
      registeredAt: '2026-10-20T12:00:00Z',
      status: 'Active',
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white flex items-center justify-between">
          <Logo size="sm" variant="dark" showTagline={false} />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {isRegister ? 'Create Your Candidate Account' : 'Welcome Back to RIZOO JOB'}
            </h2>
            <p className="text-slate-500 mt-0.5">
              {isRegister
                ? 'Register to apply for verified Gulf & Europe jobs.'
                : 'Sign in to access applications and interview schedules.'}
            </p>
          </div>

          {/* Mode Selector (Mobile OTP vs Email/Password) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('mobile')}
              className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'mobile'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                authMode === 'email'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Email & Password
            </button>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-3">
            {isRegister && (
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mohd Rehan Khan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
                />
              </div>
            )}

            {authMode === 'mobile' ? (
              <div>
                <label className="block text-slate-700 font-bold mb-1">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="px-2.5 py-2 rounded-xl bg-slate-100 border border-slate-300 font-bold text-slate-700 flex items-center">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Send OTP
                    </button>
                  )}
                </div>

                {otpSent && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span>Enter 4-Digit OTP Code</span>
                      <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                        Auto-generated: 8921
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="8921"
                      className="w-full px-3 py-2 rounded-xl border border-blue-300 font-black text-center text-base tracking-widest outline-none bg-white"
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-2"
            >
              {loading
                ? 'Authenticating...'
                : isRegister
                ? 'Create Candidate Account'
                : 'Sign In to My Account'}
            </button>
          </form>

          {/* Quick Demo Autofill */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Test Candidate Login (Mohd Rehan)</span>
            </button>
          </div>

          {/* Toggle Login / Register */}
          <div className="text-center pt-1 text-slate-500">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New job seeker?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
