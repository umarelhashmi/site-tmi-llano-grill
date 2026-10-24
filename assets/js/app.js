/* ==========================================================================
   MI LLANO GRILL CARNE EN VARA — KISSIMMEE, FL
   Interactive Menu Engine, Parrilla Explorer, Live Hours & Google Reviews
   ========================================================================== */

const CLOVER_MENU_URL = 'https://millanogrill.cloveronline.com/menu/all?menu=clover2';
const CLOVER_ITEM_BASE = 'https://millanogrill.cloveronline.com/menu/all/product/';

let currentLang = 'en';
let activeCategory = 'all';
let searchQuery = '';
let activeReviewTopic = 'all';

/* --------------------------------------------------------------------------
   1. BILINGUAL UI DICTIONARY (EN / ES)
   -------------------------------------------------------------------------- */
const I18N = {
  en: {
    ribbonAddress: '3260 Vineland Rd, Ste 100 · Kissimmee, FL 34746',
    ribbonRating: '4.8 ★ (3,919 Google Reviews)',
    navSpecialties: 'Cutout Platters',
    navParrillas: 'Carne en Vara',
    navMenu: 'Full Menu (53)',
    navReviews: 'Reviews (3,919)',
    navVisit: 'Hours & Location',
    orderClover: 'Order on Clover',
    heroEyebrow: 'KISSIMMEE’S VENEZUELAN WOOD-FIRED STEAKHOUSE',
    heroTitle: 'Slow-Roasted <span class="highlight-gold">Carne en Vara</span> & Sweet Corn Cachapas.',
    heroSubtitle: 'Oak-smoked picanha and ribs roasted on iron stakes over open embers, handmade cachapas overflowing with queso de mano, crispy plantain patacones, and caldero sancocho soups.',
    heroPrimaryCta: 'Order Online on Clover',
    heroSecondaryCta: 'Explore All 53 Dishes',
    proof1Val: '4.8 ★',
    proof1Label: '3,919 Verified Google Reviews',
    proof2Val: '53 Dishes',
    proof2Label: '10 Official Clover Categories',
    proof3Val: 'Open Daily',
    proof3Label: 'Breakfast, Lunch & Late-Night',
    cutoutKicker: 'STUDIO CUTOUT SHOWCASE · OFFICIAL PLATTERS',
    cutoutTitle: 'House Specialties From the Wood Fire',
    cutoutDesc: 'Inspect our top-ordered Venezuelan platters—every button sends you directly to that item on our official Clover ordering page.',
    parrillaKicker: 'LA BRASA LLANERA · WOOD-FIRE GRILL MASTERS',
    parrillaTitle: 'Carne en Vara & Prime Steaks Explorer',
    parrillaDesc: 'Select a platter size or prime cut below to inspect exact weights, meats, and your choice of 2 included Venezuelan sides (acompañantes).',
    sidesHeading: 'INCLUDES CHOICE OF 2 SIDES (10 OFFICIAL ACOMPAÑANTES):',
    menuKicker: 'OFFICIAL CLOVER MENU · 100% EXACT PRICES & MODIFIERS',
    menuTitle: 'Complete Menu (53 Dishes)',
    menuDesc: 'Filter by category or search any dish, meat cut, soup size, or side. Click any item to view modifiers or order directly on Clover.',
    searchPlaceholder: 'Search picaña, cachapa, sancocho, chicha...',
    reviewsKicker: 'REAL CUSTOMER VOICES · GOOGLE MAPS VERIFIED',
    reviewsTitle: '3,919 Reviews · 4.8 ★ Rating in Kissimmee',
    reviewsDesc: 'Filter real guest reviews by the exact Google Maps dish topics—from our #1 Cachapas (263 mentions) to Patacón (123) and Carne en Vara (87).',
    visitKicker: 'LATINO-OWNED · KISSIMMEE, FLORIDA',
    visitTitle: 'Dine-In, Drive-Thru, Curbside & Live Llanera Music',
    visitDesc: 'Located on Vineland Rd just minutes from US-192 and Osceola Pkwy with plenty of free parking, full bar, and family seating.',
    orderItemBtn: 'Order on Clover →',
    detailsBtn: 'Modifiers & Info',
    openNow: 'Open Now · Closes',
    closedNow: 'Closed · Opens 9:00 AM',
    mobileOrder: 'Order Online',
    mobileMenu: 'Menu',
    mobileCall: 'Call',
    mobileMap: 'Directions'
  },
  es: {
    ribbonAddress: '3260 Vineland Rd, Ste 100 · Kissimmee, FL 34746',
    ribbonRating: '4.8 ★ (3,919 Reseñas en Google)',
    navSpecialties: 'Especialidades',
    navParrillas: 'Carne en Vara',
    navMenu: 'Menú Completo (53)',
    navReviews: 'Reseñas (3,919)',
    navVisit: 'Horario y Ubicación',
    orderClover: 'Ordenar en Clover',
    heroEyebrow: 'ASADOR VENEZOLANO A LEÑA EN KISSIMMEE',
    heroTitle: 'Auténtica <span class="highlight-gold">Carne en Vara</span> y Cachapas con Queso de Mano.',
    heroSubtitle: 'Picaña y costillas asadas lentamente en vara a fuego de leña, cachapas de maíz tierno con queso de mano, patacones crujientes y sancochos en caldero.',
    heroPrimaryCta: 'Ordenar en Línea (Clover)',
    heroSecondaryCta: 'Ver los 53 Platos',
    proof1Val: '4.8 ★',
    proof1Label: '3,919 Reseñas Reales en Google',
    proof2Val: '53 Platos',
    proof2Label: '10 Categorías Oficiales Clover',
    proof3Val: 'Abierto Diario',
    proof3Label: 'Desayuno, Almuerzo y Cena',
    cutoutKicker: 'PLATOS INSIGNIA · FOTOS OFICIALES RECORTADAS',
    cutoutTitle: 'Especialidades de Nuestra Brasa Llanera',
    cutoutDesc: 'Explora nuestros platos más pedidos—cada botón te lleva directo al producto en nuestro menú oficial de Clover.',
    parrillaKicker: 'MAESTROS DE LA PARRILLA · CARNE EN VARA',
    parrillaTitle: 'Explorador de Carne en Vara y Cortes Prime',
    parrillaDesc: 'Selecciona el tamaño de tu parrilla o corte para ver el peso exacto, las proteínas y los 2 acompañantes incluidos.',
    sidesHeading: 'INCLUYE 2 ACOMPAÑANTES A ELECCIÓN (10 OPCIONES OFICIALES):',
    menuKicker: 'MENÚ OFICIAL CLOVER · PRECIOS Y MODIFICADORES EXACTOS',
    menuTitle: 'Menú Completo (53 Platos)',
    menuDesc: 'Filtra por categoría o busca cualquier plato, corte, sopa o contorno. Haz clic para ver opciones u ordenar en Clover.',
    searchPlaceholder: 'Buscar picaña, cachapa, sancocho, chicha...',
    reviewsKicker: 'CLIENTES REALES · VERIFICADOS EN GOOGLE MAPS',
    reviewsTitle: '3,919 Reseñas · 4.8 ★ en Kissimmee',
    reviewsDesc: 'Filtra las reseñas reales por los temas más mencionados en Google Maps: Cachapas (263), Patacón (123), Carne en Vara (87) y Chicha (45).',
    visitKicker: 'SABOR VENEZOLANO · KISSIMMEE, FLORIDA',
    visitTitle: 'Salón, Drive-Thru, Música Llanera en Vivo y Bar',
    visitDesc: 'Ubicados en Vineland Rd cerca de la US-192 con amplio estacionamiento gratuito, cervezas bien frías y ambiente familiar.',
    orderItemBtn: 'Pedir en Clover →',
    detailsBtn: 'Opciones y Detalles',
    openNow: 'Abierto Ahora · Cierra',
    closedNow: 'Cerrado · Abre 9:00 AM',
    mobileOrder: 'Ordenar',
    mobileMenu: 'Menú',
    mobileCall: 'Llamar',
    mobileMap: 'Mapa'
  }
};

/* --------------------------------------------------------------------------
   2. HERO INTERACTIVE CUTOUT STAGE ITEMS (6 DISHES)
   -------------------------------------------------------------------------- */
