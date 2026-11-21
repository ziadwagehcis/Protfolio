/**
 * ============================================================
 *  COMPONENTS.JS — Dynamic HTML Rendering Engine
 * ============================================================
 *  Reads portfolioData and generates all section content.
 *  Every piece of personal information comes from the data file;
 *  nothing is hard-coded here.
 * ============================================================
 */

/* ──────────────────────────────────────────────
 *  SVG ICON LIBRARY
 * ────────────────────────────────────────────── */

/**
 * Returns inline SVG markup for a named icon.
 * All icons use a 24×24 viewBox with currentColor.
 * @param {string} name — icon identifier
 * @returns {string} SVG markup or empty string
 */
function getIcon(name) {
  const icons = {
    javascript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.78 2.53-2.59v-6.8h-1.7v6.74c0 .86-.35 1.08-.91 1.08-.58 0-.82-.39-1.09-.85l-1.37.87zm5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.72.81-.72.48 0 .8.21 1.09.72l1.31-.84c-.55-.97-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.81z"/></svg>`,
    typescript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm10.71 13.56c.19.46.44.84.75 1.14.31.29.68.52 1.1.67.42.16.88.24 1.37.24.53 0 1.01-.07 1.44-.22.43-.15.8-.37 1.1-.65.3-.29.54-.64.7-1.05.17-.41.25-.87.25-1.37h-1.6c0 .24-.04.47-.11.68-.07.21-.18.4-.32.56-.14.16-.32.29-.54.38-.21.09-.46.14-.75.14-.25 0-.47-.04-.66-.13a1.35 1.35 0 0 1-.49-.37 1.68 1.68 0 0 1-.3-.58 2.46 2.46 0 0 1-.1-.74v-.06c0-.27.03-.51.1-.74.07-.22.17-.42.3-.58.13-.16.3-.29.49-.38.19-.09.41-.13.66-.13.29 0 .54.05.75.14.22.09.4.22.54.38.14.16.25.35.32.56.07.21.11.44.11.68h1.6c0-.5-.08-.96-.25-1.37a3.03 3.03 0 0 0-.7-1.05c-.3-.29-.67-.51-1.1-.65a4.37 4.37 0 0 0-1.44-.22c-.49 0-.95.08-1.37.24-.42.15-.79.38-1.1.67-.31.3-.56.68-.75 1.14-.18.46-.27.98-.27 1.57v.06c0 .59.09 1.11.27 1.57zM7.64 10.73v1.33h2.6v6.65h1.56v-6.65h2.6v-1.33H7.64z"/></svg>`,
    dart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.11 2.89L2.89 7.11c-.59.59-.89 1.37-.89 2.16v5.46L7.73 20.46l4.27.54.54 4.27-5.73-5.73V13.27 7.11zM12 2l4.27.54L22 8.27v5.46c0 .79-.3 1.57-.89 2.16l-4.22 4.22L12 22l-.54-4.27L16.73 12.46V7.27L12 2zm4.73 5.27L12 12l-4.73-4.73L12 2.54l4.73 4.73z"/></svg>`,
    html5: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.136 3.012h15.729l-1.431 16.15L12.011 21l-6.395-1.837L4.136 3.012zM17.09 6.25H8.34l.19 2.14h8.37l-.6 6.59-4.29 1.19-4.28-1.19-.29-3.29h2.1l.15 1.67 2.32.63 2.33-.63.24-2.7H7.78l-.57-6.37h9.5l-.19 2.14-.43-.18z"/></svg>`,
    css3: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.192 3.012h15.616l-1.42 16.15-6.377 1.838-6.378-1.838-1.441-16.15zm12.59 3.238H8.397l.196 2.14h8.003l-.604 6.59-3.981 1.19-3.982-1.19-.272-3.29h2.08l.138 1.67 2.036.63 2.054-.63.216-2.7H7.918l-.564-6.37h9.428v2.56z"/></svg>`,
    angular: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6.5l1.37 11.94L12 22l7.63-3.56L21 6.5L12 2zm0 2.17l6.22 11.07H14.1L12.88 12.7h-1.76l-1.22 2.54H7.78L12 4.17zM11.1 8.5L9.84 11.3h2.52L11.1 8.5z"/></svg>`,
    nodejs: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.35 0-.69.09-1 .27L4.5 6.27c-.62.36-1 1.02-1 1.73v8c0 .71.38 1.37 1 1.73l1.71.99c.83.4 1.13.4 1.51.4 1.24 0 1.95-.75 1.95-2.06V9.1c0-.15-.12-.27-.27-.27H8.13c-.15 0-.27.12-.27.27v7.96c0 .58-.6 1.16-1.57.67l-1.79-1.03a.35.35 0 0 1-.17-.3v-8c0-.13.07-.25.18-.31l6.5-3.75a.34.34 0 0 1 .34 0l6.5 3.75c.1.06.17.18.17.31v8c0 .12-.06.24-.17.3l-6.5 3.75a.33.33 0 0 1-.34 0l-1.66-.99c-.13-.07-.28-.08-.4-.03-.83.36-1 .4-1.78.61-.19.05-.49.14.11.4l2.17 1.28c.31.18.66.27 1.01.27.35 0 .7-.09 1.01-.27l6.5-3.75c.62-.36 1-1.02 1-1.73v-8c0-.71-.38-1.37-1-1.73l-6.5-4A2.01 2.01 0 0 0 12 2zm2.38 5.49c-1.95 0-3.1.82-3.1 2.21 0 1.5 1.16 1.91 3.01 2.1 2.21.22 2.39.55 2.39 1 0 .77-.62 1.1-2.08 1.1-1.84 0-2.24-.46-2.38-1.37-.01-.13-.13-.22-.27-.22h-1.3c-.15 0-.27.12-.27.28.01 1.55.84 2.4 3.22 2.75v.01h1c2.38 0 3.75-.94 3.75-2.57 0-1.52-1.03-1.93-3.19-2.22-2.19-.29-2.42-.44-2.42-.96 0-.43.19-1 1.86-1 1.49 0 2.04.32 2.27 1.33.02.12.13.21.27.21h1.3a.27.27 0 0 0 .27-.29c-.19-1.78-1.52-2.6-3.72-2.75h-.01-.32z"/></svg>`,
    express: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4V4zm4.56 8.75c0 1.72 1.03 3.17 3.04 3.17 1.3 0 2.17-.6 2.68-1.42l-1.19-.69c-.32.49-.82.82-1.49.82-1.17 0-1.7-.95-1.7-1.88s.53-1.88 1.7-1.88c.65 0 1.14.31 1.47.78l1.21-.64c-.55-.88-1.39-1.43-2.68-1.43-2.01 0-3.04 1.45-3.04 3.17z"/></svg>`,
    api: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    mongodb: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.546 2.1c-.37-.67-.67-1.35-1.05-1.9a.1.1 0 0 0-.03-.05l-.02.03c-.03.05-.05.1-.07.16-.38.55-.68 1.23-1.05 1.9C8.4 5.4 5.5 8.08 5.5 12.17c0 3.3 2.17 5.93 5.17 6.63.14.03.42.07.42.07l.46.07h.08c.14.01.28.03.42.04.1 0 .2.01.3.01 3.48-.06 6.15-2.86 6.15-6.32 0-3.95-3.47-7.46-5.98-10.47zm-.83 16.08l-.22-.3c-.25-.35-.48-.73-.7-1.14-.64-1.19-1.1-2.52-1.1-3.89 0-1.44.63-2.3 1.42-2.56.09-.03.14-.02.14.08l.02.37c0 .4.03.8.1 1.19.14.84.42 1.63.78 2.37.33.67.74 1.3 1.19 1.89.17.22.35.44.53.65l.01.02-.03.02c-.07.05-.14.09-.21.14-.62.4-1.3.72-1.93.96v.2z"/></svg>`,
    sql: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    flutter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 2L4 12.314l3.14 3.14L20.597 2h-6.283zm0 8.627L8.97 16.97l3.14 3.14 2.204-2.204L17.457 21.05h6.283L14.314 11.627v-1z"/></svg>`,
    git: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.66 2.66a1.838 1.838 0 1 1-1.103 1.06l-2.48-2.48v6.53a1.838 1.838 0 1 1-1.512-.09V8.73a1.838 1.838 0 0 1-.998-2.41L7.636 3.59.454 10.773a1.55 1.55 0 0 0 0 2.188l10.48 10.477a1.55 1.55 0 0 0 2.186 0l10.426-10.42a1.55 1.55 0 0 0 0-2.188z"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    vscode: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.583 2.228L9.88 8.69 5.635 5.422l-1.56.738v11.68l1.56.738 4.245-3.268 7.703 6.462L22 20.088V3.912l-4.417-1.684zM5.635 14.164V9.836L8.03 12l-2.395 2.164zm11.948 2.994L13.06 12l4.523-5.158v10.316z"/></svg>`,
    postman: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.31-.37.87-.56 3.39-1.48 5.66-2.45 6.79-2.92 3.24-1.35 3.91-1.58 4.35-1.59.1 0 .31.02.45.13.12.09.15.21.17.3-.01.06.01.24 0 .39z"/></svg>`,
    csharp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.1L18.8 8 12 11.9 5.2 8 12 4.1zM5 9.7l6 3.5v7L5 16.7V9.7zm8 10.5v-7l6-3.5v7l-6 3.5z"/></svg>`,
    dotnet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" fill="var(--card-bg, #17211B)"/><circle cx="12" cy="12" r="2"/></svg>`,
    aspnet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M7 14l2 2-2 2M11 18h6"/></svg>`,
    sqlserver: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
    oop: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v2h11v-2M12 12v2"/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>`,
    design: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="12.5" r="2.5"/><circle cx="12" cy="17" r="2.5"/><circle cx="12" cy="12" r="9"/></svg>`,
    photoshop: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" stroke="none">Ps</text></svg>`,
    illustrator: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" stroke="none">Ai</text></svg>`,
    marketing: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2l12 4V7L3 11z"/><path d="M15 10l5-3v10l-5-3M6 13v5h4l2-3"/></svg>`,
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>`,
    dataentry: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M9 15h12M5.5 6h.01M12 6h6"/></svg>`,
    customerservice: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="12" width="4" height="7" rx="2"/><rect x="18" y="12" width="4" height="7" rx="2"/><path d="M18 19c-1 2-3 3-6 3"/></svg>`,
    puzzle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    responsive: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    team: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    fullstack: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="7 8 10 11 7 14"/><line x1="13" y1="14" x2="17" y2="14"/></svg>`,
    frontend: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    backend: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    mobile: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-5.8-4.703-10.503-10.503-10.503S2.994 6.273 2.994 12.073c0 5.242 3.84 9.588 8.861 10.377v-7.34H8.994v-3.037h2.861v-2.316c0-2.824 1.682-4.384 4.256-4.384 1.233 0 2.522.22 2.522.22v2.772h-1.421c-1.4 0-1.836.869-1.836 1.76v2.115h3.124l-.5 3.037h-2.624v7.34c5.021-.789 8.624-5.135 8.624-10.377z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    behance: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 6.053-2.207 7.061zM2.467 8.67h3.86c3.511 0 3.082-3.418 0-3.418h-3.86v3.418zm.14 8.288h4.202c3.878 0 3.44-4.063 0-4.063H2.607v4.063z"/></svg>`,
    dribbble: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.98-5.68 7.17zm7.56-7.872c.282.39 2.145 2.906 3.822 6 3.65-1.37 5.19-3.453 5.373-3.71C17.082 2.434 14.67 1.584 12.044 1.584c-.48 0-.952.04-1.42.112l.002.002zM20.5 5.7c-.218.29-1.918 2.51-5.72 4.058.237.486.463.98.674 1.48.075.178.146.357.213.536 3.423-.432 6.83.26 7.17.338-.02-2.45-.9-4.7-2.34-6.42z"/></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    quote: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starEmpty: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    external: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
  };
  return icons[name] || '';
}


/* ──────────────────────────────────────────────
 *  ELEMENT CREATION HELPER
 * ────────────────────────────────────────────── */

/**
 * Creates a DOM element with optional class and innerHTML.
 * @param {string} tag       — HTML tag name
 * @param {string} className — CSS class(es), space-separated
 * @param {string} innerHTML — HTML content
 * @returns {HTMLElement}
 */
function createEl(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}


/* ──────────────────────────────────────────────
 *  SECTION-VISIBILITY HELPER
 * ────────────────────────────────────────────── */

/**
 * Checks whether a section is enabled in portfolioData.sections.
 * @param {string} key — section key (e.g. "about", "skills")
 * @returns {boolean}
 */
function isSectionEnabled(key) {
  return portfolioData.sections && portfolioData.sections[key] !== false;
}

/**
 * Checks whether a section is active and should appear in navigation.
 * Empty optional sections (like testimonials without items) are cleanly excluded.
 * @param {string} id - Section identifier
 * @returns {boolean}
 */
function isSectionActive(id) {
  if (!isSectionEnabled(id)) return false;
  if (id === 'testimonials') {
    return Boolean(portfolioData.testimonials && portfolioData.testimonials.enabled && portfolioData.testimonials.items && portfolioData.testimonials.items.length > 0);
  }
  if (id === 'certifications') {
    const c = portfolioData.certifications;
    if (!c || !c.enabled) return false;
    return Boolean((c.items && c.items.length > 0) || (c.achievements && c.achievements.length > 0));
  }
  return true;
}


/* ──────────────────────────────────────────────
 *  SOCIAL LINKS HELPER
 * ────────────────────────────────────────────── */

/**
 * Returns an array of { platform, url, icon } objects for non-empty social links.
 */
function getActiveSocialLinks() {
  const links = portfolioData.socialLinks || {};
  const result = [];
  const platformNames = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter / X',
    youtube: 'YouTube',
    behance: 'Behance',
    dribbble: 'Dribbble'
  };
  Object.keys(links).forEach(key => {
    if (links[key]) {
      result.push({ platform: platformNames[key] || key, url: links[key], icon: key });
    }
  });
  return result;
}


