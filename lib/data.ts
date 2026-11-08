export interface ProgramModule {
  title: string;
  description: string;
  topics: string[];
}

export interface ProgramFAQ {
  q: string;
  a: string;
}

export interface Program {
  id: string;
  title: string;
  grades: string;
  gradeCategory: "elementary" | "middle" | "high";
  description: string;
  categoryTag: string;
  format: string;
  iconName: string;
  subjectId: string;
  headline: string;
  overview: string;
  learningOutcomes: string[];
  curriculumModules: ProgramModule[];
  features: string[];
  duration: string;
  scheduleOptions: string;
  priceFrom: string;
  tutorIds: string[];
  faqs: ProgramFAQ[];
}

export interface SubjectGradeTrack {
  gradeRange: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SubjectMethodology {
  title: string;
  description: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  linkText: string;
  iconName: string;
  headline: string;
  overview: string;
  gradeTracks: SubjectGradeTrack[];
  methodologies: SubjectMethodology[];
  programIds: string[];
  tutorIds: string[];
  faqs: { q: string; a: string }[];
}

export interface Tutor {
  id: string;
  name: string;
  role: string;
  languages: string[];
  education: string;
  rating: number;
  sessionCount: string;
  image: string;
  quote: string;
  bio: string;
  teachingApproach: string;
  lessonStructure: string[];
  gradeRange: string;
  formatSupport: string[];
  subjects: {
    title: string;
    grades: string;
    description: string;
  }[];
  availability: {
    days: string;
    time: string;
    format: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

export const PROGRAMS: Program[] = [
  {
    id: "math-that-clicks",
    title: "Math that clicks",
    grades: "Grades K-4",
    gradeCategory: "elementary",
    description: "Build number sense with fractions, patterns and everyday problem-solving.",
    categoryTag: "Elementary math",
    format: "1:1 or small group",
    iconName: "Calculator",
    subjectId: "math",
    headline: "Build number intuition, visual understanding, and joyful math confidence.",
    overview:
      "Elementary math is often reduced to rote memorization—flashcards and timed drills—which can leave kids feeling anxious before they even reach middle school. 'Math that clicks' takes a refreshingly visual and intuitive approach. Using interactive digital manipulatives, relatable real-world problems, and step-by-step guidance, we help young learners understand how numbers actually work. Whether your student needs extra time to feel solid on fractions or is eager for fun math challenges beyond the school syllabus, this program meets them right where they are.",
    learningOutcomes: [
      "Master place values, mental math strategies, and multi-digit operations",
      "Grasp fractions, parts-of-a-whole, and decimals with concrete visual models",
      "Break down word problems into clear, manageable steps without anxiety",
      "Build self-confidence and a curious, positive mindset toward math",
    ],
    curriculumModules: [
      {
        title: "Number Sense & Place Value Intuition",
        description: "Visualizing tens, hundreds, and thousands using base-10 blocks and number lines.",
        topics: [
          "Place values & expanded form",
          "Visual addition & subtraction strategies",
          "Skip counting and early multiplication patterns",
        ],
      },
      {
        title: "Fractions & Parts of a Whole",
        description: "Making fractions visual with pizzas, tape diagrams, and interactive measuring tools.",
        topics: [
          "Halves, thirds, quarters and equivalents",
          "Comparing fractions on a number line",
          "Introduction to decimals and money concepts",
        ],
      },
      {
        title: "Patterns, Shapes & Spatial Reasoning",
        description: "Connecting arithmetic to real geometry and everyday structures.",
        topics: [
          "Perimeter & area basics",
          "2D and 3D geometric shapes",
          "Symmetry and spatial logic puzzles",
        ],
      },
      {
        title: "Story Problems & Real-World Math",
        description: "Transforming confusing paragraphs into simple visual diagrams.",
        topics: [
          "Translating words into number sentences",
          "Multi-step problem strategies",
          "Checking answers and explaining mathematical reasoning",
        ],
      },
    ],
    features: [
      "Dedicated 1:1 or small cohort (max 4)",
      "Interactive virtual whiteboard & manipulatives",
      "Session recap notes for parents after each class",
      "School homework support included",
      "Flexible weekly scheduling",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–3 sessions per week • Weekdays & weekends",
    priceFrom: "$45 / session",
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "How does the tutor adapt to my child's current school curriculum?",
        a: "During onboarding and the first session, your tutor reviews your child's current textbook and classroom topics. Every session combines support for upcoming schoolwork with foundational reinforcement.",
      },
      {
        q: "What if my child feels anxious or frustrated about math?",
        a: "Our tutors specialize in high-patience, low-pressure instruction. We celebrate attempts, break problems into bite-sized steps, and replace timed pressure with genuine understanding.",
      },
      {
        q: "Can parents see what was covered in each session?",
        a: "Yes! After every single lesson, the tutor posts a summary note in your family dashboard outlining what was mastered, areas to practice, and recommended home exercises.",
      },
    ],
  },
  {
    id: "algebra-minus-overwhelm",
    title: "Algebra I, minus the overwhelm",
    grades: "Grades 7-9",
    gradeCategory: "middle",
    description: "Connect equations, graphs and real-world ideas, one clear step at a time.",
    categoryTag: "Math foundations",
    format: "1:1 or small group",
    iconName: "TrendingUp",
    subjectId: "math",
    headline: "Connect equations, graphs, and real-world thinking—one clear, supportive step at a time.",
    overview:
      "Algebra I is the gateway subject for all high school and college STEM coursework. When variables and abstract symbols suddenly replace straightforward numbers, many middle and early high school students hit an academic wall. 'Algebra I, minus the overwhelm' deconstructs abstract formulas into intuitive coordinate graphs, balanced scales, and visual steps. With a supportive mentor who explains concepts multiple ways, students move from confusion to mastery.",
    learningOutcomes: [
      "Solve single and multi-step linear equations and inequalities with certainty",
      "Graph linear functions, understand slope, y-intercept, and coordinate systems",
      "Confidently solve systems of linear equations via substitution and elimination",
      "Factor polynomials, solve quadratic equations, and interpret real-world graphs",
    ],
    curriculumModules: [
      {
        title: "Variables, Expressions & Balance",
        description: "Treating equations like physical balances where both sides stay even.",
        topics: [
          "Order of operations & integer arithmetic",
          "Distributive property & combining like terms",
          "Multi-step equations with variables on both sides",
        ],
      },
      {
        title: "Linear Functions, Slopes & Graphing",
        description: "Visualizing rate of change, slope-intercept, point-slope, and standard forms.",
        topics: [
          "Understanding slope as rate of change",
          "Graphing lines using intercepts and slopes",
          "Parallel and perpendicular line relationships",
        ],
      },
      {
        title: "Systems of Linear Equations",
        description: "Discovering where two lines meet and solving real-world scenario problems.",
        topics: [
          "Graphing systems & finding intersections",
          "Substitution method with clear step-by-step templates",
          "Elimination method & word problem applications",
        ],
      },
      {
        title: "Exponents, Polynomials & Factoring",
        description: "Demystifying quadratic expressions and visual area models.",
        topics: [
          "Laws of exponents & scientific notation",
          "Multiplying binomials (FOIL & area models)",
          "Factoring trinomials & solving basic quadratics",
        ],
      },
    ],
    features: [
      "One-to-one tutoring or small groups of 3–5",
      "Step-by-step digital notebook provided",
      "Practice quizzes with instant feedback",
      "Preparation for state exams & high school placement",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–2 sessions per week • After school & weekends",
    priceFrom: "$45 / session",
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "Is this suitable for a student currently struggling or failing Algebra?",
        a: "Yes. Many of our students join mid-semester when a specific unit (like systems or factoring) caused them to fall behind. We isolate the exact stumbling block and rebuild confidence.",
      },
      {
        q: "Can advanced 7th or 8th graders take this to get ahead?",
        a: "Absolutely. We offer an accelerated track that prepares students to test into honors or high school math early.",
      },
    ],
  },
  {
    id: "science-explored",
    title: "Science, explored",
    grades: "Grades 7-10",
    gradeCategory: "middle",
    description: "Ask better questions and make sense of biology, chemistry and physics.",
    categoryTag: "School support",
    format: "1:1 or small group",
    iconName: "FlaskConical",
    subjectId: "science",
    headline: "Move beyond rote facts to question, test, and understand the physical and natural world.",
    overview:
      "Science comes alive when students discover how things actually work. 'Science, explored' turns curiosity into genuine scientific comprehension. We bridge the gap between classroom textbooks and the physical universe through interactive diagrams, digital lab simulations, and inquiry-led discussions that make cellular processes, chemical bonds, and Newtonian mechanics feel intuitive.",
    learningOutcomes: [
      "Master fundamental principles of cellular biology, genetics, and ecology",
      "Understand atomic structure, chemical bonding, and balancing reactions",
      "Grasp Newton's laws of motion, energy conservation, and simple circuits",
      "Develop analytical reasoning for lab reports, graphs, and exam free-responses",
    ],
    curriculumModules: [
      {
        title: "Life Sciences & Cellular Biology",
        description: "Exploring the living world from the cell organelles to ecosystem dynamics.",
        topics: [
          "Cell structure, photosynthesis & respiration",
          "DNA, genetics & Punnett squares",
          "Ecology, food webs & evolutionary adaptations",
        ],
      },
      {
        title: "Matter, Atoms & Chemical Reactions",
        description: "Understanding the building blocks of matter and how elements interact.",
        topics: [
          "Atoms, molecules & the Periodic Table",
          "Ionic vs. covalent bonding",
          "Balancing chemical equations & conservation of mass",
        ],
      },
      {
        title: "Forces, Energy & Physical Science",
        description: "Connecting physical forces, gravity, and motion to everyday experiences.",
        topics: [
          "Newton's three laws of motion",
          "Kinetic vs. potential energy & energy transfer",
          "Electricity, magnetism & wave properties",
        ],
      },
      {
        title: "Scientific Method & Experimental Inquiry",
        description: "Designing controlled experiments, interpreting data, and writing conclusions.",
        topics: [
          "Hypothesis formulation & variable control",
          "Reading scientific graphs & data tables",
          "Structuring high-scoring lab reports",
        ],
      },
    ],
    features: [
      "Interactive 3D molecular & physical simulations",
      "Review of school lab worksheets & textbook chapters",
      "Burmese & English bilingual support available",
      "Exam prep for state science assessments & AP prep",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–2 sessions per week • Flexible hours",
    priceFrom: "$48 / session",
    tutorIds: ["thiri-aung"],
    faqs: [
      {
        q: "Do students need any special lab materials at home?",
        a: "No special equipment is required! We use high-quality virtual lab simulators and everyday household items for quick demonstrative experiments.",
      },
      {
        q: "Can this help with high school Honors or AP Biology/Chemistry?",
        a: "Yes, our mentors provide targeted support for Honors and AP sciences, including official College Board free-response scoring criteria.",
      },
    ],
  },
  {
    id: "words-with-confidence",
    title: "Words with confidence",
    grades: "Grades K-6",
    gradeCategory: "elementary",
    description: "Find a voice through reading, writing and thoughtful conversation.",
    categoryTag: "English literacy",
    format: "1:1 or small group",
    iconName: "BookOpen",
    subjectId: "english",
    headline: "Cultivate a lifelong love for reading, fluent comprehension, and imaginative self-expression.",
    overview:
      "Reading fluency and written expression form the foundation for every other subject in school. When a child struggles to decode words, comprehend complex paragraphs, or express their thoughts on paper, school quickly becomes exhausting. 'Words with confidence' offers a supportive, encouraging space where young learners explore engaging books, expand their vocabulary, and learn how to craft clear, expressive sentences.",
    learningOutcomes: [
      "Improve phonetic decoding, reading fluency, and reading comprehension",
      "Expand vocabulary through contextual reading and root word analysis",
      "Construct organized paragraphs with topic sentences and supporting details",
      "Build self-assurance in speaking, presenting ideas, and asking questions",
    ],
    curriculumModules: [
      {
        title: "Phonics, Decoding & Fluent Reading",
        description: "Building word attack skills and natural reading cadence.",
        topics: [
          "Vowel teams, digraphs & syllable division",
          "High-frequency words & sight recognition",
          "Reading aloud with expression and punctuation awareness",
        ],
      },
      {
        title: "Comprehension & Critical Thinking",
        description: "Unlocking deeper meaning beyond literal recall.",
        topics: [
          "Main idea, supporting details & summarizing",
          "Character motivation & inference clues",
          "Cause-and-effect relationships in stories",
        ],
      },
      {
        title: "Vocabulary in Context",
        description: "Discovering the power of descriptive language and word roots.",
        topics: [
          "Greek and Latin roots, prefixes & suffixes",
          "Synonyms, antonyms & figurative language",
          "Using fresh adjectives and verbs in speaking and writing",
        ],
      },
      {
        title: "Sentence Craft & Paragraph Writing",
        description: "Moving from simple fragments to structured, creative paragraphs.",
        topics: [
          "Sentence structure & avoiding run-ons",
          "Topic sentences, evidence & closing thoughts",
          "Personal narrative and descriptive writing exercises",
        ],
      },
    ],
    features: [
      "Curated reading selections tailored to student interests",
      "Sentence-by-sentence supportive editing",
      "Regular reading comprehension assessments",
      "Parent progress dashboard with reading lists",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–3 sessions per week",
    priceFrom: "$45 / session",
    tutorIds: ["daniel-brooks"],
    faqs: [
      {
        q: "How do you choose what books my child reads?",
        a: "We balance books aligned with your child's Lexile reading level with topics they are passionate about—animals, mysteries, graphic novels, or history—so reading feels exciting.",
      },
      {
        q: "Can the tutor help with school spelling lists and book reports?",
        a: "Yes! Students regularly bring current classroom assignments, novel studies, and weekly spelling words to sessions.",
      },
    ],
  },
  {
    id: "create-and-discover",
    title: "Create & discover",
    grades: "Grades 3-9",
    gradeCategory: "middle",
    description: "Turn \"what if?\" into something wonderful with coding and creative projects.",
    categoryTag: "Computing",
    format: "Small group",
    iconName: "Code2",
    subjectId: "computing",
    headline: "Learn programming fundamentals, game design, and creative computational thinking.",
    overview:
      "Students don't just consume technology—they build it. 'Create & discover' introduces computing concepts through playful, project-driven software development. Students start with block-based visual logic in Scratch to build animations and games, then graduate to text-based Python, discovering loops, algorithms, and computational thinking along the way.",
    learningOutcomes: [
      "Master computational logic: sequence, conditionals, loops, and variables",
      "Build interactive games, animations, and creative simulations from scratch",
      "Learn clean debugging techniques and systematic problem decomposition",
      "Transition smoothly from block-based coding to real Python syntax",
    ],
    curriculumModules: [
      {
        title: "Visual Logic & Animation in Scratch",
        description: "Learning core programming structures without getting stuck on syntax.",
        topics: [
          "Events, motion, looks & broadcast messages",
          "Variables, scorekeeping & timer mechanics",
          "Collision detection and multi-level platformer games",
        ],
      },
      {
        title: "Introduction to Python Programming",
        description: "First steps into professional text-based coding in an easy browser environment.",
        topics: [
          "Print statements, variables & user inputs",
          "Data types: strings, integers, floats & booleans",
          "Arithmetic operators & string manipulation",
        ],
      },
      {
        title: "Logic, Loops & Interactive Programs",
        description: "Controlling program flow and building responsive text adventures.",
        topics: [
          "If/elif/else conditional branching",
          "While loops and for loops",
          "Lists, dictionaries and basic data collections",
        ],
      },
      {
        title: "Independent Creative Project",
        description: "Planning, designing, and coding an original game or interactive tool.",
        topics: [
          "Project architecture & wireframing",
          "Pair debugging & iterative testing",
          "Showcase presentation and code documentation",
        ],
      },
    ],
    features: [
      "Small group format (3–5 peers) or 1:1 mentorship",
      "No software installation needed (runs in browser)",
      "Portfolio of working games & projects to keep",
      "Encouraging collaborative problem-solving",
    ],
    duration: "55 mins / session",
    scheduleOptions: "1–2 sessions per week • Weekend cohorts available",
    priceFrom: "$42 / session",
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "Does my child need prior coding experience?",
        a: "No prior experience is necessary! We have beginner tracks for students who have never coded, as well as intermediate tracks for those ready for Python.",
      },
      {
        q: "What computer specs are needed?",
        a: "Any standard laptop or Chromebook with a modern web browser and internet connection works great.",
      },
    ],
  },
  {
    id: "high-school-writing-lab",
    title: "High-school writing lab",
    grades: "Grades 9-12",
    gradeCategory: "high",
    description: "Move from first ideas to a clear argument, with feedback at every draft.",
    categoryTag: "English writing",
    format: "One-to-one",
    iconName: "PenTool",
    subjectId: "english",
    headline: "Transform messy brainstorms into clear, persuasive, college-ready essays.",
    overview:
      "High school writing expects students to formulate complex analytical claims, synthesize multiple historical or literary sources, and write with sophisticated voice under tight deadlines. In the 'High-school writing lab', students receive one-on-one editorial coaching modeled after university writing centers. Tutors work collaboratively through outlines, argument logic, sentence rhythm, and citation polish.",
    learningOutcomes: [
      "Develop compelling, defensible thesis statements that answer 'so what?'",
      "Organize essays with logical topic flows, paragraph cohesion, and smooth transitions",
      "Integrate quotes and textual evidence seamlessly without awkward dropped quotes",
      "Master timed essay strategies for AP Literature, AP Language, and DBQ prompts",
    ],
    curriculumModules: [
      {
        title: "Thesis Development & Essay Architecture",
        description: "Moving beyond basic 5-paragraph formulas to nuanced academic arguments.",
        topics: [
          "Formulating arguable, non-obvious thesis statements",
          "Creating reverse outlines and structural roadmaps",
          "Introduction hooks that avoid clichéd openings",
        ],
      },
      {
        title: "Textual Evidence & Analytical Synthesis",
        description: "Showing, not just telling, with close-reading quotations.",
        topics: [
          "Selecting high-impact textual evidence",
          "The claim-evidence-commentary framework",
          "Analyzing rhetorical devices and literary motifs",
        ],
      },
      {
        title: "Style, Syntax & Voice Polish",
        description: "Elevating sentence variety, active voice, and academic precision.",
        topics: [
          "Eliminating passive voice and wordiness",
          "Varying sentence length and syntactic rhythm",
          "Proper MLA, APA & Chicago citation format",
        ],
      },
      {
        title: "Timed Essay & Exam Mastery",
        description: "Techniques for high-scoring timed responses under pressure.",
        topics: [
          "10-minute outlining strategy for timed exams",
          "AP Lang synthesis and rhetorical analysis rubrics",
          "College personal statement drafting basics",
        ],
      },
    ],
    features: [
      "1:1 dedicated writing mentorship",
      "Line-by-line collaborative Google Docs editing",
      "Direct support for school essay assignments",
      "Rubric-aligned grading & improvement feedback",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–2 sessions per week • After school & weekends",
    priceFrom: "$50 / session",
    tutorIds: ["daniel-brooks"],
    faqs: [
      {
        q: "Can we bring ongoing school essays to each session?",
        a: "Yes! Students frequently bring current classroom prompts, first drafts, or teacher feedback to revise together.",
      },
      {
        q: "Does the tutor write the essay for the student?",
        a: "Never. We believe in empowering the student's authentic voice. Tutors ask guiding questions, model stylistic choices, and suggest revisions, but the writing is 100% the student's own.",
      },
    ],
  },
  {
    id: "geometry-made-visible",
    title: "Geometry, made visible",
    grades: "Grades 9-10",
    gradeCategory: "high",
    description: "Explore shapes, proofs and relationships with patient, visual explanations.",
    categoryTag: "Math foundations",
    format: "One-to-one",
    iconName: "Shapes",
    subjectId: "math",
    headline: "Demystify two-column proofs, spatial relations, and theorems through dynamic visual geometry.",
    overview:
      "High school geometry catches many students off-guard. Unlike earlier arithmetic and algebra where rules are largely procedural, geometry demands deductive logic, visual-spatial reasoning, and formal two-column proofs. 'Geometry, made visible' replaces confusion with visual clarity. Using interactive geometry software and step-by-step logic frameworks, mentors guide students through theorems, trigonometry, and coordinate geometry.",
    learningOutcomes: [
      "Master two-column and paragraph proofs for triangles, parallel lines, and quadrilaterals",
      "Understand congruence, similarity, and geometric transformations",
      "Apply Pythagorean theorem, special right triangles, and right-triangle trigonometry",
      "Calculate arc lengths, sector areas, circle theorems, and 3D volume relationships",
    ],
    curriculumModules: [
      {
        title: "Points, Lines, Angles & Logic Foundations",
        description: "Establishing axioms, angle pairs, and parallel line transversals.",
        topics: [
          "Complementary, supplementary & vertical angles",
          "Parallel lines cut by transversals and angle relationships",
          "Conditional statements, converses & deductive logic",
        ],
      },
      {
        title: "Triangle Congruence & Proof Construction",
        description: "Deconstructing two-column proofs into a repeatable logical pattern.",
        topics: [
          "SSS, SAS, ASA, AAS and HL congruence criteria",
          "CPCTC and multi-step triangle proofs",
          "Isosceles and equilateral triangle properties",
        ],
      },
      {
        title: "Similarity & Right-Triangle Trigonometry",
        description: "Connecting proportions to the foundational ratios of trigonometry.",
        topics: [
          "Similar polygons & geometric scale factors",
          "Special right triangles (30-60-90 and 45-45-90)",
          "SOH CAH TOA sine, cosine, tangent fundamentals",
        ],
      },
      {
        title: "Circles, Coordinate Geometry & 3D Solids",
        description: "Bridging algebra and geometry through coordinate formulas and space.",
        topics: [
          "Chords, secants, tangents & central angles",
          "Distance, midpoint & equations of circles",
          "Surface area and volume of prisms, cylinders & spheres",
        ],
      },
    ],
    features: [
      "Dynamic geometric simulation tools",
      "Proof template cheat sheets and formula guides",
      "Direct alignment with high school geometry textbooks",
      "Honors and regular geometry support",
    ],
    duration: "50 mins / session",
    scheduleOptions: "1–2 sessions per week",
    priceFrom: "$48 / session",
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "My student is completely stuck on two-column proofs. Can you help?",
        a: "Proofs are where 90% of students struggle. We break proofs down like a mystery story with clear clues and justifications, turning what feels like guesswork into clear logic.",
      },
      {
        q: "Is this course aligned with Common Core or state standards?",
        a: "Yes, our geometry curriculum directly reflects high school Common Core and state geometry standards nationwide.",
      },
    ],
  },
  {
    id: "ready-for-test-day",
    title: "Ready for test day",
    grades: "Middle & high school",
    gradeCategory: "high",
    description: "Practice with a plan, not just a pile of questions. SAT, ACT and school tests.",
    categoryTag: "Test preparation",
    format: "One-to-one",
    iconName: "Target",
    subjectId: "test-prep",
    headline: "Practice with a personalized strategy, time management mastery, and calm exam confidence.",
    overview:
      "Test anxiety usually comes from unpredictability: not knowing what question types to expect, running out of time, or falling for common test traps. 'Ready for test day' replaces cramming and endless unguided practice tests with a calm, analytical system. We diagnose each student's exact error patterns, teach time-saving test mechanics, and build the calm stamina required to perform at their absolute best on exam morning.",
    learningOutcomes: [
      "Master the format, pacing, and adaptive nature of the Digital SAT & ACT",
      "Identify high-frequency math concepts, calculator shortcuts, and Desmos tricks",
      "Navigate reading comprehension passages and grammar rules with speed and precision",
      "Eliminate test-day anxiety through realistic timed section practice and pacing plans",
    ],
    curriculumModules: [
      {
        title: "Comprehensive Diagnostic & Targeted Roadmap",
        description: "Isolating high-value points with targeted score analysis.",
        topics: [
          "Full-length official diagnostic baseline",
          "Error taxonomy: conceptual gaps vs. timing traps",
          "Custom study calendar & target score benchmarks",
        ],
      },
      {
        title: "Digital SAT / ACT Math Mastery",
        description: "Focusing on the highest-yield algebra, advanced math, and geometry questions.",
        topics: [
          "Harnessing built-in Desmos graphing tools for speed",
          "Pacing strategies for hard Module 2 math sections",
          "Plugging in numbers and backsolving techniques",
        ],
      },
      {
        title: "Reading & Writing Section Strategy",
        description: "Conquering passage logic, rhetorical questions, and grammar rules.",
        topics: [
          "Standard English conventions (punctuation, verbs, modifiers)",
          "Command of evidence & logical transition questions",
          "Paired passage analysis and poetry interpretation",
        ],
      },
      {
        title: "Stamina, Pacing & Test-Day Protocol",
        description: "Putting it all together under authentic timed conditions.",
        topics: [
          "Simulated timed section drills with instant review",
          "Time management per question type",
          "Sleep, nutrition, and mental focus strategies for test morning",
        ],
      },
    ],
    features: [
      "Official practice test materials & diagnostic software",
      "Score improvement milestone tracking",
      "Calculator and Desmos power-user shortcuts",
      "One-on-one personalized pacing coaching",
    ],
    duration: "60 mins / session",
    scheduleOptions: "1–3 sessions per week • 8–16 week test prep packages",
    priceFrom: "$55 / session",
    tutorIds: ["lin-chen", "daniel-brooks", "thiri-aung"],
    faqs: [
      {
        q: "When should high school students begin SAT or ACT preparation?",
        a: "We typically recommend starting in the spring of sophomore year or summer before junior year to allow plenty of time for 2–3 official test dates.",
      },
      {
        q: "Do you help choose between the Digital SAT and ACT?",
        a: "Yes! In our free initial consultation and diagnostic, we evaluate your student's baseline on both exams and recommend the test where they have the natural advantage.",
      },
    ],
  },
  {
    id: "your-next-chapter",
    title: "Your next chapter",
    grades: "Grades 9-12",
    gradeCategory: "high",
    description: "Make the path to college feel clearer for the whole family.",
    categoryTag: "College planning",
    format: "Family guidance",
    iconName: "GraduationCap",
    subjectId: "college-planning",
    headline: "Make the path to college feel clearer, calmer, and purposeful for the whole family.",
    overview:
      "The college application process has grown increasingly complex, leaving high school students and parents stressed about grades, standardized tests, extracurricular resumes, and essay deadlines. 'Your next chapter' provides steady, year-by-year advisory from 8th grade through 12th grade. We help students discover authentic academic interests, build a balanced college list, and craft standout personal essays without burning out.",
    learningOutcomes: [
      "Build a balanced, realistic college list spanning reach, target, and likely schools",
      "Plan high school course sequences (Honors, AP, dual-enrollment) for target majors",
      "Develop authentic extracurricular passions, leadership, and summer opportunities",
      "Brainstorm and polish distinctive Common App and supplemental admissions essays",
    ],
    curriculumModules: [
      {
        title: "High School Roadmap & Academic Strategy (Grades 8–10)",
        description: "Setting up solid foundations without unnecessary stress.",
        topics: [
          "Strategic course selection & rigor planning",
          "Cultivating extracurricular 'spike' vs. generic resume padding",
          "Building strong faculty relationships for recommendations",
        ],
      },
      {
        title: "College Search & List Architecture (Grade 11)",
        description: "Finding the right academic, social, and financial fit.",
        topics: [
          "Evaluating campus size, location, majors & campus culture",
          "Categorizing Reach, Match, and Safety institutions",
          "Planning college visits, virtual tours & information sessions",
        ],
      },
      {
        title: "Common Application & Essay Mentorship (Summer / Fall Grade 12)",
        description: "Uncovering your genuine narrative and polishing competitive essays.",
        topics: [
          "Brainstorming core personal statement prompts",
          "Addressing unique supplemental questions and 'Why Us?' essays",
          "Activities list formatting and resume optimization",
        ],
      },
      {
        title: "Submissions, Financial Aid & Decisions (Winter / Spring Grade 12)",
        description: "Finalizing paperwork and weighing offers with confidence.",
        topics: [
          "FAFSA & CSS Profile overview",
          "Early Action / Early Decision vs. Regular Decision strategy",
          "Comparing financial award packages and making the final choice",
        ],
      },
    ],
    features: [
      "Dedicated personal admissions advisor",
      "Family check-in meetings & deadline tracking calendar",
      "Unlimited essay drafting & feedback cycles",
      "Financial aid & scholarship guidance",
    ],
    duration: "50 mins / session",
    scheduleOptions: "Bi-weekly or monthly advisory • Intensives during application season",
    priceFrom: "$60 / session",
    tutorIds: ["daniel-brooks"],
    faqs: [
      {
        q: "How involved are parents in this program?",
        a: "We believe family alignment is key. Parents are included in milestone reviews, college list strategy sessions, and financial aid discussions, while students lead their essay drafting.",
      },
      {
        q: "Can we start even if our child is already a high school senior?",
        a: "Yes! We offer accelerated fall senior intensives focused strictly on finalizing the college list, completing Common App essays, and meeting early deadlines.",
      },
    ],
  },
];