const HERO_STAGE_DISHES = [
  {
    id: '4WD1GY5N4S9BJ',
    pill: 'Carne en Vara',
    price: '$29.00',
    img: 'assets/images/ai/cutout_carne_en_vara.png',
    title: { en: 'Carne en Vara Steak Platter', es: 'Carne en Vara Tradicional' },
    desc: {
      en: '8 oz wood-fired picanha steak, 1/4 charcoal chicken, 1 smoky chorizo + 2 sides & guasacaca.',
      es: '8 oz de picaña en vara, 1/4 pollo en brasas, 1 chorizo ahumado + 2 contornos y guasacaca.'
    }
  },
  {
    id: 'CT03HAQJCAW24',
    pill: 'Cachapa + Picaña',
    price: '$35.00',
    img: 'assets/images/ai/cutout_cachapa_picana.png',
    title: { en: 'Cachapa with Steak Picaña', es: 'Cachapa con Picaña Asada' },
    desc: {
      en: 'Fresh-ground sweet corn cachapa overflowing with melted queso de mano, nata & flame-grilled picaña.',
      es: 'Cachapa de maíz tierno rellena de abundante queso de mano, nata criolla y picaña a la brasa.'
    }
  },
  {
    id: 'B5F13ERFFQSVP',
    pill: 'Patacón Picaña',
    price: '$28.00',
    img: 'assets/images/ai/cutout_patacon_picana.png',
    title: { en: 'Patacón with Steak Picaña', es: 'Patacón con Picaña' },
    desc: {
      en: 'Choice of crispy green tostones or sweet maduros stuffed with picaña steak, seared cheese, egg & sauces.',
      es: 'Plátano verde (tostón) o maduro relleno de picaña asada, queso de mano, huevo, lechuga y salsas.'
    }
  },
  {
    id: '761QDZBNVE42G',
    pill: 'Sancocho Costilla',
    price: '$18 / $25',
    img: 'assets/images/ai/cutout_sancocho_costilla.png',
    title: { en: 'Beef Costilla Sancocho Soup', es: 'Sancocho de Costilla de Res' },
    desc: {
      en: 'Slow-simmered short rib broth with yuca, corn, plantains & fresh cilantro. Served with arepitas & lime.',
      es: 'Caldo concentrado de costilla de res con yuca, jojoto, plátano y cilantro. Con arepitas y limón.'
    }
  },
  {
    id: 'V6HM5Q6NAEHEC',
    pill: '11 oz Picaña',
    price: '$29.00',
    img: 'assets/images/ai/cutout_picana_steak.png',
    title: { en: '11 oz Prime Picaña Steak', es: '11 oz Picaña Steak Premium' },
    desc: {
      en: 'Hand-cut 11 oz top sirloin cap with seared golden fat cap, open-flame char + choice of 2 sides.',
      es: 'Corte premium de 11 oz con su capa dorada de grasa asada a fuego abierto + 2 acompañantes.'
    }
  },
  {
    id: 'CC2AV2TR8AAEA',
    pill: 'Mojarra Frita',
    price: '$22.00',
    img: 'assets/images/ai/cutout_mojarra_frita.png',
    title: { en: 'Whole Fried Tilapia (Mojarra Frita)', es: 'Mojarra Frita Entera' },
    desc: {
      en: 'Crispy whole golden tilapia served with white rice, crunchy tostones, fried cheese & creamy coleslaw.',
      es: 'Mojarra entera dorada y crujiente servida con arroz blanco, tostones, queso frito y ensalada rallada.'
    }
  }
];

/* --------------------------------------------------------------------------
   3. 8 STUDIO CUTOUT SHOWCASE CARDS
   -------------------------------------------------------------------------- */
const SIGNATURE_CUTOUTS = [
  {
    id: '4WD1GY5N4S9BJ',
    tag: { en: 'House Icon', es: 'Especialidad' },
    price: '$29',
    reviews: '87 Google Mentions',
    img: 'assets/images/ai/cutout_carne_en_vara.png',
    title: { en: 'Carne en Vara Steak', es: 'Carne en Vara Steak' },
    desc: {
      en: '8 oz wood-grilled picanha steak, 1/4 charcoal chicken, 1 chorizo & 2 Venezuelan sides.',
      es: '8 oz de picaña en vara, 1/4 pollo asado, 1 chorizo criollo y 2 acompañantes a elección.'
    }
  },
  {
    id: 'CT03HAQJCAW24',
    tag: { en: '#1 Best Seller', es: '#1 Más Pedido' },
    price: '$35',
    reviews: '263 Cachapa Reviews',
    img: 'assets/images/ai/cutout_cachapa_picana.png',
    title: { en: 'Cachapa with Steak Picaña', es: 'Cachapa con Picaña' },
    desc: {
      en: 'Sweet ground corn cachapa folded with melted Venezuelan queso de mano & juicy grilled picaña.',
      es: 'Cachapa artesanal de maíz tierno con queso de mano derretido y tiras de picaña a la brasa.'
    }
  },
  {
    id: 'B5F13ERFFQSVP',
    tag: { en: 'Plantain Stack', es: 'Tostón o Maduro' },
    price: '$28',
    reviews: '123 Patacón Reviews',
    img: 'assets/images/ai/cutout_patacon_picana.png',
    title: { en: 'Patacón with Steak Picaña', es: 'Patacón con Picaña' },
    desc: {
      en: 'Crispy green tostones or sweet maduros stacked with picaña steak, egg, queso de mano & house sauce.',
      es: 'Plátano verde o maduro relleno de picaña, queso de mano, huevo, lechuga y salsa de la casa.'
    }
  },
  {
    id: '761QDZBNVE42G',
    tag: { en: 'Small $18 · Large $25', es: 'Pequeña $18 · Grande $25' },
    price: '$18+',
    reviews: '73 Soup Reviews',
    img: 'assets/images/ai/cutout_sancocho_costilla.png',
    title: { en: 'Beef Costilla Sancocho Soup', es: 'Sancocho de Costilla' },
    desc: {
      en: 'Traditional caldero beef rib soup with root vegetables, corn, plantains & fresh herbs.',
      es: 'Tradicional sopa de costilla con verduras, jojoto, plátano y cilantro fresco.'
    }
  },
  {
    id: 'V6HM5Q6NAEHEC',
    tag: { en: 'Prime Cut · 2 Sides', es: 'Corte Prime · 2 Contornos' },
    price: '$29',
    reviews: '28 Picaña Reviews',
    img: 'assets/images/ai/cutout_picana_steak.png',
    title: { en: '11 oz Picaña Steak', es: '11 oz Picaña Steak' },
    desc: {
      en: 'Premium 11 oz hand-cut picanha grilled with a golden fat cap + 2 sides.',
      es: 'Corte de 11 oz de picaña a la parrilla con su capa de grasa dorada + 2 contornos.'
    }
  },
  {
    id: '8SC0ZQVP8PT2T',
    tag: { en: 'Shareable Starter', es: 'Entrada Playera' },
    price: '$12',
    reviews: 'Top Starter',
    img: 'assets/images/ai/cutout_tostones_playeros.png',
    title: { en: '4 Tostones Playeros', es: '4 Tostones Playeros' },
    desc: {
      en: 'Four crispy green plantain tostones piled with pico de gallo, shredded queso llanero & house sauce.',
      es: 'Cuatro tostones crujientes con pico de gallo, queso llanero rallado y salsa de la casa.'
    }
  },
  {
    id: '9TX2JQD4V8X5R',
    tag: { en: 'Venezuelan Street Style', es: 'Estilo Venezolano' },
    price: '$26',
    reviews: 'Includes Fries',
    img: 'assets/images/ai/cutout_picana_burger.png',
    title: { en: 'Picaña Steak Burger', es: 'Hamburguesa de Picaña' },
    desc: {
      en: 'Brioche bun stacked with grilled picaña steak, smoky bacon, crispy potato sticks, cheese & fries.',
      es: 'Pan brioche con picaña asada, tocineta, papitas hilo, queso, vegetales y papas fritas.'
    }
  },
  {
    id: 'AAB6RMSC3D1YE',
    tag: { en: 'Spit-Roasted', es: 'Pollo en Brasas' },
    price: '$28',
    reviews: 'Includes 2 Sides',
    img: 'assets/images/ai/cutout_pollo_asado.png',
    title: { en: 'Whole Charcoal Chicken', es: '1 Pollo Entero en Brasas' },
    desc: {
      en: 'Whole juicy chicken seasoned with house llanero spices, slow-grilled over charcoal + 2 sides.',
      es: 'Pollo entero sazonado con especias de la casa y asado lentamente al carbón + 2 acompañantes.'
    }
  }
];

/* --------------------------------------------------------------------------
   4. PARRILLA & CARNE EN VARA INTERACTIVE BUILDER DATA
   -------------------------------------------------------------------------- */
