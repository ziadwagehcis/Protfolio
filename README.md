# 🚀 Developer Portfolio

A premium, fully responsive, and customizable developer portfolio built with **vanilla HTML, CSS, and JavaScript**. Features dark/light theme, smooth animations, project modals, image lightbox, reading progress bar, and more — all powered by a single data file.

---

## ✨ Feature Highlights

- 🌗 **Dark / Light Theme** — Automatic system detection + manual toggle, persisted in localStorage
- ⚡ **Smooth Animations** — Scroll-triggered reveals, typing effect, animated counters
- 📱 **Fully Responsive** — Mobile-first design that looks great on every screen size
- 🖼️ **Image Lightbox** — Full-screen image viewer with keyboard navigation
- 📂 **Project Modals** — Detailed project case studies in an overlay
- 📊 **Reading Progress Bar** — Visual scroll indicator at the top
- ♿ **Accessible** — Semantic HTML5, ARIA labels, skip-to-content link, keyboard navigation
- 🎨 **Easy Customization** — Edit one JavaScript file to change all content
- 🔍 **SEO Optimized** — Open Graph, Twitter Card, and meta tags built in
- 📄 **CV Download** — One-click resume download button in the navbar

---

## 🏁 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

Or click **Code → Download ZIP** on GitHub and extract the folder.

### 2. Open in VS Code

```bash
code .
```

### 3. Run with Live Server

1. Install the **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. Your portfolio opens at `http://127.0.0.1:5500`.

### 4. Start Customizing

Open `js/portfolio-data.js` and follow the guide below to make it yours.

---

## 🛠️ How to Customize

All portfolio content lives in **one file**: `js/portfolio-data.js`. Open it and follow the steps below.

> [!TIP]
> Fields marked with `// EDIT:` comments are the ones you should change. Leave a string empty (`""`) to auto-hide optional elements.

---

### 1. Change Your Name

Find the `personal` object at the top of the file:

```js
personal: {
  name: "Your Name",           // Full name displayed in hero & footer
  firstName: "Your",           // Used in greetings
  lastName: "Name",
  initials: "YN",              // Shown in the navbar logo & loader (1-3 chars)
}
```

Replace `"Your Name"`, `"Your"`, `"Name"`, and `"YN"` with your real info.

---

### 2. Update Professional Title

```js
professionalTitle: "Full Stack Developer",    // Static title
typedTitles: [                                 // Typing animation titles
  "Software Developer",
  "Full Stack Developer",
  "MEAN Stack Developer",
  "Flutter Developer"
],
```

- `professionalTitle` — Shown in SEO and fallback contexts.
- `typedTitles` — Array of titles that cycle with a typing animation in the hero section. Add, remove, or reorder them.

---

### 3. Write About Me

```js
about: {
  enabled: true,
  paragraphs: [
    "First paragraph about yourself...",
    "Second paragraph about your journey...",
    "Third paragraph about your philosophy..."
  ],
  highlights: [
    {
      icon: "puzzle",                        // Icon key (puzzle, code, book, responsive, team)
      title: "Problem Solving",
      description: "Breaking down complex challenges into elegant solutions."
    },
    // ... add more highlights
  ]
}
```

Each string in `paragraphs` becomes a `<p>` tag. Add or remove as many as you like.

---

### 4. Add Profile Photo

1. Place your photo at: `assets/images/profile/profile.jpg`
2. Optionally add a separate about photo at: `assets/images/about/about.jpg`
3. Update the paths in the data file if you use different filenames:

```js
profileImage: "assets/images/profile/profile.jpg",
aboutImage: "assets/images/about/about.jpg",
```

> [!NOTE]
> Recommended image size: **500×500px** minimum, square aspect ratio for the profile photo. JPEG or WebP for best performance.

---

### 5. Add Projects

Each project is an object in the `projects.items` array:

