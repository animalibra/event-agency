import { questions, profiles } from './quiz-data.js';
import { scoreAnswers } from './quiz-scoring.js';

const $ = selector => document.querySelector(selector);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const intro = $('#quiz-intro');
const stage = $('#quiz-stage');
const resultSection = $('#quiz-result');
const choices = $('#quiz-choices');
const answers = Array(questions.length).fill(null);
let step = 0;
let currentResult = null;
let filmToken = 0;

const films = {
  'after-dark': { poster: '../assets/media/after-dark-film.webp', video: '../assets/media/after-dark-loop.mp4', alt: 'Illustrative editorial atmosphere: friends dancing beside a DJ' },
  stillness: { poster: '../assets/media/stillness-film.webp', video: '../assets/media/stillness-loop.mp4', alt: 'Illustrative editorial atmosphere: two generations preparing a meal together' },
  'off-script': { poster: '../assets/media/off-script-film.webp', video: '../assets/media/off-script-loop.mp4', alt: 'Illustrative editorial atmosphere: horseback riders travelling along a scenic coast' }
};

function syncFilm() {
  const world = Object.hasOwn(films, document.body.dataset.world) ? document.body.dataset.world : 'after-dark';
  const film = films[world];
  const image = $('#quiz-poster');
  const video = $('#quiz-film');
  const frame = $('.quiz-intro-media');
  const token = ++filmToken;
  image.src = film.poster;
  image.alt = film.alt;
  frame.classList.remove('is-playing');
  video.pause();
  video.removeAttribute('src');
  video.load();
  if (reduced.matches || navigator.connection?.saveData || intro.hidden) return;
  video.poster = film.poster;
  video.oncanplay = () => {
    if (token !== filmToken) return;
    Promise.resolve(video.play()).then(() => {
      if (token === filmToken) frame.classList.add('is-playing');
    }).catch(() => {});
  };
  video.onerror = () => frame.classList.remove('is-playing');
  video.src = film.video;
  video.load();
}

new MutationObserver(mutations => {
  if (mutations.some(item => item.attributeName === 'data-world')) syncFilm();
}).observe(document.body, { attributes: true, attributeFilter: ['data-world'] });
reduced.addEventListener?.('change', syncFilm);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) $('#quiz-film').pause();
  else if (!intro.hidden) syncFilm();
});
syncFilm();

function show(panel) {
  intro.hidden = panel !== intro;
  stage.hidden = panel !== stage;
  resultSection.hidden = panel !== resultSection;
  if (panel !== intro) {
    $('#quiz-film').pause();
    $('.quiz-intro-media').classList.remove('is-playing');
  } else syncFilm();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function focusHeading(selector) {
  requestAnimationFrame(() => $(selector).focus({ preventScroll: true }));
}

function buildChoice(option, index, selected, imageLayout) {
  const button = document.createElement('button');
  button.className = 'quiz-choice';
  button.type = 'button';
  button.dataset.option = option.id;
  button.setAttribute('aria-pressed', String(selected));
  button.setAttribute('aria-label', option.title + '. ' + option.caption);
  if (imageLayout) {
    const image = document.createElement('img');
    image.src = option.image;
    image.alt = '';
    image.loading = 'lazy';
    image.width = 768;
    image.height = 512;
    button.append(image);
  }
  const body = document.createElement('span');
  body.className = 'quiz-choice-body';
  const number = document.createElement('span');
  number.className = 'quiz-choice-number';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = String(index + 1).padStart(2, '0') + ' / 04';
  const title = document.createElement('span');
  title.className = 'quiz-choice-title';
  title.textContent = option.title;
  const caption = document.createElement('span');
  caption.className = 'quiz-choice-caption';
  caption.textContent = option.caption;
  body.append(number, title, caption);
  button.append(body);
  button.addEventListener('click', () => {
    answers[step] = option.id;
    choices.querySelectorAll('.quiz-choice').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice.dataset.option === option.id));
    });
    $('#quiz-next').disabled = false;
  });
  return button;
}

function renderQuestion() {
  const question = questions[step];
  $('#quiz-step-label').textContent = 'Scene ' + (step + 1) + ' of ' + questions.length;
  $('#quiz-progress').setAttribute('aria-valuenow', String(step + 1));
  $('#quiz-progress-fill').style.width = ((step + 1) / questions.length * 100) + '%';
  $('#quiz-rail-index').textContent = String(step + 1).padStart(2, '0');
  $('#quiz-chapter').textContent = question.chapter;
  $('#quiz-question').textContent = question.title;
  $('#quiz-note').textContent = question.note;
  choices.classList.toggle('is-image', question.layout === 'image');
  choices.replaceChildren(...question.options.map((option, index) =>
    buildChoice(option, index, answers[step] === option.id, question.layout === 'image')
  ));
  $('#quiz-back').disabled = step === 0;
  $('#quiz-next').disabled = !answers[step];
  $('#quiz-next').textContent = step === questions.length - 1 ? 'Reveal my result ↗' : 'Continue ↗';
  stage.scrollIntoView({ block: 'start', behavior: reduced.matches ? 'auto' : 'smooth' });
  focusHeading('#quiz-question');
}