const PARRILLA_OPTIONS = [
  {
    key: 'vara1',
    id: '4WD1GY5N4S9BJ',
    tabTitle: { en: 'Carne en Vara (1 Person)', es: 'Carne en Vara (1 Persona)' },
    tabSub: { en: '8 oz Picanha + 1/4 Chicken + 1 Chorizo', es: '8 oz Picaña + 1/4 Pollo + 1 Chorizo' },
    price: '$29.00',
    img: 'assets/images/ai/cutout_carne_en_vara.png',
    specs: {
      en: [
        '8 oz Wood-Fired Picanha Steak',
        '1/4 Charcoal-Grilled Chicken',
        '1 Savory Grilled Chorizo',
        'Includes 2 Venezuelan Sides'
      ],
      es: [
        '8 oz Picaña Asada en Vara',
        '1/4 Pollo Asado al Carbón',
        '1 Chorizo Criollo a la Brasa',
        'Incluye 2 Acompañantes'
      ]
    }
  },
  {
    key: 'vara2',
    id: 'B0AKVM5X5YNB2',
    tabTitle: { en: 'Carne en Vara for 2 People', es: 'Carne en Vara para 2 Personas' },
    tabSub: { en: '16 oz Picanha + 1/2 Chicken + 2 Chorizos', es: '16 oz Picaña + 1/2 Pollo + 2 Chorizos' },
    price: '$58.00',
    img: 'assets/images/ai/item_carne_vara_familiar.jpg',
    specs: {
      en: [
        '16 oz (1 lb) Wood-Fired Picanha',
        '1/2 Charcoal-Grilled Chicken',
        '2 Grilled Chorizo Sausages',
        'Includes 2 Large Sides & Guasacaca'
      ],
      es: [
        '16 oz (1 lb) Picaña en Vara',
        '1/2 Pollo Asado en Brasas',
        '2 Chorizos Ahumados',
        'Incluye 2 Acompañantes y Guasacaca'
      ]
    }
  },
  {
    key: 'vara4',
    id: 'VWQEASVXCMYAA',
    tabTitle: { en: 'Carne en Vara for 4 People', es: 'Carne en Vara Familiar (4 Personas)' },
    tabSub: { en: '32 oz Picanha + Whole Chicken + 4 Chorizos', es: '32 oz Picaña + 1 Pollo Entero + 4 Chorizos' },
    price: '$115.00',
    img: 'assets/images/ai/item_carne_vara_familiar.jpg',
    specs: {
      en: [
        '32 oz (2 lbs) Wood-Fired Picanha',
        '1 Whole Charcoal-Grilled Chicken',
        '4 Savory Grilled Chorizos',
        'Family Feast + Choice of 2 Sides'
      ],
      es: [
        '32 oz (2 lbs) Picaña en Vara',
        '1 Pollo Entero al Carbón',
        '4 Chorizos Criollos',
        'Banquete Familiar + 2 Acompañantes'
      ]
    }
  },
  {
    key: 'picana11',
    id: 'V6HM5Q6NAEHEC',
    tabTitle: { en: '11 oz Prime Picaña Steak', es: '11 oz Picaña Steak Premium' },
    tabSub: { en: 'Hand-Cut Top Sirloin Cap + 2 Sides', es: 'Corte Reina con Capa Dorada + 2 Contornos' },
    price: '$29.00',
    img: 'assets/images/ai/cutout_picana_steak.png',
    specs: {
      en: [
        '11 oz Hand-Cut Prime Picanha',
        'Seared Golden Fat Cap',
        'Cooked to Your Exact Temperature',
        'Includes Choice of 2 Sides'
      ],
      es: [
        '11 oz Picaña Cortada a Mano',
        'Capa de Grasa Dorada a la Brasa',
        'Término de Cocción a Elección',
        'Incluye 2 Acompañantes'
      ]
    }
  },
  {
    key: 'ribeye11',
    id: 'BAT7JXDEG513G',
    tabTitle: { en: '11 oz Ribeye Steak', es: '11 oz Ribeye Steak' },
    tabSub: { en: 'Highly Marbled Open-Flame Ribeye', es: 'Ribeye Marmoleado a Fuego Abierto' },
    price: '$28.00',
    img: 'assets/images/clover/BAT7JXDEG513G.jpg',
    specs: {
      en: [
        '11 oz Richly Marbled Ribeye',
        'Grilled Over Open Wood Flame',
        'House Chimichurri & Guasacaca',
        'Includes Choice of 2 Sides'
      ],
      es: [
        '11 oz Ribeye Jugoso y Marmoleado',
        'Asado a Fuego Abierto',
        'Chimichurri y Guasacaca de la Casa',
        'Incluye 2 Acompañantes'
      ]
    }
  },
  {
    key: 'ny11',
    id: 'SB1SGCCHVJT5E',
    tabTitle: { en: '11 oz New York Steak', es: '11 oz New York Steak' },
    tabSub: { en: 'Signature Open-Flame NY Strip', es: 'Corte New York a la Parrilla' },
    price: '$28.00',
    img: 'assets/images/clover/SB1SGCCHVJT5E.jpg',
    specs: {
      en: [
        '11 oz Center-Cut New York Strip',
        'Bold Smoky Char Crust',
        'Cooked to Order',
        'Includes Choice of 2 Sides'
      ],
      es: [
        '11 oz Corte New York Strip',
        'Sellado Ahumado a la Parrilla',
        'Término a Elección',
        'Incluye 2 Acompañantes'
      ]
    }
  }
];

const OFFICIAL_ACOMPANANTES = [
  'Arroz / White Rice',
  'Arepitas',
  'Yuca Frita',
  'Yuca Sancochada',
  'Coleslaw',
  'Caraotas / Black Beans',
  'Maduros / Sweet Plantains',
  'Tostones / Green Plantains',
  'Papas Fritas / French Fries',
  'Ensalada / House Salad'
];

/* --------------------------------------------------------------------------
   5. COMPLETE 53-ITEM OFFICIAL CLOVER MENU DATASET
   -------------------------------------------------------------------------- */