/* ═══════════════════════════════════════════════
 *  RENDER FUNCTIONS
 * ═══════════════════════════════════════════════ */


/* ──────────────────────────────────────────────
 *  1. NAVBAR
 * ────────────────────────────────────────────── */
function renderNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const d = portfolioData.personal;
  const sections = portfolioData.sections || {};

  // Build nav links — only for enabled sections
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const visibleNavItems = navItems.filter(item => isSectionActive(item.id));

  const linksHTML = visibleNavItems.map(item =>
    `<a href="#${item.id}" class="nav-link" data-section="${item.id}">${item.label}</a>`
  ).join('');

  const mobileLinksHTML = visibleNavItems.map(item =>
    `<a href="#${item.id}" class="mobile-nav-link" data-section="${item.id}">${item.label}</a>`
  ).join('');

  // CV download button (only if cv path exists)
  const cvBtn = d.cv
    ? `<a href="${d.cv}" class="nav-cv-btn" download aria-label="Download CV">
         ${getIcon('download')} <span>Download CV</span>
       </a>`
    : '';

  nav.innerHTML = `
    <div class="nav-container">
      <a href="#home" class="nav-logo" aria-label="Home">
        <span class="logo-initials">${d.initials || ''}</span><span class="logo-dot">.</span>
      </a>

      <div class="nav-links" role="navigation" aria-label="Main navigation">
        ${linksHTML}
      </div>

      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          <span class="theme-icon-sun">${getIcon('sun')}</span>
          <span class="theme-icon-moon">${getIcon('moon')}</span>
        </button>
        ${cvBtn}
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-menu-header">
          <div class="nav-logo">
            <span class="logo-initials">${d.initials || ''}</span><span class="logo-dot">.</span>
          </div>
          <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Close menu">&times;</button>
        </div>
        <div class="mobile-menu-content">
          ${mobileLinksHTML}
          <div class="mobile-menu-actions">
            <button class="theme-toggle mobile-theme-toggle" aria-label="Toggle theme">
              <span class="theme-icon-sun">${getIcon('sun')}</span>
              <span class="theme-icon-moon">${getIcon('moon')}</span>
              <span class="theme-label">Switch Theme</span>
            </button>
            ${cvBtn ? `<a href="${d.cv}" class="mobile-cv-btn" download>${getIcon('download')} Download CV</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  // Relocate #mobile-menu to body so navbar backdrop-filter cannot clip it
  const mobileMenuEl = document.getElementById('mobile-menu');
  if (mobileMenuEl && mobileMenuEl.parentElement !== document.body) {
    document.body.appendChild(mobileMenuEl);
  }
}


