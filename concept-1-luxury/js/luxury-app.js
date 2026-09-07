/**
 * ROUGHCLICK DIGITAL - Concept 1 (Luxury Digital) App Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Handler
  const header = document.querySelector('.luxury-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Drawer Navigation
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  function toggleMobileMenu(open) {
    if (drawer && backdrop) {
      if (open) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleMobileMenu(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleMobileMenu(false));
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // 3. Blog Search & Filter (for blog.html)
  const searchInput = document.getElementById('blogSearch');
  const categoryFilters = document.querySelectorAll('.cat-filter-btn');
  const blogCards = document.querySelectorAll('.luxury-blog-post-card');

  if (searchInput || categoryFilters.length > 0) {
    function filterArticles() {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const activeCatBtn = document.querySelector('.cat-filter-btn.active');
      const activeCategory = activeCatBtn ? activeCatBtn.dataset.category : 'all';

      blogCards.forEach(card => {
        const title = card.querySelector('.blog-card-title')?.innerText.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-card-excerpt')?.innerText.toLowerCase() || '';
        const cardCat = card.dataset.category || '';

        const matchesQuery = query === '' || title.includes(query) || excerpt.includes(query);
        const matchesCategory = activeCategory === 'all' || cardCat === activeCategory;

        if (matchesQuery && matchesCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterArticles);
    }

    categoryFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterArticles();
      });
    });
  }

  // 4. Interactive Article Reader Modal
  const readButtons = document.querySelectorAll('.btn-read-article');
  const articleModal = document.getElementById('articleModal');
  const modalBody = document.getElementById('articleModalBody');
  const modalClose = document.getElementById('articleModalClose');

  if (readButtons.length > 0 && articleModal && modalBody) {
    readButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = btn.dataset.blogId;
        const post = window.RC_DATA?.blogs.find(b => b.id === blogId);
        if (post) {
          modalBody.innerHTML = `
            <div class="modal-article-header">
              <span class="luxury-tag">${post.category}</span>
              <h2 class="modal-article-title" style="margin-top:14px; margin-bottom:10px;">${post.title}</h2>
              <div class="blog-meta">
                <span>By ${post.author}</span> • <span>${post.date}</span> • <span>${post.readTime}</span>
              </div>
            </div>
            <div class="modal-article-content" style="margin-top:24px; line-height:1.8; color:var(--rc-ivory-dim);">
              ${post.content}
            </div>
          `;
          articleModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        articleModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) {
        articleModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Contact Form Handler (Lead-Gen)
  const contactForm = document.getElementById('rcContactForm');
  const formStatus = document.getElementById('contactFormStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Inquiry...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.innerHTML = `
          <div style="padding:16px; border-radius:6px; background:rgba(201,162,39,0.15); border:1px solid var(--rc-gold); color:var(--rc-ivory); margin-top:16px;">
            <strong style="color:var(--rc-gold);">Inquiry Submitted Successfully.</strong><br>
            Thank you for reaching out to RoughClick Digital. Our solutions team will review your requirements and respond within 24 business hours.
          </div>
        `;
        contactForm.reset();
      }, 1000);
    });
  }

  // 6. Admin Blog Publishing Simulation (for admin-blog.html)
  const publishForm = document.getElementById('adminPublishForm');
  const livePreviewArea = document.getElementById('adminLivePreview');
  const adminPostList = document.getElementById('adminPostList');

  if (publishForm && livePreviewArea) {
    const titleInput = document.getElementById('postTitle');
    const catInput = document.getElementById('postCategory');
    const contentInput = document.getElementById('postContent');

    function updatePreview() {
      const title = titleInput.value || 'Untitled Article Title';
      const cat = catInput.value || 'General';
      const content = contentInput.value || 'Article draft content will appear here in real-time...';

      livePreviewArea.innerHTML = `
        <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px; margin-bottom:16px;">
          <span class="luxury-tag">${cat}</span>
          <h3 style="font-size:1.6rem; margin-top:12px; margin-bottom:8px;">${title}</h3>
          <div style="font-size:0.8rem; color:var(--rc-warm-grey);">Draft Preview • Live Editor</div>
        </div>
        <div style="line-height:1.7; color:var(--rc-ivory-dim); font-size:0.95rem;">
          ${content.replace(/\\n/g, '<br>')}
        </div>
      `;
    }

    if (titleInput) titleInput.addEventListener('input', updatePreview);
    if (catInput) catInput.addEventListener('change', updatePreview);
    if (contentInput) contentInput.addEventListener('input', updatePreview);

    publishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const cat = catInput.value;
      
      const newPostItem = document.createElement('div');
      newPostItem.style.cssText = "padding:14px; background:var(--rc-surface-card); border:1px solid var(--rc-gold-border); border-radius:6px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;";
      newPostItem.innerHTML = `
        <div>
          <div style="font-weight:600; color:var(--rc-ivory); font-size:0.95rem;">${title}</div>
          <div style="font-size:0.75rem; color:var(--rc-gold);">${cat} • Published Just Now</div>
        </div>
        <span style="font-size:0.75rem; background:rgba(201,162,39,0.2); color:var(--rc-gold); padding:3px 8px; border-radius:4px;">Published</span>
      `;

      if (adminPostList) {
        adminPostList.prepend(newPostItem);
      }

      alert('Article published to CMS stage successfully! (UI Simulation)');
      publishForm.reset();
      updatePreview();
    });
  }
});
