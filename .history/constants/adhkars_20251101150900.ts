export interface Adhkar {
  id: string;
  text: string;
  repetitions: number;
  reference?: string;
}

export interface AdhkarSubCategory {
  id: string;
  title: string;
  adhkars: Adhkar[];
}

export interface AdhkarCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  subCategories: AdhkarSubCategory[];
}

// Legacy support - flat structure



// Grouped structure for hierarchical navigation
export const ADHKARS_GROUPS: AdhkarCategory[] = [
  {
    id: 'day-night',
    title: 'اليوم والليل',
    icon: 'wb-sunny',
    color: '#f59e0b',
    subCategories: [
      {
        id: 'waking-up',
        title: 'أذكار الاستيقاظ من النوم',
        adhkars: []
      },
      {
        id: 'morning',
        title: 'أذكار الصباح',
        adhkars: []
      },
      {
        id: 'evening',
        title: 'أذكار المساء',
        adhkars:[]
      },
      {
        id: 'sleep',
        title: 'أذكار النوم',
        adhkars: []
      },
      {
        id: 'night-turning',
        title: 'الدعاء إذا تقلب ليلاً',
        adhkars: []
      },
      {
        id: 'night-fear',
        title: 'دعاء الفزع في النوم ومن بلي بالوحشة',
        adhkars: []
      },
      {
        id: 'dreams',
        title: 'ما يفعل من رأى رؤيا أو الحلم',
        adhkars: []
      }
    ]
  },
  {
    id: 'home-family',
    title: 'البيت والأهل',
    icon: 'home',
    color: '#6366f1',
    subCategories: [
      {
        id: 'leaving-home',
        title: 'الذكر عند الخروج من المنزل',
        adhkars: []
      },
      {
        id: 'entering-home',
        title: 'الذكر عند دخول المنزل',
        adhkars:[]
      },
      {
        id: 'wearing-clothes',
        title: 'دعاء لبس الثوب',
        adhkars: []
      },
      {
        id: 'new-clothes',
        title: 'دعاء لبس الثوب الجديد',
        adhkars: []
      },
      {
        id: 'bless-new-clothes',
        title: 'الدعاء لمن لبس ثوبًا جديدًا',
        adhkars: []
      },
      {
        id: 'removing-clothes',
        title: 'ما يقول إذا وضع ثوبه',
        adhkars: []
      },
      {
        id: 'entering-bathroom',
        title: 'دعاء دخول الخلاء',
        adhkars: []
      },
      {
        id: 'leaving-bathroom',
        title: 'دعاء الخروج من الخلاء',
        adhkars: []
      },
      {
        id: 'devil-protection',
        title: 'دعاء طرد الشيطان ووساوسه',
        adhkars: []
      },
      {
        id: 'marriage-duas',
        title: 'الدعاء للمتزوج',
        adhkars: []
      },
      {
        id: 'intimacy-duas',
        title: 'الدعاء قبل إتيان الزوجة',
        adhkars: []
      },
      {
        id: 'evil-eye-protection',
        title: 'دعاء من خشي أن يصيب شيئًا بعينه',
        adhkars: []
      },
      {
        id: 'witchcraft-protection',
        title: 'ما يقول لرد كيد مردة الشياطين',
        adhkars: []
      },
      {
        id: 'general-good-deeds',
        title: 'من أنواع الخير والآداب الجامعة',
        adhkars: []
      }
    ]
  },
  {
    id: 'travel-movement',
    title: 'السفر والتنقل',
    icon: 'flight',
    color: '#8b5cf6',
    subCategories: [
      {
        id: 'mounting-dua',
        title: 'دعاء الركوب',
        adhkars: []
      },
      {
        id: 'travel-dua',
        title: 'دعاء السفر',
        adhkars: []
      },
      {
        id: 'entering-town',
        title: 'دعاء دخول القرية أو البلدة',
        adhkars: []
      },
      {
        id: 'entering-market',
        title: 'دعاء دخول السوق',
        adhkars: []
      },
      {
        id: 'animal-problems',
        title: 'الدعاء إذا تعس المركوب',
        adhkars: []
      },
      {
        id: 'traveler-resident',
        title: 'دعاء المسافر للمقيم',
        adhkars: []
      },
      {
        id: 'resident-traveler',
        title: 'دعاء المقيم للمسافر',
        adhkars: []
      },
      {
        id: 'travel-tasbeeh',
        title: 'التكبير والتسبيح في سير السفر',
        adhkars: []
      },
      {
        id: 'travel-suhur',
        title: 'دعاء المسافر إذا أسحر',
        adhkars: []
      },
      {
        id: 'travel-stopping',
        title: 'الدعاء إذا نزل منزلًا في سفر أو غيره',
        adhkars: []
      },
      {
        id: 'returning-travel',
        title: 'ذكر الرجوع من السفر',
        adhkars: []
      }
    ]
  },
  {
    id: 'joy-fear',
    title: 'الفرح والخوف',
    icon: 'mood',
    color: '#22c55e',
    subCategories: [
      {
        id: 'sadness-dua',
        title: 'دعاء الهم والحزن',
        adhkars: []
      },
      {
        id: 'distress-dua',
        title: 'دعاء الكرب',
        adhkars: []
      },
      {
        id: 'enemy-dua',
        title: 'دعاء لقاء العدو وذي السلطان',
        adhkars: []
      },
      {
        id: 'oppressor-fear',
        title: 'دعاء من خاف ظلم السلطان',
        adhkars: []
      },
      {
        id: 'enemy-curse',
        title: 'الدعاء على العدو',
        adhkars: []
      },
      {
        id: 'people-fear',
        title: 'ما يقول من خاف قوماً',
        adhkars: []
      },
      {
        id: 'faith-whisper',
        title: 'دعاء من أصابه وسوسة في الإيمان',
        adhkars: []
      },
      {
        id: 'debt-dua',
        title: 'دعاء قضاء الدين',
        adhkars: []
      },
      {
        id: 'disaster-dua',
        title: 'دعاء من أصيب بمصيبة',
        adhkars: []
      },
      {
        id: 'shirk-fear',
        title: 'دعاء الخوف من الشرك',
        adhkars: []
      },
      {
        id: 'omen-rejection',
        title: 'دعاء كراهية الطيرة',
        adhkars: []
      },
      {
        id: 'events-reaction',
        title: 'ما يقول من أتاه أمر يسره أو يكرهه',
        adhkars: []
      },
      {
        id: 'amazement-dua',
        title: 'ما يقول عند التعجب والأمر السار',
        adhkars: []
      },
      {
        id: 'joy-actions',
        title: 'ما يفعل من أتاه أمر يسره',
        adhkars: []
      }
    ]
  },
  {
    id: 'food-drink',
    title: 'الطعام والشراب',
    icon: 'restaurant',
    color: '#f97316',
    subCategories: [
      {
        id: 'before-eating',
        title: 'الدعاء قبل الطعام',
        adhkars: []
      },
      {
        id: 'after-eating',
        title: 'الدعاء عند الفراغ من الطعام',
        adhkars: []
      },
      {
        id: 'guest-dua',
        title: 'دعاء الضيف لصاحب الطعام',
        adhkars: []
      },
      {
        id: 'food-request',
        title: 'التعريض بالدعاء لطلب الطعام أو الشراب',
        adhkars: []
      },
      {
        id: 'breaking-fast',
        title: 'الدعاء إذا أفطر عند أهل بيت',
        adhkars: []
      },
      {
        id: 'fasting-hunger',
        title: 'دعاء الصائم إذا حضر الطعام ولم يفطر',
        adhkars: []
      }
    ]
  },
  {
    id: 'wudu-prayer',
    title: 'الوضوء والصلاة',
    icon: 'local-mosque',
    color: '#14b8a6',
    subCategories: [
      {
        id: 'before-wudu',
        title: 'الذكر قبل الوضوء',
        adhkars: []
      },
      {
        id: 'after-wudu',
        title: 'الذكر بعد الفراغ من الوضوء',
        adhkars: []
      },
      {
        id: 'going-mosque',
        title: 'دعاء الذهاب إلى المسجد',
        adhkars: []
      },
      {
        id: 'entering-mosque',
        title: 'دعاء دخول المسجد',
        adhkars: []
      },
      {
        id: 'leaving-mosque',
        title: 'دعاء الخروج من المسجد',
        adhkars: []
      },
      {
        id: 'adhan',
        title: 'أذكار الأذان',
        adhkars: []
      },
      {
        id: 'prayer-start',
        title: 'دعاء الاستفتاح',
        adhkars: []
      },
      {
        id: 'ruku',
        title: 'دعاء الركوع',
        adhkars: []
      },
      {
        id: 'rising-ruku',
        title: 'دعاء الرفع من الركوع',
        adhkars: []
      },
      {
        id: 'sujud',
        title: 'دعاء السجود',
        adhkars: []
      },
      {
        id: 'sitting-sujud',
        title: 'دعاء الجلسة بين السجدتين',
        adhkars: []
      },
      {
        id: 'sujud-tilawa',
        title: 'دعاء سجود التلاوة',
        adhkars: []
      },
      {
        id: 'tashahhud',
        title: 'التشهد',
        adhkars: []
      },
      {
        id: 'salawat',
        title: 'الصلاة على النبي بعد التشهد',
        adhkars: []}
    ]
  },
  {
    id: 'tasbeeh-remembrance',
    title: 'التسابيح',
    icon: 'auto-awesome',
    color: '#ec4899',
    subCategories: [
      {
        id: 'istikharah',
        title: 'دعاء صلاة الاستخارة',
        adhkars: []
      },
      {
        id: 'difficult-matters',
        title: 'دعاء من استصعب عليه أمر',
        adhkars: []
      },
      {
        id: 'repentance',
        title: 'ما يقول ويفعل من أذنب ذنباً',
        adhkars: []
      },
      {
        id: 'disliked-events',
        title: 'الدعاء حينما يقع ما لا يرضاه أو غلب على أمره',
        adhkars: []
      },
      {
        id: 'dajjal-protection',
        title: 'ما يعصم الله به من الدجال',
        adhkars: []
      },
      {
        id: 'blessing-prophet',
        title: 'فضل الصلاة على النبي',
        adhkars: []      },
      {
        id: 'forgiveness-tawbah',
        title: 'الاستغفار والتوبة',
        adhkars: []},
      {
        id: 'tasbeeh-merits',
        title: 'فضل التسبيح والتحميد والتهليل والتكبير',
        adhkars: []},
      {
        id: 'prophet-tasbeeh',
        title: 'كيف كان النبي يسبح؟',
        adhkars: []}
    ]
  },
  {
    id: 'hajj-umrah',
    title: 'الحج والعمرة',
    icon: 'account-balance',
    color: '#a855f7',
    subCategories: [
      {
        id: 'talbiyah',
        title: 'كيف يلبي المحرم في الحج أو العمرة',
        adhkars: []
      },
      {
        id: 'black-stone',
        title: 'التكبير إذا أتى الحجر الأسود',
        adhkars: []
      },
      {
        id: 'yemeni-corner',
        title: 'الدعاء بين الركن اليماني والحجر الأسود',
        adhkars: []
      },
      {
        id: 'safa-marwa',
        title: 'دعاء الوقوف على الصفا والمروة',
        adhkars: []
      },
      {
        id: 'arafat',
        title: 'دعاء يوم عرفة',
        adhkars: []
      },
      {
        id: 'mashar-haram',
        title: 'الذكر عند المشعر الحرام',
        adhkars: []
      },
      {
        id: 'stoning',
        title: 'التكبير عند رمي الجمار مع كل حصاة',
        adhkars: []
      },
      {
        id: 'sacrifice',
        title: 'ما يقول عند الذبح أو النحر',
        adhkars: []
      }
    ]
  },
  {
    id: 'etiquette-interaction',
    title: 'التعامل والآداب',
    icon: 'handshake',
    color: '#0ea5e9',
    subCategories: [
      {
        id: 'congratulations',
        title: 'تهنئة المولود له وجوابه',
        adhkars: []
      },
      {
        id: 'insult-response',
        title: 'ما يقول الصائم إذا سابه أحد',
        adhkars: []
      },
      {
        id: 'sneezing-dua',
        title: 'دعاء العطاس',
        adhkars: []
      },
      {
        id: 'non-muslim-sneezing',
        title: 'ما يقال للكافر إذا عطس فحمد الله',
        adhkars: []
      },
      {
        id: 'marriage-purchase',
        title: 'دعاء المتزوج وشراء الدابة',
        adhkars: []
      },
      {
        id: 'anger-dua',
        title: 'دعاء الغضب',
        adhkars: []
      },
      {
        id: 'seeing-sick',
        title: 'دعاء من رأى مبتلى',
        adhkars: []
      },
      {
        id: 'gathering',
        title: 'ما يقال في المجلس',
        adhkars: []
      },
      {
        id: 'gathering-kaffarah',
        title: 'كفارة المجلس',
        adhkars: []
      },
      {
        id: 'forgiveness-dua',
        title: 'الدعاء لمن قال غفر الله لك',
        adhkars: []
      },
      {
        id: 'gratitude-dua',
        title: 'الدعاء لمن صنع إليك معروفاً',
        adhkars: []
      },
      {
        id: 'love-dua',
        title: 'الدعاء لمن قال إني أحبك في الله',
        adhkars: []
      },
      {
        id: 'generosity-dua',
        title: 'الدعاء لمن عرض عليك ماله',
        adhkars: []
      },
      {
        id: 'loan-dua',
        title: 'الدعاء لمن أقرض عند القضاء',
        adhkars: []
      }
    ]
  },
  {
    id: 'nature',
    title: 'الطقس والمناخ',
    icon: 'cloud',
    color: '#06b6d4',
    subCategories: [
      {
        id: 'wind-dua',
        title: 'دعاء الريح',
        adhkars: []
      },
      {
        id: 'thunder-dua',
        title: 'دعاء الرعد',
        adhkars: []
      },
      {
        id: 'rain-dua',
        title: 'من أدعية الاستسقاء',
        adhkars: []
      },
      {
        id: 'seeing-rain',
        title: 'الدعاء إذا رأى المطر',
        adhkars: []
      },
      {
        id: 'after-rain',
        title: 'الذكر بعد نزول المطر',
        adhkars: []
      },
      {
        id: 'sun-dua',
        title: 'من أدعية الاستصحاء',
        adhkars: []
      },
      {
        id: 'moon-sighting',
        title: 'دعاء رؤية الهلال',
        adhkars: []
      },
      {
        id: 'first-fruits',
        title: 'الدعاء عند رؤية باكورة الثمر',
        adhkars: []
      },
      {
        id: 'rooster-dog',
        title: 'الدعاء عند سماع صياح الديك ونهيق الحمار',
        adhkars: []
      },
      {
        id: 'night-dogs',
        title: 'الدعاء عند سماع نباح الكلاب بالليل',
        adhkars: []
      }
    ]
  },
  {
    id: 'sickness-funerals',
    title: 'المرض والجنائز',
    icon: 'local-hospital',
    color: '#ef4444',
    subCategories: [
      {
        id: 'baby-visit',
        title: 'ما يعود به المولود',
        adhkars: []
      },
      {
        id: 'sick-visit',
        title: 'الدعاء للمريض في عيادته',
        adhkars: []
      },
      {
        id: 'visiting-merit',
        title: 'فضل عيادة المريض',
        adhkars: []
      },
      {
        id: 'terminal-illness',
        title: 'دعاء المريض الذي يئس من حياته',
        adhkars: []
      },
      {
        id: 'dying-instructions',
        title: 'تلقين المحتضر',
        adhkars: []
      },
      {
        id: 'closing-eyes',
        title: 'الدعاء عند إغماض الميت',
        adhkars: []
      },
      {
        id: 'funeral-prayer',
        title: 'الدعاء للميت في الصلاة عليه',
        adhkars: []
      },
      {
        id: 'grave-burial',
        title: 'الدعاء للفرط في الصلاة عليه',
        adhkars: []
      },
      {
        id: 'condolence-dua',
        title: 'دعاء التعزية',
        adhkars: []
      },
      {
        id: 'burial-dua',
        title: 'الدعاء عند إدخال الميت القبر',
        adhkars: []
      },
      {
        id: 'after-burial',
        title: 'الدعاء بعد دفن الميت',
        adhkars: []
      },
      {
        id: 'grave-visiting',
        title: 'دعاء زيارة القبور',
        adhkars: []
      },
      {
        id: 'body-pain',
        title: 'ما يفعل ويقول من أحس وجعاً في جسده',
        adhkars: []
      }
    ]
  }
];