function makeExample([title, detail], index) {
  const article = document.createElement('article');
  const count = document.createElement('span');
  count.textContent = String(index + 1).padStart(2, '0');
  const body = document.createElement('div');
  const heading = document.createElement('h3');
  heading.textContent = title;
  const copy = document.createElement('p');
  copy.textContent = detail;
  body.append(heading, copy);
  article.append(count, body);
  return article;
}

function mailLink(profileId) {
  const profile = profiles[profileId];
  const lines = [
    'Hello Natalia,',
    '',
    'I discovered my event personality: ' + profile.title + '.',
    ...questions.flatMap((question, index) => {
      const option = question.options.find(item => item.id === answers[index]);
      return option ? [question.title + ' — ' + option.title] : [];
    }),
    '',
    'Here is the idea or occasion I have in mind:',
    '',
    ''
  ];
  return 'mailto:nataliaefimova.com@gmail.com?subject=' +
    encodeURIComponent('My event personality — ' + profile.title + ' | ONLY YOU WOULD') +
    '&body=' + encodeURIComponent(lines.join('\n'));
}

function renderResult(profileId, secondaryId = null) {
  currentResult = profileId;
  const profile = profiles[profileId];
  $('#quiz-result-title').textContent = profile.title;
  $('#quiz-result-kicker').textContent = profile.kicker;
  $('#quiz-result-photo').src = profile.image;
  $('#quiz-result-photo').alt = profile.alt;
  $('#quiz-result-description').textContent = profile.description;
  $('#quiz-result-why').textContent = profile.why;
  $('#quiz-examples').replaceChildren(...profile.examples.map(makeExample));
  const secondary = $('#quiz-secondary');
  secondary.hidden = !secondaryId;
  secondary.textContent = secondaryId ? 'With a touch of ' + profiles[secondaryId].title.toLowerCase() + '.' : '';
  const chosenDetail = questions[4].options.find(option => option.id === answers[4]);
  const clue = $('#quiz-personal-clue');
  clue.hidden = !chosenDetail;
  clue.textContent = chosenDetail ? 'A clue you chose: “' + chosenDetail.title + '.” That could be the beginning of something unmistakably yours.' : '';
  $('#quiz-contact').href = mailLink(profileId);
  $('#quiz-status').textContent = '';
  $('#quiz-revisit').hidden = answers.some(answer => !answer);
  show(resultSection);
  focusHeading('#quiz-result-title');
}

$('#quiz-start').addEventListener('click', () => {
  step = 0;
  show(stage);
  renderQuestion();
});
$('#quiz-back').addEventListener('click', () => {
  if (step === 0) return;
  step -= 1;
  renderQuestion();
});
$('#quiz-next').addEventListener('click', () => {
  if (!answers[step]) return;
  if (step < questions.length - 1) {
    step += 1;
    renderQuestion();
  } else {
    const outcome = scoreAnswers(answers);
    renderResult(outcome.primary, outcome.secondary);
  }
});
$('#quiz-revisit').addEventListener('click', () => {
  step = questions.length - 1;
  show(stage);
  renderQuestion();
});
$('#quiz-restart').addEventListener('click', () => {
  answers.fill(null);
  step = 0;
  show(stage);
  renderQuestion();
});
$('#quiz-share').addEventListener('click', async () => {
  if (!currentResult) return;
  const url = new URL(window.location.href);
  url.searchParams.set('profile', currentResult);
  url.hash = '';
  const shareData = {
    title: 'My event personality: ' + profiles[currentResult].title,
    text: 'A creative little discovery from ONLY YOU WOULD.',
    url: url.toString()
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      $('#quiz-status').textContent = 'Sharing options opened.';
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      $('#quiz-status').textContent = 'Result link copied.';
    } else {
      $('#quiz-status').textContent = 'Share this link: ' + shareData.url;
    }
  } catch (error) {
    if (error.name !== 'AbortError') $('#quiz-status').textContent = 'Share this link: ' + shareData.url;
  }
});

// A shared link reveals only a profile. Individual answers are never put in the URL.
const sharedProfile = new URL(window.location.href).searchParams.get('profile');
if (Object.hasOwn(profiles, sharedProfile)) renderResult(sharedProfile);