```js
projects: {
  enabled: true,
  categories: ["All Projects", "Web Development", "Full Stack", "Frontend", "Backend", "Mobile Applications"],
  items: [
    {
      name: "E-Commerce Platform",                         // Project title
      shortDescription: "A full-featured online store.",    // Card subtitle
      category: "Full Stack",                               // Must match a category above
      featured: true,                                       // Show "Featured" badge
      thumbnail: "assets/images/projects/ecommerce-thumb.jpg",  // Card image
      images: [                                             // Gallery images for lightbox
        "assets/images/projects/ecommerce-1.jpg",
        "assets/images/projects/ecommerce-2.jpg"
      ],
      technologies: ["Angular", "Node.js", "MongoDB", "Express.js"],  // Tech tags
      liveUrl: "https://my-store.com",                      // Live demo link (empty to hide)
      githubUrl: "https://github.com/user/ecommerce",      // GitHub link (empty to hide)
      details: {                                            // Modal content
        overview: "Full description of the project...",
        objective: "What the project aims to achieve...",
        problem: "The problem it solves...",
        role: "My role — solo developer / team lead...",
        features: [
          "User authentication & authorization",
          "Product search with filters",
          "Shopping cart & checkout",
          "Admin dashboard"
        ],
        implementation: "Built with Angular 17 on the frontend...",
        challenges: "Handling real-time inventory updates...",
        solutions: "Implemented WebSocket connections...",
        results: "Served 500+ users in the first month..."
      }
    }
  ]
}
```

**To add a new project:** Copy the entire object above, paste it after the last item (before the closing `]`), and fill in your details.

---

### 6. Add Skills

Skills are grouped into categories. Each category has a name and an array of skills:

```js
skills: {
  enabled: true,
  categories: [
    {
      id: "frontend",                          // Unique ID (no spaces)
      name: "Front-End Development",           // Display name
      skills: [
        { name: "HTML5", icon: "html5" },      // icon = key for the SVG icon lookup
        { name: "CSS3", icon: "css3" },
        { name: "Angular", icon: "angular" }
      ]
    }
  ]
}
```

**To add a new category:** Add a new object to the `categories` array.  
**To add a new skill:** Add a `{ name, icon }` object to the `skills` array inside any category.

---

### 7. Add Education

```js
education: {
  enabled: true,
  items: [
    {
      degree: "Bachelor of Computer Science",  // Degree / diploma title
      institution: "University Name",          // School / university name
      field: "Computer Science",               // Field of study
      startDate: "2020",                       // Start year
      endDate: "2024",                         // End year (or "Present")
      grade: "3.8 GPA",                        // Optional — leave "" to hide
      description: "Relevant coursework: Data Structures, Algorithms, Web Development.",
      logo: "assets/images/education/uni-logo.png"  // Optional institution logo
    }
  ]
}
```

---

### 8. Add Experience

```js
experience: {
  enabled: true,
  items: [
    {
      title: "Full Stack Developer",           // Job title
      company: "Tech Company",                 // Company name
      type: "Full-time",                       // Full-time, Part-time, Freelance, Internship, Contract
      startDate: "Jan 2023",                   // Start date
      endDate: "",                             // Leave empty for current position
      current: true,                           // true if this is your current job
      logo: "assets/images/experience/company-logo.png",  // Optional company logo
      description: "Building and maintaining web applications for enterprise clients.",
      responsibilities: [
        "Developed RESTful APIs using Node.js and Express",
        "Built responsive UI components with Angular",
        "Managed MongoDB databases and wrote aggregation pipelines"
      ],
      achievements: [
        "Reduced API response time by 40%",
        "Led migration from monolith to microservices"
      ],
      technologies: ["Angular", "Node.js", "MongoDB", "Docker"]
    }
  ]
}
```

---

### 9. Add Certificates

```js
certifications: {
  enabled: true,
  items: [
    {
      title: "MEAN Stack Development",             // Certificate name
      organization: "NTI Egypt",                   // Issuing organization
      date: "August 2024",                         // Date received
      credentialId: "NTI-2024-MEAN-001",           // Optional credential ID
      image: "assets/images/certificates/mean-cert.jpg",  // Certificate image
      verifyUrl: "https://verify.nti.eg/cert-id",  // Optional verification link
      description: "Comprehensive training covering MongoDB, Express.js, Angular, and Node.js."
    }
  ],
  achievements: [
    {
      title: "Best Project Award",                 // Achievement name
      type: "Award",                               // Award, Hackathon, Competition, Training
      organization: "NTI Egypt",
      date: "August 2024",
      description: "Awarded for outstanding final project presentation."
    }
  ]
}
```

