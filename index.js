const $ = (s, c=document) => c.querySelector(s);
    const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

    const progress = $('#progress');
    const nav = $('#nav');
    const burger = $('#burger');
    const mobile = $('#mobile');
    const toTop = $('#toTop');

    // Year
    $('#year').textContent = new Date().getFullYear();

    // Navbar background on scroll
    function onScroll(){
      const st = document.documentElement.scrollTop;
      if(st > 8) nav.classList.add('navbar-bg'); else nav.classList.remove('navbar-bg');

      const h = document.documentElement;
      const prog = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = prog + '%';

      if(st > 300) toTop.classList.add('show'); else toTop.classList.remove('show');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu toggle
    burger.addEventListener('click', ()=> mobile.classList.toggle('open'));
    $$('#mobile a').forEach(a=> a.addEventListener('click', ()=> mobile.classList.remove('open')));

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:.15, rootMargin:'0px 0px -40px 0px' });
    $$('.reveal').forEach(el=> io.observe(el));

    // Scrollspy — update active nav link
    const sections = ['home','about','services','work','pricing','contact'].map(id=> document.getElementById(id));
    const spy = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = entry.target.id;
          $$('.links a').forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
      });
    }, { threshold:.6 });
    sections.forEach(sec=> spy.observe(sec));

    // Back to top button
    toTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));