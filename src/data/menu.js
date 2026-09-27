// Unbranded sample menu for the demo — swap in the client's real items and prices.
// - Photos are illustrative stock images until the client supplies their own.
// Add-ons (milk, extra shot, ice) are SAMPLE options — see `sampleOptions`.

export const categories = [
  { id: 'hot', en: 'Hot Drinks', ar: 'المشروبات الساخنة', icon: 'coffee' },
  { id: 'cold', en: 'Cold Drinks', ar: 'المشروبات الباردة', icon: 'snow' },
  { id: 'bakery', en: 'Bakeries', ar: 'المخبوزات', icon: 'bread' },
  { id: 'dessert', en: 'Desserts', ar: 'الحلويات', icon: 'cake' },
];

// Every item gets its stock photo from public/assets/menu/<id>.jpg (Unsplash, free licence).
const item = (id, category, en, ar, price, extra = {}) => ({ id, category, en, ar, price, photo: `menu/${id}.jpg`, ...extra });

// Option presets. `sample: true` = not on the published menu; shown with a "Sample" label.
const milky = { options: ['milk', 'shot'] };
const iced = { options: ['ice'] };
const icedMilky = { options: ['milk', 'shot', 'ice'] };
const sandwich = { options: ['addons', 'remove'] };

export const menu = [
  // Hot drinks — 15 lines on the menu; Large/Small Today's Coffee merged into one item with sizes.
  item('espresso', 'hot', 'Espresso', 'اسبريسو', 11, { options: ['shot'] }),
  item('macchiato', 'hot', 'Macchiato', 'ميكاتو', 13, milky),
  item('cortado', 'hot', 'Cortado', 'كورتادو', 14, milky),
  item('flat-white', 'hot', 'Flat White', 'فلات وايت', 15, milky),
  item('cappuccino', 'hot', 'Cappuccino', 'كابتشينو', 16, milky),
  item('latte', 'hot', 'Latte', 'لاتيه', 16, milky),
  item('hot-spanish', 'hot', 'Hot Spanish Latte', 'سبانش لاتيه حار', 17, milky),
  item('v60', 'hot', 'V60', 'V60', 18),
  item('americano', 'hot', 'Americano', 'أمريكانو', 13, { options: ['shot'] }),
  item('todays-hot', 'hot', "Today's Coffee", 'قهوة اليوم', 11, {
    sizes: [{ id: 'small', en: 'Small', ar: 'صغير', price: 11 }, { id: 'large', en: 'Large', ar: 'كبير', price: 13 }],
  }),
  item('white-mocha', 'hot', 'White Mocha', 'وايت موكا', 17, milky),
  item('tea', 'hot', 'Tea', 'شاهي', 4),
  item('caramel-macchiato', 'hot', 'Caramel Macchiato', 'كراميل ميكاتو', 17, milky),
  item('coffee-box', 'hot', "Today's Coffee Box", 'بوكس قهوة اليوم', 38, { share: true }),

  // Cold drinks — 16 lines; Large/Small Today's Coffee merged.
  item('spanish', 'cold', 'Spanish Latte', 'سبانش لاتيه', 18, { ...icedMilky, featured: true }),
  item('pistachio', 'cold', 'Pistachio Latte', 'فستق لاتيه', 20, { ...icedMilky, featured: true }),
  item('iced-latte', 'cold', 'Iced Latte', 'آيس لاتيه', 18, icedMilky),
  item('iced-white-mocha', 'cold', 'Iced White Mocha', 'آيس وايت موكا', 18, icedMilky),
  // Printed as "Iced Caramel Mecato" on the menu board — spelling to confirm.
  item('iced-caramel', 'cold', 'Iced Caramel Macchiato', 'آيس كراميل ميكاتو', 18, { ...icedMilky, confirm: 'spelling' }),
  item('iced-americano', 'cold', 'Iced Americano', 'آيس أمريكانو', 14, { options: ['shot', 'ice'] }),
  item('peach-tea', 'cold', 'Iced Peach Tea', 'آيس تي خوخ', 16, iced),
  item('passion-tea', 'cold', 'Iced Passion Fruit Tea', 'آيس تي باشن فروت', 16, iced),
  item('wattar', 'cold', 'Hibiscus Cooler', 'مشروب الكركديه', 17, {
    ...iced, featured: true,
  }),
  item('todays-cold', 'cold', "Today's Coffee (Iced)", 'قهوة اليوم باردة', 11, {
    ...iced, sizes: [{ id: 'small', en: 'Small', ar: 'صغير', price: 11 }, { id: 'large', en: 'Large', ar: 'كبير', price: 13 }],
  }),
  item('ice-v60', 'cold', 'Ice V60', 'Ice V60', 20, iced),
  item('iced-matcha', 'cold', 'Iced Matcha', 'آيس ماتشا', 19, {
    ...icedMilky, featured: true,
  }),
  item('iced-cortado', 'cold', 'Iced Cortado', 'آيس كورتادو', 16, icedMilky),
  item('alfredo', 'cold', 'Alfredo', 'الفريدو', 12, { confirm: 'description' }),
  item('cold-brew', 'cold', 'Cold Brew', 'كولد برو', 24, iced),

  // Bakeries
  item('halloumi', 'bakery', 'Halloumi Sandwich', 'ساندوتش حلومي', 16, { ...sandwich, featured: true }),
  item('tuna', 'bakery', 'Tuna Sandwich', 'ساندوتش تونة', 16, sandwich),

  // Desserts
  item('kunafa', 'dessert', 'Kunafa Pudding', 'بودنق الكنافة', 24, { featured: true }),
  item('cookies', 'dessert', 'Cookies', 'كوكيز', 7, { featured: true }),
  item('flipped-cheesecake', 'dessert', 'Flipped Cheesecake', 'تشيز كيك مقلوب', 23),
  item('basbousa-cheesecake', 'dessert', 'Basbousa Cheesecake', 'تشيز كيك بسبوسة', 23),
  item('tiramisu', 'dessert', 'Tiramisu', 'تيراميسو كوب', 24),
  item('chocolate-cake', 'dessert', 'Chocolate Cake', 'شوكليت كيك', 25),
  item('san-madrid', 'dessert', 'San Madrid', 'سان مدريد', 23),
];

