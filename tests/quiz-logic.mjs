import { strict as assert } from 'node:assert';
import { profileOrder, profiles, questions } from '../assets/quiz-data.js';
import { scoreAnswers } from '../assets/quiz-scoring.js';

assert.equal(questions.length, 7);
assert.equal(profileOrder.length, 5);
for (const question of questions) {
  assert.equal(question.options.length, 4, question.id);
  assert.equal(new Set(question.options.map(choice => choice.id)).size, 4, question.id);
  for (const choice of question.options) {
    assert.equal(Object.values(choice.weights).reduce((a, b) => a + b, 0), 4);
    for (const profile of Object.keys(choice.weights)) assert.ok(profiles[profile], profile);
  }
}
for (const profile of profileOrder) {
  assert.equal(profiles[profile].examples.length, 3, profile);
  // Find a coherent pattern: favor the target whenever it appears as a lead,
  // otherwise take the answer that gives it the strongest supporting influence.
  const answers = questions.map(question => [...question.options].sort((a, b) =>
    (b.weights[profile] || 0) - (a.weights[profile] || 0)
  )[0].id);
  assert.equal(scoreAnswers(answers).primary, profile, profile + ' must be reachable');
}
const base = questions.map(question => question.options[0].id);
assert.deepEqual(scoreAnswers(base), scoreAnswers(base), 'ties stay deterministic');
const first = scoreAnswers(base).primary;
const changed = questions.map(question => question.options.at(-1).id);
assert.notEqual(scoreAnswers(changed).primary, first, 'changing a set of answers can change the profile');
assert.throws(() => scoreAnswers(base.slice(1)), /complete/);
assert.throws(() => scoreAnswers(['wrong', ...base.slice(1)]), /belong/);
console.log('Quiz scoring: seven questions, five reachable profiles, deterministic ties and answer validation passed.');