/* ──────────────────────────────────────────────
 *  2. HERO
 * ────────────────────────────────────────────── */
function renderHero() {
  if (!isSectionEnabled('home')) return;
  const container = document.getElementById('hero-content');
  if (!container) return;

  const d = portfolioData.personal;
  const socials = getActiveSocialLinks();

  // Availability badge
  const availabilityHTML = d.availability
    ? `<div class="hero-availability" data-animation="fade-in">
         <span class="availability-dot"></span>
         <span>${d.availabilityText || 'Available for Opportunities'}</span>
       </div>`
    : '';

  // Tech badges
  const techBadgesHTML = (d.techBadges && d.techBadges.length)
    ? `<div class="hero-tech-badges" data-animation="fade-up">
         ${d.techBadges.map(badge => `<span class="tech-badge">${badge}</span>`).join('')}
       </div>`
    : '';

  // Social links
  const socialLinksHTML = socials.length
    ? `<div class="hero-social-links" data-animation="fade-up">
         ${socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hero-social-link" aria-label="${s.platform}">${getIcon(s.icon)}</a>`).join('')}
       </div>`
    : '';

  // Buttons
  const contactBtn = `<a href="#contact" class="btn btn-primary hero-btn">${getIcon('email')} Let's Work Together</a>`;
  const projectsBtn = `<a href="#projects" class="btn btn-secondary hero-btn">${getIcon('code')} Explore My Work</a>`;
  const cvBtn = d.cv
    ? `<a href="${d.cv}" class="btn btn-ghost hero-btn" download>${getIcon('download')} Download CV</a>`
    : '';

  // Profile image with graceful fallback to initials placeholder
  const profileHTML = d.profileImage
    ? `<div class="hero-image-wrapper" data-animation="fade-left">
         <div class="hero-image-container">
           <img src="${d.profileImage}" alt="Photo of ${d.name}" class="hero-image" loading="eager" onerror="this.onerror=null; this.parentElement.classList.add('hero-image-placeholder'); this.parentElement.innerHTML='<span class=\\'hero-placeholder-initials\\'>${d.initials || 'YN'}</span><div class=\\'hero-image-decoration\\'></div>';" />
           <div class="hero-image-decoration"></div>
         </div>
       </div>`
    : `<div class="hero-image-wrapper" data-animation="fade-left">
         <div class="hero-image-container hero-image-placeholder">
           <span class="hero-placeholder-initials">${d.initials || 'YN'}</span>
           <div class="hero-image-decoration"></div>
         </div>
       </div>`;

  container.innerHTML = `
    <div class="hero-content">
      <div class="hero-left" data-animation="fade-right">
        <div class="hero-greeting" data-animation="fade-down">
          <span class="greeting-badge">👋 Hello, I'm</span>
        </div>
        <h1 class="hero-name">
          ${d.firstName || ''} <span class="accent">${d.lastName || ''}</span>
        </h1>
        <div class="hero-typing-wrapper">
          <span class="hero-typing" id="typing-container"></span>
          <span class="typing-cursor"></span>
        </div>
        <p class="hero-intro">${d.introduction || ''}</p>
        <div class="hero-buttons">
          ${contactBtn}
          ${projectsBtn}
          ${cvBtn}
        </div>
        ${availabilityHTML}
        ${techBadgesHTML}
        ${socialLinksHTML}
      </div>
      <div class="hero-right">
        ${profileHTML}
      </div>
    </div>
    <div class="scroll-indicator" data-animation="fade-up" aria-hidden="true">
      <span class="scroll-text">Scroll Down</span>
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  3. ABOUT
 * ────────────────────────────────────────────── */
function renderAbout() {
  if (!isSectionEnabled('about') || !portfolioData.about || !portfolioData.about.enabled) return;
  const container = document.getElementById('about-content');
  if (!container) return;

  const d = portfolioData.about;
  const personal = portfolioData.personal;
  const stats = portfolioData.statistics || [];
  const hasImage = Boolean(personal.aboutImage);

  // About image with graceful fallback
  const imageHTML = hasImage
    ? `<div class="about-image-wrapper" data-animation="fade-right">
         <div class="about-image-container">
           <img src="${personal.aboutImage}" alt="About ${personal.name}" class="about-image" loading="lazy" onerror="this.onerror=null; const w=this.closest('.about-image-wrapper'); if(w) w.style.display='none'; const g=this.closest('.about-grid'); if(g) g.classList.add('no-image');" />
           <div class="about-image-decoration"></div>
         </div>
       </div>`
    : '';

  // Paragraphs
  const paragraphsHTML = (d.paragraphs || []).map(p =>
    `<p class="about-paragraph">${p}</p>`
  ).join('');

  // Highlights
  const highlightsHTML = (d.highlights && d.highlights.length)
    ? `<div class="about-highlights" data-animation="fade-up">
         ${d.highlights.map((h, i) => `
           <div class="highlight-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
             <div class="highlight-icon">${getIcon(h.icon)}</div>
             <h4 class="highlight-title">${h.title}</h4>
             <p class="highlight-description">${h.description}</p>
           </div>
         `).join('')}
       </div>`
    : '';

  // Statistics
  const statsHTML = stats.length
    ? `<div class="about-statistics" data-animation="fade-up">
         ${stats.map((s, i) => `
           <div class="stat-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
             <div class="stat-value">
               <span class="counter" data-target="${s.value}">0</span>${s.suffix || ''}
             </div>
             <div class="stat-label">${s.label}</div>
           </div>
         `).join('')}
       </div>`
    : '';

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">Get To Know Me</span>
      <h2 class="section-title">About <span class="accent">Me</span></h2>
      <div class="section-divider"></div>
    </div>
    <div class="about-grid ${hasImage ? '' : 'no-image'}">
      ${imageHTML}
      <div class="about-text" data-animation="fade-left">
        ${paragraphsHTML}
        <div class="about-cta" data-animation="fade-up">
          <a href="#contact" class="btn btn-primary">${getIcon('email')} Let's Talk</a>
        </div>
      </div>
    </div>
    ${highlightsHTML}
    ${statsHTML}
  `;
}


