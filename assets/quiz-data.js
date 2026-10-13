// Editorial content is kept apart from scoring and presentation.
export const profileOrder = ['storyteller', 'explorer', 'adventurer', 'aesthete', 'visionary'];

export const profiles = {
  storyteller: {
    title: 'The Intimate Storyteller',
    kicker: 'A gathering that feels like coming home to a place you have never been.',
    image: '../assets/media/stillness.webp',
    alt: 'Illustrative concept of a sunlit family gathering around a table',
    description: 'You notice the small things that make people feel seen. A familiar scent, the right seat at the table, a story nobody else knows. Your kind of celebration makes room for all of it.',
    why: 'You chose closeness over spectacle and meaning over ceremony. The most unforgettable moment might be a conversation that could happen only with this particular group.',
    examples: [
      ['A kitchen full of history', 'A family recipe becomes a hands-on lunch, with every generation contributing a chapter.'],
      ['The long-table reunion', 'A hidden courtyard, an unhurried meal and invitations written from shared memories.'],
      ['A night of little rituals', 'Music, objects and familiar gestures quietly reveal the person everyone came to celebrate.']
    ]
  },
  explorer: {
    title: 'The Artistic Explorer',
    kicker: 'For the person who always looks twice.',
    image: '../assets/media/off-script-chapter.webp',
    alt: 'Illustrative architectural threshold opening toward a bright Spanish landscape',
    description: 'You are drawn to the unexpected connection: a building that changes how a room feels, a performance that begins before anyone knows it has begun, an idea that keeps unfolding.',
    why: 'Curiosity seems to matter as much as the celebration itself. You want guests to discover a point of view, not simply arrive at a venue.',
    examples: [
      ['The gallery after hours', 'An artist-led evening built around a private collection of stories and objects.'],
      ['A city seen sideways', 'An invitation becomes a trail through overlooked creative spaces, ending in a shared reveal.'],
      ['The living exhibition', 'Guests contribute small fragments that grow into one surprising work.']
    ]
  },
  adventurer: {
    title: 'The Extraordinary Adventurer',
    kicker: 'The best plans leave room for a horizon.',
    image: '../assets/media/off-script-film.webp',
    alt: 'Licensed editorial footage still of horseback riders on a scenic beach',
    description: 'You love the feeling that something is about to happen. A change of scenery, a carefully placed clue, the moment everyone realizes this is no ordinary day.',
    why: 'Your answers lean toward movement, discovery and a story lived together. The destination matters, but the route there is part of the gift.',
    examples: [
      ['The secret route', 'A day across Spain unfolds one personal clue and one remarkable stop at a time.'],
      ['A horizon to remember', 'A scenic ride or sail leads to a private celebration in a place chosen for this person.'],
      ['The beautiful detour', 'Friends meet for one plan and find themselves inside an entirely different adventure.']
    ]
  },
  aesthete: {
    title: 'The Modern Aesthete',
    kicker: 'Every detail earns its place.',
    image: '../assets/media/stillness-chapter.webp',
    alt: 'Illustrative tactile still life with personal objects in soft daylight',
    description: 'You feel the difference between beautiful and considered. Texture, light, pacing and food should all belong to the same thought, without ever feeling staged.',
    why: 'You gravitated to atmosphere and precision. For you, the setting is part of the story, and restraint can make the personal details speak louder.',
    examples: [
      ['An architectural supper', 'A private meal in a striking space, composed around one unexpected personal reference.'],
      ['The sensory portrait', 'A subtle sequence of tastes, materials and music evokes places that shaped the guest of honour.'],
      ['A garden at its best hour', 'Light, table, food and timing align for a celebration that feels effortless.']
    ]
  },
  visionary: {
    title: 'The Bold Visionary',
    kicker: 'Some ideas deserve to take over the room.',
    image: '../assets/media/after-dark.webp',
    alt: 'Illustrative concept of an expressive private celebration after dark',
    description: 'You are here for the impossible-sounding idea that becomes the story everyone tells later. You want an experience with nerve, surprise and a reason behind every reveal.',
    why: 'Your choices invite transformation and a little audacity. The spectacle works because it grows from someone real, not from a ready-made theme.',
    examples: [
      ['The room that rewrites itself', 'An ordinary arrival gives way to a world drawn from a private joke or long-held obsession.'],
      ['The midnight premiere', 'Friends become the cast of a cinematic night that keeps changing scenes.'],
      ['A celebration with a second act', 'Just when guests think they know the plan, a personal reveal changes everything.']
    ]
  }
};

