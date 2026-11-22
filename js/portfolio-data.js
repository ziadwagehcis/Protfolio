/**
 * ============================================================
 *  PORTFOLIO CONFIGURATION FILE
 * ============================================================
 *  
 *  Edit this file to update ALL your portfolio content.
 *  You should NOT need to edit HTML, CSS, or other JS files.
 *  
 *  Instructions:
 *  - Replace placeholder text (marked with "EDIT:") with your real info.
 *  - Add/remove items from arrays to add/remove content.
 *  - Set section "enabled" to false to hide any section.
 *  - Leave fields empty ("") to auto-hide optional elements.
 *  
 * ============================================================
 */

const portfolioData = {

  /* ──────────────────────────────────────────────
   *  PERSONAL INFORMATION
   * ────────────────────────────────────────────── */
  personal: {
    // EDIT: Your full name
    name: "Ziad Wagih",
    firstName: "Ziad",
    lastName: "Wagih",
    // EDIT: Initials for the logo (1-3 characters)
    initials: "ZW",
    // EDIT: Your primary professional title
    professionalTitle: "Software Developer",
    // EDIT: Titles for the typing animation in the hero
    typedTitles: [
      "Software Developer",
      "Full Stack Developer",
      "MEAN Stack Developer",
      "Graphic Designer",
      "Flutter Developer"
    ],
    // EDIT: Short hero introduction paragraph
    introduction: "Software Developer trained in MEAN Stack, .NET, and Flutter, passionate about building practical web and mobile solutions.",
    // EDIT: Path to your profile photo (displayed in hero section). Leave empty ("") to show initials badge.
    profileImage: "assets/images/profile/ziad-formal.png",
    // EDIT: Path to your about photo (displayed in about section). Leave empty ("") to show clean editorial layout.
    aboutImage: "assets/images/about/ziad-about.jpg",
    // EDIT: Path to your CV/resume PDF file (leave empty "" to hide all CV download buttons)
    cv: "assets/cv/resume.pdf",
    // EDIT: Set to true to show "Available for Opportunities" badge
    availability: true,
    // EDIT: Custom availability text
    availabilityText: "Available for Opportunities",
    // EDIT: Technology badges shown in hero section
    techBadges: ["MEAN Stack", "ASP.NET", "Flutter", "C#", "Dart"],
    // EDIT: Brand statement in footer
    brandStatement: "Building meaningful digital experiences through creativity and technology."
  },

  /* ──────────────────────────────────────────────
   *  ABOUT ME
   * ────────────────────────────────────────────── */
  about: {
    enabled: true,
    // EDIT: Your about me paragraphs (each string = one paragraph)
    paragraphs: [
      "I'm a Software Developer with training in MEAN Stack (NTI), .NET (Route), and Flutter (Black Horse), with a Flutter Development certificate.",
      "My technical interests include web and mobile application development using Angular, Node.js, MongoDB, C#, ASP.NET, and Dart.",
      "Alongside development, I have professional experience in Graphic Design and Digital Marketing, combining technical skills with creativity to build practical digital solutions."
    ],
    // EDIT: Professional highlights
    highlights: [
      {
        icon: "puzzle",
        title: "Problem Solving",
        description: "Breaking down complex challenges into elegant, efficient solutions."
      },
      {
        icon: "code",
        title: "Clean Code",
        description: "Writing readable, maintainable, and well-documented code."
      },
      {
        icon: "book",
        title: "Continuous Learning",
        description: "Staying current with modern technologies and best practices."
      },
      {
        icon: "responsive",
        title: "Responsive Development",
        description: "Building interfaces that work beautifully on every device."
      },
      {
        icon: "team",
        title: "Team Collaboration",
        description: "Working effectively with teams using agile methodologies."
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  STATISTICS (About Section)
   *  - Set value to 0 or remove to hide a stat
   *  - suffix: text after the number (e.g., "+")
   * ────────────────────────────────────────────── */
  statistics: [
    // EDIT: Uncomment and fill these with your REAL statistics
    // { label: "Years of Experience", value: 2, suffix: "+" },
    // { label: "Projects Completed", value: 10, suffix: "+" },
    // { label: "Technologies Used", value: 15, suffix: "+" },
    // { label: "Collaborations", value: 5, suffix: "+" }
  ],

  /* ──────────────────────────────────────────────
   *  EDUCATION
   * ────────────────────────────────────────────── */
  education: {
    enabled: true,
    items: [
      {
        degree: "Bachelor's Degree",
        institution: "Mansoura University",
        field: "Computer and Information Sciences, Information Systems (IS)",
        startDate: "Sep 2024",
        endDate: "Sep 2028",
        grade: "Good",
        description: "I am currently an undergraduate student at the Faculty of Computers and Information, majoring in Information Systems (IS), and pursuing a Bachelor's degree. Throughout my academic journey, I am developing a strong foundation in programming, database management, systems analysis, and software development. Alongside my university studies, I have completed practical training in MEAN Stack, .NET, and Flutter Development, continuously expanding my technical knowledge and programming skills.",
        logo: ""
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  WORK EXPERIENCE
   * ────────────────────────────────────────────── */
  experience: {
    enabled: true,
    items: [
      {
        title: "Trainee",
        company: "National Telecommunication Institute (NTI)",
        type: "Trainee",
        startDate: "Aug 2026",
        endDate: "",
        current: true,
        logo: "",
        description: "El Mansoura, Ad Daqahliyah, Egypt - On-site",
        responsibilities: [
          "Completed practical training in MEAN Stack Web Development at the National Telecommunication Institute (NTI).",
          "Reviewed JavaScript fundamentals and explored synchronous and asynchronous programming.",
          "Studied JavaScript execution environments, OOP concepts, and TypeScript.",
          "Learned to develop client-side applications and manage freelance web development projects.",
          "Worked with REST APIs, middleware, HTTP methods, and file uploads using Multer.",
          "Studied MongoDB, SQL vs. NoSQL databases, Mongoose schemas, models, and CRUD operations.",
          "Learned API security concepts, including password hashing, authentication, access tokens, refresh tokens, and token verification middleware.",
          "Explored logging, Socket.IO, unit testing, performance optimization, caching, and request validation.",
          "Studied Node.js design patterns and global error handling.",
          "Learned the fundamentals of freelancing and how to identify marketable services and define clear service offerings.",
          "Developed pricing strategies and structured pricing models for freelance services.",
          "Studied project management essentials and effective freelance project execution.",
          "Practiced writing and delivering professional freelance proposals to attract clients and secure projects.",
          "Built a professional portfolio and established a personal brand."
        ],
        achievements: [],
        technologies: ["JavaScript", "TypeScript", "Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.IO", "Multer", "Mongoose"]
      },
      {
        title: "Trainee",
        company: "Route",
        type: "Trainee",
        startDate: "Feb 2026",
        endDate: "Oct 2026",
        current: false,
        logo: "",
        description: "Cairo, Egypt - Remote",
        responsibilities: [
          "Completed practical training in .NET Development at Route.",
          "Studied C# fundamentals and advanced C# programming concepts.",
          "Gained knowledge of Object-Oriented Programming (OOP) and SOLID principles.",
          "Worked with databases and Entity Framework Core (EF Core).",
          "Learned LINQ for querying and manipulating data.",
          "Explored .NET fundamentals, ASP.NET MVC, and Web API development.",
          "Studied software design patterns and their applications in software development."
        ],
        achievements: [],
        technologies: ["C#", "OOP", "SOLID", "SQL", "Entity Framework Core", "LINQ", "ASP.NET MVC", "Web API"]
      },
      {
        title: "Account Manager",
        company: "Chroma Media School",
        type: "Part-time",
        startDate: "Feb 2026",
        endDate: "Aug 2026",
        current: false,
        logo: "",
        description: "Mansoura, Egypt - On-site",
        responsibilities: [
          "Managed client accounts and maintained strong communication with clients.",
          "Planned and executed marketing campaigns based on client requirements and goals.",
          "Created social media content, including posts, captions, and promotional materials.",
          "Designed social media posts, advertisements, and other marketing visuals.",
          "Developed creative content ideas aligned with client brand identities.",
          "Coordinated with the marketing and creative teams to ensure smooth campaign execution.",
          "Followed up with clients on feedback and made necessary updates to materials.",
          "Managed social media content schedules and timely content delivery.",
          "Monitored campaign performance and contributed ideas for improving marketing results."
        ],
        achievements: [],
        technologies: ["Account Management", "Digital Marketing", "Social Media", "Content Planning", "Campaign Management"]
      },
      {
        title: "Trainee",
        company: "Black Horse Courses",
        type: "Trainee",
        startDate: "Jun 2025",
        endDate: "Aug 2025",
        current: false,
        logo: "",
        description: "El Mansoura, Ad Daqahliyah, Egypt - Remote",
        responsibilities: [
          "Completed practical training in Flutter Mobile Application Development using Dart.",
          "Developed foundational skills in building cross-platform mobile applications.",
          "Practiced creating mobile app interfaces using Flutter widgets.",
          "Gained an understanding of Flutter project structure and core development concepts.",
          "Earned a Flutter Development training certificate from Black Horse."
        ],
        achievements: [],
        technologies: ["Flutter", "Dart", "Mobile Development", "Widgets"]
      },
      {
        title: "Graphic Designer",
        company: "Promise Gift Store",
        type: "Full-time",
        startDate: "Aug 2022",
        endDate: "Aug 2023",
        current: false,
        logo: "",
        description: "El Mansoura, Ad Daqahliyah, Egypt - On-site",
        responsibilities: [
          "Created custom graphic designs for personalized gifts and printed products.",
          "Designed artwork for mugs, wall art, and various gift items.",
          "Developed creative designs tailored to different occasions and customer preferences.",
          "Prepared visual designs for printing on different products."
        ],
        achievements: [],
        technologies: ["Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "Print Design"]
      },
      {
        title: "Graphic Designer",
        company: "Nepec-Eg",
        type: "Full-time",
        startDate: "May 2022",
        endDate: "May 2023",
        current: false,
        logo: "",
        description: "El Mansoura, Ad Daqahliyah, Egypt - On-site",
        responsibilities: [
          "Created social media designs and promotional graphics for digital platforms.",
          "Designed product advertisements and promotional visuals.",
          "Used Adobe Photoshop for product manipulation, image editing, and retouching.",
          "Developed visual layouts that combined color, content, and creative compositions."
        ],
        achievements: [],
        technologies: ["Graphic Design", "Digital Marketing", "Adobe Photoshop", "Visual Layout"]
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  SKILLS
   *  - Each category has a name and array of skills
   *  - proficiency is optional (0-100). Omit to show as badge only.
   *  - icon: technology name used to look up the SVG icon
   * ────────────────────────────────────────────── */
  skills: {
    enabled: true,
    categories: [
      {
        id: "software",
        name: "Software Development",
        skills: [
          { name: "Software Development", icon: "code" },
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Angular", icon: "angular" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "express" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "MEAN Stack", icon: "fullstack" },
          { name: "REST APIs", icon: "api" },
          { name: "Full-Stack Development", icon: "fullstack" },
          { name: "Front-End Development", icon: "frontend" },
          { name: "Back-End Development", icon: "backend" }
        ]
      },
      {
        id: "dotnet",
        name: ".NET Development",
        skills: [
          { name: "C#", icon: "csharp" },
          { name: ".NET", icon: "dotnet" },
          { name: "ASP.NET", icon: "aspnet" },
          { name: "ASP.NET Core", icon: "aspnet" },
          { name: "SQL Server", icon: "sqlserver" },
          { name: "Object-Oriented Programming", icon: "oop" },
          { name: "Database Design", icon: "database" },
          { name: "Entity Framework", icon: "dotnet" }
        ]
      },
      {
        id: "mobile",
        name: "Flutter & Mobile Development",
        skills: [
          { name: "Flutter", icon: "flutter" },
          { name: "Dart", icon: "dart" },
          { name: "Mobile Application Development", icon: "mobile" },
          { name: "Cross-Platform Development", icon: "mobile" }
        ]
      },
      {
        id: "database",
        name: "Databases",
        skills: [
          { name: "MongoDB", icon: "mongodb" },
          { name: "Database Management", icon: "database" },
          { name: "Microsoft SQL Server", icon: "sqlserver" },
          { name: "SQL", icon: "sql" },
          { name: "MySQL", icon: "database" },
          { name: "Database Design", icon: "database" }
        ]
      },
      {
        id: "graphic",
        name: "Graphic Design",
        skills: [
          { name: "Graphic Design", icon: "design" },
          { name: "Adobe Photoshop", icon: "photoshop" },
          { name: "Adobe Illustrator", icon: "illustrator" },
          { name: "Social Media Design", icon: "responsive" },
          { name: "Visual Communication", icon: "team" }
        ]
      },
      {
        id: "marketing",
        name: "Digital Marketing",
        skills: [
          { name: "Digital Marketing", icon: "marketing" },
          { name: "Social Media Marketing", icon: "marketing" },
          { name: "Social Media Management", icon: "team" },
          { name: "Content Marketing", icon: "content" }
        ]
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  PROJECTS
   *  - category: must match one of the defined categories below
   *  - featured: set true to show a "Featured" badge
   *  - images: array of screenshot paths for the gallery
   * ────────────────────────────────────────────── */
  projects: {
    enabled: true,
    // EDIT: Define project categories (auto-generated filter buttons)
    categories: ["All Projects", "Full Stack", "Frontend", "Backend", "Mobile Applications"],
    items: [
      {
        name: "Northstar Shop",
        shortDescription: "A modern e-commerce experience for discovering everyday products, managing favorites and carts, and tracking orders.",
        category: "Full Stack",
        featured: true,
        thumbnail: "assets/images/projects/northstar-shop-home.png",
        images: ["assets/images/projects/northstar-shop-home.png"],
        technologies: ["Angular", "TypeScript", "Node.js", "Express.js", "MongoDB", "MEAN Stack"],
        liveUrl: "https://northstar-shop1.vercel.app/",
        githubUrl: "",
        details: {
          overview: "A full-stack online shop focused on a polished shopping experience, clear product presentation, and convenient order management.",
          objective: "Make it easy for customers to discover products, manage a cart or favorites, and follow their orders.",
          role: "Full-stack project built with the MEAN Stack.",
          features: [
            "Product catalog with category filters",
            "Shopping cart and favorites",
            "Order tracking",
            "Manager portal",
            "Light and dark themes",
            "Multilingual interface"
          ],
          implementation: "Built with Angular and TypeScript on the frontend and Node.js, Express.js, and MongoDB on the backend."
        }
      },
      {
        name: "CineSphere",
        shortDescription: "A movie discovery and catalog app with search, genre filters, ratings, and movie management.",
        category: "Full Stack",
        featured: true,
        thumbnail: "assets/images/projects/cinesphere-home.png",
        images: ["assets/images/projects/cinesphere-home.png"],
        technologies: ["Angular", "TypeScript", "Node.js", "Express.js", "MongoDB", "REST APIs", "MEAN Stack"],
        liveUrl: "https://cinecphere1.vercel.app/",
        githubUrl: "",
        details: {
          overview: "A full-stack movie catalog for exploring titles, viewing movie details, and managing the catalog.",
          objective: "Provide a searchable, organized movie discovery experience with useful catalog management tools.",
          role: "Full-stack project built with the MEAN Stack.",
          features: [
            "Movie search across titles, actors, and directors",
            "Browse movies by genre",
            "Sort and explore top-rated or newest titles",
            "Movie detail pages",
            "Add and edit catalog entries",
            "Live catalog API status"
          ],
          implementation: "Built with Angular and TypeScript on the frontend and Node.js, Express.js, and MongoDB on the backend, with REST API integration."
        }
      },
      {
        name: "Personal Portfolio",
        shortDescription: "A responsive developer portfolio showcasing projects, skills, services, and professional experience.",
        category: "Frontend",
        featured: true,
        thumbnail: "assets/images/projects/ziad-portfolio-home.png",
        images: ["assets/images/projects/ziad-portfolio-home.png"],
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        liveUrl: "https://ziadwagehcis.github.io/Protfolio/",
        githubUrl: "https://github.com/ziadwagehcis/Protofolio",
        details: {
          overview: "A responsive, data-driven personal portfolio with dedicated sections for background, skills, projects, and contact information.",
          objective: "Present professional experience and selected work in a clear, accessible, and mobile-friendly format.",
          role: "Designed and developed the portfolio.",
          features: [
            "Responsive layouts for desktop and mobile",
            "Dynamic content rendered from a central data file",
            "Dark and light themes",
            "Project filters and project detail modals",
            "Accessible navigation and SEO metadata"
          ],
          implementation: "Built with semantic HTML, custom CSS, and vanilla JavaScript."
        }
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  CERTIFICATIONS & ACHIEVEMENTS
   * ────────────────────────────────────────────── */
  certifications: {
    enabled: true,
    items: [
      // EDIT: Add your certificates
      // {
      //   title: "Certificate Title",
      //   organization: "Issuing Organization",
      //   date: "Month Year",
      //   credentialId: "",                             // Optional
      //   image: "assets/images/certificates/cert1.jpg",
      //   verifyUrl: "",                                // Optional: verification link
      //   description: "Brief description of what this certification covers."
      // }
    ],
    achievements: [
      // EDIT: Add awards, hackathons, etc.
      // {
      //   title: "Achievement Title",
      //   type: "Award",                                // Award, Hackathon, Competition, Training
      //   organization: "Organization Name",
      //   date: "Month Year",
      //   description: "Brief description."
      // }
    ]
  },

  /* ──────────────────────────────────────────────
   *  SERVICES
   * ────────────────────────────────────────────── */
  services: {
    enabled: true,
    items: [
      {
        icon: "fullstack",
        name: "MEAN Stack Development",
        description: "Building dynamic full-stack web applications using MongoDB, Express.js, Angular, and Node.js."
      },
      {
        icon: "frontend",
        name: "Front-End Development",
        description: "Creating responsive, accessible, and interactive interfaces with Angular, JavaScript, and TypeScript."
      },
      {
        icon: "backend",
        name: "Back-End Development",
        description: "Developing scalable server-side applications and REST APIs using Node.js, Express.js, C#, and ASP.NET."
      },
      {
        icon: "mobile",
        name: "Mobile App Development",
        description: "Building cross-platform mobile applications with Flutter and Dart for iOS and Android."
      },
      {
        icon: "api",
        name: "REST API Development",
        description: "Designing, securing, and integrating RESTful APIs with databases and third-party services."
      },
      {
        icon: "aspnet",
        name: ".NET Web Development",
        description: "Developing web applications and services with C#, ASP.NET, ASP.NET Core, and SQL Server."
      },
      {
        icon: "database",
        name: "Database Solutions",
        description: "Planning and implementing database solutions using MongoDB, SQL Server, MySQL, and database design principles."
      },
      {
        icon: "design",
        name: "Graphic Design",
        description: "Creating polished visual content, social media designs, print artwork, and branded compositions."
      },
      {
        icon: "marketing",
        name: "Digital Marketing",
        description: "Supporting brands through social media marketing, content creation, and social media management."
      },
      {
        icon: "dataentry",
        name: "Data Entry",
        description: "Accurate and organized data entry, data cleaning, spreadsheet management, and administrative record handling."
      },
      {
        icon: "customerservice",
        name: "Customer Service",
        description: "Professional customer support, inquiry handling, issue follow-up, and clear communication with customers."
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  DEVELOPMENT PROCESS
   * ────────────────────────────────────────────── */
  process: {
    enabled: true,
    steps: [
      {
        number: "01",
        title: "Discovery",
        description: "Understand the project requirements, objectives, and business needs through thorough research and discussion."
      },
      {
        number: "02",
        title: "Planning",
        description: "Define the technical architecture, features, timeline, and development roadmap."
      },
      {
        number: "03",
        title: "Design",
        description: "Create intuitive interfaces and user-friendly experiences that align with project goals."
      },
      {
        number: "04",
        title: "Development",
        description: "Build clean, maintainable, scalable, and efficient solutions using best practices."
      },
      {
        number: "05",
        title: "Testing",
        description: "Thoroughly test functionality, responsiveness, performance, and cross-browser compatibility."
      },
      {
        number: "06",
        title: "Deployment",
        description: "Prepare, optimize, and deploy the final product to production environments."
      }
    ]
  },

  /* ──────────────────────────────────────────────
   *  TESTIMONIALS
   *  - Only displayed if items exist. Never invent testimonials.
   * ────────────────────────────────────────────── */
  testimonials: {
    enabled: true,
    items: [
      // EDIT: Add REAL testimonials only
      // {
      //   name: "Client Name",
      //   position: "Position",
      //   company: "Company",                           // Optional
      //   image: "",                                    // Optional: path to their photo
      //   content: "Their testimonial text...",
      //   rating: 5                                     // Optional: 1-5 stars
      // }
    ]
  },

  /* ──────────────────────────────────────────────
   *  SOCIAL LINKS
   *  - Leave empty ("") to hide any link
   * ────────────────────────────────────────────── */
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/ziadwagih/",
    github: "https://github.com/ziadwagehcis",
    instagram: "https://www.instagram.com/ziadwagih1/",
    facebook: "https://www.facebook.com/ziadwagih19/",
    twitter: "",
    youtube: "",
    behance: "https://www.behance.net/ziadwagih",
    dribbble: ""
  },

  /* ──────────────────────────────────────────────
   *  CONTACT INFORMATION
   *  - Leave empty ("") to hide any contact method
   * ────────────────────────────────────────────── */
  contact: {
    email: "ziadwagih.business@gmail.com",
    phone: "+20 106 063 9898",
    whatsapp: "+20 106 063 9898",
    location: "",
    // EDIT: Form submission endpoint (Formspree, EmailJS, etc.)
    // Leave empty to use mailto fallback
    formEndpoint: ""
  },

  /* ──────────────────────────────────────────────
   *  SEO & META
   * ────────────────────────────────────────────── */
  seo: {
    title: "Ziad Wagih — Software Developer",
    description: "Portfolio of Ziad Wagih — Software Developer trained in MEAN Stack, .NET, and Flutter.",
    keywords: "Ziad Wagih, software developer, MEAN stack, angular, node.js, mongodb, asp.net, flutter, dart",
    canonicalUrl: "",
    ogImage: "assets/images/general/ziad-linkedin-banner.png",
    twitterHandle: ""
  },

  /* ──────────────────────────────────────────────
   *  SECTION VISIBILITY
   *  Set any to false to hide that section entirely
   * ────────────────────────────────────────────── */
  sections: {
    home: true,
    about: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true,
    services: true,
    process: true,
    testimonials: true,
    contact: true
  }
};
