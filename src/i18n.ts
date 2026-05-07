import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  cs: {
    translation: {
      nav: {
        home: 'Domů',
        apartments: 'Apartmány',        
        gallery: 'Galerie',
        tips: 'Tipy na výlet',
        booking: 'VOLNÉ TERMÍNY',
        contact: 'Kontakt',
        admin: 'Administrace'
      },
      seo: {
        title: 'Apartmány Panorama Trojmezí | Luxusní ubytování v Beskydech',
        description: 'Ubytování s privátní saunou s nezapomenutelným výhledem v srdci Beskyd.',
      },
      hero: {
        titlePrefix: 'Apartmány',
        titleMain: 'PANORAMA TROJMEZÍ',
        subtitle: 'Ubytování s nezapomenutelným výhledem v srdci Beskyd.',
        cta: 'Poptat ubytování'
      },
      about: {
        title: 'Ubytování',
        intro: '<p>Vítejte u nás, v malebné vesnici <b>Dolní Lomná</b>, konkrétně v části Novina, která se nachází nad údolím stejnojmenné říčky Lomné v nadmořské výšce cca 600 m.n.m. Oblast je naprosto výjimečná svou polohou v blízkosti státních hranic mezi Českou a Slovenskou republikou a Polskem.</p><p>Naše chalupa je novostavba zkolaudovaná v roce 2024 a nabídne Vám <b>klidné a luxusní ubytování</b> s dechberoucím výhledem na údolí a protější kopce v prostorném a plně vybaveném apartmánu.</p><p>Užijte si krásné chvíle při pěších či cyklo toulkách beskydskou přírodou, v zimním období na běžkách či sjezdovkách v nedalekém lyžařském areálu Severka či odpočinek a pohodu v apartmánu.</p>',
        welcome: {
          title: 'PO PŘÍJEZDU',
          text: 'Na přivítanou na Vás bude čekat láhev vychlazeného skvělého Prosecca. Pro prvotní využití naleznete několik ks kávových kapslí, čaj, dochucovadla. K Vaší případné spotřebě je za poplatek k dispozici víno z jihomoravských Čejkovic za skvělou cenu - vše v přívlastkové kvalitě pozdní sběr nebo výběr z bobulí.'
        },
        sauna: {
          title: 'FINSKÁ SAUNA',
          text: 'V suterénu chalupy se nachádza <b>finská sauna až pro 8 osob</b>, která je při rezervaci týdenního pobytu 1x zdarma. K dispozici jsou saunová prostěradla.'
        }
      },
      gallery: {
        title: 'Fotogalerie',
        viewMore: 'Prohlédnout další fotografie'
      },
      apartments: {
        title: 'Apartmány',
        description: 'Místo pro každého, kdo si potřebuje vyčistit hlavu.',
        intro: 'Objekt nabízí <span class="text-gold font-bold">2 prostorné samostatné a oddělené apartmány</span>, každý s vlastní koupelnou a zázemím.',
        layout: {
          text: '<ul><li><b>1 obývací pokoj s kuchyní a východem na terasu</b></li><li><b>2 ložnice:</b><br>1. pokoj - 1x manželská postel, 1x jednolůžko<br>2. pokoj - 1x manželská postel, 1x patrová postel pro děti</li></ul>'
        },
        features: {
          capacity: 'Až 7 osob',
          size: '75 m²',
          disposition: 'DISPOZICE APARTMÁNU 3+KK + TERASA',
          wifi: 'Wi-Fi zdarma',
          sauna: 'Možnost sauny'
        },
        facilities: {
          title: 'VYBAVENÍ A SLUŽBY',
          viewGallery: 'Prohlédnout fotogalerii',
          viewMorePhotos: 'Prohlédnout více fotografií',
          text: '<p>Přímo z obývacího prostoru se vychází na terasu orientovanou na východ, vybavenou kavárenskými sety pro vaše posezení u kávy či sklenky oblíbeného nápoje. Obývací pokoj je vybaven plochou TV 139 cm se satelitním příjmem. Terasa nabízí výhled na celé panorama této části Beskyd.</p><p>Kuchyně apartmánu je plně vybavena nádobím a jídelním servisem pro 8 osob. Součástí moderní kuchyňské linky je velká lednice se samostatným mrazákem, myčka nádobí, indukční deska, pečící i mikrovlnná trouba, rychlovarná konvice a kapslový kávovar Nespresso.</p><p>Ložnice jsou povlečeny ložním prádlem, v koupelnách naleznete dostatek ručníků a osušek. K dispozici jsou také základní čistící a úklidové prostředky (jar, tablety do myčky, kuchyňské houbičky, utěrky apod.).</p><p>V koupelně je pro vaše pohodlí připraven fén, šampon, mýdlo a toaletní papír. V garáži objektu je možné bezpečně umístit a nabíjet vaše elektrokola.</p>'
        },
        pricing: {
          title: 'Ceník ubytování',
          highSeason: {
            title: 'Hlavní sezóna',
            dates: '16. 5. – 15. 9. & 15. 12. – 15. 3.',
            weeklyPrice: '33.000 Kč',
            shortPrice: '17.000 Kč'
          },
          lowSeason: {
            title: 'Vedlejší sezóna',
            dates: '16. 9. – 14. 12. & 16. 3. – 15. 5.',
            weeklyPrice: '27.000 Kč',
            shortPrice: '15.000 Kč'
          },
          stays: {
            weekly: 'Týdenní pobyt (7 nocí)',
            weeklyDesc: 'Pobyt pro až 7 osob (5 dospělých + 2 děti)',
            short: 'Krátkodobý pobyt (3-4 noci)',
            shortDesc: 'Čt–Ne nebo Ne–Čt'
          },
          footer: 'Cena zahrnuje kromě plně vybaveného apartmánu náklady na elektrickou energii, vodu, úklid a místní poplatky. Součástí ubytování je parkování a venkovní posezení. Při týdenním pobytu cena zahrnuje <span class="text-gold font-bold">1x vstup do finské sauny zdarma</span>, další využití za zvýhodněnou cenu 500 Kč/vstup.',
          special: {
            title: 'Speciální termíny 2026/2027',
            christmas: 'Vánoce 2026',
            christmasPrice: '70.000 Kč',
            silvestr: 'Silvestr 2026/2027',
            silvestrPrice: '80.000 Kč',
            details: 'Celá chalupa, oba apartmány, týden',
            footer: 'Cena zahrnuje elektrickou energii, úklid, místní poplatky a 2x vstup do finské sauny.'
          },
          notesText: '<p>* Cena nezahrnuje využití nabíjení elektromobilu/hybridu.</p><p>* PŘÍSNÝ ZÁKAZ KOUŘENÍ ve všech vnitřních prostorách. ZVÍŘATA NEJSOU POVOLENA.</p><p>* Chalupa se nachází v CHKO Beskydy, prosíme o ohleduplnost k přírodě, sousedům a životnímu prostředí (třídění odpadů)</p>'
        }
      },
      booking: {
        title: 'Volné termíny',
        ctaText: 'Máte vybraný termín? Zašlete nám svou nezávaznou poptávku a my se vám co nejdříve ozveme.',
        legend: {
          free: 'Volno',
          oneApartment: 'Volný 1 apartmán',
          full: 'Obsazen celý objekt'
        }
      },
      tips: {
        title: 'Tipy na výlet',
        description: 'Objevte krásy Beskyd a okolí Trojmezí.',
        preparing: 'Připravujeme..'
      },
      contact: {
        title: 'Kontaktujte nás',
        address: 'Adresa',
        phone: 'Telefon',
        email: 'Email',
        checkIn: 'Check-in: od 16:00',
        checkOut: 'Check-out: do 10:00',
        arrival: {
          title: 'PŘÍJEZD A PARKOVÁNÍ',
          text1: 'Směrem od Jablunkova projedete částí vesnice Dolní Lomná, před pekárnou odbočíte prudce doprava do kopce po místní zpevněné asfaltové cestě a po cca 2 km jste na místě.',
          text2: 'U rodinného domu jsou k dispozici 2 parkovací místa, další parkování je možné před domem nebo garáží.'
        }
      },
      reviews: {
        title: 'Co o nás říkají hosté',
        subtitle: 'Vaše spokojenost je naší největší odměnou.',
        items: [
          {
            name: 'Lucie M.',
            text: 'Nádherné místo. Apartmán byl nový, čistý a luxusně vybavený. Určitě se vrátíme!',
            rating: 5
          },
          {
            name: 'Jan P.',
            text: 'Skvělá lokalita pro dovolenou s rodinou. Majitelé jsou velmi milí a vstřícní.',
            rating: 5
          },
          {
            name: 'Marek S.',
            text: 'S citem zařízený interiér, kde se člověk hned cítí jako doma. Opravdu krásné ubytování a skvělé místo na to si vyčistit hlavu.',
            rating: 5
          }
        ]
      },
      footer: {
        title: 'Místo v srdci Beskyd, kde se zastaví čas.',
        description: 'Luxusní ubytování na pomezí tří států. Místo pro váš odpočinek a nezapomenutelné zážitky v náruči přírody.',
        socialTitle: 'Sledujte nás',
        copyright: 'Panorama Trojmezí'
      },
      error: {
        title404: 'Chyba 404',
        pageNotFound: 'Tato stránka neexistuje',
        fogText: 'Stránka, kterou hledáte, se nejspíše ztratila v mlze.',
        goHome: 'Vrátit se domů'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        gallery: 'Gallery',
        apartments: 'Apartments',
        tips: 'Tips for Trips',
        booking: 'Booking',
        contact: 'Contact',
        admin: 'Admin'
      },
      seo: {
        title: 'Wake Up in the Clouds: Panorama Trojmezí | Luxury Accommodation in Beskydy',
        description: 'Escape the ordinary. Panorama Trojmezí offers luxury apartments with private saunas and breathtaking views. Experience serenity you won\'t find anywhere else.'
      },
      hero: {
        titlePrefix: 'Apartments',
        titleMain: 'PANORAMA TROJMEZÍ',
        subtitle: 'Luxury accommodation in the heart of Beskydy at the border of three countries.',
        cta: 'Inquire About Stay'
      },
      about: {
        title: 'Accommodation',
        intro: '<p>Welcome to our place in the picturesque village of <b>Dolní Lomná</b>, specifically in the Novina area, located above the valley of the Lomná river at an altitude of approximately 600 m above sea level. The area is absolutely exceptional for its location near the borders of the Czech Republic, Slovakia, and Poland.</p><p>Our cottage is newly built and approved in 2024, offering you <b>quiet and luxury accommodation</b> with a breathtaking view of the valley and opposite hills in a spacious and fully equipped apartment.</p><p>Enjoy beautiful moments while hiking or cycling through the Beskydy nature, in winter on cross-country or downhill skis in the nearby Severka ski resort, or simply relax and chill in the apartment.</p>',
        welcome: {
          title: 'IMMEDIATELY UPON ARRIVAL',
          text: 'A bottle of chilled great Prosecco will be waiting for you as a welcome. For initial use, you will find several coffee capsules, tea, and condiments. Wine from South Moravian Čejkovice is available for your consumption at a great price - all in special quality late harvest or berry selection.'
        },
        sauna: {
          title: 'FINNISH SAUNA',
          text: 'In the basement of the cottage there is a <b>Finnish sauna for up to 8 people</b>, which is free of charge once when booking a weekly stay. Sauna sheets are available.'
        }
      },
      gallery: {
        title: 'Magic of Trojmezí',
        description: 'Take a look inside our cottage and let yourself be enchanted by the views from every window.',
        viewMore: 'View more photos'
      },
      apartments: {
        title: 'Apartments',
        description: 'We offer a luxuriously equipped apartment with breathtaking views and the possibility to use a sauna.',
        intro: 'The property offers <span class="text-gold font-bold">2 spacious, separate apartments</span>, each with its own bathroom and facilities.',
        layout: {
          text: '<ul><li><b>1 living room with kitchen and access to the terrace</b></li><li><b>2 bedrooms:</b><br>1st room - 1x double bed, 1x single bed<br>2nd room - 1x double bed, 1x bunk bed for children</li></ul>'
        },
        features: {
          capacity: 'Up to 7 people',
          size: '75 m²',
          disposition: 'APARTMENT DISPOSITION 3+KK + TERRACE',
          wifi: 'Free Wi-Fi',
          sauna: 'Sauna option'
        },
        facilities: {
          title: 'FACILITIES AND SERVICES',
          viewGallery: 'View gallery',
          viewMorePhotos: 'View more photos',
          text: '<p>Directly from the living area there is access to the east-oriented terrace, equipped with cafe sets for your coffee or a glass of your favorite drink. The living room is equipped with a 139 cm flat-screen TV with satellite reception. The terrace offers a breathtaking view of the entire panorama of this part of the Beskydy.</p><p>The apartment kitchen is fully equipped with dishes and dining service for 7 people. The modern kitchen includes a large refrigerator with a separate freezer, dishwasher, induction hob, baking and microwave oven, electric kettle, and Nespresso capsule coffee machine.</p><p>The bedrooms are covered with quality bed linen, in the bathrooms you will find plenty of towels and bath towels. Basic cleaning products are also available (dish soap, dishwasher tablets, kitchen sponges, tea towels, etc.).</p><p>A hairdryer, shampoo, soap, and toilet paper are prepared in the bathroom for your comfort. In the garage of the property, it is possible to safely place and charge your electric bikes.</p>'
        },
        pricing: {
          title: 'Accommodation Price List',
          highSeason: {
            title: 'High Season',
            dates: 'May 16 – Sept 15 & Dec 15 – March 15',
            weeklyPrice: '33,000 CZK',
            shortPrice: '17,000 CZK'
          },
          lowSeason: {
            title: 'Low Season',
            dates: 'Sept 16 – Dec 14 & March 16 – May 15',
            weeklyPrice: '27,000 CZK',
            shortPrice: '15,000 CZK'
          },
          stays: {
            weekly: 'Weekly stay (7 nights)',
            weeklyDesc: 'Stay for up to 7 people (5 adults + 2 children)',
            short: 'Short-term stay (3 nights)',
            shortDesc: 'Thu–Sun or Sun–Thu'
          },
          footer: 'The price includes, in addition to the fully equipped apartment, costs for electricity, water, cleaning, and local fees. Parking and outdoor seating are part of the accommodation. For a weekly stay, the price includes <span class="text-gold font-bold">1x free entry to the Finnish sauna</span>, further use for a discounted price of 500 CZK/entry.',
          special: {
            title: 'Special Dates 2026/2027',
            christmas: 'Christmas 2026',
            christmasPrice: '70,000 CZK',
            silvestr: 'New Year\'s Eve 2026/2027',
            silvestrPrice: '80,000 CZK',
            details: 'Entire cottage, both apartments, week',
            footer: 'The price includes electricity, cleaning, local fees, and 2x entry to the Finnish sauna.'
          },
          notesText: '<p>* The price does not include charging for electric/hybrid vehicles.</p><p>* STRICT PROHIBITION OF SMOKING in all indoor areas. PETS ARE NOT ALLOWED.</p><p>* The cottage is located in the Beskydy Protected Landscape Area, please be considerate of nature, neighbors, and the environment (waste sorting)</p>'
        }
      },
      booking: {
        title: 'Booking',
        ctaText: 'Have you chosen a date? Send us your non-binding inquiry and we will get back to you as soon as possible.',
        legend: {
          free: 'Available',
          oneApartment: '1 apartment available',
          full: 'Fully booked'
        }
      },
      tips: {
        title: 'Tips for Trips',
        description: 'Discover the beauty of Beskydy and the Trojmezí surroundings.',
        preparing: 'Coming soon..'
      },
      contact: {
        title: 'Contact Us',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        checkIn: 'Check-in: from 16:00',
        checkOut: 'Check-out: by 10:00',
        arrival: {
          title: 'ARRIVAL AND PARKING',
          text1: 'Coming from Jablunkov, pass through the part of the village Dolní Lomná, turn sharp right uphill before the bakery onto a local paved asphalt road and after about 2 km you are there.',
          text2: 'There are 2 parking spaces available at the family house, further parking is possible in front of the house or garage.'
        }
      },
      reviews: {
        title: 'What our guests say',
        subtitle: 'Your satisfaction is our greatest reward.',
        items: [
          {
            name: 'Lucie M.',
            text: 'A beautiful place with an incredible view. The apartment was perfectly clean and luxuriously equipped. We will definitely be back!',
            rating: 5
          },
          {
            name: 'Jan P.',
            text: 'Great location for trips to three countries. The peace and quiet we were looking for. The hosts are very kind and helpful.',
            rating: 5
          },
          {
            name: 'Marek S.',
            text: 'The design of the apartment is simply stunning. We felt like in a five-star hotel, but with total privacy.',
            rating: 5
          }
        ]
      },
      footer: {
        title: 'A place in the heart of Beskydy, where time stops.',
        description: 'Luxury accommodation at the border of three countries. A place for your relaxation and unforgettable experiences in the embrace of nature.',
        socialTitle: 'Follow us',
        copyright: 'Panorama Trojmezí'
      },
      error: {
        title404: 'Error 404',
        pageNotFound: 'Page not found',
        fogText: 'The page you are looking for has probably been lost in the fog.',
        goHome: 'Go home'
      }
    }
  }
};

export const defaultTranslations: { cs: Record<string, any>; en: Record<string, any> } = {
  cs: resources.cs.translation,
  en: resources.en.translation,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'cs',
    interpolation: {
      escapeValue: false
    }
  });

fetch('/api/translations')
  .then(r => r.json())
  .then((overrides: { cs?: Record<string, any>; en?: Record<string, any> }) => {
    if (overrides.cs) i18n.addResourceBundle('cs', 'translation', overrides.cs, true, true);
    if (overrides.en) i18n.addResourceBundle('en', 'translation', overrides.en, true, true);
  })
  .catch(() => {});

export default i18n;
