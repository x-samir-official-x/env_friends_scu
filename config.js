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

  links: {
    registrationForm: '',            // ← حط لينك فورم التقديم هنا
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
    { href: '#join',        ar: 'انضم إلينا',        en: 'Join' },
    { href: '#contact',     ar: 'تواصل معنا',        en: 'Contact' },
  ],

  /* الأرقام — كلها صفر دلوقتي، عدّل value مع الوقت */
  stats: [
    { value: 0, icon: 'ph-calendar-check', ar: 'حملة منفّذة',  en: 'Campaigns Done' },
    { value: 0, icon: 'ph-users-three',    ar: 'عضو متطوع',    en: 'Volunteers' },
    { value: 0, icon: 'ph-clock',          ar: 'ساعة تطوع',    en: 'Volunteer Hours' },
    { value: 0, icon: 'ph-heart',          ar: 'مستفيد',       en: 'Beneficiaries' },
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

  /* الحملات — image: صورتك المحلية أولًا ثم صورة احتياطية */
  campaigns: [
    { id: 'smile-day', done: true, folder: 'assets/events/smile-day', gallery: [],
      ar: 'يوم الابتسامة العالمي', en: 'World Smile Day',
      dateAr: 'الإثنين 19 أكتوبر 2026', dateEn: 'Monday, 19 October 2026', day: '19', monthAr: 'أكتوبر', monthEn: 'Oct',
      descAr: 'نشر الابتسامة والطاقة الإيجابية بين طلاب الكلية.', descEn: 'Spreading smiles and positive energy among the faculty’s students.',
      icon: 'ph-smiley',
      image: ['assets/init_smile', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=600&fit=crop'] },
    { id: 'elderly-visit', done: false, folder: 'assets/events/elderly-visit', gallery: [],
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
    rights:     { ar: '© 2026 أصدقاء البيئة — كلية التجارة، جامعة قناة السويس. جميع الحقوق محفوظة.', en: '© 2026 Environment Friends — Faculty of Commerce, Suez Canal University. All rights reserved.' },
    toastSoon:  { ar: 'هذا الرابط سيكون متاحًا قريبًا', en: 'This link will be available soon' },
    skip:       { ar: 'تخطَّ إلى المحتوى', en: 'Skip to content' },
    menu:       { ar: 'القائمة', en: 'Menu' },
    themeLabel: { ar: 'تبديل الوضع الداكن', en: 'Toggle dark mode' },
    langLabel:  { ar: 'تغيير اللغة', en: 'Change language' },
  },
};
window.CONFIG = CONFIG;