// Each choice has one lead influence (3 points) and one supporting influence (1 point).
// Images are existing project assets; still concepts are illustrative, not client work.
export const questions = [
  {
    id: 'opening', chapter: 'The opening scene', layout: 'image',
    title: 'Your perfect evening begins with…',
    note: 'Trust your first instinct. There are no packages hiding behind these choices.',
    options: [
      { id: 'table', title: 'A table with room for stories', caption: 'Warm, unhurried, entirely yours.', image: '../assets/media/stillness.webp', alt: 'Illustrative sunlit family table', weights: { storyteller: 3, aesthete: 1 } },
      { id: 'threshold', title: 'A door nobody expected', caption: 'Curiosity gets there first.', image: '../assets/media/off-script-chapter.webp', alt: 'Illustrative doorway into a Spanish landscape', weights: { explorer: 3, adventurer: 1 } },
      { id: 'horizon', title: 'A route kept secret', caption: 'The journey is the invitation.', image: '../assets/media/off-script-film.webp', alt: 'Horseback riders along a scenic coast', weights: { adventurer: 3, explorer: 1 } },
      { id: 'night', title: 'A room that changes everything', caption: 'The night has a second act.', image: '../assets/media/after-dark-film.webp', alt: 'Young adults dancing near a DJ in a neon-lit club', weights: { visionary: 3, aesthete: 1 } }
    ]
  },
  {
    id: 'invitation', chapter: 'The invitation', layout: 'type',
    title: 'Which invitation would you keep?',
    note: 'The thing you save says a lot about the experience you want.',
    options: [
      { id: 'letter', title: 'A letter in familiar handwriting', caption: 'It knows the whole story.', weights: { storyteller: 3, explorer: 1 } },
      { id: 'object', title: 'A small, beautiful object', caption: 'A clue hiding in plain sight.', weights: { aesthete: 3, storyteller: 1 } },
      { id: 'coordinates', title: 'Coordinates, no explanation', caption: 'Leave the map half folded.', weights: { adventurer: 3, visionary: 1 } },
      { id: 'impossible', title: 'An invitation to the impossible', caption: 'Of course you are going.', weights: { visionary: 3, explorer: 1 } }
    ]
  },
  {
    id: 'feeling', chapter: 'The feeling', layout: 'type',
    title: 'What should people say on the way home?',
    note: 'Not the formal review. The message to their closest friend.',
    options: [
      { id: 'considered', title: '“Every detail made sense.”', caption: 'Nothing felt accidental.', weights: { aesthete: 3, storyteller: 1 } },
      { id: 'noticed', title: '“I noticed something new.”', caption: 'A different way of seeing.', weights: { explorer: 3, aesthete: 1 } },
      { id: 'went', title: '“I cannot believe we went there.”', caption: 'A story worth travelling for.', weights: { adventurer: 3, visionary: 1 } },
      { id: 'happened', title: '“Did that really happen?”', caption: 'In the best possible way.', weights: { visionary: 3, explorer: 1 } }
    ]
  },
  {
    id: 'setting', chapter: 'The setting', layout: 'image',
    title: 'Choose the place you want to step into.',
    note: 'Imagine arriving there with the people who matter.',
    options: [
      { id: 'courtyard', title: 'A hidden courtyard', caption: 'Sunlight and a long table.', image: '../assets/media/story-atlas.webp', alt: 'Illustrative sunny family lunch and handwritten recipe collage', weights: { storyteller: 3, aesthete: 1 } },
      { id: 'architecture', title: 'A space with a point of view', caption: 'Architecture as a conversation.', image: '../assets/media/off-script-chapter.webp', alt: 'Illustrative sculptural Spanish architecture', weights: { explorer: 3, aesthete: 1 } },
      { id: 'landscape', title: 'Somewhere the road ends', caption: 'The view is only the beginning.', image: '../assets/media/off-script.webp', alt: 'Illustrative open Spanish landscape', weights: { adventurer: 3, storyteller: 1 } },
      { id: 'stage', title: 'An after-dark world', caption: 'A place with a plot twist.', image: '../assets/media/after-dark.webp', alt: 'Illustrative private celebration after dark', weights: { visionary: 3, explorer: 1 } }
    ]
  },
  {
    id: 'detail', chapter: 'The personal clue', layout: 'type',
    title: 'Which detail would make you smile?',
    note: 'This is the part we would never find in a catalogue.',
    options: [
      { id: 'recipe', title: 'An old recipe, made together', caption: 'The good kind of inheritance.', weights: { storyteller: 3, aesthete: 1 } },
      { id: 'artwork', title: 'An artwork with a secret', caption: 'Something to look at twice.', weights: { explorer: 3, visionary: 1 } },
      { id: 'place', title: 'A place from a long-ago story', caption: 'At last, you made it there.', weights: { adventurer: 3, storyteller: 1 } },
      { id: 'reveal', title: 'A reveal no one saw coming', caption: 'Because the best joke is personal.', weights: { visionary: 3, explorer: 1 } }
    ]
  },
  {
    id: 'rhythm', chapter: 'The rhythm', layout: 'type',
    title: 'How should the day unfold?',
    note: 'The pace can be as personal as the place.',
    options: [
      { id: 'slow', title: 'Slow enough to notice everything', caption: 'Give the moment some room.', weights: { aesthete: 3, storyteller: 1 } },
      { id: 'conversations', title: 'One conversation leads to another', caption: 'Nothing important is rushed.', weights: { storyteller: 3, aesthete: 1 } },
      { id: 'chapters', title: 'In strange, delightful chapters', caption: 'Each one reveals a little more.', weights: { explorer: 3, visionary: 1 } },
      { id: 'movement', title: 'Always just around the bend', caption: 'A reason to keep going.', weights: { adventurer: 3, visionary: 1 } }
    ]
  },
  {
    id: 'ending', chapter: 'The last frame', layout: 'type',
    title: 'What do you want to take home?',
    note: 'The feeling that lingers matters more than the souvenir.',
    options: [
      { id: 'closer', title: 'The feeling of being closer', caption: 'A story everyone now shares.', weights: { storyteller: 3, adventurer: 1 } },
      { id: 'perspective', title: 'A new way of seeing someone', caption: 'Surprise can be quiet.', weights: { explorer: 3, aesthete: 1 } },
      { id: 'beauty', title: 'One perfect detail in your mind', caption: 'Beauty that stays with you.', weights: { aesthete: 3, storyteller: 1 } },
      { id: 'legend', title: 'A story told for years', caption: '“Remember when…?”', weights: { visionary: 3, adventurer: 1 } }
    ]
  }
];

