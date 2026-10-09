import React, { useState } from 'react';
import Header from './components/Header';
import MetricsBar from './components/MetricsBar';
import DispatchBoard from './components/DispatchBoard';
import RouteMap from './components/RouteMap';
import ConsumablesLedger from './components/ConsumablesLedger';
import PropertyDirectory from './components/PropertyDirectory';
import PropertyDetailModal from './components/PropertyDetailModal';
import { initialProperties } from './data/mockData';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeView, setActiveView] = useState('dispatch');
  const [toastMessage, setToastMessage] = useState(null);

  // Check if there are any unfinished properties left to simulate
  const nextToFinish = properties.find((p) => p.status !== 'ΟΛΟΚΛΗΡΩΘΗΚΕ');

  const handleSimulateVisit = () => {
    if (!nextToFinish) return;

    const updated = properties.map((p) => {
      if (p.id === nextToFinish.id) {
        return {
          ...p,
          status: 'ΟΛΟΚΛΗΡΩΘΗΚΕ',
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chemistry: { ph: 7.3, chlorine: 2.2, status: 'ΙΔΑΝΙΚΟ' },
          tagsUsed: [
            ...p.tagsUsed,
            { id: `sim-${Date.now()}`, name: '+5kg Χλώριο Σοκ', price: 25, isBillable: true }
          ],
          notes: 'Ολοκληρώθηκε τακτική συντήρηση. Χημεία ισορροπημένη. Ασφαλές για κολύμβηση.',
          paymentStatus: p.paymentStatus === 'ΛΗΞΙΠΡΟΘΕΣΜΟ' ? 'ΛΗΞΙΠΡΟΘΕΣΜΟ' : 'ΕΚΚΡΕΜΕΙ'
        };
      }
      return p;
    });

    setProperties(updated);
    setToastMessage(`⚡ Ενημέρωση Πεδίου: Ο τεχνικός ${nextToFinish.technician || 'Τεχνικός'} ολοκλήρωσε τη συντήρηση στη ${nextToFinish.name}! Οι χρεώσεις καταγράφηκαν.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onSimulateVisit={handleSimulateVisit}
        canSimulate={Boolean(nextToFinish)}
      />

      {/* Real-time simulation toast banner */}
      {toastMessage && (
        <div className="bg-slate-900 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col">
        {/* KPI Ribbon */}
        <MetricsBar properties={properties} />

        {/* Dynamic Workspace Views */}
        <div className="flex-1">
          {activeView === 'dispatch' && (
            <DispatchBoard
              properties={properties}
              onSelectProperty={setSelectedProperty}
            />
          )}

          {activeView === 'map' && (
            <div className="h-[620px]">
              <RouteMap
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={setSelectedProperty}
              />
            </div>
          )}

          {activeView === 'ledger' && (
            <ConsumablesLedger
              properties={properties}
              onSelectProperty={setSelectedProperty}
            />
          )}

          {activeView === 'assets' && (
            <PropertyDirectory
              properties={properties}
              onSelectProperty={setSelectedProperty}
            />
          )}
        </div>
      </main>

      {/* Detail Modal / Drawer */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500 font-medium">
        <span>Caplany Pool Services • Κέντρο Επιχειρησιακού Ελέγχου v1.0 • Στόλος Χανίων, Κρήτη</span>
      </footer>
    </div>
  );
}
