/**
 * ROUGHCLICK DIGITAL - Concept 2 (Modern Digital) App Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.modern-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Drawer Navigation
  const toggleBtn = document.querySelector('.mobile-nav-toggle-modern');
  const drawer = document.querySelector('.mobile-drawer-modern');
  const backdrop = document.querySelector('.mobile-drawer-backdrop-modern');
  const closeBtn = document.querySelector('.mobile-drawer-close-modern');

  function toggleMobile(open) {
    if (drawer && backdrop) {
      if (open) {
        drawer.style.right = '0';
        backdrop.style.opacity = '1';
        backdrop.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
      } else {
        drawer.style.right = '-100%';
        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
        document.body.style.overflow = '';
      }
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', () => toggleMobile(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMobile(false));
  if (backdrop) backdrop.addEventListener('click', () => toggleMobile(false));

  // 3. Blog Filter & Search
  const searchInput = document.getElementById('modernBlogSearch');
  const catButtons = document.querySelectorAll('.modern-cat-btn');
  const blogCards = document.querySelectorAll('.modern-blog-item');

  function runFilter() {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeBtn = document.querySelector('.modern-cat-btn.active');
    const cat = activeBtn ? activeBtn.dataset.category : 'all';

    blogCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const cardCat = card.dataset.category || '';
      const matchQ = q === '' || text.includes(q);
      const matchCat = cat === 'all' || cardCat === cat;

      card.style.display = (matchQ && matchCat) ? 'flex' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', runFilter);
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = 'var(--rc-deep-teal)';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--rc-deep-teal)';
      btn.style.color = '#FFFFFF';
      runFilter();
    });
  });

  // 4. Modal Article Reader
  const readButtons = document.querySelectorAll('.btn-read-modern');
  const modal = document.getElementById('modernArticleModal');
  const modalBody = document.getElementById('modernModalBody');
  const modalClose = document.getElementById('modernModalClose');

  if (readButtons.length > 0 && modal && modalBody) {
    readButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.blogId;
        const post = window.RC_DATA?.blogs.find(b => b.id === id);
        if (post) {
          modalBody.innerHTML = `
            <div style="border-bottom:1px solid #E2E8F0; padding-bottom:16px; margin-bottom:16px;">
              <span class="modern-badge">${post.category}</span>
              <h2 style="font-size:1.6rem; color:var(--rc-deep-teal); margin-top:10px; margin-bottom:6px;">${post.title}</h2>
              <div style="font-size:0.82rem; color:var(--rc-slate-light);">
                By ${post.author} • ${post.date} • ${post.readTime}
              </div>
            </div>
            <div style="line-height:1.75; color:var(--rc-slate); font-size:0.95rem;">
              ${post.content}
            </div>
          `;
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('modernContactForm');
  const formStatus = document.getElementById('modernFormStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
        formStatus.innerHTML = `
          <div style="padding:14px; border-radius:6px; background:var(--rc-teal-light); border:1px solid var(--rc-teal-accent); color:var(--rc-deep-teal); margin-top:14px; font-size:0.9rem;">
            <strong>Inquiry Received Successfully.</strong><br>
            Our Coimbatore solutions team will evaluate your requirements and reach out within 24 hours.
          </div>
        `;
        contactForm.reset();
      }, 900);
    });
  }

  // 6. Admin Blog Publishing Simulation
  const publishForm = document.getElementById('modernPublishForm');
  const livePreviewArea = document.getElementById('modernLivePreview');
  const postList = document.getElementById('modernPostList');

  if (publishForm && livePreviewArea) {
    const titleIn = document.getElementById('mTitle');
    const catIn = document.getElementById('mCategory');
    const contentIn = document.getElementById('mContent');

    function updateLive() {
      const t = titleIn.value || 'Untitled Article';
      const c = catIn.value || 'General';
      const body = contentIn.value || 'Live preview will display content here...';

      livePreviewArea.innerHTML = `
        <div style="border-bottom:1px solid #E2E8F0; padding-bottom:12px; margin-bottom:12px;">
          <span class="modern-badge">${c}</span>
          <h3 style="font-size:1.35rem; color:var(--rc-deep-teal); margin-top:8px;">${t}</h3>
          <div style="font-size:0.75rem; color:var(--rc-slate-light);">Live Preview Mode</div>
        </div>
        <div style="color:var(--rc-slate); line-height:1.6; font-size:0.9rem;">
          ${body.replace(/\\n/g, '<br>')}
        </div>
      `;
    }

    if (titleIn) titleIn.addEventListener('input', updateLive);
    if (catIn) catIn.addEventListener('change', updateLive);
    if (contentIn) contentIn.addEventListener('input', updateLive);

    publishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = titleIn.value;
      const c = catIn.value;

      const item = document.createElement('div');
      item.style.cssText = "padding:12px; background:#FFFFFF; border:1px solid #E2E8F0; border-radius:6px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;";
      item.innerHTML = `
        <div>
          <div style="font-weight:600; color:var(--rc-deep-teal); font-size:0.9rem;">${t}</div>
          <div style="font-size:0.75rem; color:var(--rc-slate-light);">${c} • Just Now</div>
        </div>
        <span class="modern-badge" style="font-size:0.7rem; padding:2px 8px;">Published</span>
      `;

      if (postList) postList.prepend(item);
      alert('Article published to CMS stage successfully! (UI Simulation)');
      publishForm.reset();
      updateLive();
    });
  }
});
