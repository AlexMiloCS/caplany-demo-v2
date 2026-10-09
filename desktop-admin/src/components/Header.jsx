import React from 'react';
import { Waves, Sparkles, Truck, Receipt, ShieldCheck, Map } from 'lucide-react';

export default function Header({ activeView, setActiveView, onSimulateVisit, canSimulate }) {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md text-white">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wider text-base sm:text-lg font-mono">
                <span className="text-blue-600">CAPLANY</span> <span className="text-slate-950">POOL SERVICES</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-bold tracking-wide">
                ΚΕΝΤΡΟ ΕΠΙΧΕΙΡΗΣΕΩΝ
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-600">2 Βαν σε Δρομολόγιο • Χανιά</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveView('dispatch')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'dispatch'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-slate-800" />
            <span>Ημερήσια Δρομολόγια</span>
          </button>

          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'map'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-slate-800" />
            <span>Χάρτης</span>
          </button>

          <button
            onClick={() => setActiveView('ledger')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'ledger'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-slate-800" />
            <span>Χρεώσεις</span>
          </button>

          <button
            onClick={() => setActiveView('assets')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'assets'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
            <span>Ακίνητα & Εξοπλισμός</span>
          </button>
        </div>

        {/* Quick Pitch Simulation Tool */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateVisit}
            disabled={!canSimulate}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              canSimulate
                ? 'bg-slate-950 hover:bg-slate-800 text-white active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
            title="Προσομοιώνει την ολοκλήρωση μίας πισίνας με καταγραφή ετικετών και ιδανικής χημείας"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{canSimulate ? 'Προσομοίωση Πεδίου ⚡' : 'Όλες Ολοκληρώθηκαν ✓'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
