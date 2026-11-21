/**
 * ============================================================
 *  MAIN APPLICATION ENTRY POINT
 * ============================================================
 *  
 *  Coordinates the startup sequence:
 *  1. Ensures theme is properly set before layout
 *  2. Updates dynamic SEO meta tags from portfolioData
 *  3. Injects JSON-LD structured data for search engines
 *  4. Calls initPortfolio() from components.js to render markup
 *  5. Calls initAnimations() from animations.js to attach behaviors
 *  
 * ============================================================
 */

(function() {
  'use strict';

  /**
   * Updates document title and meta tags based on portfolioData.seo
   */
  function setupSEO() {
    if (typeof portfolioData === 'undefined') return;

    const seo = portfolioData.seo || {};
    const personal = portfolioData.personal || {};

    const pageTitle = seo.title || `${personal.name || 'Developer'} — Portfolio`;
    document.title = pageTitle;

    const setMeta = (selector, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[name="keywords"]', seo.keywords);
    setMeta('meta[name="author"]', personal.name);

    // Open Graph
    setMeta('meta[property="og:title"]', seo.title || pageTitle);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:image"]', seo.ogImage);
    setMeta('meta[property="og:url"]', seo.canonicalUrl || window.location.href);

    // Twitter
    setMeta('meta[name="twitter:title"]', seo.title || pageTitle);
    setMeta('meta[name="twitter:description"]', seo.description);
    setMeta('meta[name="twitter:image"]', seo.ogImage);
    if (seo.twitterHandle) {
      setMeta('meta[name="twitter:creator"]', seo.twitterHandle);
    }

    // Canonical link
    if (seo.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', seo.canonicalUrl);
    }

    // Invert/Update Favicon initials if possible
    injectStructuredData(personal, seo);
  }

  /**
   * Injects Schema.org JSON-LD structured data for rich search results
   */
  function injectStructuredData(personal, seo) {
    if (!personal || !personal.name || personal.name === 'Your Name') return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': personal.name,
      'jobTitle': personal.professionalTitle || 'Software Developer',
      'description': seo.description || personal.introduction || '',
      'image': personal.profileImage || undefined,
      'url': seo.canonicalUrl || window.location.href,
      'sameAs': []
    };

    if (portfolioData.socialLinks) {
      Object.values(portfolioData.socialLinks).forEach(url => {
        if (url && typeof url === 'string' && url.startsWith('http')) {
          schema.sameAs.push(url);
        }
      });
    }

    if (schema.sameAs.length === 0) {
      delete schema.sameAs;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Main Initialization
   */
  function initApp() {
    try {
      // 1. Update SEO
      setupSEO();

      // 2. Render all components from portfolioData
      if (typeof initPortfolio === 'function') {
        initPortfolio();
      } else {
        console.warn('initPortfolio() is not defined.');
      }

      // 3. Attach interactive behaviors and animations
      if (typeof initAnimations === 'function') {
        initAnimations();
      } else {
        console.warn('initAnimations() is not defined.');
      }

    } catch (err) {
      console.error('Portfolio initialization error:', err);
      // Ensure loader disappears even on error
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