// Sample descriptions, calories (kcal, regular size) and allergens — placeholders for the client to confirm.
// Allergen codes: milk, gluten, egg, nuts, soy, sesame, fish.
const details = {
  espresso: ['A short, intense double shot.', 'شوت مركز ومكثف.', 5, []],
  macchiato: ['Espresso marked with a spoon of milk foam.', 'اسبريسو مع لمسة رغوة حليب.', 20, ['milk']],
  cortado: ['Equal parts espresso and silky warm milk.', 'اسبريسو وحليب دافئ بنسب متساوية.', 60, ['milk']],
  'flat-white': ['Double ristretto with velvety micro-foam.', 'ريستريتو مزدوج مع رغوة حليب ناعمة.', 110, ['milk']],
  cappuccino: ['Espresso, steamed milk and a thick foam cap.', 'اسبريسو وحليب مبخر ورغوة كثيفة.', 120, ['milk']],
  latte: ['Espresso with plenty of steamed milk.', 'اسبريسو مع حليب مبخر.', 150, ['milk']],
  'hot-spanish': ['Latte sweetened with condensed milk.', 'لاتيه محلى بالحليب المكثف.', 220, ['milk']],
  v60: ['Hand-poured filter coffee, bright and clean.', 'قهوة مقطرة يدويًا بطعم نقي.', 5, []],
  americano: ['Espresso lengthened with hot water.', 'اسبريسو مع ماء حار.', 10, []],
  'todays-hot': ['Our filter coffee of the day.', 'قهوة اليوم المقطرة.', 5, []],
  'white-mocha': ['Espresso, white chocolate and steamed milk.', 'اسبريسو مع شوكولاتة بيضاء وحليب.', 290, ['milk', 'soy']],
  tea: ['Classic black tea, served hot.', 'شاي أحمر كلاسيكي.', 2, []],
  'caramel-macchiato': ['Vanilla milk, espresso and caramel drizzle.', 'حليب بالفانيلا واسبريسو وصوص كراميل.', 240, ['milk']],
  'coffee-box': ['A shareable carafe of today’s coffee — serves 4.', 'دلة قهوة اليوم للمشاركة — تكفي ٤.', 20, []],
  spanish: ['Iced espresso with sweet condensed milk.', 'اسبريسو بارد مع حليب مكثف محلى.', 240, ['milk']],
  pistachio: ['Iced latte with house pistachio cream.', 'لاتيه بارد مع كريمة الفستق.', 300, ['milk', 'nuts']],
  'iced-latte': ['Espresso over cold milk and ice.', 'اسبريسو على حليب بارد وثلج.', 140, ['milk']],
  'iced-white-mocha': ['White chocolate, espresso and cold milk.', 'شوكولاتة بيضاء واسبريسو وحليب بارد.', 280, ['milk', 'soy']],
  'iced-caramel': ['Layered vanilla milk, espresso and caramel.', 'طبقات حليب بالفانيلا واسبريسو وكراميل.', 230, ['milk']],
  'iced-americano': ['Espresso and cold water over ice.', 'اسبريسو مع ماء بارد وثلج.', 10, []],
  'peach-tea': ['Black tea shaken with peach and ice.', 'شاي مع خوخ وثلج.', 110, []],
  'passion-tea': ['Tropical passion fruit iced tea.', 'آيس تي بفاكهة الباشن.', 120, []],
  wattar: ['Chilled hibiscus with a hint of citrus.', 'كركديه بارد مع لمسة حمضيات.', 90, []],
  'todays-cold': ['Today’s filter coffee, served over ice.', 'قهوة اليوم على ثلج.', 5, []],
  'ice-v60': ['Hand-brewed V60 flash-chilled over ice.', 'V60 مقطرة على الثلج مباشرة.', 5, []],
  'iced-matcha': ['Ceremonial-grade matcha over cold milk.', 'ماتشا فاخرة مع حليب بارد.', 180, ['milk']],
  'iced-cortado': ['A short iced espresso with a splash of milk.', 'اسبريسو بارد مع قليل من الحليب.', 70, ['milk']],
  alfredo: ['A shot of espresso poured over vanilla ice cream.', 'شوت اسبريسو على آيس كريم فانيلا.', 210, ['milk', 'egg']],
  'cold-brew': ['Steeped for 18 hours — smooth and bold.', 'منقوعة ١٨ ساعة — ناعمة وقوية.', 5, []],
  halloumi: ['Grilled halloumi, tomato and rocket on toasted brioche.', 'حلومي مشوي وطماطم وجرجير بخبز البريوش.', 420, ['milk', 'gluten', 'egg', 'sesame']],
  tuna: ['Tuna mayo, pickles and lettuce on toasted brioche.', 'تونة بالمايونيز ومخلل وخس بخبز البريوش.', 450, ['fish', 'gluten', 'egg']],
  kunafa: ['Creamy pudding layered with crispy kunafa and pistachio.', 'بودنق كريمي مع كنافة مقرمشة وفستق.', 480, ['milk', 'gluten', 'nuts']],
  cookies: ['Chewy chocolate chip cookie, baked daily.', 'كوكيز بالشوكولاتة يُخبز يوميًا.', 220, ['gluten', 'milk', 'egg']],
  'flipped-cheesecake': ['Creamy cheesecake served upside-down with crumble.', 'تشيز كيك كريمي مقلوب مع كرمبل.', 410, ['milk', 'egg', 'gluten']],
  'basbousa-cheesecake': ['Cheesecake on a syrup-soaked basbousa base.', 'تشيز كيك على قاعدة بسبوسة بالقطر.', 450, ['milk', 'egg', 'gluten']],
  tiramisu: ['Espresso-soaked sponge, mascarpone and cocoa.', 'بسكويت بالاسبريسو وماسكربوني وكاكاو.', 390, ['milk', 'egg', 'gluten']],
  'chocolate-cake': ['Rich layered chocolate cake with ganache.', 'كيك شوكولاتة غني بطبقات الغاناش.', 470, ['milk', 'egg', 'gluten', 'soy']],
  'san-madrid': ['Burnt Basque-style cheesecake with a soft centre.', 'تشيز كيك محروق بقلب طري.', 400, ['milk', 'egg']],
};
for (const p of menu) {
  const [en, ar, kcal, allergens] = details[p.id];
  Object.assign(p, { desc: { en, ar }, kcal, allergens });
}

