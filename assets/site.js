(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const worlds = {
    'after-dark': { image: 'assets/media/after-dark-film.webp', video: 'assets/media/after-dark-loop.mp4', alt: 'Illustrative editorial footage of an older couple dancing at a private celebration', title: 'After Dark', rhythm: 'electric' },
    stillness: { image: 'assets/media/stillness-film.webp', video: 'assets/media/stillness-loop.mp4', alt: 'Illustrative editorial footage of a grandmother and grandchild preparing food together', title: 'Stillness', rhythm: 'gentle' },
    'off-script': { image: 'assets/media/off-script-film.webp', video: 'assets/media/off-script-loop.mp4', alt: 'Illustrative editorial footage of two people walking along a sunny countryside road', title: 'Off Script', rhythm: 'open' }
  };
  const transformations = {
    'after-dark': {
      alt: 'Illustrative concept: a private joke becomes an electric celebration among old friends',
      steps: [
        ['The voice note they kept for years.', 'A ridiculous recording in an old group chat still makes everyone laugh. That tiny piece of their shared history is our starting point.'],
        ['The private joke becomes the invitation.', 'Its words, rhythm and characters shape the music, the surprises and the way the night unfolds. Nothing would make sense to anyone else.'],
        ['A midnight celebration only this group could have.', 'Old friends step into a world made from their own stories. This is a fictional concept study, not a completed client event.']
      ]
    },
    stillness: {
      alt: 'Illustrative concept: a handwritten family recipe becomes a sunlit meal made together',
      steps: [
        ["Her grandmother's Sunday kitchen.", 'Not a colour scheme. Not a venue brief. A handwritten recipe, a familiar smell and everyone gathered at one table.'],
        ['The recipe becomes something everyone makes.', 'The people who matter take part. The detail turns into a ritual rather than decoration.'],
        ['A private lunch with a story in every place setting.', 'A personal memory becomes a shared world. The images show a fictional creative direction, not photographs of a client event.']
      ]
    },
    'off-script': {
      alt: 'Illustrative concept: a handwritten list of someday places becomes a surprise journey across Spain',
      steps: [
        ['The list of places she called “one day”.', 'A folded note holds the roads, buildings and landscapes she has quietly wanted to see for years.'],
        ['The list becomes a route.', 'A seemingly ordinary departure reveals small, personal clues along the way. Each stop has a reason only she will recognise.'],
        ['A journey with no borrowed itinerary.', 'The final destination is a surprise shaped around her curiosity. This is a fictional concept study, not a completed trip.']
      ]
    }
  };
  const morphVisual = document.querySelector('.morph-visual');
  const morphSteps = [...document.querySelectorAll('.morph-step')];
  const updateTransformation = name => {
    const story = transformations[name];
    if (morphVisual) morphVisual.setAttribute('aria-label', story.alt);
    morphSteps.forEach((element, index) => {
      element.querySelector('h3').textContent = story.steps[index][0];
      element.querySelector('p').textContent = story.steps[index][1];
    });
  };
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('#hero-image');
  const heroVideo = document.querySelector('#hero-video');
  const worldButtons = [...document.querySelectorAll('[data-select-world]')];
  let changeToken = 0;
  let videoToken = 0;
  const syncVideo = name => {
    if (!heroVideo || !hero || reduced.matches || navigator.connection?.saveData) return;
    const token = ++videoToken;
    hero.classList.remove('video-ready');
    heroVideo.pause();
    heroVideo.removeAttribute('src');
    heroVideo.load();
    heroVideo.poster = worlds[name].image;
    heroVideo.oncanplay = () => {
      if (token !== videoToken) return;
      Promise.resolve(heroVideo.play()).then(() => {
        if (token === videoToken) hero.classList.add('video-ready');
      }).catch(() => {});
    };
    heroVideo.onerror = () => { if (token === videoToken) hero.classList.remove('video-ready'); };
    heroVideo.src = worlds[name].video;
    heroVideo.load();
  };
  const validWorld = value => Object.hasOwn(worlds, value) ? value : 'after-dark';
  const setWorld = (requested, initial = false) => {
    const name = validWorld(requested);
    const detail = worlds[name];
    document.body.dataset.world = name;
    updateTransformation(name);
    if (hero) hero.dataset.world = name;
    worldButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.selectWorld === name)));
    try { sessionStorage.setItem('oyw-world', name); } catch (_) {}
    if (!heroImage || heroImage.getAttribute('src') === detail.image) return;
    const token = ++changeToken;
    const replacement = new Image();
    replacement.src = detail.image;
    const commit = () => {
      if (token !== changeToken) return;
      heroImage.src = detail.image;
      heroImage.alt = detail.alt;
      if (hero) hero.classList.remove('is-changing');
      syncVideo(name);
    };
    if (!initial && !reduced.matches && hero) {
      hero.classList.remove('video-ready');
      heroVideo?.pause();
      hero.classList.add('is-changing');
    }
    if (replacement.complete) commit();
    else {
      replacement.onload = commit;
      replacement.onerror = () => { if (hero) hero.classList.remove('is-changing'); };
    }
  };
  worldButtons.forEach(button => button.addEventListener('click', () => setWorld(button.dataset.selectWorld)));
  let savedWorld = 'after-dark';
  try { savedWorld = sessionStorage.getItem('oyw-world') || savedWorld; } catch (_) {}
  setWorld(savedWorld, true);
  if (validWorld(savedWorld) === 'after-dark') syncVideo('after-dark');
  document.addEventListener('visibilitychange', () => {
    if (!heroVideo) return;
    if (document.hidden) heroVideo.pause();
    else if (hero.classList.contains('video-ready') && !reduced.matches) heroVideo.play().catch(() => {});
  });

  const dock = document.querySelector('.world-dock');
  if (dock && hero && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = !entries[0].isIntersecting;
      dock.classList.toggle('visible', visible);
      dock.setAttribute('aria-hidden', String(!visible));
      dock.querySelectorAll('button').forEach(button => { button.tabIndex = visible ? 0 : -1; });
    }, { threshold: .05 });
    observer.observe(hero);
  }

  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    const close = () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) close(); });
  }

  if ('IntersectionObserver' in window && !reduced.matches) {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
    }, { threshold: .08, rootMargin: '0px 0px 50px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
    const morph = document.querySelector('.morph-visual');
    const steps = document.querySelectorAll('.morph-step');
    if (morph && steps.length) {
      const stepObserver = new IntersectionObserver(entries => {
        const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (active) morph.dataset.step = active.target.dataset.step;
      }, { rootMargin: '-20% 0px -35% 0px', threshold: [0,.25,.5,1] });
      steps.forEach(step => stepObserver.observe(step));
    }
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('in-view'));
  }

  const dna = document.querySelector('#dna');
  if (dna) {
    const questions = [
      'What are they wonderfully obsessed with?',
      'What memory keeps coming back?',
      'What would they absolutely hate at an ordinary celebration?',
      'What feeling should the experience leave behind?'
    ];
    const hints = [
      'A tiny habit, a lifelong interest, a very specific thing…',
      'A place, sound, person, meal, or moment…',
      'The things we should happily leave out…',
      'Describe the feeling in your own words…'
    ];
    const answers = ['', '', '', ''];
    const field = dna.querySelector('#dna-answer');
    const question = dna.querySelector('#dna-question');
    const progress = dna.querySelector('#dna-progress');
    const fill = dna.querySelector('#dna-fill');
    const back = dna.querySelector('#dna-back');
    const next = dna.querySelector('#dna-next');
    const edit = dna.querySelector('#dna-edit');
    const questionWrap = dna.querySelector('.dna-question-wrap');
    const result = dna.querySelector('.dna-result');
    const resultText = dna.querySelector('#dna-interpretation');
    const mail = dna.querySelector('#dna-mail');
    const copy = dna.querySelector('#dna-copy');
    const status = dna.querySelector('#dna-status');
    let step = 0;
    const render = () => {
      question.textContent = questions[step];
      field.value = answers[step];
      field.placeholder = hints[step];
      field.setAttribute('aria-label', questions[step]);
      progress.textContent = 'Detail ' + (step + 1) + ' / ' + questions.length;
      fill.style.width = ((step + 1) / questions.length * 100) + '%';
      back.hidden = step === 0;
      next.textContent = step === questions.length - 1 ? 'See the beginning of your idea ↗' : 'Continue ↗';
    };
    const interpretation = () => {
      const [obsession, memory, avoid, feeling] = answers.map(value => value.trim());
      const source = obsession || memory || feeling;
      if (!source) return 'One small detail is enough to begin. Tell us what makes this person themselves and we can imagine where the story might go.';
      const pieces = [];
      if (obsession) pieces.push('The starting point could be ' + obsession + '.');
      if (memory) pieces.push('The memory of ' + memory + ' might shape a setting, a gesture, or an unexpected invitation.');
      if (avoid) pieces.push('We would leave out ' + avoid + '.');
      if (feeling) pieces.push('The lasting note: ' + feeling + '.');
      pieces.push('This is an initial creative reading, not an automated event proposal. Natalia would explore the details with you personally.');
      return pieces.join(' ');
    };
    const draft = () => {
      const lines = ['Hello Natalia,', '', 'I have the beginning of an idea for a personal event or experience:', ''];
      questions.forEach((q,i) => { if (answers[i].trim()) lines.push(q, answers[i].trim(), ''); });
      lines.push('I would love to discuss what this could become.', '', 'My name:', 'Preferred way to reach me:');
      return lines.join('\n');
    };
    next.addEventListener('click', () => {
      answers[step] = field.value.slice(0, 600);
      if (step < questions.length - 1) { step++; render(); field.focus(); return; }
      questionWrap.hidden = true;
      result.hidden = false;
      resultText.textContent = interpretation();
      mail.href = 'mailto:nataliaefimova.com@gmail.com?subject=' + encodeURIComponent('A personal idea for ONLY YOU WOULD') + '&body=' + encodeURIComponent(draft());
      result.querySelector('h3').focus();
    });
    back.addEventListener('click', () => { answers[step] = field.value.slice(0, 600); if (step) step--; render(); field.focus(); });
    edit.addEventListener('click', () => { result.hidden = true; questionWrap.hidden = false; render(); field.focus(); });
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(draft()); status.textContent = 'Idea copied. You can paste it into a message to Natalia.'; }
      catch (_) { status.textContent = 'Copy was unavailable. You can use the email button or write to nataliaefimova.com@gmail.com.'; }
    });
    render();
  }
})();