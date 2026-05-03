export const CONTACT_INFO = {
  phone: '+420 603 879 921',
  phoneRaw: '+420603879921',
  email: 'panoramatrojmezi@gmail.com',
  address: 'Dolní Lomná 347, 739 91',
  facebook: 'https://www.facebook.com/panoramatrojmezi',
  eChalupyId: '22814'
};

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/panoramatrojmezi'
};

export const APP_CONFIG = {
  name: 'Panorama Trojmezí',
  stars: 5,
  rating: '5.0'
};

export const PRICING = {
  highSeason: {
    dates: '16. 5. – 15. 9. & 15. 12. – 15. 3.',
    week: '28 000 Kč',
    shortStay: '12 000 Kč',
    extraNight: '4 000 Kč'
  },
  lowSeason: {
    dates: '16. 9. – 14. 12. & 16. 3. – 15. 5.',
    week: '21 000 Kč',
    shortStay: '9 000 Kč',
    extraNight: '3 000 Kč'
  },
  holidays: [
    { name: 'Vánoce', price: '30 000 Kč / týden' },
    { name: 'Silvestr', price: '35 000 Kč / týden' },
    { name: 'Velikonoce', price: '15 000 Kč / pobyt' }
  ]
};

export const NAVIGATION = [
  { id: 'home', labelKey: 'nav.home', path: '/' },
  { id: 'apartments', labelKey: 'nav.apartments', path: '/apartmany' },
  { id: 'booking', labelKey: 'nav.booking', path: '/rezervace' },
  { id: 'tips', labelKey: 'nav.tips', path: '/tipy' },
  { id: 'contact', labelKey: 'nav.contact', path: '/kontakt' }
];
