/* ════════════════════════════════════════════════════════════════════
   ENVIRONMENT FRIENDS — Faculty of Commerce, Suez Canal University
   Smart Config — Edit paths/URLs here. Brand logos NEVER used as faces.
   All people = Unsplash portrait URLs (replace paths as needed).
════════════════════════════════════════════════════════════════════ */

const CONFIG = {
  site: {
    nameAr: 'أصدقاء البيئة — كلية التجارة',
    nameEn: 'Environment Friends — Faculty of Commerce',
    universityAr: 'جامعة قناة السويس',
    universityEn: 'Suez Canal University',
    facultyAr: 'كلية التجارة',
    facultyEn: 'Faculty of Commerce',
    handle: '@env_friends_scu',
    taglineAr: 'معاً من أجل بيئة أفضل',
    taglineEn: 'Together for a Better Environment',
  },

  images: {
    /* Brand logos ONLY — never people faces */
    facultyEmblem: './photo_2026-10-16_03-11-22-removebg-preview.png',
    ecoLogo: './Gemini_Generated_Image_sizaexsizaexsiza-removebg-preview.png',
    /* Hero background — real campus/nature photography */
    heroBackground: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop',
    /* All people = Unsplash portraits (replace filenames when you drop new images) */
    defaultPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces',
    gallery: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532924131367-7f9517d4f001?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505128773770-3092a61c1b8c?w=900&h=600&fit=crop',
    ],
    qrCode: null,
  },

  colors: {
    'color-navy': '#052549',
    'color-emerald': '#1A6929',
    'color-leaf': '#89C54A',
    'color-bg': '#FCFCF9',
  },

  links: {
    registrationForm: '#registration-form',
    ecoPage: 'https://www.facebook.com/env_friends_scu',
    facultyPage: 'https://www.suez.edu.eg',
    whatsapp: 'https://wa.me/201000000000',
    email: 'env.friends@suez.edu.eg',
    instagram: 'https://www.instagram.com/env_friends_scu',
  },

  nav: {
    ar: [
      { key: 'home', label: 'الرئيسية', href: '#hero' },
      { key: 'about', label: 'عن الفريق', href: '#about' },
      { key: 'supervision', label: 'الإشراف الأكاديمي', href: '#supervision' },
      { key: 'leadership', label: 'الهيكل القيادي', href: '#leadership' },
      { key: 'committees', label: 'اللجان', href: '#committees' },
      { key: 'initiatives', label: 'فعالياتنا', href: '#initiatives' },
      { key: 'contact', label: 'تواصل معنا', href: '#contact' },
    ],
    en: [
      { key: 'home', label: 'Home', href: '#hero' },
      { key: 'about', label: 'About Us', href: '#about' },
      { key: 'supervision', label: 'Academic Supervision', href: '#supervision' },
      { key: 'leadership', label: 'Leadership', href: '#leadership' },
      { key: 'committees', label: 'Committees', href: '#committees' },
      { key: 'initiatives', label: 'Initiatives', href: '#initiatives' },
      { key: 'contact', label: 'Contact', href: '#contact' },
    ],
  },

  stats: [
    { value: '+24', labelAr: 'مبادرة بيئية', labelEn: 'Environmental Initiatives' },
    { value: '+180', labelAr: 'عضو فاعل', labelEn: 'Active Members' },
    { value: '+350', labelAr: 'شجرة مزروعة', labelEn: 'Trees Planted' },
    { value: '+42', labelAr: 'ورشة توعية', labelEn: 'Awareness Workshops' },
  ],

  about: {
    visionAr: 'أن نكون نموذجًا رائدًا للعمل البيئي التطوعي في الجامعات المصرية، ونغرس ثقافة الاستدامة في نفوس الطلاب والمجتمع.',
    visionEn: 'To be a leading model for environmental volunteer work in Egyptian universities, and to instill a culture of sustainability in students and the community.',
    missionAr: 'تنمية الوعي البيئي لدى طلاب كلية التجارة من خلال مبادرات عملية، حملات تشجير، وورش عمل تساهم في الحفاظ على البيئة وتحقيق التنمية المستدامة.',
    missionEn: 'To develop environmental awareness among Faculty of Commerce students through practical initiatives, tree-planting campaigns, and workshops that contribute to environmental preservation and sustainable development.',
  },

  officialLinks: [
    {
      titleAr: 'فورم الانضمام للفريق', titleEn: 'Team Registration Form',
      descAr: 'انضم إلى فريق أصدقاء البيئة وابدأ مسيرتك في العمل البيئي التطوعي.',
      descEn: 'Join the Environment Friends team and start your journey in environmental volunteer work.',
      badgeAr: 'التقديم متاح الآن', badgeEn: 'Applications Open Now',
      href: '#registration-form',
    },
    {
      titleAr: 'الصفحة الرسمية لفريق أصدقاء البيئة', titleEn: 'Environment Friends Official Page',
      descAr: 'تابع آخر أخبار الفريق، الحملات، والفعاليات على صفحة الفريق الرسمية.',
      descEn: 'Follow the team\'s latest news, campaigns, and events on the official page.',
      badgeAr: '@env_friends_scu', badgeEn: '@env_friends_scu',
      href: 'https://www.facebook.com/env_friends_scu',
    },
    {
      titleAr: 'الصفحة الرسمية لكلية التجارة - جامعة قناة السويس', titleEn: 'Faculty of Commerce - Suez Canal University',
      descAr: 'الصفحة الرسمية للكلية لمعرفة الأخبار الأكاديمية والفعاليات الجامعية.',
      descEn: 'The official faculty page for academic news and university events.',
      badgeAr: 'كلية التجارة', badgeEn: 'Faculty of Commerce',
      href: 'https://www.suez.edu.eg',
    },
  ],

  supervision: [
    { roleAr: 'عميد الكلية', roleEn: 'Dean of the Faculty', nameAr: 'أ.د/أحمد عزمي', nameEn: 'Prof. Dr. Ahmed Azmy', photo: 'assets/dean_ahmed.jpg', photoUrl: 'assets/dean_ahmed.jpg', highlight: false, vip: true },
    { roleAr: 'وكيل الكلية لشئون البيئة وخدمة المجتمع', roleEn: 'Vice Dean — Environment & Community', nameAr: 'أ.د/ريمان', nameEn: 'Prof. Dr. Riman', photo: 'assets/vice_riman.jpg', photoUrl: 'assets/vice_riman.jpg', highlight: true, vip: true },
    { roleAr: 'الرائد الأكاديمي للفريق', roleEn: 'Academic Advisor', nameAr: 'دكتور نجاة', nameEn: 'Dr. Najat', photo: 'assets/advisor_najat.jpg', photoUrl: 'assets/advisor_najat.jpg', highlight: false, vip: true },
  ],

  leadership: [
    { roleAr: 'قائد الفريق', roleEn: 'Team Leader', nameAr: 'سمير سيد', nameEn: 'Samir Sayed', photo: 'assets/team_leader_samir.jpg', photoUrl: 'assets/team_leader_samir.jpg', ring: 'emerald', vip: true },
    { roleAr: 'نائب قائد الفريق', roleEn: 'Co-Leader', nameAr: 'ندي محمد', nameEn: 'Nadia Mohamed', photo: 'assets/co_leader_nada.jpg', photoUrl: 'assets/co_leader_nada.jpg', ring: 'emerald', vip: true },
  ],

  committees: [], // لجان مؤجلة حتى تشكيلها

  initiatives: [
    { titleAr: 'يوم الابتسامة العالمي', titleEn: 'World Smile Day', locationAr: 'كلية التجارة — جامعة قناة السويس', locationEn: 'Faculty of Commerce, Suez Canal University', dateAr: 'الإثنين 19 أكتوبر 2026', dateEn: 'Monday, October 19, 2026', image: 'assets/init_smile.jpg' },
    { titleAr: 'زيارة دار المسنين', titleEn: 'Elderly Care Visit', locationAr: 'دار رعاية المسنين — السويس', locationEn: 'Elderly Care Home — Suez', dateAr: 'الخميس 22 أكتوبر 2026', dateEn: 'Thursday, October 22, 2026', image: 'assets/init_nursing.jpg' },
  ],

  contact: [
    { icon: 'facebook', titleAr: 'فيسبوك', titleEn: 'Facebook', value: '@env_friends_scu', href: 'https://www.facebook.com/env_friends_scu' },
    { icon: 'location', titleAr: 'الموقع', titleEn: 'Location', value: 'كلية التجارة — جامعة قناة السويس', href: '#' },
  ],

  footer: {
    mottoAr: 'وعي • إجراء • استدامة', mottoEn: 'Awareness • Action • Sustainability',
    foundedAr: 'فريق أصدقاء البيئة — كلية التجارة، جامعة قناة السويس. معاً من أجل بيئة أفضل.',
    foundedEn: 'Environment Friends — Faculty of Commerce, Suez Canal University. Together for a Better Environment.',
    rightsAr: 'جميع الحقوق محفوظة.', rightsEn: 'All rights reserved.',
    joinTitleAr: 'انضم إلى الفريق', joinTitleEn: 'Join the Team',
    joinSubtitleAr: 'انضم إلينا الآن وكن جزءًا من التغيير البيئي في جامعة قناة السويس.',
    joinSubtitleEn: 'Join us now and be part of the environmental change at Suez Canal University.',
    joinCtaAr: 'سجّل الآن', joinCtaEn: 'Register Now', registerLink: '#registration-link',
  },
};

window.CONFIG = CONFIG;