const MENU_CATEGORIES = [
  {
    id: 'starters',
    cloverId: 'ZJBKSAMRNYCP4',
    name: { en: 'Starters / Entradas', es: 'Entradas Venezolanas' },
    note: { en: '7 Traditional Appetizers · Served Hot with Nata & Guasacaca', es: '7 Entradas Tradicionales · Con Nata y Guasacaca' },
    items: [
      {
        id: 'FYNW7HBHQ7430',
        name: '6 Arepitas con Nata',
        price: '$8.00',
        badge: 'Fan Favorite',
        img: 'assets/images/clover/FYNW7HBHQ7430.jpg',
        desc: 'Golden and crispy Venezuelan mini corn arepas, soft and warm inside. Served with 2 oz of creamy Venezuelan nata for dipping.',
        modifiers: ['Includes 2 oz Creamy Nata']
      },
      {
        id: '0MA9D07JDMEXR',
        name: '4 Hallaquitas con Guasacaca',
        price: '$9.00',
        img: 'assets/images/clover/0MA9D07JDMEXR.jpg',
        desc: 'Four traditional steamed corn dough hallaquitas wrapped in leaves and served warm with house avocado-herb guasacaca.',
        modifiers: ['Includes House Guasacaca']
      },
      {
        id: '23646YWMP2S9P',
        name: '5 Tequeños',
        price: '$10.00',
        badge: 'Must Try',
        img: 'assets/images/clover/23646YWMP2S9P.jpg',
        desc: 'Classic Venezuelan white cheese wrapped in thin pastry dough and fried until golden and crispy, served with creamy nata.',
        modifiers: ['5 Pieces', 'Served with Nata']
      },
      {
        id: '8SC0ZQVP8PT2T',
        name: '4 Tostones Playeros',
        price: '$12.00',
        badge: 'House Specialty',
        img: 'assets/images/clover/8SC0ZQVP8PT2T.jpg',
        desc: 'Crispy golden green plantain tostones topped with fresh pico de gallo, shredded queso llanero, and signature house sauce.',
        modifiers: ['Pico de Gallo', 'Queso Llanero', 'House Sauce']
      },
      {
        id: 'SCRKQFZZQEJD0',
        name: 'Ceviche de Chicharrón',
        price: '$18.00',
        badge: 'Crispy Pork Belly',
        img: 'assets/images/ai/item_ceviche_chicharron.jpg',
        desc: 'Crispy golden fried pork belly chicharrón tossed with red onion, fresh lime, cilantro, and house seasoning.',
        modifiers: ['Fresh Lime & Cilantro']
      },
      {
        id: 'HE6MST5FKJX9C',
        name: 'Queso y 6 Arepitas',
        price: '$16.00',
        img: 'assets/images/ai/item_queso_plancha_arepitas.jpg',
        desc: 'Six puffy golden mini arepitas paired with a generous portion of Venezuelan cheese prepared your way.',
        modifiers: ['Queso sin Calentar ($16)', 'Queso Frito ($16)', '1/2 Queso de Mano ($16)', 'Queso a la Plancha ($16)']
      },
      {
        id: '6CGG8B8VN5CCY',
        name: '2 Plátanos al Horno con Queso',
        price: '$16.00',
        img: 'assets/images/ai/item_platano_horno.jpg',
        desc: 'Two sweet ripe plantains baked until caramelized and stuffed with melted white Venezuelan cheese.',
        modifiers: ['2 Whole Baked Plantains', 'Melted White Cheese']
      }
    ]
  },
  {
    id: 'soups',
    cloverId: 'PA9PJ6GBGQSF6',
    name: { en: 'Soups / Sopas (Sancochos)', es: 'Sopas y Sancochos en Caldero' },
    note: { en: '4 Slow-Simmered Venezuelan Broths · Available in Small or Large', es: '4 Sancochos Tradicionales · Tamaño Pequeño o Grande' },
    items: [
      {
        id: 'J0Y799NSXDG9P',
        name: 'Chicken Sancocho Soup (Sancocho de Gallina/Pollo)',
        price: '$16 / $22',
        img: 'assets/images/clover/J0Y799NSXDG9P.jpg',
        desc: 'Traditional Venezuelan soup slow-cooked with tender chicken, root vegetables (yuca, ocumo), corn, plantains, and fresh herbs.',
        modifiers: ['Small: $16.00', 'Large: $22.00']
      },
      {
        id: '761QDZBNVE42G',
        name: 'Beef Costilla Sancocho Soup (Sancocho de Costilla)',
        price: '$18 / $25',
        badge: '73 Review Mentions',
        img: 'assets/images/clover/761QDZBNVE42G.jpg',
        desc: 'Hearty Venezuelan beef short rib soup slow-simmered with yuca, sweet corn on the cob, plantains, and fresh cilantro.',
        modifiers: ['Small: $18.00', 'Large: $25.00']
      },
      {
        id: 'VZ71KDWQ5ZK04',
        name: 'Seafood Mariscos Sancocho Soup',
        price: '$19 / $29',
        img: 'assets/images/clover/VZ71KDWQ5ZK04.jpg',
        desc: 'Rich coastal Venezuelan seafood soup loaded with shellfish, fish, root vegetables, corn, plantains, and fresh herbs.',
        modifiers: ['Small: $19.00', 'Large: $29.00']
      },
      {
        id: 'T54SSP6N33NQJ',
        name: 'Beef & Chicken Cruzado Sancocho Soup',
        price: '$17 / $23',
        badge: 'El Cruzado Llanero',
        img: 'assets/images/clover/T54SSP6N33NQJ.jpg',
        desc: 'The best of both worlds—tender beef ribs and chicken simmered together with root vegetables, corn, plantains, and cilantro.',
        modifiers: ['Small: $17.00', 'Large: $23.00']
      }
    ]
  },
  {
    id: 'parrillas',
    cloverId: 'W3ZV82DFYMGFM',
    name: { en: 'Grill Masters / Parrillas', es: 'Maestros de la Parrilla y Carne en Vara' },
    note: { en: '6 Wood-Fired Cuts & Platters · Includes Choice of 2 Sides', es: '6 Parrillas y Cortes Prime · Incluyen 2 Acompañantes' },
    items: [
      {
        id: '4WD1GY5N4S9BJ',
        name: 'Carne en Vara Steak (Individual)',
        price: '$29.00',
        badge: 'Signature Dish',
        img: 'assets/images/clover/4WD1GY5N4S9BJ.jpg',
        desc: '8 oz wood-grilled picanha steak, 1/4 charcoal-grilled chicken, and 1 savory chorizo cooked over open embers.',
        modifiers: ['8 oz Picaña', '1/4 Chicken', '1 Chorizo', 'Choice of 2 Sides']
      },
      {
        id: 'B0AKVM5X5YNB2',
        name: 'Carne en Vara Steak for 2 People',
        price: '$58.00',
        badge: 'For 2 Guests',
        img: 'assets/images/ai/item_carne_vara_familiar.jpg',
        desc: '16 oz wood-grilled picanha steak, 1/2 charcoal-grilled chicken, and 2 savory chorizos packed with smoky wood-fire flavor.',
        modifiers: ['16 oz Picaña', '1/2 Chicken', '2 Chorizos', 'Choice of 2 Sides']
      },
      {
        id: 'VWQEASVXCMYAA',
        name: 'Carne en Vara Steak for 4 People',
        price: '$115.00',
        badge: 'Family Feast (4)',
        img: 'assets/images/ai/item_carne_vara_familiar.jpg',
        desc: '32 oz wood-grilled picanha steak, 1 whole charcoal-grilled chicken, and 4 savory chorizos for the ultimate family table.',
        modifiers: ['32 oz Picaña', '1 Whole Chicken', '4 Chorizos', 'Choice of 2 Sides']
      },
      {
        id: 'V6HM5Q6NAEHEC',
        name: '11 oz Picaña Steak',
        price: '$29.00',
        badge: '28 Google Mentions',
        img: 'assets/images/clover/V6HM5Q6NAEHEC.jpg',
        desc: 'Premium 11 oz hand-cut Venezuelan picanha grilled with a seared golden fat cap for rich, juicy flavor.',
        modifiers: ['11 oz Prime Picaña', 'Choice of 2 Sides']
      },
      {
        id: 'SB1SGCCHVJT5E',
        name: '11 oz New York Steak',
        price: '$28.00',
        img: 'assets/images/clover/SB1SGCCHVJT5E.jpg',
        desc: 'Signature 11 oz New York strip steak, deeply flavorful and grilled over an open wood flame to your temperature.',
        modifiers: ['11 oz NY Strip', 'Choice of 2 Sides']
      },
      {
        id: 'BAT7JXDEG513G',
        name: '11 oz Ribeye Steak',
        price: '$28.00',
        img: 'assets/images/clover/BAT7JXDEG513G.jpg',
        desc: 'Rich, tender, and highly marbled 11 oz premium ribeye grilled over open flame to lock in natural juices.',
        modifiers: ['11 oz Marbled Ribeye', 'Choice of 2 Sides']
      }
    ]
  },
  {
    id: 'chicken',
    cloverId: 'MR41RJGY9FDWC',
    name: { en: 'Charcoal-Grilled Chicken / Pollo Asado', es: 'Pollo Asado en Brasas' },
    note: { en: '4 Spit-Roasted Charcoal Chicken Options', es: '4 Opciones de Pollo Asado lentamente al Carbón' },
    items: [
      {
        id: '35WRXCB0NP1P0',
        name: '1/4 Charcoal-Grilled Chicken',
        price: '$12.00',
        img: 'assets/images/clover/35WRXCB0NP1P0.jpg',
        desc: '1/4 of juicy, tender chicken seasoned with house llanero spices and slow-grilled over charcoal.',
        modifiers: ['Includes 2 Sides']
      },
      {
        id: 'C20P573MTHXAP',
        name: '1/2 Charcoal-Grilled Chicken',
        price: '$16.00',
        img: 'assets/images/clover/C20P573MTHXAP.jpg',
        desc: 'Half charcoal-roasted chicken with crispy golden skin, smoky aroma, and choice of 2 Venezuelan sides.',
        modifiers: ['Includes 2 Sides']
      },
      {
        id: 'AAB6RMSC3D1YE',
        name: '1 Whole Charcoal-Grilled Chicken (1 Pollo Entero)',
        price: '$28.00',
        badge: 'Best Value',
        img: 'assets/images/clover/AAB6RMSC3D1YE.jpg',
        desc: 'Whole spit-roasted charcoal chicken served with your choice of 2 sides and house guasacaca.',
        modifiers: ['Whole Chicken + 2 Sides']
      },
      {
        id: '469HECRYTEVVR',
        name: '1 Whole Charcoal-Grilled Chicken (Chicken Only)',
        price: '$25.00',
        img: 'assets/images/clover/469HECRYTEVVR.jpg',
        desc: 'Whole charcoal-grilled chicken (solo el pollo, sin contornos), ready to take home or share at the table.',
        modifiers: ['Chicken Only (Sin Contornos)']
      }
    ]
  },
  {
    id: 'fish',
    cloverId: 'NMQD0RXEVCDBM',
    name: { en: 'Fish / Pescado Frito', es: 'Pescados Fritos del Caribe' },
    note: { en: '5 Coastal Classics · Served with White Rice, Tostones, Fried Cheese & Coleslaw', es: '5 Pescados · Con Arroz Blanco, Tostones, Queso Frito y Ensalada' },
    items: [
      {
        id: 'CC2AV2TR8AAEA',
        name: 'Tilapia Fish (Mojarra Frita)',
        price: '$22.00',
        badge: 'Whole Crispy Fish',
        img: 'assets/images/clover/CC2AV2TR8AAEA.jpg',
        desc: 'Whole tilapia fried to golden perfection—crispy outside, tender and flaky inside. Served with rice, tostones, fried cheese & coleslaw.',
        modifiers: ['Whole Tilapia', 'Rice, Tostones, Fried Cheese & Slaw']
      },
      {
        id: '2Q2DTDQYCWB24',
        name: 'Grouper Fish (Mero Frito)',
        price: '$26.00',
        img: 'assets/images/clover/2Q2DTDQYCWB24.jpg',
        desc: 'Fresh grouper fried golden and crispy outside, flaky and juicy inside. Served with white rice, crunchy tostones, fried cheese & coleslaw.',
        modifiers: ['Grouper / Mero', 'Full Caribbean Sides']
      },
      {
        id: 'NNJ695TBE9GF6',
        name: 'Black Mullet Fish (Lebranche Frito)',
        price: '$28.00',
        badge: 'Venezuelan Classic',
        img: 'assets/images/clover/NNJ695TBE9GF6.jpg',
        desc: 'Whole Venezuelan-style Lebranche fried golden and crispy, served with fluffy white rice, crispy tostones, fried cheese & creamy coleslaw.',
        modifiers: ['Whole Lebranche', 'Full Caribbean Sides']
      },
      {
        id: 'WCWZ4S55JTRT0',
        name: 'King Mackerel Steak Fish (Sierra Frita)',
        price: '$28.00',
        img: 'assets/images/clover/WCWZ4S55JTRT0.jpg',
        desc: 'Thick-cut king mackerel (rueda de sierra) fried golden, served with white rice, crunchy tostones, golden fried cheese & coleslaw.',
        modifiers: ['King Mackerel Steak', 'Full Caribbean Sides']
      },
      {
        id: '91G1KR1F03QJW',
        name: 'Corvina Steak Fish (Corvina Frita)',
        price: '$29.00',
        img: 'assets/images/clover/91G1KR1F03QJW.jpg',
        desc: 'Crispy golden-fried cut of corvina, tender and flaky inside. Served with white rice, crispy tostones, fried cheese & creamy coleslaw.',
        modifiers: ['Corvina Cut', 'Full Caribbean Sides']
      }
    ]
  },
  {
    id: 'cachapas',
    cloverId: '3QH32BD4D0VBM',
    name: { en: 'Cachapas (Fresh Sweet Corn & Queso de Mano)', es: 'Cachapas de Maíz Tierno con Queso de Mano' },
    note: { en: '6 Handmade Cachapas · 263 Five-Star Google Reviews Mention Our Cachapas', es: '6 Cachapas Artesanales · 263 Reseñas en Google Destacan Nuestras Cachapas' },
    items: [
      {
        id: '517E2VFZR2P5A',
        name: 'Cachapa with Cheese (Cachapa con Queso de Mano)',
        price: '$18.00',
        img: 'assets/images/clover/517E2VFZR2P5A.jpg',
        desc: 'Traditional Venezuelan sweet corn pancake made with fresh ground corn, grilled golden and folded with thick melted Venezuelan queso de mano.',
        modifiers: ['Fresh Ground Corn', 'Queso de Mano']
      },
      {
        id: 'WZKK6H56HD13P',
        name: 'Cachapa with Shredded Chicken (Pollo Esmechado)',
        price: '$22.00',
        img: 'assets/images/clover/WZKK6H56HD13P.jpg',
        desc: 'Sweet corn cachapa filled with tender seasoned shredded chicken and melted Venezuelan queso de mano.',
        modifiers: ['Shredded Chicken', 'Queso de Mano']
      },
      {
        id: '9QEGM40K0W4BY',
        name: 'Cachapa with Shredded Beef (Carne Mechada)',
        price: '$24.00',
        img: 'assets/images/clover/9QEGM40K0W4BY.jpg',
        desc: 'Sweet corn cachapa filled with savory Venezuelan carne mechada (shredded beef) and melted queso de mano.',
        modifiers: ['Carne Mechada', 'Queso de Mano']
      },
      {
        id: 'A0QG2T68FEZP6',
        name: 'Cachapa with Fried Pork (Cochino Frito)',
        price: '$29.00',
        badge: 'Llanero Tradition',
        img: 'assets/images/clover/A0QG2T68FEZP6.jpg',
        desc: 'Golden sweet corn cachapa filled with melted queso de mano and topped with crispy, juicy Venezuelan fried pork (cochino frito).',
        modifiers: ['Cochino Frito', 'Queso de Mano']
      },
      {
        id: '8WVDW417DMM46',
        name: 'Cachapa with Pork Belly (Chicharrón Carnudo)',
        price: '$29.00',
        img: 'assets/images/clover/8WVDW417DMM46.jpg',
        desc: 'Sweet corn cachapa filled with melted Venezuelan cheese and topped with crunchy, juicy pork belly chicharrón.',
        modifiers: ['Pork Belly Chicharrón', 'Queso de Mano']
      },
      {
        id: 'CT03HAQJCAW24',
        name: 'Cachapa with Steak Picaña',
        price: '$35.00',
        badge: '#1 Most Reviewed',
        img: 'assets/images/clover/CT03HAQJCAW24.jpg',
        desc: 'Our crown jewel: fresh sweet corn cachapa overflowing with melted queso de mano, nata, and flame-grilled picanha steak.',
        modifiers: ['Wood-Grilled Picaña', 'Queso de Mano', 'Nata']
      }
    ]
  },
  {
    id: 'patacon',
    cloverId: '0SM6FCD1Z44RM',
    name: { en: 'Patacón (Crispy Green or Sweet Plantain Stacks)', es: 'Patacones Zulianos (Tostón Verde o Maduro)' },
    note: { en: '3 Loaded Plantain Sandwiches · 123 Google Reviews · Choice of Green or Sweet Plantain', es: '3 Patacones · 123 Reseñas · Elige Plátano Verde o Maduro' },
    items: [
      {
        id: 'C6SFNEZKYRVH2',
        name: 'Patacón with Shredded Chicken',
        price: '$18.00',
        img: 'assets/images/clover/C6SFNEZKYRVH2.jpg',
        desc: 'Venezuelan plantain sandwich (green tostones or sweet maduros) stuffed with shredded chicken, lettuce, egg, queso de mano & house sauce.',
        modifiers: ['Green Plantains (Tostones)', 'Sweet Plantains (Maduros)']
      },
      {
        id: 'CNNN0S6H53ZS0',
        name: 'Patacón with Shredded Beef (Carne Mechada)',
        price: '$20.00',
        img: 'assets/images/clover/CNNN0S6H53ZS0.jpg',
        desc: 'Choice of crispy green tostones or sweet maduros filled with seasoned carne mechada, lettuce, egg, queso de mano & house sauce.',
        modifiers: ['Green Plantains (Tostones)', 'Sweet Plantains (Maduros)']
      },
      {
        id: 'B5F13ERFFQSVP',
        name: 'Patacón with Steak Picaña',
        price: '$28.00',
        badge: '123 Patacón Reviews',
        img: 'assets/images/clover/B5F13ERFFQSVP.jpg',
        desc: 'Stacked plantain sandwich (green or sweet) loaded with flame-grilled picaña steak strips, queso de mano, egg, lettuce & house sauce.',
        modifiers: ['Green Plantains (Tostones)', 'Sweet Plantains (Maduros)']
      }
    ]
  },
  {
    id: 'burgers',
    cloverId: 'BJE35DBWMJEQA',
    name: { en: 'Burgers / Hamburguesas Venezolanas', es: 'Hamburguesas Venezolanas' },
    note: { en: '4 Stacked Brioche Burgers · Served with Golden French Fries', es: '4 Hamburguesas · En Pan Brioche con Papas Fritas' },
    items: [
      {
        id: '7JXQMBB6V2SEP',
        name: 'Beef Burger (Hamburguesa de Carne)',
        price: '$16.00',
        img: 'assets/images/clover/7JXQMBB6V2SEP.jpg',
        desc: 'Juicy grilled beef patty on a buttery brioche bun with lettuce, tomato, crispy potato sticks, smoky bacon, ketchup, tartar sauce & fries.',
        modifiers: ['Brioche Bun', 'Potato Sticks & Bacon', 'Includes Fries']
      },
      {
        id: 'SPA4G81539PTC',
        name: 'Chicken Burger (Hamburguesa de Pollo)',
        price: '$16.00',
        img: 'assets/images/clover/SPA4G81539PTC.jpg',
        desc: 'Grilled chicken breast on a brioche bun with lettuce, tomato, crispy shredded potatoes, smoky bacon, house sauces & French fries.',
        modifiers: ['Grilled Chicken', 'Potato Sticks & Bacon', 'Includes Fries']
      },
      {
        id: '9TX2JQD4V8X5R',
        name: 'Picaña Steak Burger',
        price: '$26.00',
        badge: 'Steakhouse Burger',
        img: 'assets/images/clover/9TX2JQD4V8X5R.jpg',
        desc: 'Tender flame-grilled picanha steak on a brioche bun with smoky bacon, crispy potato sticks, lettuce, tomato, house sauce & French fries.',
        modifiers: ['Flame-Grilled Picaña', 'Includes Fries']
      },
      {
        id: 'SVZX326ZPAXMG',
        name: 'Custom Venezuelan Hamburguesa (Tradicional / Mixta / Chuleta)',
        price: '$16 – $26',
        img: 'assets/images/clover/SVZX326ZPAXMG.jpg',
        desc: 'Build your stacked Venezuelan burger with fried egg, melted cheese, bacon, potato sticks, house sauce & French fries.',
        modifiers: ['Tradicional ($16)', 'Pollo ($16)', 'Chuleta ($16)', 'Mixta ($20)', 'Carne en Vara ($26)']
      }
    ]
  },
  {
    id: 'pastas',
    cloverId: 'ZNRZNR3ZEJ0K4',
    name: { en: 'Pastas', es: 'Pastas' },
    note: { en: '6 Comforting Pasta Dishes Prepared to Order', es: '6 Pastas Preparadas al Momento' },
    items: [
      {
        id: '42SZG3M4YJV1C',
        name: 'Pasta Alfredo with Grilled Chicken',
        price: '$18.00',
        img: 'assets/images/clover/42SZG3M4YJV1C.jpg',
        desc: 'Creamy fettuccine tossed in velvety Parmesan Alfredo sauce and topped with juicy grilled chicken and fresh herbs.',
        modifiers: ['Grilled Chicken', 'Parmesan Alfredo']
      },
      {
        id: '2PGDHEHJZNCZG',
        name: 'Pasta Carbonara',
        price: '$20.00',
        img: 'assets/images/clover/2PGDHEHJZNCZG.jpg',
        desc: 'Classic pasta tossed in rich creamy Carbonara sauce with crispy smoky bacon, Parmesan cheese, and cracked black pepper.',
        modifiers: ['Crispy Bacon', 'Parmesan Cream']
      },
      {
        id: '19YG29BZ0BQ0T',
        name: 'Pasta Napoli',
        price: '$18.00',
        img: 'assets/images/clover/19YG29BZ0BQ0T.jpg',
        desc: 'Classic pasta in house-simmered tomato and aromatic herb sauce, finished with freshly grated Parmesan cheese.',
        modifiers: ['House Tomato & Herb Sauce']
      },
      {
        id: '9VQ7DV3YNWSQ0',
        name: 'Pasta Bolognese',
        price: '$20.00',
        img: 'assets/images/clover/9VQ7DV3YNWSQ0.jpg',
        desc: 'Hearty pasta tossed in slow-simmered tomato and seasoned ground beef Bolognese sauce, finished with Parmesan.',
        modifiers: ['Slow-Simmered Beef Bolognese']
      },
      {
        id: 'HNY2C69FR2EZY',
        name: 'Pasta Seafood (Pasta de Mariscos)',
        price: '$29.00',
        img: 'assets/images/clover/HNY2C69FR2EZY.jpg',
        desc: 'Generous seafood pasta loaded with shrimp, mussels, calamari, and clams tossed in rich coastal sauce.',
        modifiers: ['Shrimp, Mussels & Calamari']
      },
      {
        id: 'XMC7E5TZPXZEC',
        name: 'Custom Pasta Selection',
        price: '$18 – $29',
        img: 'assets/images/clover/42SZG3M4YJV1C.jpg',
        desc: 'Choose your preferred pasta style directly in Clover: Alfredo ($18), Napoli ($18), Carbonara ($20), Boloñesa ($20), or Mariscos ($29).',
        modifiers: ['Alfredo $18', 'Napoli $18', 'Carbonara $20', 'Boloñesa $20', 'Mariscos $29']
      }
    ]
  },
  {
    id: 'drinks-more',
    cloverId: 'F6WT4GQYQVZ8C',
    name: { en: 'Chicha, Desserts, Cold Beers, Kids & Extra Sides', es: 'Chicha, Postres, Cervezas, Menú de Niños y Extras' },
    note: { en: '8 Cold Drinks, House Chicha & Desserts, Beer Buckets, Kids Meals & Extra Sides', es: 'Bebidas, Chicha Venezolana, Quesillo, Tobo de Cervezas, Niños y Contornos' },
    items: [
      {
        id: 'BN7HXWX77N60R',
        name: 'Postres Venezolanos & Chicha Criolla',
        price: '$7 – $14',
        badge: '45 Chicha Reviews',
        img: 'assets/images/ai/item_postres_chicha_quesillo.jpg',
        desc: 'Authentic house-made Venezuelan Chicha topped with condensed milk & cinnamon, caramel Quesillo flan, Tres Leches, or Chocolate Cake.',
        modifiers: ['Chicha 16 oz ($7)', 'Chicha 32 oz ($14)', 'Quesillo ($8)', 'Tres Leches ($8)', 'Torta de Chocolate ($8)']
      },
      {
        id: 'VJVGYYN64YVRJ',
        name: 'Cervezas Frías & Tobo de 5 Cervezas',
        price: '$7 / $28',
        badge: 'Polar & Zulia',
        img: 'assets/images/ai/item_cervezas_tobo.jpg',
        desc: 'Ice-cold Venezuelan Polar & Zulia beers plus Corona, Modelo, Miller, Bud Light, Ultra & Coors—individual or bucket of 5.',
        modifiers: ['Polar ($7)', 'Zulia ($7)', 'Corona / Modelo ($7)', 'Tobo de 5 Cervezas ($28)']
      },
      {
        id: 'E1VESYG0NHD1A',
        name: 'Kids Menu / Menú de Niños',
        price: '$7 – $15',
        img: 'assets/images/ai/item_kids_menu.jpg',
        desc: 'Kid-sized portions served with golden French fries: crispy Nuggets, Cheeseburger, Grilled Chicken, or Grilled Steak.',
        modifiers: ['Nuggets ($7)', 'Cheeseburger ($8)', 'Pollo al Grill ($10)', 'Carne al Grill ($15)']
      },
      {
        id: '50BXFPTG76PZC',
        name: 'Extra Sides / Contornos Adicionales',
        price: '$3 – $7',
        img: 'assets/images/clover/FYNW7HBHQ7430.jpg',
        desc: 'Add extra Venezuelan sides, cheeses, hallaquitas, baked plantain, or crispy chicharrón to any order.',
        modifiers: ['Arroz / Yuca / Tostones / Maduros / Caraotas / Fries ($5)', '1/2 Queso de Mano / Frito / Plancha ($5)', 'Extra Chicharrón ($7)']
      },
      {
        id: '50F552DK9Q8JG',
        name: 'Coca-Cola',
        price: '$4.00',
        img: 'assets/images/clover/50F552DK9Q8JG.jpg',
        desc: 'Ice-cold classic Coca-Cola.',
        modifiers: ['Chilled Can / Bottle']
      },
      {
        id: 'YN20YWYN05A92',
        name: 'Coca-Cola Zero',
        price: '$4.00',
        img: 'assets/images/clover/YN20YWYN05A92.jpg',
        desc: 'Zero-sugar ice-cold Coca-Cola Zero.',
        modifiers: ['Zero Sugar']
      },
      {
        id: 'RW75B93QRHECG',
        name: 'Sprite',
        price: '$4.00',
        img: 'assets/images/clover/RW75B93QRHECG.jpg',
        desc: 'Crisp lemon-lime Sprite served cold.',
        modifiers: ['Lemon-Lime']
      },
      {
        id: 'FG109DMDQBRY4',
        name: 'Water / Agua',
        price: '$2.00',
        img: 'assets/images/clover/50F552DK9Q8JG.jpg',
        desc: 'Bottled Refreshing Water / Agua.',
        modifiers: ['Bottled Water']
      }
    ]
  }
];