export const SUBJECTS: SubjectItem[] = [
  {
    id: "math",
    title: "Math",
    tagline: "From the first fractions to functions that finally make sense.",
    bullets: [
      "K–5: Number sense & arithmetic",
      "6–8: Pre-algebra & Algebra I",
      "9–12: Geometry, Algebra II & precalculus",
    ],
    linkText: "Explore math programs",
    iconName: "Calculator",
    headline: "From early number sense to calculus—making math intuitive, visual, and rewarding.",
    overview:
      "Mathematics is the language of problem solving, but all too often it is taught as rigid memorization of formulas. At SRS, our math track is built on visual models, active questioning, and real-life connections. We meet students where they are, helping them rebuild gaps from earlier grades while preparing them for high school algebra, geometry, and advanced college-prep mathematics.",
    gradeTracks: [
      {
        gradeRange: "Elementary (K–5)",
        title: "Foundational Number Sense",
        description: "Developing mental math, fractions, place value, and confidence with word problems.",
        skills: ["Place value intuition", "Visual fractions & decimals", "Multiplication & division concepts", "Word problem translation"],
      },
      {
        gradeRange: "Middle School (6–8)",
        title: "Pre-Algebra & Algebra I",
        description: "Transitioning smoothly from concrete arithmetic to abstract algebraic thinking.",
        skills: ["Linear equations & inequalities", "Coordinate graphing & slopes", "Systems of equations", "Ratios, proportions & percentages"],
      },
      {
        gradeRange: "High School (9–12)",
        title: "Geometry to Precalculus & AP",
        description: "Mastering deductive logic, spatial proofs, function transformations, and calculus readiness.",
        skills: ["Two-column geometric proofs", "Quadratic & polynomial functions", "Trigonometry & unit circle", "AP Precalculus & AP Calculus prep"],
      },
    ],
    methodologies: [
      {
        title: "Visual-First Explanations",
        description: "We sketch, diagram, and use interactive manipulatives before introducing abstract equations.",
      },
      {
        title: "Low-Pressure Guided Practice",
        description: "Students try problems with real-time mentor support, turning mistakes into learning milestones.",
      },
      {
        title: "School Textbook Alignment",
        description: "We directly support your child's classroom syllabus, homework, and upcoming chapter tests.",
      },
    ],
    programIds: ["math-that-clicks", "algebra-minus-overwhelm", "geometry-made-visible"],
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "How do you know what level my student should start at?",
        a: "We conduct an informal diagnostic during your first session to map out their strengths and pinpoint exact foundational gaps.",
      },
      {
        q: "Can the tutor help with daily homework?",
        a: "Yes, students can bring current homework assignments, review graded tests, or prepare for upcoming quizzes during any session.",
      },
    ],
  },
  {
    id: "science",
    title: "Science",
    tagline: "Connect the ideas in the textbook to the world around us.",
    bullets: [
      "K–5: Curiosity & scientific thinking",
      "6–8: Life, earth & physical science",
      "9–12: Biology, chemistry & physics",
    ],
    linkText: "Explore science programs",
    iconName: "FlaskConical",
    headline: "Curiosity-driven science support across biology, chemistry, and physics.",
    overview:
      "Science unlocks how our world works—from microscopic cellular enzymes to macroscopic planetary orbits. Our science track emphasizes conceptual inquiry and visual comprehension over rote memorization. Whether preparing for state standardized science tests, middle school physical science, or AP Biology and Chemistry, our mentors bring enthusiasm and clarity to every lesson.",
    gradeTracks: [
      {
        gradeRange: "Elementary (K–5)",
        title: "Curiosity & Scientific Discovery",
        description: "Hands-on explorations of habitats, plant life, weather systems, and basic forces.",
        skills: ["Scientific observation & questions", "Living organisms & ecosystems", "Matter, liquids & solids", "Earth, moon & weather patterns"],
      },
      {
        gradeRange: "Middle School (6–8)",
        title: "Integrated Physical & Life Science",
        description: "Discovering cellular life, chemical properties, plate tectonics, and energy conservation.",
        skills: ["Cells, organ systems & genetics", "Atoms, molecules & periodic table", "Newton's laws & energy transfer", "Formulating testable hypotheses"],
      },
      {
        gradeRange: "High School (9–12)",
        title: "Biology, Chemistry & Physics",
        description: "Rigorous coursework support and laboratory analysis for college-prep and AP sciences.",
        skills: ["Molecular biology & bioenergetics", "Stoichiometry & chemical reactions", "Kinematics, forces & thermodynamics", "AP exam free-response mastery"],
      },
    ],
    methodologies: [
      {
        title: "Inquiry-Led Questioning",
        description: "Mentors prompt students to deduce scientific principles from observations rather than just lecturing.",
      },
      {
        title: "Interactive Whiteboard Diagrams",
        description: "Complex cellular pathways and chemical bonds are sketched collaboratively in real time.",
      },
      {
        title: "Lab & Data Analysis Skills",
        description: "We teach students how to read charts, interpret graphs, and write high-scoring lab reports.",
      },
    ],
    programIds: ["science-explored"],
    tutorIds: ["thiri-aung"],
    faqs: [
      {
        q: "Can you help with AP Biology and AP Chemistry?",
        a: "Yes! Our science mentors hold advanced degrees in the life sciences and provide dedicated AP exam preparation.",
      },
      {
        q: "Is bilingual support available for science terms?",
        a: "Yes, our science mentors can explain tricky terminology in Burmese and English.",
      },
    ],
  },
  {
    id: "english",
    title: "English",
    tagline: "Make room for their voice, on the page and in conversation.",
    bullets: [
      "K–5: Reading, phonics & vocabulary",
      "6–8: Comprehension & paragraph writing",
      "9–12: Essays, literature & argument",
    ],
    linkText: "Explore english programs",
    iconName: "BookOpen",
    headline: "Empowering every student to read deeply, write clearly, and express themselves with confidence.",
    overview:
      "Strong communication skills open doors in every discipline. Our English and literacy track nurtures both the technical mechanics of language (phonics, grammar, syntax, citation) and the creative artistry of storytelling and essay writing. We help students find their voice and express complex ideas with clarity and style.",
    gradeTracks: [
      {
        gradeRange: "Elementary (K–5)",
        title: "Foundational Literacy & Phonics",
        description: "Building fluent decoding, expressive reading, vocabulary, and sentence construction.",
        skills: ["Phonics decoding & fluency", "Reading comprehension & story recall", "Vocabulary building in context", "Creative sentence & paragraph writing"],
      },
      {
        gradeRange: "Middle School (6–8)",
        title: "Literary Analysis & Essay Craft",
        description: "Moving into five-paragraph essays, textual evidence, and critical book analysis.",
        skills: ["Thesis formulation & paragraph structure", "Identifying themes & literary devices", "Revising for variety and word choice", "Summary & response writing"],
      },
      {
        gradeRange: "High School (9–12)",
        title: "Advanced Rhetoric & College Prep",
        description: "Crafting sophisticated argumentative papers, research essays, and AP essays.",
        skills: ["Synthesis of multiple source texts", "Rhetorical analysis & persuasive strategies", "Polishing voice and active syntax", "Timed AP Lang & Lit exam writing"],
      },
    ],
    methodologies: [
      {
        title: "Collaborative Real-Time Editing",
        description: "We co-edit in Google Docs, talking through sentence flow, word choice, and structural logic.",
      },
      {
        title: "Sentence-Level Crafting",
        description: "We replace passive voice and clutter with vivid verbs and dynamic sentence structures.",
      },
      {
        title: "Low-Stakes Brainstorming",
        description: "We banish the fear of the blank page through verbal outlining and interactive mind maps.",
      },
    ],
    programIds: ["words-with-confidence", "high-school-writing-lab"],
    tutorIds: ["daniel-brooks"],
    faqs: [
      {
        q: "Can my student work on their school English assignments?",
        a: "Yes! Students regularly bring their school essays, reading assignments, and research projects to each session.",
      },
      {
        q: "How do you help reluctant readers?",
        a: "We pair reading selections with topics the student already loves and break chapters into manageable, discussion-rich chunks.",
      },
    ],
  },
  {
    id: "computing",
    title: "Computing",
    tagline: "Build, debug and discover what an idea can become.",
    bullets: [
      "Grades 3–5: Scratch & creative coding",
      "Grades 6–8: Python foundations",
      "Grades 9–12: Projects & problem-solving",
    ],
    linkText: "Explore computing programs",
    iconName: "Code2",
    headline: "Build, debug, and discover what an idea can become through interactive programming.",
    overview:
      "Coding is more than just learning syntax—it is learning how to think systematically, decompose complex challenges, and persevere through debugging. Our computing curriculum takes students on a fun, project-driven journey from visual block programming in Scratch to real-world Python programming and game design.",
    gradeTracks: [
      {
        gradeRange: "Grades 3–5",
        title: "Creative Coding with Scratch",
        description: "Visual drag-and-drop programming creating interactive stories, games, and art.",
        skills: ["Sequencing & events", "Loops, conditions & variables", "Sprite animation & sound", "Interactive game design"],
      },
      {
        gradeRange: "Grades 6–8",
        title: "Python Foundations",
        description: "Transitioning to text-based code, building text adventures, quizzes, and simulations.",
        skills: ["Variables & data types", "Control flow (if/else, while, for)", "Functions & modular code", "Debugging & problem decomposition"],
      },
      {
        gradeRange: "Grades 9–12",
        title: "Applied Computing & Projects",
        description: "Exploring data structures, algorithms, and prep for AP Computer Science Principles/A.",
        skills: ["Lists, dictionaries & OOP basics", "Algorithm design & efficiency", "AP Computer Science exam prep", "Independent portfolio projects"],
      },
    ],
    methodologies: [
      {
        title: "Project-First Learning",
        description: "Every concept is introduced in service of creating a playable game or interactive program.",
      },
      {
        title: "Constructive Debugging",
        description: "We treat bugs not as failures, but as exciting detective puzzles to solve together.",
      },
      {
        title: "Zero Software Hassle",
        description: "Everything runs in modern web browser environments—no complex installs needed.",
      },
    ],
    programIds: ["create-and-discover"],
    tutorIds: ["lin-chen"],
    faqs: [
      {
        q: "Does my student need any coding background?",
        a: "None at all! We start from complete scratch and move at your student's natural pace.",
      },
      {
        q: "Can students share their creations?",
        a: "Yes! All projects are hosted online with secure web links that students can proudly share with friends and family.",
      },
    ],
  },
  {
    id: "test-prep",
    title: "Test preparation",
    tagline: "A calmer approach to practice, pacing and test-day thinking.",
    bullets: [
      "Middle school: School assessments",
      "High school: SAT & ACT foundations",
      "Individual skill review & practice plans",
    ],
    linkText: "Explore test preparation programs",
    iconName: "Target",
    headline: "A calm, strategic approach to practice, pacing, and test-day confidence.",
    overview:
      "High scores on standardized tests don't require endless late-night cramming. They come from understanding test architecture, mastering pacing, and building stamina through diagnostic feedback. Whether preparing for state tests, the PSAT, or the Digital SAT and ACT, our test prep track provides a calm, methodical path to top performance.",
    gradeTracks: [
      {
        gradeRange: "Middle School",
        title: "Foundation & Placement Testing",
        description: "Building reading stamina, math mechanics, and test familiarity for high school entrance.",
        skills: ["Reading passage navigation", "Arithmetic and pre-algebra review", "Test timing & elimination tactics", "School placement test prep"],
      },
      {
        gradeRange: "Grades 9–10",
        title: "PSAT & Foundational Strategy",
        description: "Early baseline diagnostics and skill reinforcement without high-stakes pressure.",
        skills: ["Digital testing interface familiarity", "Calculator & Desmos optimization", "High-frequency grammar rules", "Identifying personal test habits"],
      },
      {
        gradeRange: "Grades 11–12",
        title: "Digital SAT, ACT & AP Exams",
        description: "Targeted section prep, timed mock tests, error analysis, and score maximization.",
        skills: ["Full-length timed practice tests", "Pacing per question category", "Advanced math module strategies", "Test-day mindset & stress reduction"],
      },
    ],
    methodologies: [
      {
        title: "Error Pattern Taxonomy",
        description: "We categorize mistakes by knowledge gap, trap vulnerability, or time pressure so practice is hyper-efficient.",
      },
      {
        title: "Digital Test Tool Mastery",
        description: "We teach students how to leverage embedded calculator tools and flagging features for speed.",
      },
      {
        title: "Mindset & Anxiety Management",
        description: "We equip students with breathing routines, pacing benchmarks, and calm confidence.",
      },
    ],
    programIds: ["ready-for-test-day"],
    tutorIds: ["lin-chen", "daniel-brooks", "thiri-aung"],
    faqs: [
      {
        q: "How many sessions are typically needed for SAT or ACT prep?",
        a: "Most students benefit from a 10 to 16-session program spaced over 8 to 12 weeks with periodic full practice exams.",
      },
      {
        q: "Are official practice materials used?",
        a: "Yes, we exclusively utilize official College Board and ACT practice questions and diagnostic scoring rubrics.",
      },
    ],
  },
  {
    id: "college-planning",
    title: "College planning",
    tagline: "A clearer roadmap for students and the people beside them.",
    bullets: [
      "Grades 8–10: Explore & prepare",
      "Grade 11: College research & testing",
      "Grade 12: Applications & next steps",
    ],
    linkText: "Explore college planning programs",
    iconName: "GraduationCap",
    headline: "A calm, clear roadmap for high school students and the families supporting them.",
    overview:
      "The journey to higher education should be a purposeful, inspiring period of self-discovery—not a source of family friction and panic. Our college planning track guides students step-by-step from 8th grade through college acceptance day. We help students identify the right academic fit, articulate their unique story, and stay ahead of deadlines.",
    gradeTracks: [
      {
        gradeRange: "Grades 8–9",
        title: "Exploration & Strong Habits",
        description: "Laying the groundwork for high school academic success and extracurricular curiosity.",
        skills: ["Course planning & graduation tracks", "Time management & study systems", "Exploring hobbies & summer programs", "Developing reading habits"],
      },
      {
        gradeRange: "Grades 10–11",
        title: "Extracurricular Depth & College List",
        description: "Building meaningful leadership experiences, testing strategy, and campus research.",
        skills: ["Standardized testing schedule", "Balanced college list building", "Virtual & in-person campus visits", "Resume & activities list optimization"],
      },
      {
        gradeRange: "Grade 12",
        title: "Applications, Essays & Admissions",
        description: "Executing polished applications, compelling personal statements, and financial planning.",
        skills: ["Common App & Coalition mastery", "Personal statement brainstorming & polish", "Supplemental essay intensives", "FAFSA, scholarships & offer comparisons"],
      },
    ],
    methodologies: [
      {
        title: "Authentic Storytelling",
        description: "We help students reflect on their unique perspective rather than trying to fit a generic mold.",
      },
      {
        title: "Low-Stress Milestone Deadlines",
        description: "We back-plan applications across the summer and fall so nothing is left to the eleventh hour.",
      },
      {
        title: "Family Alignment",
        description: "We keep parents informed through periodic update conferences and shared progress roadmaps.",
      },
    ],
    programIds: ["your-next-chapter"],
    tutorIds: ["daniel-brooks"],
    faqs: [
      {
        q: "When is the best time to start college planning?",
        a: "Freshman or sophomore year is ideal for low-pressure course and activity planning, but junior and senior intensives are also very effective.",
      },
      {
        q: "Do you help with financial aid and scholarships?",
        a: "Yes, we walk families through FAFSA, CSS Profile requirements, and merit scholarship search strategies.",
      },
    ],
  },
];

