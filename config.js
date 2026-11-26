/* ════════════════════════════════════════════════════════════════════
   أصدقاء البيئة — كلية التجارة، جامعة قناة السويس
   ملف الإعدادات: كل النصوص والروابط والصور تتعدل من هنا فقط.
   - الصور: حط الصورة في فولدر assets/ واكتب مسارها (بدون امتداد يشتغل مع jpg/jpeg/png/webp)
   - الروابط: اللي فاضي ('') بيظهر للزائر رسالة "قريبًا" بدل ما يوديه لمكان غلط
════════════════════════════════════════════════════════════════════ */
const CONFIG = {
  images: {
    facultyEmblem: './Gemini_Generated_Image_sizaexsizaexsiza-removebg-preview.png',   // شعار الكلية
    ecoLogo: './photo_2026-10-16_03-11-22-removebg-preview.png',                       // لوجو الفريق
    /* كل قايمة بتجرب الأول صورتك المحلية، ولو مش موجودة بتستخدم الصورة الاحتياطية */
    hero: ['assets/hero', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop'],
    join: ['assets/join', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'],
    footer: ['assets/footer', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=1080&fit=crop'],
  },

  /* الصور الجديدة في assets/events/<id>/ بتظهر لوحدها من GitHub من غير أي تعديل في الكود */
  github: 'x-samir-official-x/env_friends_scu',

  /* فورم التقديم: Supabase — ده مفتاح anon العام، آمن إنه يبقى في الموقع (الصلاحيات محكومة من قاعدة البيانات) */
  supabase: { url: 'https://svvmavxbafwlayucvcui.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dm1hdnhiYWZ3bGF5dWN2Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU2OTY5MDIsImV4cCI6MjExMTI3MjkwMn0.TrFc-vcGYbqBgkW9UGYLhFUFX8Y6hZaOU0WsCzMbBNo' },

  links: {
    registrationForm: 'join.html',   // فورم التقديم بتاعنا (الردود بتتحفظ في Supabase)
    facebook: 'https://www.facebook.com/env_friends_scu',
    facultyPage: 'https://www.facebook.com/share/19zGBvni5Y/?mibextid=wwXIfr',
    teamPage: 'https://www.facebook.com/env_friends_scu',
  },

  /* أيقونات السوشيال في الفوتر — الفاضي بيظهر "قريبًا" */
  socials: [
    { key: 'facebook',  icon: 'ph-facebook-logo',  label: 'Facebook',  href: 'https://www.facebook.com/env_friends_scu' },
    { key: 'instagram', icon: 'ph-instagram-logo', label: 'Instagram', href: '' },
    { key: 'tiktok',    icon: 'ph-tiktok-logo',    label: 'TikTok',    href: '' },
    { key: 'youtube',   icon: 'ph-youtube-logo',   label: 'YouTube',   href: '' },
    { key: 'whatsapp',  icon: 'ph-whatsapp-logo',  label: 'WhatsApp',  href: '' },
  ],

  nav: [
    { href: '#hero',        ar: 'الرئيسية',          en: 'Home' },
    { href: '#about',       ar: 'عن الفريق',         en: 'About' },
    { href: '#university', ar: 'قيادة الجامعة', en: 'University' },
    { href: '#supervision', ar: 'الإشراف الأكاديمي', en: 'Supervision' },
    { href: '#leadership',  ar: 'الهيكل الإداري',    en: 'Leadership' },
    { href: '#team',       ar: 'فريقنا',            en: 'Team' },
    { href: '#campaigns',   ar: 'حملاتنا',           en: 'Campaigns' },
    { href: '#eco-week',   ar: 'الأسبوع البيئي',    en: 'Eco Week' },
    { href: '#contact',     ar: 'تواصل معنا',        en: 'Contact' },
  ],

  /* الأرقام — كلها صفر دلوقتي، عدّل value مع الوقت */
  /* auto: الرقم بيتحسب لوحده من الموقع
       'activities' = الحملات اللي done + أنشطة الأسبوع البيئي اللي ليها صور
       'members'    = الهيكل الإداري + صور فولدر Team Member
       'hours' / 'beneficiaries' = مجموع hours و beneficiaries المكتوبين في كل فعالية تحت
     من غير auto: الرقم بيتكتب يدوي في value */
  stats: [
    { auto: 'activities', icon: 'ph-calendar-check', ar: 'نشاط منفّذ',  en: 'Activities Done' },
    { auto: 'members',    icon: 'ph-users-three',    ar: 'عضو متطوع',  en: 'Volunteers' },
    { auto: 'hours',         icon: 'ph-clock', ar: 'ساعة تطوع', en: 'Volunteer Hours' },
    { auto: 'beneficiaries', icon: 'ph-heart', ar: 'مستفيد',    en: 'Beneficiaries' },
  ],

  about: [
    { icon: 'ph-eye', ar: 'رؤيتنا', en: 'Our Vision',
      textAr: 'أن نكون نموذجًا رائدًا للعمل البيئي التطوعي في الجامعات المصرية، ونغرس ثقافة الاستدامة في نفوس الطلاب والمجتمع.',
      textEn: 'To be a leading model of environmental volunteering in Egyptian universities, instilling a culture of sustainability in students and the community.' },
    { icon: 'ph-target', ar: 'رسالتنا', en: 'Our Mission',
      textAr: 'تنمية الوعي البيئي لدى طلاب كلية التجارة من خلال مبادرات عملية وحملات تشجير وورش عمل تخدم البيئة والتنمية المستدامة.',
      textEn: 'To raise environmental awareness among Faculty of Commerce students through practical initiatives, tree-planting campaigns and workshops that serve sustainable development.' },
  ],

  /* لينكات "اقرأ المزيد" — خد بالك: الفاضي بيظهر "قريبًا" */
  officialLinks: [
    { icon: 'ph-user-plus', ar: 'فورم الانضمام للفريق', en: 'Team Registration Form',
      descAr: 'انضم لأصدقاء البيئة وابدأ رحلتك في العمل التطوعي.', descEn: 'Join Environment Friends and start your volunteering journey.',
      linkKey: 'registrationForm' },
    { icon: 'ph-facebook-logo', ar: 'صفحة الفريق الرسمية', en: 'Official Team Page',
      descAr: 'تابع أخبار الفريق وحملاته أولًا بأول.', descEn: 'Follow the team’s news and campaigns as they happen.',
      linkKey: 'teamPage' },
    { icon: 'ph-buildings', ar: 'صفحة كلية التجارة', en: 'Faculty of Commerce',
      descAr: 'الصفحة الرسمية للكلية — أخبار أكاديمية وفعاليات.', descEn: 'The faculty’s official page — academic news and events.',
      linkKey: 'facultyPage' },
  ],

  /* قيادة الجامعة — أعلى مستوى في التدرج (الاسم الرسمي للقسم من i18n: univTitle) */
  university: [
    { ar: 'أ.د/ ناصر سعيد مندور', en: 'Prof. Dr. Nasser Said Mandour',
      titleAr: 'رئيس الجامعة', titleEn: 'University President', photo: 'assets/univ_president' },
    { ar: 'د/ دينا أبو المعاطي', en: 'Dr. Dina Abu El-Maaty',
      titleAr: 'نائب رئيس الجامعة لشئون البيئة وخدمة المجتمع', titleEn: 'Vice President for Environmental Affairs & Community Service', photo: 'assets/univ_vp_dina' },
  ],

  /* photo: مسار الصورة في assets (بدون امتداد) — لو مش موجودة بيظهر الحرف الأول */
  supervision: [
    { ar: 'أ.د/أحمد عزمي', en: 'Prof. Dr. Ahmed Azmy',
      titleAr: 'عميد كلية التجارة', titleEn: 'Dean of the Faculty of Commerce', photo: 'assets/dean_ahmed' },
    { ar: 'أ.د/ ريمان أحمد عبدالعال', en: 'Prof. Dr. Rayman Ahmed Abdel-Aal',
      titleAr: 'وكيل كلية التجارة لشئون البيئة وخدمة المجتمع', titleEn: 'Vice Dean for Environmental Affairs & Community Service', photo: 'assets/vice_rayman' },
    { ar: 'د/ نجاة علي عزت', en: 'Dr. Nagat Aly Ezzat',
      chipAr: 'الرائد الأكاديمي', chipEn: 'Academic Mentor',
      titleAr: 'معيدة بقسم العلوم السياسية', titleEn: 'Teaching Assistant, Department of Political Science', photo: 'assets/advisor_nagat' },
  ],

  leadership: [
    { ar: 'سمير سيد', en: 'Samir Sayed', titleAr: 'قائد الفريق', titleEn: 'Team Leader', photo: 'assets/team_leader_samir' },
    { ar: 'ندى محمد', en: 'Nada Mohamed', titleAr: 'نائب قائد الفريق', titleEn: 'Deputy Team Leader', photo: 'assets/co_leader_nada' },
  ],

  /* أعضاء الفريق: صورة لكل عضو في الفولدر، واسم الملف = اسم العضو (ثنائي) */
  team: { folder: 'assets/Team Member', titleAr: 'طالبة', titleEn: 'Student' },

  /* الأسبوع البيئي: يوم لكل عنصر. الصور في assets/eco-week/day-N/ وبتظهر لوحدها.
     اكتب عنوان اليوم ونبذته في titleAr / summaryAr (والإنجليزي اختياري) */
  ecoWeek: [
    { id: 'eco-week/day-1', hours: 3, beneficiaries: 25, date: '2026-11-22', folder: 'assets/eco-week/day-1',
      titleAr: 'معرض المشغولات اليدوية', titleEn: 'Handicrafts Exhibition',
      summaryAr: 'افتتحنا الأسبوع البيئي بمعرض للمشغولات اليدوية داخل الكلية، شاركت فيه عارضات بأعمال الكروشيه والتطريز والإكسسوارات والشنط المصنوعة يدويًا ومنتجات العناية الطبيعية، في دعمٍ للمنتج المحلي والصناعات الصديقة للبيئة.',
      summaryEn: 'We opened Environmental Week with a handicrafts exhibition at the faculty, featuring handmade crochet, embroidery, accessories, bags and natural care products, in support of local, eco-friendly craftsmanship.' },
    { id: 'eco-week/day-3', hours: 2, beneficiaries: 24, date: '2026-11-24', folder: 'assets/eco-week/day-3',
      titleAr: 'مبادرة «بيئتنا خضراء مستدامة»', titleEn: '"Our Environment: Green & Sustainable" Initiative',
      summaryAr: 'ندوة توعوية مع إدارة شئون البيئة ووحدة تنظيم المخلفات بمحافظة الإسماعيلية، قدّمتها الباحثتان د/ مروة عبد الكريم ود/ شيماء سيد، بإدارة م/ مروة الخولي. تناولت أهداف التنمية المستدامة ورؤية مصر 2030 وبُعدها البيئي، من مواجهة تغيّر المناخ إلى إدارة المخلفات، مع مسابقات وفيديوهات ومطويات عن قواعد حماية البيئة الأربعة: ترشيد، تشجير، تدوير، وتوعية. وعلى هامشها ورشة عمل حوّل فيها الطلاب الكرتون والبلاستيك والورق إلى منتجات نافعة.',
      summaryEn: 'An awareness seminar with the Ismailia Governorate Environmental Affairs Department and Waste Management Unit, led by researchers Dr. Marwa Abdel Karim and Dr. Shaimaa Sayed, under director Eng. Marwa El-Khouly. It covered the Sustainable Development Goals and the environmental pillar of Egypt Vision 2030, from climate action to waste management, with quizzes, videos and leaflets on the four rules of protecting the environment: conserve, plant, recycle and raise awareness. Alongside it, a hands-on workshop turned cardboard, plastic and paper into useful products.' },
    { date: '2026-11-25', parts: [
      { id: 'eco-week/day-4', hours: 3, beneficiaries: 22, folder: 'assets/eco-week/day-4',
        titleAr: 'إعادة تدوير الإطارات', titleEn: 'Upcycling Old Tyres',
        summaryAr: 'حوّلنا إطارات السيارات القديمة إلى قطع ملوّنة تزيّن حديقة الكلية، فلوّنها أعضاء الفريق بالأخضر والأحمر والأصفر والبنفسجي ورسموا عليها وجوهًا مبتسمة، وشاركتنا الدكتورة الرسم، في رسالة بسيطة: المخلفات ممكن تتحول إلى جمال بدل ما تلوّث البيئة.',
        summaryEn: 'We turned old car tyres into colourful pieces that brighten the faculty garden: team members painted them green, red, yellow and purple and added smiling faces, with the doctor joining in, to show that waste can become beauty instead of pollution.' },
      { id: 'eco-week/day-4-planting', hours: 2, beneficiaries: 21, folder: 'assets/eco-week/day-4-planting',
        titleAr: 'التشجير وزيارة معرض الفنان مجدي حسن', titleEn: 'Tree Planting & a Visit to Artist Magdy Hassan’s Exhibition',
        summaryAr: 'شارك أعضاء هيئة التدريس الفريقَ في زراعة شتلات جديدة بحديقة الكلية، ثم زرنا معرض الفنان مجدي حسن في مبنى 2، حيث شرح لنا لوحاته الزيتية ولوحاته المرسومة على الجلد، وما تحمله من ملامح الحياة المصرية.',
        summaryEn: 'Faculty members joined the team to plant new seedlings in the faculty garden, then we visited artist Magdy Hassan’s exhibition in Building 2, where he walked us through his oil paintings and his works drawn on leather, each carrying scenes of Egyptian life.' },
    ] },
    { date: '2026-11-26', parts: [
      { id: 'eco-week/day-5', hours: 2, beneficiaries: 23, folder: 'assets/eco-week/day-5',
        titleAr: 'زيارة معرض فن الأوريجامي', titleEn: 'A Visit to a 3D Origami Exhibition',
        summaryAr: 'زرنا ركن فنان يصنع من الورق المطوي مجسّمات ملوّنة: بجعات وطيور وأسماك وسلال وأزهار وحوامل أقلام، وشرح لنا بنفسه كيف تتحوّل قطع الورق الصغيرة إلى قطع فنية، في مثال حيّ على الإبداع بخامات بسيطة.',
        summaryEn: 'We visited an artist who folds paper into colourful 3D figures: swans, birds, fish, baskets, flowers and pen holders. He showed us himself how small pieces of paper become works of art, a living example of creativity with simple materials.' },
      { id: 'eco-week/day-5-seminar', hours: 2, beneficiaries: 25, folder: 'assets/eco-week/day-5-seminar',
        titleAr: 'ندوة «التغيرات المناخية: من الوعي البيئي إلى المشاركة المجتمعية»', titleEn: 'Seminar: "Climate Change: From Environmental Awareness to Community Participation"',
        summaryAr: 'اختتمنا الأسبوع البيئي بندوة قدّمها أ.م.د/ باسم المغربي، أستاذ العلوم السياسية المساعد بجامعة قناة السويس والمدرب الدولي المعتمد من منظمة العمل الدولية، عن التغيرات المناخية وجهود مصر في مواجهتها، وكيف ينتقل الطالب من الوعي البيئي إلى المشاركة الفعلية في مجتمعه.',
        summaryEn: 'We closed Environmental Week with a seminar by Assoc. Prof. Bassem El-Maghraby, Assistant Professor of Political Science at Suez Canal University and an ILO-certified international trainer, on climate change, Egypt’s efforts to tackle it, and how students can move from environmental awareness to real participation in their community.' },
    ] },
  ],

  /* الحملات — image: صورتك المحلية أولًا ثم صورة احتياطية */
  campaigns: [
    { id: 'smile-day', done: true, hours: 3, beneficiaries: 25, folder: 'assets/events/smile-day', gallery: [],
      ar: 'يوم الابتسامة العالمي', en: 'World Smile Day',
      dateAr: 'الإثنين 19 أكتوبر 2026', dateEn: 'Monday, 19 October 2026', day: '19', monthAr: 'أكتوبر', monthEn: 'Oct',
      descAr: 'نشر الابتسامة والطاقة الإيجابية بين طلاب الكلية.', descEn: 'Spreading smiles and positive energy among the faculty’s students.',
      icon: 'ph-smiley',
      image: ['assets/init_smile', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=600&fit=crop'] },
    { id: 'elderly-visit', done: true, hours: 2, beneficiaries: 20, folder: 'assets/events/elderly-visit', gallery: [],
      ar: 'زيارة دار المسنين', en: 'Elderly Care Home Visit',
      dateAr: 'الخميس 22 أكتوبر 2026', dateEn: 'Thursday, 22 October 2026', day: '22', monthAr: 'أكتوبر', monthEn: 'Oct',
      descAr: 'زيارة إنسانية لإدخال البهجة على قلوب كبار السن.', descEn: 'A humane visit to bring joy to our elders.',
      icon: 'ph-heart',
      image: ['assets/init_nursing', 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=900&h=600&fit=crop'] },
  ],

  contact: { handle: '@env_friends_scu', href: 'https://www.facebook.com/env_friends_scu' },

  i18n: {
    brand:      { ar: 'أصدقاء البيئة', en: 'Environment Friends' },
    brandSub:   { ar: 'كلية التجارة', en: 'Faculty of Commerce' },
    navJoin:    { ar: 'انضم إلينا', en: 'Join Us' },
    heroPill:   { ar: 'معاً من أجل بيئة أفضل', en: 'Together for a Better Environment' },
    heroTitle:  { ar: 'فريق أصدقاء البيئة', en: 'Environment Friends Team' },
    heroTitle2: { ar: 'كلية التجارة — جامعة قناة السويس', en: 'Faculty of Commerce — Suez Canal University' },
    heroSub:    { ar: 'فريق طلابي تطوعي يعمل على نشر الوعي البيئي وتنظيم حملات التشجير وورش العمل لخدمة المجتمع الجامعي.', en: 'A student volunteer team spreading environmental awareness and organizing tree-planting campaigns and workshops for the university community.' },
    heroBtn1:   { ar: 'انضم للفريق', en: 'Join the Team' },
    heroBtn2:   { ar: 'اكتشف حملاتنا', en: 'Explore Campaigns' },
    scroll:     { ar: 'اسحب لأسفل', en: 'Scroll' },
    statsPill:  { ar: 'بأرقام', en: 'By the Numbers' },
    statsTitle: { ar: 'أرقام تتحدث', en: 'Numbers That Speak' },
    statsSub:   { ar: 'بداية رحلتنا — هذه الأرقام ستكبر مع كل حملة نخوضها.', en: 'Our journey is just beginning — these numbers will grow with every campaign.' },
    aboutPill:  { ar: 'عن الفريق', en: 'About Us' },
    aboutTitle: { ar: 'من نحن', en: 'Who We Are' },
    aboutSub:   { ar: 'رؤية واضحة ورسالة نؤمن بها لخدمة البيئة والمجتمع.', en: 'A clear vision and a mission we believe in, for the environment and community.' },
    readMore:   { ar: 'اقرأ المزيد', en: 'Read more' },
    supPill:    { ar: 'الإشراف الأكاديمي', en: 'Academic Supervision' },
    supTitle:   { ar: 'الرعاية والإشراف الأكاديمي', en: 'Patronage & Academic Supervision' },
    supSub:     { ar: 'نخبة من أعضاء هيئة التدريس يدعمون الفريق ويشرفون على أنشطته.', en: 'Distinguished faculty members who support the team and oversee its activities.' },
    leadPill:   { ar: 'الهيكل الإداري', en: 'Leadership' },
    leadTitle:  { ar: 'الهيكل الإداري للفريق', en: 'Team Leadership' },
    leadSub:    { ar: 'قيادة شابة تقود الفريق نحو بيئة أفضل.', en: 'Young leaders driving the team toward a better environment.' },
    campPill:   { ar: 'حملاتنا', en: 'Our Campaigns' },
    campTitle:  { ar: 'أولى حملاتنا', en: 'Our First Campaigns' },
    campSub:    { ar: 'مواعيد حملاتنا القادمة — كن معنا من اليوم الأول.', en: 'Our upcoming campaigns — be with us from day one.' },
    univPill:   { ar: 'قيادة الجامعة', en: 'University Leadership' },
    univTitle:  { ar: 'قيادة الجامعة', en: 'University Leadership' },
    univSub:    { ar: 'القيادات العليا التي ترعى العمل البيئي والمجتمعي بالجامعة.', en: 'The senior leaders who support environmental and community work at the university.' },
    teamPill:   { ar: 'فريقنا', en: 'Our Team' },
    teamTitle:  { ar: 'أعضاء الفريق', en: 'Team Members' },
    teamSub:    { ar: 'وجوه شابة متطوعة تصنع الفرق بجهدها وشغفها بالبيئة.', en: 'Young volunteers making a difference with their effort and passion for the environment.' },
    teamSoon:   { ar: 'سيتم عرض أعضاء الفريق هنا قريبًا', en: 'Team members will appear here soon' },
    ecoPill:    { ar: 'الأسبوع البيئي', en: 'Environmental Week' },
    ecoTitle:   { ar: 'الأسبوع البيئي', en: 'Environmental Week' },
    ecoSub:     { ar: 'أربعة أيام من العمل البيئي — من الأحد 22 إلى الخميس 26 نوفمبر 2026. تابع كل يوم بصوره.', en: 'Four days of environmental action — Sunday 22 to Thursday 26 November 2026. Follow each day in photos.' },
    ecoDay:     { ar: 'اليوم', en: 'Day' },
    ecoToday:   { ar: 'اليوم', en: 'Today' },
    ecoDone:    { ar: 'انتهى', en: 'Done' },
    ecoSoon:    { ar: 'قريبًا', en: 'Upcoming' },
    ecoPending: { ar: 'صور وتفاصيل هذا اليوم ستُضاف قريبًا.', en: 'Photos and details for this day will be added soon.' },
    ecoMore:    { ar: 'شاهد كل الصور', en: 'View all photos' },
    splashTitle:{ ar: 'أصدقاء البيئة', en: 'Environment Friends' },
    splashSub:  { ar: 'كلية التجارة — جامعة قناة السويس', en: 'Faculty of Commerce — Suez Canal University' },
    photosAfter:{ ar: 'الصور بعد الفعالية', en: 'Photos after the event' },
    done:       { ar: 'تمّت بنجاح', en: 'Completed' },
    viewPhotos: { ar: 'اضغط لمشاهدة الصور', en: 'Tap to view photos' },
    photosWord: { ar: 'صور', en: 'photos' },
    close:      { ar: 'إغلاق', en: 'Close' },
    prev:       { ar: 'السابقة', en: 'Previous' },
    next:       { ar: 'التالية', en: 'Next' },
    sound:      { ar: 'الصوت', en: 'Sound' },
    soon:       { ar: 'قريبًا', en: 'Soon' },
    joinBadge:  { ar: 'التطوع مفتوح الآن', en: 'Volunteering is open now' },
    joinTitle:  { ar: 'انضم إلى فريق أصدقاء البيئة', en: 'Join the Environment Friends Team' },
    joinSub:    { ar: 'كن جزءًا من التغيير البيئي في جامعة قناة السويس.', en: 'Be part of the environmental change at Suez Canal University.' },
    joinBtn:    { ar: 'سجّل الآن', en: 'Register Now' },
    contactPill:  { ar: 'تواصل معنا', en: 'Contact' },
    contactTitle: { ar: 'تواصل معنا', en: 'Get in Touch' },
    contactSub:   { ar: 'تابعنا وراسلنا على فيسبوك — هناك كل أخبارنا.', en: 'Follow and message us on Facebook — all our news lives there.' },
    contactFb:    { ar: 'تابعنا على فيسبوك', en: 'Follow us on Facebook' },
    footMotto:  { ar: 'وعي • إجراء • استدامة', en: 'Awareness • Action • Sustainability' },
    footDesc:   { ar: 'فريق أصدقاء البيئة — كلية التجارة، جامعة قناة السويس. معًا من أجل بيئة أفضل.', en: 'Environment Friends — Faculty of Commerce, Suez Canal University. Together for a better environment.' },
    footLinks:  { ar: 'روابط سريعة', en: 'Quick Links' },
    footFollow: { ar: 'تابعنا', en: 'Follow Us' },
    footJoinTitle: { ar: 'جاهز تبدأ؟', en: 'Ready to start?' },
    footJoinSub:   { ar: 'سجّل الآن وكن جزءًا من الفريق.', en: 'Register now and be part of the team.' },
    adminLink:  { ar: 'لوحة التحكم', en: 'Dashboard' },
    rights:     { ar: '© 2026 أصدقاء البيئة — كلية التجارة، جامعة قناة السويس. جميع الحقوق محفوظة.', en: '© 2026 Environment Friends — Faculty of Commerce, Suez Canal University. All rights reserved.' },
    toastSoon:  { ar: 'هذا الرابط سيكون متاحًا قريبًا', en: 'This link will be available soon' },
    skip:       { ar: 'تخطَّ إلى المحتوى', en: 'Skip to content' },
    menu:       { ar: 'القائمة', en: 'Menu' },
    themeLabel: { ar: 'تبديل الوضع الداكن', en: 'Toggle dark mode' },
    langLabel:  { ar: 'تغيير اللغة', en: 'Change language' },
  },
};
window.CONFIG = CONFIG;