/* --------------------------------------------------------------------------
   6. VERIFIED GOOGLE MAPS REVIEWS (4.8 ★ · 3,919 REVIEWS · 10 TOPICS)
   -------------------------------------------------------------------------- */
const REVIEW_TOPICS = [
  { id: 'all', label: 'All Reviews', count: '3,919' },
  { id: 'cachapa', label: 'Cachapa', count: '263' },
  { id: 'patacon', label: 'Patacón', count: '123' },
  { id: 'carne_en_vara', label: 'Carne en Vara / Meat on a Stick', count: '87' },
  { id: 'chicha', label: 'Chicha', count: '45' },
  { id: 'caldo_de_costilla', label: 'Caldo de Costilla', count: '37' },
  { id: 'sancocho', label: 'Sancocho', count: '36' },
  { id: 'picana', label: 'Picaña', count: '28' },
  { id: 'mondongo', label: 'Mondongo', count: '11' },
  { id: 'cruzado', label: 'Cruzado', count: '8' }
];

const GOOGLE_REVIEWS = [
  {
    author: 'Marisol G.',
    meta: 'Local Guide · Dine-in · $20–30',
    topic: 'cachapa',
    topicLabel: 'Cachapa + Carne en Vara',
    quote: 'The best Venezuelan food I’ve had in Florida! We ordered the cachapa with carne en vara and tequeños—the sweet corn flavor with the melted queso de mano and smoky wood-fired meat is unreal.'
  },
  {
    author: 'Carlos R.',
    meta: 'Verified Google Review · Dine-in · Lunch',
    topic: 'carne_en_vara',
    topicLabel: 'Carne en Vara (87)',
    quote: 'Real Venezuelan Carne en Vara roasted over wood fire! The meat on a stick comes out super tender and juicy with crispy fat, yuca frita, arepitas, and guasacaca. Emi gave us 10/10 service.'
  },
  {
    author: 'Daniela P.',
    meta: 'Local Guide · Dine-in · Dinner',
    topic: 'patacon',
    topicLabel: 'Patacón (123)',
    quote: 'I came specifically for the Patacón with steak picaña and it blew me away. Huge portion, super crunchy green plantains, real queso de mano inside, and the steak was seasoned to perfection.'
  },
  {
    author: 'Alejandro V.',
    meta: 'Verified Google Review · Dine-in',
    topic: 'picana',
    topicLabel: 'Picaña Steak (28)',
    quote: 'Ordered the 11 oz Picaña Steak and a Cachapa con Queso de Mano to share. The picaña had that authentic smoky charcoal crust and melted in your mouth. Best llanero spot in Kissimmee!'
  },
  {
    author: 'Genesis M.',
    meta: 'Local Guide · Takeout · $10–20',
    topic: 'chicha',
    topicLabel: 'Chicha Venezolana (45)',
    quote: 'Do NOT leave without ordering the 32 oz Venezuelan Chicha! Thick, creamy, ice-cold with plenty of condensed milk and cinnamon on top—tastes just like home in Venezuela.'
  },
  {
    author: 'Roberto L.',
    meta: 'Verified Google Review · Breakfast',
    topic: 'caldo_de_costilla',
    topicLabel: 'Caldo de Costilla (37)',
    quote: 'Stopped in at 9:30 AM for breakfast and had the Caldo de Costilla with hot arepitas con nata. The rib broth revives your soul and the beef falls right off the bone. Monica was wonderful!'
  },
  {
    author: 'Valeria T.',
    meta: 'Local Guide · Dine-in · Family Dinner',
    topic: 'sancocho',
    topicLabel: 'Sancocho en Caldero (36)',
    quote: 'Their Beef Costilla Sancocho comes in a traditional pot brimming with yuca, corn, plantain, and tender beef ribs. Easily one of the most comforting soups in Orlando/Kissimmee.'
  },
  {
    author: 'Luis Fernando H.',
    meta: 'Verified Google Review · Dine-in · $30–50',
    topic: 'cruzado',
    topicLabel: 'Sancocho Cruzado (8)',
    quote: 'We ordered the Cruzado soup (beef and chicken) plus the Carne en Vara for 2 people. Huge portions, cold Polar beers in a bucket, and live llanera music that makes you feel in el llano!'
  },
  {
    author: 'Patricia S.',
    meta: 'Local Guide · Dine-in · Lunch',
    topic: 'cachapa',
    topicLabel: 'Cachapa con Cochino (263)',
    quote: 'The Cachapa with pork belly chicharrón and queso de mano is a 10 out of 10! Sweet fresh ground corn, massive layer of cheese, and crispy pork. Karelis and Manuel took great care of our table.'
  },
  {
    author: 'Jorge E.',
    meta: 'Verified Google Review · Dine-in',
    topic: 'mondongo',
    topicLabel: 'Mondongo & Sopas (11)',
    quote: 'Authentic Venezuelan soups—from the mondongo to the sancocho de costilla, the seasoning is spot-on. Paired with 4 tostones playeros and a cold Zulia beer, you cannot beat this place.'
  },
  {
    author: 'Stephanie C.',
    meta: 'Local Guide · Drive-thru / Pickup',
    topic: 'patacon',
    topicLabel: 'Patacón Maduro (123)',
    quote: 'Love that you can choose sweet plantain (maduro) or green tostón for the patacón! I got the sweet plantain patacón with shredded beef and tequeños—fast service and still piping hot.'
  },
  {
    author: 'Miguel A.',
    meta: 'Verified Google Review · Dine-in',
    topic: 'carne_en_vara',
    topicLabel: 'Carne en Vara Familiar (87)',
    quote: 'Brought my whole family of 5 and ordered the Carne en Vara for 4 people ($115)—32 oz of picaña, a whole roasted chicken, 4 chorizos, yuca, and tostones. Everyone left full and happy!'
  }
];