export const TUTORS: Tutor[] = [
  {
    id: "lin-chen",
    name: "Lin Chen",
    role: "Math tutor",
    languages: ["English", "Chinese"],
    education: "UC Berkeley, B.S. Applied Mathematics",
    rating: 5.0,
    sessionCount: "140+ sessions",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
    quote: "“I want students to understand the why—not just remember the next step.”",
    bio: "Lin brings a warm, patient, visual approach to mathematics. Having mentored over 80 middle and high school students through Algebra, Geometry, and Precalculus, she specializes in demystifying abstract formulas through relatable sketches and intuitive analogies.",
    teachingApproach:
      "Lin's approach pairs visual explanations with thoughtful questions. A new concept might begin with a sketch, a familiar situation or a problem a student already knows how to solve. From there, students try an idea, explain what they notice and practice with support. The aim is to make mathematical thinking feel approachable—not to rush through a worksheet.",
    lessonStructure: [
      "A short check-in on coursework and confidence",
      "One clear concept explored with visual examples",
      "Guided practice, then a chance to try independently",
      "A recap and a manageable next step for home",
    ],
    gradeRange: "Grades 6–10",
    formatSupport: ["One-to-one", "Groups of 3–5"],
    subjects: [
      {
        title: "Pre-algebra",
        grades: "Grades 6–8",
        description: "Fractions, ratios, negative numbers and the first steps into algebra.",
      },
      {
        title: "Algebra I",
        grades: "Grades 7–9",
        description: "Equations, functions, slope, systems and connected representations.",
      },
      {
        title: "Geometry",
        grades: "Grades 9–10",
        description: "Shapes, relationships, reasoning and visual problem-solving.",
      },
    ],
    availability: [
      { days: "Tue & Thu", time: "3:40–6:00 PM", format: "One-to-one" },
      { days: "Mon & Wed", time: "5:00–7:00 PM", format: "Small group" },
      { days: "Saturday", time: "10:00–11:00 AM", format: "One-to-one" },
    ],
    faq: [
      {
        q: "Can Lin use my child's school materials?",
        a: "Yes! Share current assignments or topics during matching. Lessons connect schoolwork with the underlying concepts, with room to revisit gaps.",
      },
      {
        q: "Can my child ask questions in Chinese?",
        a: "Absolutely. Lin is fully fluent in English and Mandarin Chinese, making it easy to explain terminology in both languages if that helps clarity.",
      },
      {
        q: "What if the first match isn't the right fit?",
        a: "Our Match Guarantee covers you: if your student doesn't feel a strong connection, we credit your first session and pair you with another mentor immediately.",
      },
    ],
  },
  {
    id: "daniel-brooks",
    name: "Daniel Brooks",
    role: "English & Writing tutor",
    languages: ["English"],
    education: "Columbia University, M.A. Literature",
    rating: 4.9,
    sessionCount: "210+ sessions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    quote: "“Every learner has a story worth sharing. My job is helping them organize their voice.”",
    bio: "Daniel is an encouraging reading and writing mentor who believes every student can develop confident prose. He specializes in argumentative writing, literary analysis, and college admissions essays.",
    teachingApproach:
      "Daniel breaks the writing process into stress-free micro-stages: mind-mapping ideas, developing a thesis statement, outlining evidentiary support, and revising for style and punch.",
    lessonStructure: [
      "Reviewing drafts and current assignment prompts",
      "Targeted focus on thesis clarity and paragraph structure",
      "Real-time co-editing and sentence-level polish",
      "Clear action checklist before next submission",
    ],
    gradeRange: "Grades 8–12",
    formatSupport: ["One-to-one", "Writing workshops"],
    subjects: [
      {
        title: "Essay & Argumentative Writing",
        grades: "Grades 8–12",
        description: "Thesis formulation, evidence organization, and smooth transitions.",
      },
      {
        title: "AP English Literature & Language",
        grades: "Grades 10–12",
        description: "Rhetorical analysis, close reading, and timed essay strategies.",
      },
      {
        title: "College Personal Statements",
        grades: "Grades 11–12",
        description: "Finding your authentic story and polishing competitive college essays.",
      },
    ],
    availability: [
      { days: "Mon & Wed", time: "4:00–6:30 PM", format: "One-to-one" },
      { days: "Friday", time: "3:30–5:30 PM", format: "Writing lab" },
      { days: "Sunday", time: "1:00–3:00 PM", format: "One-to-one" },
    ],
    faq: [
      {
        q: "Can Daniel help with upcoming school essay deadlines?",
        a: "Yes, students can bring current drafts or rubrics to work through immediate revisions together.",
      },
      {
        q: "How does Daniel support reluctant writers?",
        a: "By starting with verbal storytelling and structured sentence starters so the blank page never feels intimidating.",
      },
    ],
  },
  {
    id: "thiri-aung",
    name: "Thiri Aung",
    role: "Science & Biology tutor",
    languages: ["English", "Burmese"],
    education: "Johns Hopkins University, B.S. Molecular Biology",
    rating: 5.0,
    sessionCount: "165+ sessions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    quote: "“Start with a question. See where it leads.”",
    bio: "Thiri brings infectious curiosity and patience to the sciences. She connects complex cellular mechanisms and chemical reactions to real-world phenomena.",
    teachingApproach:
      "Thiri uses interactive digital diagrams and inquiry-based questioning, guiding students to deduce scientific principles themselves rather than memorizing dry textbook passages.",
    lessonStructure: [
      "Conceptual warmup connecting today's topic to daily life",
      "Interactive diagram sketching on the digital whiteboard",
      "Exam practice questions with step-by-step logic",
      "Summary flashcards and takeaway recap",
    ],
    gradeRange: "Grades 7–12",
    formatSupport: ["One-to-one", "Small cohorts"],
    subjects: [
      {
        title: "Middle School General Science",
        grades: "Grades 7–8",
        description: "Earth, life, and physical sciences with scientific method foundation.",
      },
      {
        title: "Biology & Honors Biology",
        grades: "Grades 9–10",
        description: "Cell biology, genetics, ecology, and human physiology.",
      },
      {
        title: "AP Biology & Chemistry",
        grades: "Grades 11–12",
        description: "Advanced laboratory review, biochemical pathways, and free-response prep.",
      },
    ],
    availability: [
      { days: "Tue & Thu", time: "4:30–7:00 PM", format: "One-to-one" },
      { days: "Saturday", time: "11:00 AM–1:00 PM", format: "Small cohort" },
      { days: "Sunday", time: "2:00–4:00 PM", format: "One-to-one" },
    ],
    faq: [
      {
        q: "Can Thiri provide explanations in Burmese?",
        a: "Yes! Thiri is bilingual in English and Burmese, providing comfortable language support for Burmese-speaking families.",
      },
      {
        q: "Are AP exam questions covered?",
        a: "Yes, Thiri incorporates official College Board free-response scoring rubrics into every AP prep session.",
      },
    ],
  },
];

