import { Question, TraitScores, Language, UITranslation } from './types';

export const INITIAL_SCORES: TraitScores = {
  analytical: 0,
  creative: 0,
  social: 0,
  independent: 0,
  structured: 0,
  flexible: 0,
  practical: 0,
  conceptual: 0,
};

export const UI_TEXT: Record<Language, UITranslation> = {
  en: {
    welcome1: "Salam! 👋 I'm Massar. I'm here to help you explore career paths that might fit your personality.",
    welcome2: "Don't worry about grades right now. We're just exploring how you think and what you enjoy. Ready to start?",
    startBtn: "Start Discovery",
    startUserMsg: "Yes, let's start!",
    analyzing: "Thanks! Give me a moment to analyze your answers and think about paths that suit you in the Moroccan context...",
    analyzingDots: "Connecting the dots...",
    profileTitle: "Your Discovery Profile",
    whoYouAre: "Who You Are",
    suggestedAreas: "Suggested Career Areas",
    whyFits: "Why this fits",
    exampleRoles: "Example Roles",
    educationMorocco: "Education in Morocco",
    footerDisclaimer: "Remember, this is just a compass, not a map. You can explore these paths, mix them, or find new ones entirely.",
    restartBtn: "Start Over",
    errorMsg: "Sorry, I had trouble connecting to the service. Please check your connection and try again.",
    tryAgain: "Try Again"
  },
  fr: {
    welcome1: "Salam ! 👋 Je suis Massar. Je suis là pour t'aider à explorer les parcours professionnels qui correspondent à ta personnalité.",
    welcome2: "Ne t'inquiète pas pour les notes maintenant. Explorons simplement ta façon de penser et ce que tu aimes. On commence ?",
    startBtn: "Commencer",
    startUserMsg: "Oui, allons-y !",
    analyzing: "Merci ! Donne-moi un instant pour analyser tes réponses et réfléchir aux parcours qui te conviennent dans le contexte marocain...",
    analyzingDots: "Analyse en cours...",
    profileTitle: "Ton Profil de Découverte",
    whoYouAre: "Qui tu es",
    suggestedAreas: "Domaines Suggérés",
    whyFits: "Pourquoi ça colle",
    exampleRoles: "Exemples de métiers",
    educationMorocco: "Formation au Maroc",
    footerDisclaimer: "Rappelle-toi, ce n'est qu'une boussole, pas une carte. Tu peux explorer ces voies, les mélanger ou en trouver de nouvelles.",
    restartBtn: "Recommencer",
    errorMsg: "Désolé, j'ai du mal à me connecter au service. Vérifie ta connexion et réessaie.",
    tryAgain: "Réessayer"
  },
  ar: {
    welcome1: "السلام عليكم! 👋 أنا مسار. أنا هنا لمساعدتك في استكشاف المسارات المهنية التي قد تناسب شخصيتك.",
    welcome2: "لا تقلق بشأن النقط الآن. سنكتشف فقط كيف تفكر وماذا تحب. هل أنت مستعد؟",
    startBtn: "ابدأ الاكتشاف",
    startUserMsg: "نعم، لنبدأ!",
    analyzing: "شكرًا! أعطني لحظة لتحليل إجاباتك والتفكير في المسارات التي تناسبك في السياق المغربي...",
    analyzingDots: "جارٍ تحليل البيانات...",
    profileTitle: "ملفك الشخصي",
    whoYouAre: "من أنت",
    suggestedAreas: "المجالات المهنية المقترحة",
    whyFits: "لماذا يناسبك هذا",
    exampleRoles: "أمثلة على الوظائف",
    educationMorocco: "التكوين في المغرب",
    footerDisclaimer: "تذكر، هذه مجرد بوصلة وليست خريطة نهائية. يمكنك استكشاف هذه المسارات، أو دمجها، أو إيجاد مسارات جديدة تمامًا.",
    restartBtn: "ابدأ من جديد",
    errorMsg: "عذراً، واجهت مشكلة في الاتصال. يرجى التحقق من الانترنت والمحاولة مرة أخرى.",
    tryAgain: "حاول مرة أخرى"
  }
};