/* ──────────────────────────────────────────────
 *  4. EDUCATION
 * ────────────────────────────────────────────── */
function renderEducation() {
  if (!isSectionEnabled('education') || !portfolioData.education || !portfolioData.education.enabled) return;
  const container = document.getElementById('education-content');
  if (!container) return;

  const items = portfolioData.education.items || [];

  let timelineHTML;
  if (items.length === 0) {
    timelineHTML = `
      <div class="empty-placeholder" data-animation="fade-up">
        <p class="empty-text">Education details coming soon.</p>
      </div>`;
  } else {
    timelineHTML = `
      <div class="timeline">
        ${items.map((item, i) => `
          <div class="timeline-item animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.15}s">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                ${item.logo ? `<img src="${item.logo}" alt="${item.institution}" class="timeline-logo" loading="lazy" />` : ''}
                <div class="timeline-info">
                  <h3 class="timeline-title">${item.degree || ''}</h3>
                  <span class="timeline-subtitle">${item.institution || ''}</span>
                  ${item.field ? `<span class="timeline-field">${item.field}</span>` : ''}
                </div>
              </div>
              <div class="timeline-date">
                <span>${item.startDate || ''}${item.endDate ? ` — ${item.endDate}` : ''}</span>
              </div>
              ${item.grade ? `<div class="timeline-grade"><strong>Grade:</strong> ${item.grade}</div>` : ''}
              ${item.description ? `<p class="timeline-description">${item.description}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">My Academic Background</span>
      <h2 class="section-title">Education</h2>
      <div class="section-divider"></div>
    </div>
    ${timelineHTML}
  `;
}


/* ──────────────────────────────────────────────
 *  5. EXPERIENCE
 * ────────────────────────────────────────────── */
function renderExperience() {
  if (!isSectionEnabled('experience') || !portfolioData.experience || !portfolioData.experience.enabled) return;
  const container = document.getElementById('experience-content');
  if (!container) return;

  const items = portfolioData.experience.items || [];

  let timelineHTML;
  if (items.length === 0) {
    timelineHTML = `
      <div class="empty-placeholder" data-animation="fade-up">
        <p class="empty-text">Work experience details coming soon.</p>
      </div>`;
  } else {
    timelineHTML = `
      <div class="timeline">
        ${items.map((item, i) => {
          const techHTML = (item.technologies && item.technologies.length)
            ? `<div class="timeline-technologies">
                 ${item.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
               </div>`
            : '';
          const responsibilitiesHTML = (item.responsibilities && item.responsibilities.length)
            ? `<ul class="timeline-list">
                 ${item.responsibilities.map(r => `<li>${r}</li>`).join('')}
               </ul>`
            : '';
          const achievementsHTML = (item.achievements && item.achievements.length)
            ? `<div class="timeline-achievements">
                 <strong>Achievements:</strong>
                 <ul class="timeline-list">
                   ${item.achievements.map(a => `<li>${getIcon('check')} ${a}</li>`).join('')}
                 </ul>
               </div>`
            : '';

          return `
            <div class="timeline-item ${item.current ? 'timeline-current' : ''} animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.15}s">
              <div class="timeline-marker ${item.current ? 'marker-current' : ''}"></div>
              <div class="timeline-content">
                <div class="timeline-header">
                  ${item.logo ? `<img src="${item.logo}" alt="${item.company}" class="timeline-logo" loading="lazy" />` : ''}
                  <div class="timeline-info">
                    <h3 class="timeline-title">${item.title || ''}</h3>
                    <span class="timeline-subtitle">${item.company || ''}</span>
                    ${item.type ? `<span class="timeline-type">${item.type}</span>` : ''}
                  </div>
                  ${item.current ? '<span class="current-badge">Current</span>' : ''}
                </div>
                <div class="timeline-date">
                  <span>${item.startDate || ''}${item.current ? ' — Present' : (item.endDate ? ` — ${item.endDate}` : '')}</span>
                </div>
                ${item.description ? `<p class="timeline-description">${item.description}</p>` : ''}
                ${responsibilitiesHTML}
                ${achievementsHTML}
                ${techHTML}
              </div>
            </div>
          `;
        }).join('')}
      </div>`;
  }

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">Where I've Worked</span>
      <h2 class="section-title">Work <span class="accent">Experience</span></h2>
      <div class="section-divider"></div>
    </div>
    ${timelineHTML}
  `;
}


/* ──────────────────────────────────────────────
 *  6. SKILLS
 * ────────────────────────────────────────────── */
function renderSkills() {
  if (!isSectionEnabled('skills') || !portfolioData.skills || !portfolioData.skills.enabled) return;
  const container = document.getElementById('skills-content');
  if (!container) return;

  const categories = portfolioData.skills.categories || [];
  if (categories.length === 0) return;

  // Filter buttons
  const filtersHTML = `
    <div class="filter-buttons skill-filters" data-animation="fade-up">
      <button class="filter-btn active" data-filter="all">All Skills</button>
      ${categories.map(cat =>
        `<button class="filter-btn" data-filter="${cat.id}">${cat.name}</button>`
      ).join('')}
    </div>`;

  // Skill cards grouped by category
  const cardsHTML = categories.map((cat, ci) => `
    <div class="skill-category" data-category="${cat.id}" data-animation="fade-up" style="animation-delay: ${ci * 0.1}s">
      <h3 class="skill-category-title">${cat.name}</h3>
      <div class="skills-grid">
        ${cat.skills.map((skill, si) => `
          <div class="skill-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${(ci * cat.skills.length + si) * 0.05}s">
            <div class="skill-icon">${getIcon(skill.icon)}</div>
            <span class="skill-name">${skill.name}</span>
            ${skill.proficiency !== undefined ? `
              <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.proficiency}%;" data-progress="${skill.proficiency}"></div>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">What I Work With</span>
      <h2 class="section-title">Skills & <span class="accent">Technologies</span></h2>
      <div class="section-divider"></div>
    </div>
    ${filtersHTML}
    <div class="skills-categories">
      ${cardsHTML}
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  7. PROJECTS
 * ────────────────────────────────────────────── */
function renderProjects() {
  if (!isSectionEnabled('projects') || !portfolioData.projects || !portfolioData.projects.enabled) return;
  const container = document.getElementById('projects-content');
  if (!container) return;

  const projectData = portfolioData.projects;
  const categories = projectData.categories || [];
  const items = projectData.items || [];

  // Filter buttons
  const filtersHTML = categories.length
    ? `<div class="filter-buttons project-filters" data-animation="fade-up">
         ${categories.map((cat, i) =>
           `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${cat === 'All Projects' ? 'all' : cat}">${cat}</button>`
         ).join('')}
       </div>`
    : '';

  // Project cards
  let cardsHTML;
  if (items.length === 0) {
    cardsHTML = `
      <div class="empty-placeholder" data-animation="fade-up">
        <div class="empty-icon">${getIcon('code')}</div>
        <p class="empty-text">Projects are being curated. Check back soon!</p>
      </div>`;
  } else {
    cardsHTML = `
      <div class="projects-grid">
        ${items.map((proj, i) => {
          const techTags = (proj.technologies || []).map(t => `<span class="tech-tag">${t}</span>`).join('');
          const thumbnailSrc = proj.thumbnail || '';
          const liveBtn = proj.liveUrl
            ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">${getIcon('external')} Live</a>`
            : '';
          const githubBtn = proj.githubUrl
            ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub Repository">${getIcon('github')} Code</a>`
            : '';

          return `
            <div class="project-card animate-on-scroll" data-project-index="${i}" data-category="${proj.category || ''}" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
              <div class="project-thumbnail" data-project-index="${i}">
                ${thumbnailSrc
                  ? `<img src="${thumbnailSrc}" alt="${proj.name}" class="project-image" loading="lazy" />`
                  : `<div class="project-image-placeholder">${getIcon('code')}</div>`
                }
                <div class="project-overlay">
                  <button class="project-details-btn" data-project-index="${i}" aria-label="View project details">
                    ${getIcon('search')} View Details
                  </button>
                </div>
                ${proj.featured ? '<span class="featured-badge">Featured</span>' : ''}
              </div>
              <div class="project-info">
                <h3 class="project-name">${proj.name || ''}</h3>
                <p class="project-description">${proj.shortDescription || ''}</p>
                <div class="project-technologies">${techTags}</div>
                <div class="project-links">
                  ${liveBtn}
                  ${githubBtn}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>`;
  }

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">My Recent Work</span>
      <h2 class="section-title">Featured <span class="accent">Projects</span></h2>
      <div class="section-divider"></div>
    </div>
    ${filtersHTML}
    ${cardsHTML}
  `;
}


/* ──────────────────────────────────────────────
 *  8. CERTIFICATIONS & ACHIEVEMENTS
 * ────────────────────────────────────────────── */
function renderCertifications() {
  if (!isSectionEnabled('certifications') || !portfolioData.certifications || !portfolioData.certifications.enabled) return;
  const container = document.getElementById('certifications-content');
  if (!container) return;

  const certs = portfolioData.certifications.items || [];
  const achievements = portfolioData.certifications.achievements || [];

  // Hide section entirely if both are empty
  if (certs.length === 0 && achievements.length === 0) {
    const section = container.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  // Certification cards
  const certsHTML = certs.length
    ? `<div class="certifications-grid">
         ${certs.map((cert, i) => `
           <div class="cert-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
             ${cert.image
               ? `<div class="cert-image-wrapper">
                    <img src="${cert.image}" alt="${cert.title}" class="cert-image lightbox-trigger" loading="lazy" data-full="${cert.image}" />
                  </div>`
               : ''}
             <div class="cert-info">
               <h3 class="cert-title">${cert.title || ''}</h3>
               <p class="cert-org">${cert.organization || ''}</p>
               <span class="cert-date">${cert.date || ''}</span>
               ${cert.credentialId ? `<span class="cert-credential">ID: ${cert.credentialId}</span>` : ''}
               ${cert.description ? `<p class="cert-description">${cert.description}</p>` : ''}
               ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-verify">${getIcon('external')} Verify</a>` : ''}
             </div>
           </div>
         `).join('')}
       </div>`
    : '';

  // Achievement cards
  const achieveHTML = achievements.length
    ? `<div class="achievements-section">
         <h3 class="subsection-title" data-animation="fade-up">Achievements</h3>
         <div class="achievements-grid">
           ${achievements.map((a, i) => `
             <div class="achievement-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
               <div class="achievement-icon">${getIcon('star')}</div>
               <div class="achievement-info">
                 <h4 class="achievement-title">${a.title || ''}</h4>
                 ${a.type ? `<span class="achievement-type">${a.type}</span>` : ''}
                 <p class="achievement-org">${a.organization || ''}</p>
                 <span class="achievement-date">${a.date || ''}</span>
                 ${a.description ? `<p class="achievement-description">${a.description}</p>` : ''}
               </div>
             </div>
           `).join('')}
         </div>
       </div>`
    : '';

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">My Credentials</span>
      <h2 class="section-title">Certifications & <span class="accent">Achievements</span></h2>
      <div class="section-divider"></div>
    </div>
    ${certsHTML}
    ${achieveHTML}
  `;
}


/* ──────────────────────────────────────────────
 *  9. SERVICES
 * ────────────────────────────────────────────── */
function renderServices() {
  if (!isSectionEnabled('services') || !portfolioData.services || !portfolioData.services.enabled) return;
  const container = document.getElementById('services-content');
  if (!container) return;

  const items = portfolioData.services.items || [];
  if (items.length === 0) return;

  const cardsHTML = items.map((s, i) => `
    <div class="service-card animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.1}s">
      <div class="service-icon">${getIcon(s.icon)}</div>
      <h3 class="service-title">${s.name || ''}</h3>
      <p class="service-description">${s.description || ''}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">What I Offer</span>
      <h2 class="section-title">My <span class="accent">Services</span></h2>
      <div class="section-divider"></div>
    </div>
    <div class="services-grid">
      ${cardsHTML}
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  10. PROCESS
 * ────────────────────────────────────────────── */
function renderProcess() {
  if (!isSectionEnabled('process') || !portfolioData.process || !portfolioData.process.enabled) return;
  const container = document.getElementById('process-content');
  if (!container) return;

  const steps = portfolioData.process.steps || [];
  if (steps.length === 0) return;

  const stepsHTML = steps.map((step, i) => `
    <div class="process-step animate-on-scroll" data-animation="fade-up" style="animation-delay: ${i * 0.12}s">
      <div class="process-number">${step.number || (i + 1).toString().padStart(2, '0')}</div>
      <h3 class="process-title">${step.title || ''}</h3>
      <p class="process-description">${step.description || ''}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">How I Work</span>
      <h2 class="section-title">Development <span class="accent">Process</span></h2>
      <div class="section-divider"></div>
    </div>
    <div class="process-grid">
      ${stepsHTML}
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  11. TESTIMONIALS
 * ────────────────────────────────────────────── */
function renderTestimonials() {
  if (!isSectionEnabled('testimonials') || !portfolioData.testimonials || !portfolioData.testimonials.enabled) return;
  const container = document.getElementById('testimonials-content');
  if (!container) return;

  const items = portfolioData.testimonials.items || [];

  // Hide section completely if no items
  if (items.length === 0) {
    const section = container.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  // Build star ratings
  const renderStars = (rating) => {
    if (!rating) return '';
    let html = '<div class="testimonial-rating">';
    for (let s = 1; s <= 5; s++) {
      html += s <= rating ? getIcon('star') : getIcon('starEmpty');
    }
    html += '</div>';
    return html;
  };

  const slidesHTML = items.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="testimonial-card">
        <div class="testimonial-quote">${getIcon('quote')}</div>
        <p class="testimonial-text">${t.content || ''}</p>
        ${renderStars(t.rating)}
        <div class="testimonial-author">
          ${t.image
            ? `<img src="${t.image}" alt="${t.name}" class="testimonial-avatar" loading="lazy" />`
            : `<div class="testimonial-avatar-placeholder">${(t.name || '?')[0]}</div>`
          }
          <div class="testimonial-author-info">
            <strong class="testimonial-name">${t.name || ''}</strong>
            <span class="testimonial-position">${t.position || ''}${t.company ? ` at ${t.company}` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const dotsHTML = items.length > 1
    ? `<div class="testimonial-dots">
         ${items.map((_, i) => `<button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`).join('')}
       </div>`
    : '';

  const navHTML = items.length > 1
    ? `<button class="slider-btn slider-prev" aria-label="Previous testimonial">${getIcon('chevronLeft')}</button>
       <button class="slider-btn slider-next" aria-label="Next testimonial">${getIcon('chevronRight')}</button>`
    : '';

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">What People Say</span>
      <h2 class="section-title">Client <span class="accent">Testimonials</span></h2>
      <div class="section-divider"></div>
    </div>
    <div class="testimonial-slider" data-animation="fade-up">
      <div class="testimonial-track">
        ${slidesHTML}
      </div>
      ${navHTML}
      ${dotsHTML}
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  12. CONTACT
 * ────────────────────────────────────────────── */
function renderContact() {
  if (!isSectionEnabled('contact')) return;
  const container = document.getElementById('contact-content');
  if (!container) return;

  const c = portfolioData.contact || {};
  const personal = portfolioData.personal;

  // Contact info cards — only render those that have values
  const contactMethods = [];
  if (c.email) {
    contactMethods.push(`
      <div class="contact-card" data-animation="fade-up">
        <div class="contact-card-icon">${getIcon('email')}</div>
        <h4 class="contact-card-title">Email</h4>
        <a href="mailto:${c.email}" class="contact-card-value">${c.email}</a>
        <button class="copy-email-btn" data-email="${c.email}" aria-label="Copy email address">
          ${getIcon('copy')} Copy
        </button>
      </div>`);
  }
  if (c.phone) {
    contactMethods.push(`
      <div class="contact-card" data-animation="fade-up" style="animation-delay: 0.1s">
        <div class="contact-card-icon">${getIcon('phone')}</div>
        <h4 class="contact-card-title">Phone</h4>
        <a href="tel:${c.phone.replace(/\s/g, '')}" class="contact-card-value">${c.phone}</a>
      </div>`);
  }
  if (c.whatsapp) {
    const waNumber = c.whatsapp.replace(/[^0-9]/g, '');
    contactMethods.push(`
      <div class="contact-card" data-animation="fade-up" style="animation-delay: 0.2s">
        <div class="contact-card-icon">${getIcon('whatsapp')}</div>
        <h4 class="contact-card-title">WhatsApp</h4>
        <a href="https://wa.me/${waNumber}" target="_blank" rel="noopener noreferrer" class="contact-card-value">${c.whatsapp}</a>
      </div>`);
  }
  if (c.location) {
    contactMethods.push(`
      <div class="contact-card" data-animation="fade-up" style="animation-delay: 0.3s">
        <div class="contact-card-icon">${getIcon('location')}</div>
        <h4 class="contact-card-title">Location</h4>
        <span class="contact-card-value">${c.location}</span>
      </div>`);
  }

  // Social links inside contact cards
  const socials = getActiveSocialLinks();
  if (socials.length) {
    contactMethods.push(`
      <div class="contact-card contact-card-socials" data-animation="fade-up" style="animation-delay: 0.4s">
        <h4 class="contact-card-title">Connect With Me</h4>
        <div class="contact-social-links">
          ${socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="contact-social-link" aria-label="${s.platform}">${getIcon(s.icon)}</a>`).join('')}
        </div>
      </div>`);
  }

  const contactCardsHTML = contactMethods.length
    ? `<div class="contact-cards">${contactMethods.join('')}</div>`
    : '';

  // Contact form
  const formHTML = `
    <div class="contact-form-wrapper" data-animation="fade-left">
      <form class="contact-form" id="contact-form" novalidate>
        <div class="form-group">
          <label for="contact-name" class="form-label">Full Name *</label>
          <input type="text" id="contact-name" name="name" class="form-input" placeholder="Your full name" required aria-required="true" />
          <span class="form-error" id="name-error"></span>
        </div>
        <div class="form-group">
          <label for="contact-email" class="form-label">Email Address *</label>
          <input type="email" id="contact-email" name="email" class="form-input" placeholder="your@email.com" required aria-required="true" />
          <span class="form-error" id="email-error"></span>
        </div>
        <div class="form-group">
          <label for="contact-subject" class="form-label">Subject</label>
          <input type="text" id="contact-subject" name="subject" class="form-input" placeholder="What's this about?" />
        </div>
        <div class="form-group">
          <label for="contact-message" class="form-label">Message *</label>
          <textarea id="contact-message" name="message" class="form-input form-textarea" placeholder="Your message..." rows="5" required aria-required="true"></textarea>
          <span class="form-error" id="message-error"></span>
        </div>
        <button type="submit" class="btn btn-primary form-submit" id="form-submit">
          ${getIcon('email')} Send Message
        </button>
      </form>
    </div>`;

  container.innerHTML = `
    <div class="section-header" data-animation="fade-down">
      <span class="section-tag">Get In Touch</span>
      <h2 class="section-title">Contact <span class="accent">Me</span></h2>
      <div class="section-divider"></div>
    </div>
    <div class="contact-grid">
      ${contactCardsHTML}
      ${formHTML}
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  13. FOOTER
 * ────────────────────────────────────────────── */
function renderFooter() {
  const container = document.getElementById('footer-content');
  if (!container) return;

  const d = portfolioData.personal;
  const socials = getActiveSocialLinks();
  const sections = portfolioData.sections || {};

  // Quick links — only active enabled sections
  const quickLinkItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ].filter(item => isSectionActive(item.id));

  const quickLinksHTML = quickLinkItems.map(item =>
    `<a href="#${item.id}" class="footer-link">${item.label}</a>`
  ).join('');

  // Social icons
  const socialHTML = socials.length
    ? `<div class="footer-social">
         ${socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="${s.platform}">${getIcon(s.icon)}</a>`).join('')}
       </div>`
    : '';

  container.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#home" class="footer-logo">
          <span class="logo-initials">${d.initials || ''}</span><span class="logo-dot">.</span>
          <span class="footer-name">${d.name || ''}</span>
        </a>
        <p class="footer-statement">${d.brandStatement || ''}</p>
        ${socialHTML}
      </div>
      <div class="footer-links">
        <h4 class="footer-heading">Quick Links</h4>
        <div class="footer-links-list">
          ${quickLinksHTML}
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copyright">
        &copy; ${new Date().getFullYear()} ${d.name || ''}. All rights reserved.
      </p>
    </div>
  `;
}


/* ──────────────────────────────────────────────
 *  14. SOCIAL DOCK (fixed side dock)
 * ────────────────────────────────────────────── */
function renderSocialDock() {
  const socials = getActiveSocialLinks();
  if (socials.length === 0) return;

  const container = document.getElementById('social-dock');
  if (!container) return;

  container.innerHTML = `
    <div class="social-dock-links">
      ${socials.map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-dock-link" aria-label="${s.platform}" data-tooltip="${s.platform}">
           ${getIcon(s.icon)}
         </a>`
      ).join('')}
    </div>
    <div class="social-dock-line"></div>
  `;
}


/* ═══════════════════════════════════════════════
 *  15. MASTER INIT — called by main.js
 * ═══════════════════════════════════════════════ */

/**
 * Renders all portfolio sections into the DOM, then returns
 * so main.js can follow up with animations / interactions.
 */
function initPortfolio() {
  renderNavbar();
  renderHero();
  renderAbout();
  renderEducation();
  renderExperience();
  renderSkills();
  renderProjects();
  renderCertifications();
  renderServices();
  renderProcess();
  renderTestimonials();
  renderContact();
  renderFooter();
  renderSocialDock();
}