/* --------------------------------------------------------------------------
   7. LIVE HOURS ENGINE (KISSIMMEE, FL — AMERICA/NEW_YORK)
   Sun–Thu: 9:00 AM – 10:00 PM | Fri–Sat: 9:00 AM – 11:00 PM
   -------------------------------------------------------------------------- */
function updateLiveHoursStatus() {
  const now = new Date();
  const estString = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
  const estDate = new Date(estString);
  const day = estDate.getDay(); // 0 Sun .. 6 Sat
  const hour = estDate.getHours();
  const minute = estDate.getMinutes();
  const currentDecimal = hour + minute / 60;

  const isFriOrSat = day === 5 || day === 6;
  const openHour = 9; // 9:00 AM
  const closeHour = isFriOrSat ? 23 : 22; // 11:00 PM Fri-Sat, 10:00 PM Sun-Thu
  const closeLabel = isFriOrSat ? '11:00 PM' : '10:00 PM';

  const isOpen = currentDecimal >= openHour && currentDecimal < closeHour;
  const dotEl = document.getElementById('liveStatusDot');
  const textEl = document.getElementById('liveStatusText');

  if (!dotEl || !textEl) return;

  if (isOpen) {
    dotEl.classList.remove('closed');
    textEl.textContent = `${I18N[currentLang].openNow} ${closeLabel}`;
  } else {
    dotEl.classList.add('closed');
    textEl.textContent = I18N[currentLang].closedNow;
  }
}