const QUESTIONS_EN: Question[] = [
  {
    id: 1,
    text: "Let's imagine you have a free Saturday afternoon. How would you prefer to spend it?",
    options: [
      { label: "Building something, fixing a device, or cooking a complex recipe.", scoreChange: { practical: 2, independent: 1 } },
      { label: "Hanging out with a group of friends, organizing a game or outing.", scoreChange: { social: 2, flexible: 1 } },
      { label: "Reading a book, watching a documentary, or learning a new fact.", scoreChange: { conceptual: 2, analytical: 1 } },
      { label: "Drawing, writing, or creating content for social media.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 2,
    text: "When you are working on a school project, what role do you usually take?",
    options: [
      { label: "The Organizer: I make the plan, set the deadlines, and ensure we finish.", scoreChange: { structured: 2, social: 1 } },
      { label: "The Idea Generator: I come up with the cool concepts and creative angles.", scoreChange: { creative: 2, flexible: 1 } },
      { label: "The Researcher: I gather the facts, analyze the data, and check for errors.", scoreChange: { analytical: 2, independent: 1 } },
      { label: "The Presenter: I prefer doing the talking and explaining our work to others.", scoreChange: { social: 2, practical: 1 } }
    ]
  },
  {
    id: 3,
    text: "How do you feel about rules and clear instructions?",
    options: [
      { label: "I love them. They make it clear what I need to do to succeed.", scoreChange: { structured: 2, analytical: 1 } },
      { label: "They are okay, but I like having some room to do things my own way.", scoreChange: { flexible: 1, independent: 1 } },
      { label: "I find them suffocating. I prefer experimenting and improvising.", scoreChange: { flexible: 2, creative: 2 } }
    ]
  },
  {
    id: 4,
    text: "Think about your ideal workspace in the future. What does it look like?",
    options: [
      { label: "A quiet, private office or lab where I can focus deeply.", scoreChange: { independent: 2, conceptual: 1 } },
      { label: "A busy place full of people, discussion, and energy.", scoreChange: { social: 2, flexible: 1 } },
      { label: "Outdoors, on a construction site, or moving between locations.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "A studio or creative space with music and visual inspiration.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 5,
    text: "When you face a difficult problem, what is your first instinct?",
    options: [
      { label: "Break it down into small logical steps to solve it.", scoreChange: { analytical: 2, structured: 1 } },
      { label: "Ask others for their opinions and brainstorm together.", scoreChange: { social: 2, flexible: 1 } },
      { label: "Try different hands-on solutions until something works.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "Look for a totally new way to approach the situation.", scoreChange: { creative: 2, conceptual: 1 } }
    ]
  },
  {
    id: 6,
    text: "How long are you willing to study after the Baccalaureate?",
    options: [
      { label: "I want to start working and earning money as soon as possible (2-3 years).", scoreChange: { practical: 2 } },
      { label: "I'm okay with a standard length (3-5 years) like a Master's or Engineering degree.", scoreChange: { structured: 1, analytical: 1 } },
      { label: "I love learning and don't mind very long studies (Med school, PhD) if I love the subject.", scoreChange: { conceptual: 2, analytical: 1 } }
    ]
  },
  {
    id: 7,
    text: "Would you rather have a job that...",
    options: [
      { label: "Helps people directly (healing, teaching, counseling).", scoreChange: { social: 2 } },
      { label: "Analyzes how things work (systems, data, science).", scoreChange: { analytical: 2 } },
      { label: "Expresses beauty or emotion (art, design, writing).", scoreChange: { creative: 2 } },
      { label: "Builds physical results (architecture, mechanics, agriculture).", scoreChange: { practical: 2 } }
    ]
  },
  {
    id: 8,
    text: "How do you handle rapid changes or surprises?",
    options: [
      { label: "I get stressed. I prefer stability and knowing what comes next.", scoreChange: { structured: 2 } },
      { label: "I adapt quickly. Routine bores me.", scoreChange: { flexible: 2 } },
      { label: "It depends, as long as I have a team to handle it with.", scoreChange: { social: 1 } }
    ]
  }
];

const QUESTIONS_FR: Question[] = [
  {
    id: 1,
    text: "Imaginons que tu aies un samedi après-midi libre. Comment préfères-tu le passer ?",
    options: [
      { label: "Construire quelque chose, réparer un appareil ou cuisiner une recette complexe.", scoreChange: { practical: 2, independent: 1 } },
      { label: "Sortir avec un groupe d'amis, organiser un jeu ou une sortie.", scoreChange: { social: 2, flexible: 1 } },
      { label: "Lire un livre, regarder un documentaire ou apprendre quelque chose de nouveau.", scoreChange: { conceptual: 2, analytical: 1 } },
      { label: "Dessiner, écrire ou créer du contenu pour les réseaux sociaux.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 2,
    text: "Quand tu travailles sur un projet scolaire, quel rôle prends-tu habituellement ?",
    options: [
      { label: "L'Organisateur : Je fais le plan, fixe les délais et m'assure qu'on finisse.", scoreChange: { structured: 2, social: 1 } },
      { label: "Le Créatif : Je propose des concepts sympas et des angles originaux.", scoreChange: { creative: 2, flexible: 1 } },
      { label: "Le Chercheur : Je rassemble les faits, analyse les données et vérifie les erreurs.", scoreChange: { analytical: 2, independent: 1 } },
      { label: "Le Présentateur : Je préfère parler et expliquer notre travail aux autres.", scoreChange: { social: 2, practical: 1 } }
    ]
  },
  {
    id: 3,
    text: "Que penses-tu des règles et des instructions claires ?",
    options: [
      { label: "Je les adore. Elles indiquent clairement ce que je dois faire pour réussir.", scoreChange: { structured: 2, analytical: 1 } },
      { label: "Ça va, mais j'aime avoir un peu de liberté pour faire les choses à ma façon.", scoreChange: { flexible: 1, independent: 1 } },
      { label: "Je les trouve étouffantes. Je préfère expérimenter et improviser.", scoreChange: { flexible: 2, creative: 2 } }
    ]
  },
  {
    id: 4,
    text: "Pense à ton espace de travail idéal dans le futur. À quoi ressemble-t-il ?",
    options: [
      { label: "Un bureau calme ou un labo où je peux me concentrer profondément.", scoreChange: { independent: 2, conceptual: 1 } },
      { label: "Un endroit animé, plein de gens, de discussions et d'énergie.", scoreChange: { social: 2, flexible: 1 } },
      { label: "En plein air, sur un chantier ou en déplacement.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "Un studio ou un espace créatif avec de la musique et de l'inspiration visuelle.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 5,
    text: "Face à un problème difficile, quel est ton premier réflexe ?",
    options: [
      { label: "Le décomposer en petites étapes logiques pour le résoudre.", scoreChange: { analytical: 2, structured: 1 } },
      { label: "Demander l'avis des autres et réfléchir ensemble.", scoreChange: { social: 2, flexible: 1 } },
      { label: "Essayer différentes solutions pratiques jusqu'à ce que ça marche.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "Chercher une toute nouvelle façon d'aborder la situation.", scoreChange: { creative: 2, conceptual: 1 } }
    ]
  },
  {
    id: 6,
    text: "Combien de temps es-tu prêt(e) à étudier après le Bac ?",
    options: [
      { label: "Je veux commencer à travailler et gagner de l'argent le plus vite possible (2-3 ans).", scoreChange: { practical: 2 } },
      { label: "La durée standard (3-5 ans) me convient, comme un Master ou un diplôme d'ingénieur.", scoreChange: { structured: 1, analytical: 1 } },
      { label: "J'adore apprendre et les longues études (Médecine, Doctorat) ne me dérangent pas si j'aime le sujet.", scoreChange: { conceptual: 2, analytical: 1 } }
    ]
  },
  {
    id: 7,
    text: "Préférerais-tu avoir un métier qui...",
    options: [
      { label: "Aide les gens directement (soins, enseignement, conseil).", scoreChange: { social: 2 } },
      { label: "Analyse comment les choses fonctionnent (systèmes, données, sciences).", scoreChange: { analytical: 2 } },
      { label: "Exprime la beauté ou l'émotion (art, design, écriture).", scoreChange: { creative: 2 } },
      { label: "Construit des résultats physiques (architecture, mécanique, agriculture).", scoreChange: { practical: 2 } }
    ]
  },
  {
    id: 8,
    text: "Comment gères-tu les changements rapides ou les surprises ?",
    options: [
      { label: "Je stresse. Je préfère la stabilité et savoir ce qui va arriver.", scoreChange: { structured: 2 } },
      { label: "Je m'adapte vite. La routine m'ennuie.", scoreChange: { flexible: 2 } },
      { label: "Ça dépend, tant que j'ai une équipe pour gérer ça avec moi.", scoreChange: { social: 1 } }
    ]
  }
];

const QUESTIONS_AR: Question[] = [
  {
    id: 1,
    text: "لنتخيل أن لديك ظهيرة سبت فارغة. كيف تفضل قضاءها؟",
    options: [
      { label: "بناء شيء ما، إصلاح جهاز، أو طهي وصفة معقدة.", scoreChange: { practical: 2, independent: 1 } },
      { label: "الخروج مع مجموعة من الأصدقاء، أو تنظيم لعبة أو نزهة.", scoreChange: { social: 2, flexible: 1 } },
      { label: "قراءة كتاب، مشاهدة وثائقي، أو تعلم معلومة جديدة.", scoreChange: { conceptual: 2, analytical: 1 } },
      { label: "الرسم، الكتابة، أو إنشاء محتوى لمواقع التواصل الاجتماعي.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 2,
    text: "عندما تعمل على مشروع مدرسي، ما هو الدور الذي تأخذه عادة؟",
    options: [
      { label: "المنظم: أضع الخطة، أحدد المواعيد النهائية، وأتأكد من أننا سننتهي.", scoreChange: { structured: 2, social: 1 } },
      { label: "مبتكر الأفكار: أتي بالمفاهيم الرائعة والزوايا الإبداعية.", scoreChange: { creative: 2, flexible: 1 } },
      { label: "الباحث: أجمع الحقائق، أحلل البيانات، وأتحقق من الأخطاء.", scoreChange: { analytical: 2, independent: 1 } },
      { label: "المتحدث: أفضل التحدث وشرح عملنا للآخرين.", scoreChange: { social: 2, practical: 1 } }
    ]
  },
  {
    id: 3,
    text: "ما هو شعورك تجاه القواعد والتعليمات الواضحة؟",
    options: [
      { label: "أحبها. تجعل ما يجب علي فعله للنجاح واضحاً.", scoreChange: { structured: 2, analytical: 1 } },
      { label: "لا بأس بها، لكني أحب أن يكون لدي بعض المجال للقيام بالأمور بطريقتي.", scoreChange: { flexible: 1, independent: 1 } },
      { label: "أجدها خانقة. أفضل التجربة والارتجال.", scoreChange: { flexible: 2, creative: 2 } }
    ]
  },
  {
    id: 4,
    text: "فكر في مكان عملك المثالي في المستقبل. كيف يبدو؟",
    options: [
      { label: "مكتب هادئ أو مختبر خاص حيث يمكنني التركيز بعمق.", scoreChange: { independent: 2, conceptual: 1 } },
      { label: "مكان مزدحم مليء بالناس والنقاش والطاقة.", scoreChange: { social: 2, flexible: 1 } },
      { label: "في الهواء الطلق، في موقع بناء، أو التنقل بين المواقع.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "استوديو أو مساحة إبداعية مع موسيقى وإلهام بصري.", scoreChange: { creative: 2, independent: 1 } }
    ]
  },
  {
    id: 5,
    text: "عندما تواجه مشكلة صعبة، ما هو غريزتك الأولى؟",
    options: [
      { label: "تقسيمها إلى خطوات منطقية صغيرة لحلها.", scoreChange: { analytical: 2, structured: 1 } },
      { label: "سؤال الآخرين عن آرائهم وتبادل الأفكار معهم.", scoreChange: { social: 2, flexible: 1 } },
      { label: "تجربة حلول عملية مختلفة حتى ينجح شيء ما.", scoreChange: { practical: 2, flexible: 1 } },
      { label: "البحث عن طريقة جديدة تماماً للتعامل مع الموقف.", scoreChange: { creative: 2, conceptual: 1 } }
    ]
  },
  {
    id: 6,
    text: "كم من الوقت أنت مستعد للدراسة بعد البكالوريا؟",
    options: [
      { label: "أريد البدء في العمل وكسب المال في أقرب وقت ممكن (2-3 سنوات).", scoreChange: { practical: 2 } },
      { label: "أنا موافق على المدة القياسية (3-5 سنوات) مثل الماستر أو دبلوم الهندسة.", scoreChange: { structured: 1, analytical: 1 } },
      { label: "أحب التعلم ولا أمانع الدراسات الطويلة جداً (طب، دكتوراه) إذا كنت أحب الموضوع.", scoreChange: { conceptual: 2, analytical: 1 } }
    ]
  },
  {
    id: 7,
    text: "هل تفضل وظيفة...",
    options: [
      { label: "تساعد الناس مباشرة (علاج، تعليم، استشارة).", scoreChange: { social: 2 } },
      { label: "تحلل كيفية عمل الأشياء (أنظمة، بيانات، علوم).", scoreChange: { analytical: 2 } },
      { label: "تعبر عن الجمال أو العاطفة (فن، تصميم، كتابة).", scoreChange: { creative: 2 } },
      { label: "تبني نتائج ملموسة (هندسة معمارية، ميكانيكا، زراعة).", scoreChange: { practical: 2 } }
    ]
  },
  {
    id: 8,
    text: "كيف تتعامل مع التغييرات السريعة أو المفاجآت؟",
    options: [
      { label: "أشعر بالتوتر. أفضل الاستقرار ومعرفة ما سيحدث تالياً.", scoreChange: { structured: 2 } },
      { label: "أتأقلم بسرعة. الروتين يملني.", scoreChange: { flexible: 2 } },
      { label: "يعتمد الأمر، طالما لدي فريق للتعامل مع الأمر معه.", scoreChange: { social: 1 } }
    ]
  }
];

export const QUESTIONS_MAP: Record<Language, Question[]> = {
  en: QUESTIONS_EN,
  fr: QUESTIONS_FR,
  ar: QUESTIONS_AR
};
