import { profileOrder, questions } from './quiz-data.js';

// Deterministic: score, then count lead choices, then the published profile order.
// No answer data leaves the browser unless the visitor explicitly opens a mail draft.
export function scoreAnswers(answerIds) {
  if (!Array.isArray(answerIds) || answerIds.length !== questions.length) {
    throw new Error('A complete set of quiz answers is required.');
  }
  const scores = Object.fromEntries(profileOrder.map(id => [id, 0]));
  const leads = Object.fromEntries(profileOrder.map(id => [id, 0]));
  questions.forEach((question, index) => {
    const choice = question.options.find(option => option.id === answerIds[index]);
    if (!choice) throw new Error('An answer does not belong to its question.');
    for (const [profile, points] of Object.entries(choice.weights)) {
      if (!Object.hasOwn(scores, profile)) throw new Error('Unknown profile in quiz data.');
      scores[profile] += points;
      if (points === 3) leads[profile] += 1;
    }
  });
  const ranked = [...profileOrder].sort((a, b) =>
    scores[b] - scores[a] || leads[b] - leads[a] || profileOrder.indexOf(a) - profileOrder.indexOf(b)
  );
  const primary = ranked[0];
  const secondary = scores[ranked[1]] >= 5 && scores[primary] - scores[ranked[1]] <= 4 ? ranked[1] : null;
  return { primary, secondary, scores, leads };
}