---

### 10. Update Social Links

```js
socialLinks: {
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  instagram: "",           // Leave empty to hide
  facebook: "",
  twitter: "",
  youtube: "",
  behance: "",
  dribbble: ""
}
```

Only links with a URL will appear in the social dock and footer. Leave any field as `""` to hide it.

---

### 11. Replace CV

1. Place your resume PDF in the `assets/cv/` folder.
2. Update the path in the data file:

```js
cv: "assets/cv/resume.pdf",
```

The "Download CV" button in the navbar will automatically link to this file.

---

### 12. Change Colors

Open `css/style.css` and modify the CSS custom properties in the `:root` and `[data-theme]` selectors:

```css
:root {
  /* Primary accent color */
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --primary-light: rgba(99, 102, 241, 0.1);

  /* Adjust these for your brand colors */
}

[data-theme="dark"] {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --text-primary: #f1f5f9;
  /* ... */
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  /* ... */
}
```

---

### 13. Enable / Disable Sections

At the bottom of `portfolio-data.js`, toggle any section on or off:

```js
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
```

Set any value to `false` to completely hide that section and remove its navigation link.

---

### 14. Contact Form Setup

The portfolio supports three contact form methods:

#### Option A: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and copy your form endpoint.
3. Paste it in the data file:

```js
contact: {
  formEndpoint: "https://formspree.io/f/your-form-id",
}
```

#### Option B: EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com).
2. Set up a service, template, and get your keys.
3. Add the EmailJS SDK and configure in `components.js` (see EmailJS docs).

#### Option C: Mailto Fallback

If `formEndpoint` is left empty, the form will fall back to opening the user's default email client with a `mailto:` link using the `contact.email` value.

```js
contact: {
  email: "your@email.com",
  formEndpoint: "",       // Empty = mailto fallback
}
```

---

## 🚀 Deployment

### GitHub Pages

1. Push your repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose `main` branch and `/ (root)` folder.
5. Click **Save**. Your site will be live at `https://your-username.github.io/portfolio/`.

### Netlify (Drag & Drop)

1. Go to [app.netlify.com](https://app.netlify.com).
2. Click **Add new site → Deploy manually**.
3. Drag your entire project folder onto the upload area.
4. Your site is live instantly with a Netlify URL.
5. Optionally configure a custom domain in **Domain settings**.

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**.
3. Import your portfolio repository.
4. Framework Preset: **Other** (no build step needed).
5. Click **Deploy**. Your site is live with a Vercel URL.

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Main HTML file (skeleton)
├── README.md                   # This documentation
│
├── css/
│   ├── style.css               # Core styles, variables, layout, components
│   ├── animations.css          # Scroll animations, transitions, keyframes
│   └── responsive.css          # Media queries and mobile styles
│
├── js/
│   ├── portfolio-data.js       # ⭐ All portfolio content (edit this!)
│   ├── components.js           # Renders HTML from data, builds all sections
│   ├── animations.js           # Scroll-triggered animations, intersection observer
│   └── main.js                 # Initialization, event listeners, navigation logic
│
└── assets/
    ├── icons/
    │   └── favicon.ico         # Browser tab icon
    ├── images/
    │   ├── profile/            # Profile photo(s)
    │   ├── about/              # About section image(s)
    │   ├── projects/           # Project screenshots & thumbnails
    │   ├── certificates/       # Certificate images
    │   ├── education/          # Institution logos (optional)
    │   ├── experience/         # Company logos (optional)
    │   └── general/            # OG image, misc images
    └── cv/
        └── resume.pdf          # Your CV / resume PDF
```

---

## 🌐 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari  | ✅ Latest 2 versions |
| Edge    | ✅ Latest 2 versions |
| Opera   | ✅ Latest 2 versions |
| IE 11   | ❌ Not supported |

> [!NOTE]
> This portfolio uses modern CSS (custom properties, grid, flexbox) and ES6+ JavaScript (const/let, arrow functions, template literals, modules). Internet Explorer is not supported.

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

Made with ❤️ and vanilla JavaScript.