export const allergenNames = {
  milk: { en: 'Milk', ar: 'حليب' },
  gluten: { en: 'Gluten', ar: 'جلوتين' },
  egg: { en: 'Egg', ar: 'بيض' },
  nuts: { en: 'Nuts', ar: 'مكسرات' },
  soy: { en: 'Soy', ar: 'صويا' },
  sesame: { en: 'Sesame', ar: 'سمسم' },
  fish: { en: 'Fish', ar: 'سمك' },
};

// Sample customisations — NOT on the published menu. Prices are placeholders for the client to set.
export const sampleOptions = {
  milk: {
    en: 'Milk', ar: 'الحليب',
    choices: [
      { id: 'regular', en: 'Regular', ar: 'عادي', price: 0 },
      { id: 'oat', en: 'Oat', ar: 'شوفان', price: 3 },
      { id: 'almond', en: 'Almond', ar: 'لوز', price: 3 },
    ],
  },
  ice: {
    en: 'Ice', ar: 'الثلج',
    choices: [
      { id: 'regular', en: 'Regular ice', ar: 'ثلج عادي', price: 0 },
      { id: 'light', en: 'Light ice', ar: 'ثلج خفيف', price: 0 },
    ],
  },
  shot: { en: 'Extra espresso shot', ar: 'شوت اسبريسو إضافي', price: 3 },
  addons: {
    en: 'Add-ons', ar: 'الإضافات', max: 3,
    choices: [
      { id: 'cheese', en: 'Extra cheese', ar: 'جبنة إضافية', price: 4 },
      { id: 'avocado', en: 'Avocado', ar: 'أفوكادو', price: 6 },
      { id: 'egg', en: 'Fried egg', ar: 'بيض مقلي', price: 4 },
      { id: 'jalapeno', en: 'Jalapeño', ar: 'هالبينو', price: 2 },
    ],
  },
  remove: {
    en: 'Without', ar: 'بدون',
    choices: [
      { id: 'rocket', en: 'No rocket', ar: 'بدون جرجير' },
      { id: 'tomato', en: 'No tomato', ar: 'بدون طماطم' },
      { id: 'mayo', en: 'No mayo', ar: 'بدون مايونيز' },
      { id: 'pickles', en: 'No pickles', ar: 'بدون مخلل' },
    ],
  },
};

export const cafe = {
  name: { en: 'Café', ar: 'الكافيه' },
  tagline: { en: 'Specialty Coffee', ar: 'قهوة مختصة' },
  address: { en: 'Main Street · sample address', ar: 'الشارع الرئيسي · عنوان تجريبي' },
  city: { en: 'Your city', ar: 'مدينتك' },
  phone: '0500000000',
  instagram: '#',
  // Day index: 0 = Sunday … 5 = Friday, 6 = Saturday.
  hours: (day) => (day === 5 ? { open: 8, close: 24 } : { open: 6, close: 24 }),
};

export const byId = Object.fromEntries(menu.map((p) => [p.id, p]));
