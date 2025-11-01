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
  }]