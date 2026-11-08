export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: "all" | "learning-at-home" | "navigating-us-schools" | "multilingual-families" | "college-ahead";
  categoryLabel: string;
  categoryTag: string;
  readTime: string;
  description: string;
  author: string;
  date: string;
  image: string;
  cardBg: string;
  badgeBg: string;
  isFeatured?: boolean;
  content?: {
    intro: string;
    subIntro?: string;
    sections: {
      number: number;
      title: string;
      body: string;
      callout?: string;
    }[];
    fiveMinutePlan?: {
      title: string;
      items: string[];
    };
    whenExtraSupport?: string;
  };
}

export const RESOURCES: ResourceArticle[] = [
  {
    id: "homework-routine",
    slug: "homework-routine-that-leaves-room-to-breathe",
    title: "A homework routine that leaves room to breathe",
    category: "learning-at-home",
    categoryLabel: "Learning at home",
    categoryTag: "STUDY HABITS & WELLNESS",
    readTime: "6 min read",
    description: "A predictable start, a small goal and a little flexibility can change the tone of an afternoon.",
    author: "Fun and Learn Family Team",
    date: "November 4, 2026",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop",
    cardBg: "bg-[#FDF2F0] border-[#F8D7D2]",
    badgeBg: "bg-rose-100 text-rose-800",
    isFeatured: true,
    content: {
      intro: "When homework becomes the heaviest part of the day, it is tempting to look for a quick fix or feel frustrated. But most families need something gentler: a few shared expectations that make getting started easier and leave room for real life.",
      subIntro: "The ideas below are starting points, not rules. Choose one change, try it for a few days and notice what helps your child feel more settled and capable.",
      sections: [
        {
          number: 1,
          title: "Start with a landing, not a demand",
          body: "After a school day, your child may need food, movement or quiet moments before another task. Agree on a short 'transition window'—a snack, a walk around the block or ten minutes to talk about the day.\n\nThen choose a repeatable starting cue: 'After our snack, we'll check the homework list.' A visual cue or predictable routine is easier to picture than 'Go do your homework right now!' Keep the cue realistic for your family's schedule; consistency matters more than an exact clock time.",
        },
        {
          number: 2,
          title: "Make the first step small enough to begin",
          body: "Before opening every book, ask your child to name what is due and choose one task to start with. If the work feels large, make the first goal very specific: read one paragraph, solve two problems or outline the first idea.\n\nTry asking: 'What part do you already understand?' This gives them a starting point without feeling the whole mountain at once. Use your family's mother tongue if that creates faster clarity, then connect that understanding to the school task.",
        },
        {
          number: 3,
          title: "Build breaks into the plan",
          body: "A break is not a prize for being finished; it can be part of how a learner stays engaged. Agree on a short work period and a brief pause, free from device notifications. During the pause, try stretching, getting water or walking away from the screen. Notice whether the challenge is tiredness, unclear directions or a skill that needs wider support.",
        },
        {
          number: 4,
          title: "Help without taking over",
          body: "You do not have to remember every math formula from your school days. Ask your child to show an example from class or explain how their teacher began: 'Walk me through the first step' can be more useful than immediately correcting an answer.\n\nWhen both of you are stuck, write down the question, note such as 'We can solve the equation but we do not understand why the signs change' gives a teacher or tutor a starting sentence to address. Stopping with a clear question can be a productive outcome.",
        },
        {
          number: 5,
          title: "Close with reflection, not inspection",
          body: "End by asking what felt easier, what still needs another look and what your child wants to remember for tomorrow. Praise effort and strategy: 'You stayed during it when the word problem was confusing' is more specific than 'Good job.'\n\nPack materials away together and celebrate the rest of the evening. After the closing check, a routine should help the family move into dinner and rest, not keep homework the centerpiece all night.",
        },
      ],
      fiveMinutePlan: {
        title: "Your five-minute family plan",
        items: [
          "Agree on a landing routine before schoolwork starts",
          "Choose one small task to begin",
          "Put a pause before frustration builds",
          "Help develop one question if you get stuck",
          "Wrap with a reflection and pack away",
        ],
      },
      whenExtraSupport: "If homework regularly brings tears, takes much longer than expected, or reveals the same missing skill, speak with your child's teacher about what is expected. You don't need to tackle everything alone. A tutor can help rebuild foundations and make afternoons manageable again.",
    },
  },
  {
    id: "middle-to-high-school",
    slug: "guide-to-middle-to-high-school-transition",
    title: "Your guide to the middle-to-high school transition",
    category: "navigating-us-schools",
    categoryLabel: "Navigating US schools",
    categoryTag: "NAVIGATING US SCHOOLS",
    readTime: "7 min read",
    description: "Courses, expectations and questions worth asking before the next chapter begins.",
    author: "Academic Advisory Team",
    date: "October 28, 2026",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    cardBg: "bg-[#F0F7F6] border-[#D7EFEA]",
    badgeBg: "bg-emerald-100 text-[#0A5C4C]",
    content: {
      intro: "Moving from 8th to 9th grade brings bigger campuses, higher academic stakes, and new social independence. Here is how parents and teens can stay aligned.",
      sections: [
        {
          number: 1,
          title: "Understanding High School Credits and GPA",
          body: "Unlike middle school, every semester grade now goes onto a permanent high school transcript. Focus on steady habits early in the term so midterm panic is averted.",
        },
        {
          number: 2,
          title: "Balancing Rigor with Mental Health",
          body: "Taking every honors and AP class right away can backfire. Aim for a balanced schedule where your student can excel in their strongest subjects while getting 8 hours of sleep.",
        },
      ],
    },
  },
  {
    id: "college-planning-calmer-roadmap",
    slug: "college-planning-calmer-year-by-year-roadmap",
    title: "College planning: a calmer year-by-year roadmap",
    category: "college-ahead",
    categoryLabel: "College ahead",
    categoryTag: "COLLEGE AHEAD",
    readTime: "8 min read",
    description: "What to explore in grades 8–12, without creating daily pressure.",
    author: "College Advisory Team",
    date: "October 19, 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    cardBg: "bg-[#FEF9EE] border-[#FCE8C4]",
    badgeBg: "bg-amber-100 text-amber-800",
    content: {
      intro: "College admissions doesn't need to be an overwhelming four-year sprint. When broken down into thoughtful milestones, students find their passions organically.",
      sections: [
        {
          number: 1,
          title: "Grades 8–9: Curiosity & Exploration",
          body: "Try new clubs, explore coding or music, and build reading habits. Don't worry about college rankings yet.",
        },
        {
          number: 2,
          title: "Grade 10: Deepening Commitments",
          body: "Identify 1 or 2 core extracurriculars to take leadership in, and ensure foundational math and English are solid.",
        },
      ],
    },
  },
  {
    id: "parent-teacher-conversation",
    slug: "making-the-most-of-parent-teacher-conversations",
    title: "Making the most of a parent-teacher conversation",
    category: "multilingual-families",
    categoryLabel: "Multilingual families",
    categoryTag: "MULTILINGUAL FAMILIES",
    readTime: "5 min read",
    description: "Preparing questions, pairing language support and asking about next steps without hesitation.",
    author: "Bilingual Family Liaisons",
    date: "October 12, 2026",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    cardBg: "bg-[#F4EFFC] border-[#E8DEF8]",
    badgeBg: "bg-purple-100 text-purple-800",
    content: {
      intro: "Parent-teacher conferences are often only 15 minutes long. Here is how bilingual families can get clear answers and advocate for their child.",
      sections: [
        {
          number: 1,
          title: "Requesting an Interpreter in Advance",
          body: "US public schools are legally required to provide free translation and interpretation. Request one at least 5 days prior to your conference.",
        },
      ],
    },
  },
  {
    id: "when-math-stops-making-sense",
    slug: "when-math-homework-stops-making-sense",
    title: "When math homework stops making sense",
    category: "learning-at-home",
    categoryLabel: "Learning at home",
    categoryTag: "LEARNING AT HOME",
    readTime: "6 min read",
    description: "Help your child explain what step feels unfamiliar before you jump in with answers.",
    author: "Lin Chen & Math Mentors",
    date: "September 30, 2026",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    cardBg: "bg-[#F0F7F6] border-[#D7EFEA]",
    badgeBg: "bg-emerald-100 text-[#0A5C4C]",
    content: {
      intro: "Math builds cumulatively. When a student feels lost, it is rarely because they 'aren't a math person'—it's usually a single prerequisite concept that needs reinforcement.",
      sections: [
        {
          number: 1,
          title: "Find the Breakpoint",
          body: "Ask your child to show you the last problem that felt clear. The leap between that problem and the confusing one is where the breakthrough happens.",
        },
      ],
    },
  },
  {
    id: "practice-plan-with-room-for-rest",
    slug: "a-practice-plan-with-room-for-rest",
    title: "A practice plan with room for rest",
    category: "college-ahead",
    categoryLabel: "College ahead",
    categoryTag: "TEST DAY PREPARATION",
    readTime: "6 min read",
    description: "How test preparation is manageable with small, predictable sessions and restful weekends.",
    author: "Test Prep Specialist Team",
    date: "September 22, 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    cardBg: "bg-[#FEF9EE] border-[#FCE8C4]",
    badgeBg: "bg-amber-100 text-amber-800",
    content: {
      intro: "Cramming for the SAT, ACT or APs leads to burnout. A distributed practice model with scheduled rest produces higher retention and test-day calm.",
      sections: [
        {
          number: 1,
          title: "Micro-Practice Beats Weekend Marathons",
          body: "Four 25-minute practice intervals per week build far better pattern recognition than one 4-hour marathon on Sunday night.",
        },
      ],
    },
  },
];