/* --------------------------------------------------------------------------
   8. RENDER HERO STAGE & SWITCHER
   -------------------------------------------------------------------------- */
let activeHeroIndex = 0;

function renderHeroStage() {
  const dish = HERO_STAGE_DISHES[activeHeroIndex];
  const imgEl = document.getElementById('heroCutoutImg');
  const priceEl = document.getElementById('heroPriceBadge');
  const titleEl = document.getElementById('heroDishTitle');
  const descEl = document.getElementById('heroDishDesc');
  const linkEl = document.getElementById('heroDishOrderLink');
  const switcherEl = document.getElementById('heroSwitcher');

  if (imgEl) {
    imgEl.src = dish.img;
    imgEl.alt = dish.title[currentLang];
  }
  if (priceEl) priceEl.textContent = dish.price;
  if (titleEl) titleEl.textContent = dish.title[currentLang];
  if (descEl) descEl.textContent = dish.desc[currentLang];
  if (linkEl) {
    linkEl.href = `${CLOVER_ITEM_BASE}${dish.id}`;
    linkEl.textContent = I18N[currentLang].orderItemBtn;
  }

  if (switcherEl) {
    switcherEl.innerHTML = HERO_STAGE_DISHES.map((d, idx) => `
      <button type="button" class="hero-switch-btn ${idx === activeHeroIndex ? 'active' : ''}" data-hero-idx="${idx}">
        <img src="${d.img}" alt="${d.pill}" loading="lazy" />
        <span>${d.pill}</span>
      </button>
    `).join('');

    switcherEl.querySelectorAll('.hero-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeHeroIndex = parseInt(btn.getAttribute('data-hero-idx'), 10);
        renderHeroStage();
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. RENDER 8 SIGNATURE CUTOUT CARDS
   -------------------------------------------------------------------------- */
function renderSignatureCutouts() {
  const grid = document.getElementById('cutoutShowcaseGrid');
  if (!grid) return;

  grid.innerHTML = SIGNATURE_CUTOUTS.map(item => `
    <article class="cutout-card">
      <div>
        <div class="cutout-card-top">
          <span class="cutout-tag">${item.tag[currentLang]}</span>
          <span class="cutout-price">${item.price}</span>
        </div>
        <div class="cutout-img-wrap">
          <img src="${item.img}" alt="${item.title[currentLang]}" loading="lazy" />
        </div>
        <div class="cutout-card-body">
          <h3>${item.title[currentLang]}</h3>
          <p>${item.desc[currentLang]}</p>
        </div>
      </div>
      <div class="cutout-card-actions">
        <span class="cutout-reviews-chip">★ ${item.reviews}</span>
        <a href="${CLOVER_ITEM_BASE}${item.id}" target="_blank" rel="noopener" class="cutout-order-link">
          ${I18N[currentLang].orderItemBtn}
        </a>
      </div>
    </article>
  `).join('');
}

/* --------------------------------------------------------------------------
   10. RENDER INTERACTIVE PARRILLA & CARNE EN VARA BUILDER
   -------------------------------------------------------------------------- */
let activeParrillaKey = 'vara1';

function renderParrillaBuilder() {
  const tabsEl = document.getElementById('parrillaTabs');
  const titleEl = document.getElementById('parrillaActiveTitle');
  const priceEl = document.getElementById('parrillaActivePrice');
  const specsEl = document.getElementById('parrillaSpecsList');
  const sidesEl = document.getElementById('parrillaSidesPills');
  const imgEl = document.getElementById('parrillaActiveImg');
  const orderBtn = document.getElementById('parrillaOrderBtn');

  const current = PARRILLA_OPTIONS.find(p => p.key === activeParrillaKey) || PARRILLA_OPTIONS[0];

  if (tabsEl) {
    tabsEl.innerHTML = PARRILLA_OPTIONS.map(opt => `
      <button type="button" class="parrilla-tab-btn ${opt.key === activeParrillaKey ? 'active' : ''}" data-parrilla-key="${opt.key}">
        <div>
          <span class="parrilla-tab-title">${opt.tabTitle[currentLang]}</span>
          <span class="parrilla-tab-sub">${opt.tabSub[currentLang]}</span>
        </div>
        <span class="parrilla-tab-price">${opt.price}</span>
      </button>
    `).join('');

    tabsEl.querySelectorAll('.parrilla-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeParrillaKey = btn.getAttribute('data-parrilla-key');
        renderParrillaBuilder();
      });
    });
  }

  if (titleEl) titleEl.textContent = current.tabTitle[currentLang];
  if (priceEl) priceEl.textContent = current.price;
  if (specsEl) {
    specsEl.innerHTML = current.specs[currentLang].map(s => `
      <li><span class="spec-dot"></span><span>${s}</span></li>
    `).join('');
  }
  if (sidesEl) {
    sidesEl.innerHTML = OFFICIAL_ACOMPANANTES.map(side => `
      <span class="side-pill">${side}</span>
    `).join('');
  }
  if (imgEl) {
    imgEl.src = current.img;
    imgEl.alt = current.tabTitle[currentLang];
  }
  if (orderBtn) {
    orderBtn.href = `${CLOVER_ITEM_BASE}${current.id}`;
  }
}

