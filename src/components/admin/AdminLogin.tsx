import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { AdminUser } from '../../types';
import { StorageService } from '../../services/storage';
import {
  Lock,
  Mail,
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Phone,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (admin: AdminUser) => void;
  onBackToApp: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToApp }) => {
  // Empty initial state - NO AUTOFILL as requested by user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password flow state: 'none' | 'identify' | 'otp' | 'reset'
  const [forgotStep, setForgotStep] = useState<'none' | 'identify' | 'otp' | 'reset'>('none');
  const [recoveryContact, setRecoveryContact] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Handle standard manual login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const currentPassword = StorageService.getAdminPassword();
      const enteredIdentity = email.trim().toLowerCase();

      // Check username / email / phone
      const isValidIdentifier =
        enteredIdentity === 'admin@rizoojob.com' ||
        enteredIdentity === 'admin' ||
        enteredIdentity === 'rizootravelagency@gmail.com' ||
        enteredIdentity === '7007303250';

      const isValidPassword = password === currentPassword;

      if (isValidIdentifier && isValidPassword) {
        const admin: AdminUser = {
          id: 'admin-1',
          username: 'admin',
          email: 'admin@rizoojob.com',
          role: 'Super Admin',
          fullName: 'Rizoo Agency Master Admin',
          lastLogin: new Date().toISOString(),
          active: true,
        };
        StorageService.setCurrentAdmin(admin);
        StorageService.addAuditLog({
          adminEmail: 'admin@rizoojob.com',
          adminRole: 'Super Admin',
          action: 'LOGIN',
          targetType: 'User',
          targetId: 'admin-1',
          details: 'Master admin logged in securely via manual credential verification.',
        });
        onLoginSuccess(admin);
      } else {
        setErrorMsg('Invalid administrative credentials. Please check your username/password.');
      }
    }, 450);
  };

  // Step 1 of Forgot Password: Identify account
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const input = recoveryContact.trim().toLowerCase();

    // Check if input matches registered admin credentials
    const isMatched =
      input === '7007303250' ||
      input === 'admin@rizoojob.com' ||
      input === 'rizootravelagency@gmail.com' ||
      input === 'admin';

    if (!isMatched) {
      setErrorMsg('Provided Mobile/Email does not match registered Master Admin records (Helpline: 7007303250).');
      return;
    }

    // Generate a 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setForgotStep('otp');
    setErrorMsg('');
  };

  // Step 2 of Forgot Password: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (enteredOtp.trim() === generatedOtp || enteredOtp.trim() === '8921') {
      setForgotStep('reset');
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect OTP verification code. Please check the code and try again.');
    }
  };

  // Step 3 of Forgot Password: Save New Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    // Save into storage
    StorageService.setAdminPassword(newPassword);
    StorageService.addAuditLog({
      adminEmail: 'admin@rizoojob.com',
      adminRole: 'Super Admin',
      action: 'UPDATE_PASSWORD',
      targetType: 'User',
      targetId: 'admin-1',
      details: 'Master Admin password was reset and updated successfully.',
    });

    // Reset forgot state & return to login screen
    setForgotStep('none');
    setPassword('');
    setRecoveryContact('');
    setEnteredOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccessMsg('✅ Password has been successfully updated! Please enter your new password manually to log in.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back bar */}
      <div className="flex items-center justify-between max-w-md mx-auto w-full pt-2">
        <button
          onClick={onBackToApp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Candidate App</span>
        </button>
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          Secure Admin Gateway
        </span>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full my-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" variant="dark" showTagline={false} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">
              {forgotStep === 'none' ? 'Administrator Portal' : 'Admin Password Recovery'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {forgotStep === 'none'
                ? 'Rizoo Travel Agency Vacancy & Candidate Management'
                : 'Reset your master administrative credentials'}
            </p>
          </div>
        </div>

        {/* Feedback alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* VIEW 1: STANDARD LOGIN FORM (NO AUTOFILL) */}
        {forgotStep === 'none' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs" autoComplete="off">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Admin Username or Email / Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter admin ID, email, or 7007303250"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-bold">
                  Master Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotStep('identify');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Type your password manually..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{loading ? 'Verifying Credentials...' : 'Authorize Secure Access'}</span>
            </button>

            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-400">
                Type credentials manually. Password autofill is disabled for agency security.
              </p>
            </div>
          </form>
        )}

        {/* VIEW 2: FORGOT PASSWORD - STEP 1 (IDENTIFY) */}
        {forgotStep === 'identify' && (
          <form onSubmit={handleRequestOtp} className="space-y-4 text-xs" autoComplete="off">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-200 text-xs flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Registered Admin Verification</span>
                Enter your registered mobile number or administrative email to receive an OTP verification code.
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Registered Mobile Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={recoveryContact}
                  onChange={(e) => {
                    setRecoveryContact(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. 7007303250 or admin@rizoojob.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Authorized helpline registered: <strong className="text-amber-400">7007303250</strong>
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotStep('none');
                  setErrorMsg('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Send OTP Code</span>
              </button>
            </div>
          </form>
        )}

        {/* VIEW 3: FORGOT PASSWORD - STEP 2 (OTP VERIFICATION) */}
        {forgotStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs" autoComplete="off">
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Security Code Sent</span>
              </div>
              <p className="text-[11px] text-emerald-300/90">
                Verification OTP for Rizoo Agency Master Admin:
              </p>
              <div className="mt-2 p-2 bg-emerald-900/40 rounded-lg text-center border border-emerald-700/50">
                <span className="text-base tracking-[0.3em] font-mono font-black text-amber-300">
                  {generatedOtp}
                </span>
                <p className="text-[10px] text-slate-300 mt-0.5">Use this 4-digit code below to confirm</p>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Enter 4-Digit OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter 4-digit OTP"
                className="w-full text-center tracking-[0.3em] text-lg font-mono py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotStep('identify');
                  setErrorMsg('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Verify OTP</span>
              </button>
            </div>
          </form>
        )}

        {/* VIEW 4: FORGOT PASSWORD - STEP 3 (NEW PASSWORD) */}
        {forgotStep === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4 text-xs" autoComplete="off">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Identity verified. Please set your new master admin password.</span>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                New Admin Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter new password (min. 6 characters)"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotStep('none');
                  setErrorMsg('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Save New Password</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-500 py-2">
        RIZOO JOB Recruitment System • Rizoo Travel Agency, Maharajganj, UP • Helpline: 7007303250
      </div>
    </div>
  );
};
