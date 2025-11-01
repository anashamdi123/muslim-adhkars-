export interface Adhkar {
  id: string;
  text: string;
  repetitions: number;
  reference?: string;
}

export interface AdhkarSubCategory {
  id: string;
  title: string;
  description?: string;
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
        description: 'الأذكار التي تُقال عند الاستيقاظ من النوم',
        adhkars: []
      },
      {
        id: 'morning',
        title: 'أذكار الصباح',
        description: 'الأذكار التي تُقال في الصباح الباكر',
        adhkars: []
      },
      {
        id: 'evening',
        title: 'أذكار المساء',
        description: 'الأذكار التي تُقال في المساء',
        adhkars:[]
      },
      {
        id: 'sleep',
        title: 'أذكار النوم',
        description: 'الأذكار التي تُقال قبل النوم',
        adhkars: []
      },
      {
        id: 'night-turning',
        title: 'الدعاء إذا تقلب ليلاً',
        description: 'الدعاء عند التقلب في الليل',
        adhkars: []
      },
      {
        id: 'night-fear',
        title: 'دعاء الفزع في النوم ومن بلي بالوحشة',
        description: 'الأدعية لمن يشعر بالخوف في النوم',
        adhkars: []
      },
      {
        id: 'dreams',
        title: 'ما يفعل من رأى رؤيا أو الحلم',
        description: 'كيفية التعامل مع الرؤى والأحلام',
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
        description: 'الأذكار عند مغادرة المنزل',
        adhkars: []
      },
      {
        id: 'entering-home',
        title: 'الذكر عند دخول المنزل',
        description: 'الأذكار عند دخول المنزل',
        adhkars:[]
      },
      {
        id: 'wearing-clothes',
        title: 'دعاء لبس الثوب',
        description: 'الأدعية عند لبس الثياب',
        adhkars: []
      },
      {
        id: 'new-clothes',
        title: 'دعاء لبس الثوب الجديد',
        description: 'الأدعية عند لبس الثياب الجديدة',
        adhkars: []
      },
      {
        id: 'bless-new-clothes',
        title: 'الدعاء لمن لبس ثوبًا جديدًا',
        description: 'كيفية الدعاء لمن يلبس ثياب جديدة',
        adhkars: []
      },
      {
        id: 'removing-clothes',
        title: 'ما يقول إذا وضع ثوبه',
        description: 'الأذكار عند خلع الثياب',
        adhkars: []
      },
      {
        id: 'entering-bathroom',
        title: 'دعاء دخول الخلاء',
        description: 'الأدعية عند دخول الخلاء',
        adhkars: []
      },
      {
        id: 'leaving-bathroom',
        title: 'دعاء الخروج من الخلاء',
        description: 'الأدعية عند الخروج من الخلاء',
        adhkars: []
      },
      {
        id: 'devil-protection',
        title: 'دعاء طرد الشيطان ووساوسه',
        description: 'الأدعية لحماية النفس من الشيطان',
        adhkars: []
      },
      {
        id: 'marriage-duas',
        title: 'الدعاء للمتزوج',
        description: 'أدعية للمتزوجين',
        adhkars: []
      },
      {
        id: 'intimacy-duas',
        title: 'الدعاء قبل إتيان الزوجة',
        description: 'الأدعية قبل العلاقة الزوجية',
        adhkars: []
      },
      {
        id: 'evil-eye-protection',
        title: 'دعاء من خشي أن يصيب شيئًا بعينه',
        description: 'الحماية من العين الحاسدة',
        adhkars: []
      },
      {
        id: 'witchcraft-protection',
        title: 'ما يقول لرد كيد مردة الشياطين',
        description: 'الحماية من كيد الشياطين',
        adhkars: []
      },
      {
        id: 'general-good-deeds',
        title: 'من أنواع الخير والآداب الجامعة',
        description: 'أنواع الخير والآداب العامة',
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
        description: 'الأدعية عند ركوب وسيلة نقل',
        adhkars: []
      },
      {
        id: 'travel-dua',
        title: 'دعاء السفر',
        description: 'الأدعية عند بدء السفر',
        adhkars: []
      },
      {
        id: 'entering-town',
        title: 'دعاء دخول القرية أو البلدة',
        description: 'الأدعية عند دخول القرى أو المدن',
        adhkars: []
      },
      {
        id: 'entering-market',
        title: 'دعاء دخول السوق',
        description: 'الأدعية عند دخول الأسواق',
        adhkars: []
      },
      {
        id: 'animal-problems',
        title: 'الدعاء إذا تعس المركوب',
        description: 'عند وجود مشاكل في وسيلة النقل',
        adhkars: []
      },
      {
        id: 'traveler-resident',
        title: 'دعاء المسافر للمقيم',
        description: 'دعاء المسافر لأهل المنزل',
        adhkars: []
      },
      {
        id: 'resident-traveler',
        title: 'دعاء المقيم للمسافر',
        description: 'دعاء أهل المنزل للمسافر',
        adhkars: []
      },
      {
        id: 'travel-tasbeeh',
        title: 'التكبير والتسبيح في سير السفر',
        description: 'التسبيح والتكبير أثناء السفر',
        adhkars: []
      },
      {
        id: 'travel-suhur',
        title: 'دعاء المسافر إذا أسحر',
        description: 'دعاء المسافر عند السحور',
        adhkars: []
      },
      {
        id: 'travel-stopping',
        title: 'الدعاء إذا نزل منزلًا في سفر أو غيره',
        description: 'الأدعية عند التوقف أثناء السفر',
        adhkars: []
      },
      {
        id: 'returning-travel',
        title: 'ذكر الرجوع من السفر',
        description: 'الأذكار عند العودة من السفر',
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
        description: 'الأدعية للتخلص من الهم والحزن',
        adhkars: []
      },
      {
        id: 'distress-dua',
        title: 'دعاء الكرب',
        description: 'الأدعية عند الضيق والكرب',
        adhkars: []
      },
      {
        id: 'enemy-dua',
        title: 'دعاء لقاء العدو وذي السلطان',
        description: 'الأدعية عند مواجهة الأعداء',
        adhkars: []
      },
      {
        id: 'oppressor-fear',
        title: 'دعاء من خاف ظلم السلطان',
        description: 'الدعاء لمن يخاف من الظلم',
        adhkars: []
      },
      {
        id: 'enemy-curse',
        title: 'الدعاء على العدو',
        description: 'كيفية الدعاء ضد الأعداء',
        adhkars: []
      },
      {
        id: 'people-fear',
        title: 'ما يقول من خاف قوماً',
        description: 'الأذكار لمن يخاف من الناس',
        adhkars: []
      },
      {
        id: 'faith-whisper',
        title: 'دعاء من أصابه وسوسة في الإيمان',
        description: 'لمن يواجه وساوس الشك في الإيمان',
        adhkars: []
      },
      {
        id: 'debt-dua',
        title: 'دعاء قضاء الدين',
        description: 'الأدعية لسداد الديون',
        adhkars: []
      },
      {
        id: 'disaster-dua',
        title: 'دعاء من أصيب بمصيبة',
        description: 'الأدعية عند المصائب',
        adhkars: []
      },
      {
        id: 'shirk-fear',
        title: 'دعاء الخوف من الشرك',
        description: 'الحماية من الشرك',
        adhkars: []
      },
      {
        id: 'omen-rejection',
        title: 'دعاء كراهية الطيرة',
        description: 'رفض الطيرة والأ auspicious signs',
        adhkars: []
      },
      {
        id: 'events-reaction',
        title: 'ما يقول من أتاه أمر يسره أو يكرهه',
        description: 'كيفية التفاعل مع الأحداث',
        adhkars: []
      },
      {
        id: 'amazement-dua',
        title: 'ما يقول عند التعجب والأمر السار',
        description: 'الأذكار عند التعجب',
        adhkars: []
      },
      {
        id: 'joy-actions',
        title: 'ما يفعل من أتاه أمر يسره',
        description: 'كيفية التعامل مع الفرح',
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
        description: 'الأدعية قبل الأكل',
        adhkars: []
      },
      {
        id: 'after-eating',
        title: 'الدعاء عند الفراغ من الطعام',
        description: 'الأدعية بعد الأكل',
        adhkars: []
      },
      {
        id: 'guest-dua',
        title: 'دعاء الضيف لصاحب الطعام',
        description: 'دعاء الضيف لصاحب الطعام',
        adhkars: []
      },
      {
        id: 'food-request',
        title: 'التعريض بالدعاء لطلب الطعام أو الشراب',
        description: 'كيفية طلب الطعام بالدعاء',
        adhkars: []
      },
      {
        id: 'breaking-fast',
        title: 'الدعاء إذا أفطر عند أهل بيت',
        description: 'الأدعية عند الإفطار في بيت الغير',
        adhkars: []
      },
      {
        id: 'fasting-hunger',
        title: 'دعاء الصائم إذا حضر الطعام ولم يفطر',
        description: 'دعاء الصائم عند رؤية الطعام',
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
        description: 'الأذكار قبل الوضوء',
        adhkars: []
      },
      {
        id: 'after-wudu',
        title: 'الذكر بعد الفراغ من الوضوء',
        description: 'الأذكار بعد الوضوء',
        adhkars: []
      },
      {
        id: 'going-mosque',
        title: 'دعاء الذهاب إلى المسجد',
        description: 'الأدعية عند الذهاب للمسجد',
        adhkars: []
      },
      {
        id: 'entering-mosque',
        title: 'دعاء دخول المسجد',
        description: 'الأدعية عند دخول المسجد',
        adhkars: []
      },
      {
        id: 'leaving-mosque',
        title: 'دعاء الخروج من المسجد',
        description: 'الأدعية عند الخروج من المسجد',
        adhkars: []
      },
      {
        id: 'adhan',
        title: 'أذكار الأذان',
        description: 'الأذكار عند سماع الأذان',
        adhkars: []
      },
      {
        id: 'prayer-start',
        title: 'دعاء الاستفتاح',
        description: 'دعاء بداية الصلاة',
        adhkars: []
      },
      {
        id: 'ruku',
        title: 'دعاء الركوع',
        description: 'الأدعية في الركوع',
        adhkars: []
      },
      {
        id: 'rising-ruku',
        title: 'دعاء الرفع من الركوع',
        description: 'الأدعية عند الرفع من الركوع',
        adhkars: []
      },
      {
        id: 'sujud',
        title: 'دعاء السجود',
        description: 'الأدعية في السجود',
        adhkars: []
      },
      {
        id: 'sitting-sujud',
        title: 'دعاء الجلسة بين السجدتين',
        description: 'الأدعية بين السجدتين',
        adhkars: []
      },
      {
        id: 'sujud-tilawa',
        title: 'دعاء سجود التلاوة',
        description: 'سجود التلاوة وآدابه',
        adhkars: []
      },
      {
        id: 'tashahhud',
        title: 'التشهد',
        description: 'كيفية التشهد في الصلاة',
        adhkars: []
      },
      {
        id: 'salawat',
        title: 'الصلاة على النبي بعد التشهد',
        description: 'الصلاة على النبي ﷺ',
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
        description: 'كيفية صلاة الاستخارة',
        adhkars: []
      },
      {
        id: 'difficult-matters',
        title: 'دعاء من استصعب عليه أمر',
        description: 'الأدعية لحل الأمور الصعبة',
        adhkars: []
      },
      {
        id: 'repentance',
        title: 'ما يقول ويفعل من أذنب ذنباً',
        description: 'كيفية التوبة من الذنوب',
        adhkars: []
      },
      {
        id: 'disliked-events',
        title: 'الدعاء حينما يقع ما لا يرضاه أو غلب على أمره',
        description: 'الأدعية عند وقوع المكروه',
        adhkars: []
      },
      {
        id: 'dajjal-protection',
        title: 'ما يعصم الله به من الدجال',
        description: 'الحماية من فتنة الدجال',
        adhkars: []
      },
      {
        id: 'blessing-prophet',
        title: 'فضل الصلاة على النبي',
        description: 'أهمية الصلاة على النبي ﷺ',
        adhkars: []      },
      {
        id: 'forgiveness-tawbah',
        title: 'الاستغفار والتوبة',
        description: 'كيفية الاستغفار والتوبة',
        adhkars: []},
      {
        id: 'tasbeeh-merits',
        title: 'فضل التسبيح والتحميد والتهليل والتكبير',
        description: 'فضائل الذكر والتسبيح',
        adhkars: []},
      {
        id: 'prophet-tasbeeh',
        title: 'كيف كان النبي يسبح؟',
        description: 'طريقة تسبيح النبي ﷺ',
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
        description: 'كيفية التلبية في الحج والعمرة',
        adhkars: []
      },
      {
        id: 'black-stone',
        title: 'التكبير إذا أتى الحجر الأسود',
        description: 'التكبير عند الحجر الأسود',
        adhkars: []
      },
      {
        id: 'yemeni-corner',
        title: 'الدعاء بين الركن اليماني والحجر الأسود',
        description: 'الأدعية بين الركنين',
        adhkars: []
      },
      {
        id: 'safa-marwa',
        title: 'دعاء الوقوف على الصفا والمروة',
        description: 'الأدعية في السعي بين الصفا والمروة',
        adhkars: []
      },
      {
        id: 'arafat',
        title: 'دعاء يوم عرفة',
        description: 'الأدعية في يوم عرفة',
        adhkars: []
      },
      {
        id: 'mashar-haram',
        title: 'الذكر عند المشعر الحرام',
        description: 'الأذكار في المشعر الحرام',
        adhkars: []
      },
      {
        id: 'stoning',
        title: 'التكبير عند رمي الجمار مع كل حصاة',
        description: 'التكبير عند رمي الجمرات',
        adhkars: []
      },
      {
        id: 'sacrifice',
        title: 'ما يقول عند الذبح أو النحر',
        description: 'الأذكار عند الذبح',
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
        description: 'كيفية تهنئة المولود له',
        adhkars: []
      },
      {
        id: 'insult-response',
        title: 'ما يقول الصائم إذا سابه أحد',
        description: 'رد الصائم على الإساءة',
        adhkars: []
      },
      {
        id: 'sneezing-dua',
        title: 'دعاء العطاس',
        description: 'الأدعية عند العطس',
        adhkars: []
      },
      {
        id: 'non-muslim-sneezing',
        title: 'ما يقال للكافر إذا عطس فحمد الله',
        description: 'الرد على الكافر عند العطس',
        adhkars: []
      },
      {
        id: 'marriage-purchase',
        title: 'دعاء المتزوج وشراء الدابة',
        description: 'الأدعية عند الزواج أو شراء الدابة',
        adhkars: []
      },
      {
        id: 'anger-dua',
        title: 'دعاء الغضب',
        description: 'الأدعية عند الغضب',
        adhkars: []
      },
      {
        id: 'seeing-sick',
        title: 'دعاء من رأى مبتلى',
        description: 'الدعاء لمن يرى مبتلى',
        adhkars: []
      },
      {
        id: 'gathering',
        title: 'ما يقال في المجلس',
        description: 'الآداب في المجالس',
        adhkars: []
      },
      {
        id: 'gathering-kaffarah',
        title: 'كفارة المجلس',
        description: 'كفارة الجلوس في المجلس',
        adhkars: []
      },
      {
        id: 'forgiveness-dua',
        title: 'الدعاء لمن قال غفر الله لك',
        description: 'الدعاء لمن يمن عليك',
        adhkars: []
      },
      {
        id: 'gratitude-dua',
        title: 'الدعاء لمن صنع إليك معروفاً',
        description: 'الدعاء لمن أحسن إليك',
        adhkars: []
      },
      {
        id: 'love-dua',
        title: 'الدعاء لمن قال إني أحبك في الله',
        description: 'الدعاء لمن أحبك في الله',
        adhkars: []
      },
      {
        id: 'generosity-dua',
        title: 'الدعاء لمن عرض عليك ماله',
        description: 'الدعاء لمن أعرض عليك ماله',
        adhkars: []
      },
      {
        id: 'loan-dua',
        title: 'الدعاء لمن أقرض عند القضاء',
        description: 'الدعاء لمن أعطى قرضًا',
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
        description: 'الأدعية عند هبوب الرياح',
        adhkars: []
      },
      {
        id: 'thunder-dua',
        title: 'دعاء الرعد',
        description: 'الأدعية عند سماع الرعد',
        adhkars: []
      },
      {
        id: 'rain-dua',
        title: 'من أدعية الاستسقاء',
        description: 'أدعية طلب المطر',
        adhkars: []
      },
      {
        id: 'seeing-rain',
        title: 'الدعاء إذا رأى المطر',
        description: 'الأدعية عند رؤية المطر',
        adhkars: []
      },
      {
        id: 'after-rain',
        title: 'الذكر بعد نزول المطر',
        description: 'الأذكار بعد نزول المطر',
        adhkars: []
      },
      {
        id: 'sun-dua',
        title: 'من أدعية الاستصحاء',
        description: 'أدعية طلب الشمس',
        adhkars: []
      },
      {
        id: 'moon-sighting',
        title: 'دعاء رؤية الهلال',
        description: 'الأدعية عند رؤية الهلال',
        adhkars: []
      },
      {
        id: 'first-fruits',
        title: 'الدعاء عند رؤية باكورة الثمر',
        description: 'الأدعية عند رؤية الثمار',
        adhkars: []
      },
      {
        id: 'rooster-dog',
        title: 'الدعاء عند سماع صياح الديك ونهيق الحمار',
        description: 'الأدعية عند سماع الحيوانات',
        adhkars: []
      },
      {
        id: 'night-dogs',
        title: 'الدعاء عند سماع نباح الكلاب بالليل',
        description: 'الأدعية عند سماع الكلاب ليلاً',
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
        description: 'كيفية عيادة المولود',
        adhkars: []
      },
      {
        id: 'sick-visit',
        title: 'الدعاء للمريض في عيادته',
        description: 'الأدعية عند زيارة المرضى',
        adhkars: []
      },
      {
        id: 'visiting-merit',
        title: 'فضل عيادة المريض',
        description: 'فضل زيارة المرضى',
        adhkars: []
      },
      {
        id: 'terminal-illness',
        title: 'دعاء المريض الذي يئس من حياته',
        description: 'الأدعية للمريض اليائس',
        adhkars: []
      },
      {
        id: 'dying-instructions',
        title: 'تلقين المحتضر',
        description: 'كيفية تلقين المحتضر',
        adhkars: []
      },
      {
        id: 'closing-eyes',
        title: 'الدعاء عند إغماض الميت',
        description: 'الأدعية عند إغماض الميت',
        adhkars: []
      },
      {
        id: 'funeral-prayer',
        title: 'الدعاء للميت في الصلاة عليه',
        description: 'الأدعية في صلاة الجنازة',
        adhkars: []
      },
      {
        id: 'grave-burial',
        title: 'الدعاء للفرط في الصلاة عليه',
        description: 'الأدعية عند دفن الميت',
        adhkars: []
      },
      {
        id: 'condolence-dua',
        title: 'دعاء التعزية',
        description: 'كيفية التعزية',
        adhkars: []
      },
      {
        id: 'burial-dua',
        title: 'الدعاء عند إدخال الميت القبر',
        description: 'الأدعية عند دفن الميت',
        adhkars: []
      },
      {
        id: 'after-burial',
        title: 'الدعاء بعد دفن الميت',
        description: 'الأدعية بعد الدفن',
        adhkars: []
      },
      {
        id: 'grave-visiting',
        title: 'دعاء زيارة القبور',
        description: 'الأدعية عند زيارة القبور',
        adhkars: []
      },
      {
        id: 'body-pain',
        title: 'ما يفعل ويقول من أحس وجعاً في جسده',
        description: 'الأدعية عند الشعور بالألم',
        adhkars: []
      }
    ]
  }
];