/* --------------------------------------------------------------------------
   11. RENDER COMPLETE 53-ITEM CLOVER MENU & CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function renderMenuFilters() {
  const bar = document.getElementById('categoryPillsBar');
  if (!bar) return;

  const totalCount = MENU_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const allLabel = currentLang === 'en' ? 'All Categories' : 'Todas las Categorías';

  const pillsHtml = [
    `<button type="button" class="cat-filter-btn ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      <span>${allLabel}</span>
      <span class="cat-count">${totalCount}</span>
    </button>`
  ].concat(
    MENU_CATEGORIES.map(cat => `
      <button type="button" class="cat-filter-btn ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.name[currentLang]}</span>
        <span class="cat-count">${cat.items.length}</span>
      </button>
    `)
  );

  bar.innerHTML = pillsHtml.join('');

  bar.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat');
      renderMenuFilters();
      renderMenuGrid();
    });
  });
}

function renderMenuGrid() {
  const container = document.getElementById('menuCategoriesContainer');
  if (!container) return;

  const q = searchQuery.trim().toLowerCase();

  const filteredCategories = MENU_CATEGORIES
    .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
    .map(cat => {
      const matchedItems = cat.items.filter(item => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.modifiers && item.modifiers.some(m => m.toLowerCase().includes(q)))
        );
      });
      return { ...cat, items: matchedItems };
    })
    .filter(cat => cat.items.length > 0);

  if (filteredCategories.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 20px; background:#fff; border-radius:16px; border:1px solid rgba(27,17,11,0.1);">
        <h3 style="font-family:var(--font-display); font-size:1.35rem; margin-bottom:8px;">No dishes matched "${searchQuery}"</h3>
        <p style="color:var(--ink-secondary); margin-bottom:16px;">Try searching for "picaña", "cachapa", "sancocho", "patacón", or "chicha".</p>
        <button type="button" class="btn btn-ember" id="resetMenuSearchBtn">Show All 53 Dishes</button>
      </div>
    `;
    const resetBtn = document.getElementById('resetMenuSearchBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        const input = document.getElementById('menuSearchInput');
        if (input) input.value = '';
        activeCategory = 'all';
        renderMenuFilters();
        renderMenuGrid();
      });
    }
    return;
  }

  container.innerHTML = filteredCategories.map(cat => `
    <div class="menu-category-block" id="cat-${cat.id}">
      <div class="menu-category-header">
        <h3 class="menu-category-title">${cat.name[currentLang]}</h3>
        <span class="menu-category-note">${cat.note[currentLang]}</span>
      </div>
      <div class="menu-items-grid">
        ${cat.items.map(item => `
          <article class="menu-item-card">
            <div>
              <div class="menu-item-media">
                <img src="${item.img}" alt="${item.name}" loading="lazy" />
                ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
                <span class="menu-item-price-pill">${item.price}</span>
              </div>
              <div class="menu-item-content">
                <div>
                  <h4 class="menu-item-title">${item.name}</h4>
                  <p class="menu-item-desc">${item.desc}</p>
                </div>
                ${item.modifiers && item.modifiers.length ? `
                  <div class="menu-item-modifiers">
                    ${item.modifiers.map(m => `<span class="mod-chip">${m}</span>`).join('')}
                  </div>
                ` : ''}
                <div class="menu-item-footer">
                  <button type="button" class="btn-item-details" data-item-id="${item.id}">
                    ${I18N[currentLang].detailsBtn}
                  </button>
                  <a href="${CLOVER_ITEM_BASE}${item.id}" target="_blank" rel="noopener" class="btn-item-clover">
                    ${I18N[currentLang].orderItemBtn}
                  </a>
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-item-details').forEach(btn => {
    btn.addEventListener('click', () => {
      openDishModal(btn.getAttribute('data-item-id'));
    });
  });
}

/* --------------------------------------------------------------------------
   12. DISH DETAIL MODAL
   -------------------------------------------------------------------------- */
function openDishModal(itemId) {
  let foundItem = null;
  let foundCategory = null;
  for (const cat of MENU_CATEGORIES) {
    const match = cat.items.find(i => i.id === itemId);
    if (match) {
      foundItem = match;
      foundCategory = cat;
      break;
    }
  }
  if (!foundItem) return;

  const modal = document.getElementById('dishDetailModal');
  const img = document.getElementById('modalDishImg');
  const catLabel = document.getElementById('modalDishCat');
  const title = document.getElementById('modalDishTitle');
  const price = document.getElementById('modalDishPrice');
  const desc = document.getElementById('modalDishDesc');
  const mods = document.getElementById('modalDishMods');
  const orderLink = document.getElementById('modalDishOrderBtn');

  if (img) {
    img.src = foundItem.img;
    img.alt = foundItem.name;
  }
  if (catLabel) catLabel.textContent = foundCategory.name[currentLang];
  if (title) title.textContent = foundItem.name;
  if (price) price.textContent = foundItem.price;
  if (desc) desc.textContent = foundItem.desc;
  if (mods) {
    mods.innerHTML = (foundItem.modifiers || []).map(m => `<span class="mod-chip">${m}</span>`).join('');
  }
  if (orderLink) {
    orderLink.href = `${CLOVER_ITEM_BASE}${foundItem.id}`;
  }
  if (modal) modal.classList.add('open');
}

/* --------------------------------------------------------------------------
   13. RENDER GOOGLE MAPS REVIEWS & TOPIC FILTERS
   -------------------------------------------------------------------------- */
function renderReviewsSection() {
  const topicsBar = document.getElementById('reviewTopicsBar');
  const grid = document.getElementById('reviewsMasonryGrid');
  if (!topicsBar || !grid) return;

  topicsBar.innerHTML = REVIEW_TOPICS.map(t => `
    <button type="button" class="topic-pill-btn ${activeReviewTopic === t.id ? 'active' : ''}" data-topic="${t.id}">
      <span>${t.label}</span>
      <span class="topic-pill-count">(${t.count})</span>
    </button>
  `).join('');

  topicsBar.querySelectorAll('.topic-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeReviewTopic = btn.getAttribute('data-topic');
      renderReviewsSection();
    });
  });

  const filtered = activeReviewTopic === 'all'
    ? GOOGLE_REVIEWS
    : GOOGLE_REVIEWS.filter(r => r.topic === activeReviewTopic);

  grid.innerHTML = filtered.map(r => {
    const initials = r.author.split(' ').map(n => n[0]).join('').slice(0, 2);
    return `
      <article class="review-card">
        <div>
          <div class="review-card-top">
            <div class="reviewer-profile">
              <div class="reviewer-avatar">${initials}</div>
              <div>
                <div class="reviewer-name">${r.author}</div>
                <div class="reviewer-meta">${r.meta}</div>
              </div>
            </div>
            <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
          </div>
          <p class="review-quote">“${r.quote}”</p>
        </div>
        <div class="review-tags-row">
          <span class="review-topic-tag">${r.topicLabel}</span>
          <span class="review-service-type">Verified on Google Maps</span>
        </div>
      </article>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   14. APPLY LANGUAGE SWITCH (EN / ES)
   -------------------------------------------------------------------------- */
function applyTranslations() {
  const dict = I18N[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (key === 'heroTitle') {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.placeholder = dict.searchPlaceholder;
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });

  updateLiveHoursStatus();
  renderHeroStage();
  renderSignatureCutouts();
  renderParrillaBuilder();
  renderMenuFilters();
  renderMenuGrid();
  renderReviewsSection();
}

/* --------------------------------------------------------------------------
   15. INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  setInterval(updateLiveHoursStatus, 60000);

  // Language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang');
      applyTranslations();
    });
  });

  // Menu search input
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value || '';
      renderMenuGrid();
    });
  }

  // Modal close handlers
  const modal = document.getElementById('dishDetailModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal) modal.classList.remove('open');
  });
});
