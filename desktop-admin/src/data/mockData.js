export const initialProperties = [
  {
    id: 'prop-1',
    name: 'Villa Balos View',
    customer: 'Νίκος Σφακιανάκης',
    phone: '+30 694 123 4567',
    location: 'Σταυρός, Ακρωτήρι Χανίων',
    lat: 35.5900,
    lng: 24.0950,
    gateCode: '#4921 (Lockbox στο πέτρινο τοιχίο δίπλα στην ελιά)',
    poolSpecs: {
      volume: '75 m³',
      system: 'Ηλεκτρόλυση Άλατος (Zodiac Tri)',
      pump: 'Hayward Super Pump 1.5HP',
      filter: 'Hayward Sand Filter Pro'
    },
    status: 'ΟΛΟΚΛΗΡΩΘΗΚΕ',
    scheduledTime: '09:30',
    completedAt: '10:15',
    technician: 'Νίκος Κ.',
    basePlanMonthly: 180,
    tagsUsed: [
      { id: 't1', name: '+5kg Χλώριο Σοκ', price: 25, isBillable: true },
      { id: 't2', name: 'Αντίστροφη Πλύση (Backwash)', price: 0, isBillable: false },
      { id: 't3', name: 'Καθαρισμός Skimmer', price: 0, isBillable: false }
    ],
    chemistry: { ph: 7.3, chlorine: 2.1, status: 'ΙΔΑΝΙΚΟ' },
    photoUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
    notes: 'Νερό κρυστάλλινο. Αντίστροφη πλύση φίλτρου μετά από δυνατούς ανέμους μελτεμιού.',
    paymentStatus: 'ΠΛΗΡΩΘΗΚΕ'
  },
  {
    id: 'prop-2',
    name: 'Kriti Horizon Luxury Suites',
    customer: 'Μαρία Βαρδουλάκη',
    phone: '+30 697 889 0012',
    location: 'Πλατανιάς, Χανιά',
    lat: 35.5180,
    lng: 23.9060,
    gateCode: 'Κωδικός 7740 (Συνεννόηση με ρεσεψιόν σουιτών)',
    poolSpecs: {
      volume: '65 m³',
      system: 'Αυτόματη Δοσομέτρηση Υγρού Χλωρίου',
      pump: 'Speck BADU Top II',
      filter: 'AstralPool Cantabric'
    },
    status: 'ΣΕ ΕΞΕΛΙΞΗ',
    scheduledTime: '11:00',
    completedAt: null,
    technician: 'Γιάννης Π.',
    basePlanMonthly: 170,
    tagsUsed: [
      { id: 't4', name: '+25kg Αλάτι Πισίνας', price: 14, isBillable: true },
      { id: 't5', name: '+2L Αλγοκτόνο / Διαυγαστικό', price: 18, isBillable: true }
    ],
    chemistry: { ph: 7.5, chlorine: 1.8, status: 'ΣΕ ΕΞΕΛΙΞΗ' },
    photoUrl: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=600&q=80',
    notes: 'Προσθήκη σάκου άλατος. Τρίψιμο γραμμής νερού (ίσαλος) από αντηλιακά ενοίκων.',
    paymentStatus: 'ΕΚΚΡΕΜΕΙ'
  },
  {
    id: 'prop-3',
    name: 'Villa Diktina & Spa',
    customer: 'Μανώλης Κοντογιάννης',
    phone: '+30 693 456 7890',
    location: 'Κολυμβάρι, Χανιά',
    lat: 35.5450,
    lng: 23.7780,
    gateCode: 'Τηλεχειριστήριο στο πήλινο κιούπι δεξιά της εισόδου',
    poolSpecs: {
      volume: '110 m³',
      system: 'Υπερχείλιση Infinity / Γυάλινο Υπόστρωμα',
      pump: 'Pentair IntelliFlo Variable Speed',
      filter: 'Pentair Triton II'
    },
    status: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΟ',
    scheduledTime: '13:30',
    completedAt: null,
    technician: 'Γιάννης Π.',
    basePlanMonthly: 240,
    tagsUsed: [],
    chemistry: null,
    photoUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    notes: 'Άφιξη VIP επισκεπτών Airbnb. Έλεγχος δεξαμενής εξισορρόπησης υπερχείλισης.',
    paymentStatus: 'ΠΛΗΡΩΘΗΚΕ'
  },
  {
    id: 'prop-4',
    name: 'Apokoronas Olive Retreat',
    customer: 'Lars & Ingrid Haug',
    phone: '+30 698 111 2233',
    location: 'Αλμυρίδα, Αποκόρωνας Χανίων',
    lat: 35.4490,
    lng: 24.2010,
    gateCode: 'Πληκτρολόγιο εισόδου: 1984#',
    poolSpecs: {
      volume: '85 m³',
      system: 'Πισίνα Ορυκτών Μαγνησίου',
      pump: 'Hayward MaxFlo XL',
      filter: 'Hayward Cartridge Filter'
    },
    status: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΟ',
    scheduledTime: '15:15',
    completedAt: null,
    technician: 'Νίκος Κ.',
    basePlanMonthly: 210,
    tagsUsed: [],
    chemistry: null,
    photoUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
    notes: 'Έλεγχος διαφορικής πίεσης στο φυσίγγιο φίλτρου.',
    paymentStatus: 'ΛΗΞΙΠΡΟΘΕΣΜΟ'
  },
  {
    id: 'prop-5',
    name: 'Chania Blue Pearl Villa',
    customer: 'Γιώργος Πετράκης (Manager)',
    phone: '+30 695 555 4433',
    location: 'Αγία Μαρίνα, Χανιά',
    lat: 35.5190,
    lng: 23.9280,
    gateCode: 'Πλαϊνή είσοδος από τον παραλιακό δρόμο',
    poolSpecs: {
      volume: '95 m³',
      system: 'Επαγγελματικό Χλώριο + UV-C',
      pump: 'Kripsol Koral-KS 2HP',
      filter: 'AstralPool Commercial Sand'
    },
    status: 'ΕΠΕΙΓΟΝ',
    scheduledTime: '16:45',
    completedAt: null,
    technician: 'Χωρίς Ανάθεση',
    basePlanMonthly: 320,
    tagsUsed: [],
    chemistry: { ph: 7.9, chlorine: 0.6, status: 'ΥΨΗΛΟ_PH_ΧΑΜΗΛΟ_CL' },
    photoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    notes: 'ΕΠΕΙΓΟΝ: Θολότητα νερού μετά από πάρτι 30 ατόμων. Απαιτείται άμεση υπερχλωρίωση (σοκ).',
    paymentStatus: 'ΕΚΚΡΕΜΕΙ'
  }
];