export { type ResourceArticle, RESOURCES } from "./resources";

export interface CollegeMilestone {
  grade: string;
  title: string;
  description: string;
  tag: string;
  deliverables: string[];
}

export const COLLEGE_ROADMAP: CollegeMilestone[] = [
  {
    grade: "08–09",
    title: "Discover possibilities",
    description: "Explore interests, build study habits and understand how high-school choices connect to future options.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Interest reflection", "Course conversations", "Study routines"],
  },
  {
    grade: "10",
    title: "Build a foundation",
    description: "Review courses, activities and academic support needs. Get familiar with different college pathways.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Course planning", "Activities record", "Early campus ideas"],
  },
  {
    grade: "11",
    title: "Research with purpose",
    description: "Build a balanced college list, explore testing choices and organize questions about cost and fit.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["College research", "Timeline", "Test plan"],
  },
  {
    grade: "12",
    title: "Take the next step",
    description: "Create an application calendar, develop essays in the student's own voice and prepare to compare options.",
    tag: "WHAT WE CAN WORK ON",
    deliverables: ["Applications", "Essay feedback", "Decision support"],
  },
];

export interface PricingPlan {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  price: string;
  billing: string;
  frequency: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "small-group",
    badge: "LEARN TOGETHER",
    title: "Small-group learning",
    tagline: "A small circle. A shared spark.",
    price: "$120",
    billing: "/ month",
    frequency: "4 live lessons • 55 minutes each",
    popular: false,
    features: [
      "3–5 students at a similar level",
      "Shared practice and learning materials",
      "Notes and parent updates",
      "Subjects and schedules consulted as a group",
    ],
    ctaText: "Find their starting point",
    ctaHref: "/tutors",
  },
  {
    id: "one-to-one",
    badge: "PERSONALIZED LEARNING",
    title: "One-to-one tutoring",
    tagline: "Built around your child.",
    price: "$240",
    billing: "/ month",
    frequency: "4 live lessons • 55 minutes each",
    popular: true,
    features: [
      "A dedicated tutor and personal starting plan",
      "Schoolwork and curriculum support",
      "Shared whiteboard and practice materials",
      "Lesson notes and parent progress updates",
    ],
    ctaText: "Find their starting point",
    ctaHref: "/tutors",
  },
  {
    id: "college-pathway",
    badge: "LIGHTING AHEAD",
    title: "College Pathway",
    tagline: "A roadmap for the whole family.",
    price: "Let's talk",
    billing: "",
    frequency: "Steps and custom year-round roadmap",
    popular: false,
    features: [
      "Grade 8–12 planning conversations",
      "College research and timeline support",
      "Student essay style feedback",
      "Parent questions and language support",
    ],
    ctaText: "Discuss a planning package",
    ctaHref: "/college-pathway",
  },
];

export const PRICING_COMPARISON = [
  {
    feature: "Focus",
    smallGroup: "Shared subject goals",
    oneToOne: "Individual needs",
    collegePathway: "Future planning",
  },
  {
    feature: "Group size",
    smallGroup: "3–5 students",
    oneToOne: "1 student",
    collegePathway: "Student & family",
  },
  {
    feature: "Example description",
    smallGroup: "4 live lessons",
    oneToOne: "4 live lessons",
    collegePathway: "Agreed at consultation",
  },
  {
    feature: "Materials & next steps",
    smallGroup: "Included",
    oneToOne: "Included",
    collegePathway: "Planning workbook",
  },
  {
    feature: "Parent communication",
    smallGroup: "Progress updates",
    oneToOne: "Lesson notes & updates",
    collegePathway: "Planning consultations",
  },
  {
    feature: "Tutor language",
    smallGroup: "By availability",
    oneToOne: "By availability",
    collegePathway: "Primary family support",
  },
];

export const PRICING_FAQS = [
  {
    q: "Do I need to pay to book a consultation?",
    a: "No. The initial conversation is free, with no payment required and no obligation to enroll. We use it to understand your family's needs and show you suitable options.",
  },
  {
    q: "Can we change our schedule or package?",
    a: "Yes! Family schedules shift, sports seasons change, and student needs evolve. You can modify lesson times or switch between 1-on-1 and small groups at the end of any billing month.",
  },
  {
    q: "Is small-group learning available in every subject?",
    a: "Small groups are currently offered for Math (Elementary through Algebra II), Science, and English/Writing. For specialized AP courses or specific test deadlines, one-to-one is recommended.",
  },
  {
    q: "What if my child needs more than one subject?",
    a: "We can coordinate a blended plan! Many students take 1:1 Math once a week and join a small-group Writing cohort, or alternate subjects as school units progress.",
  },
];


