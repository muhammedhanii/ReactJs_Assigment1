// Data for the Home page and the /films/:filmId route.

export const films = [
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: 2024,
    director: 'Denis Villeneuve',
    runtime: 166,
    genre: 'Sci-Fi',
    screening: 'Thursday, 8:30 PM',
    hall: 'Hall A',
    synopsis:
      'Paul Atreides unites with the Fremen to wage war against the house that destroyed his family. Shot on a scale that rewards the big screen.',
  },
  {
    id: 'perfect-days',
    title: 'Perfect Days',
    year: 2023,
    director: 'Wim Wenders',
    runtime: 124,
    genre: 'Drama',
    screening: 'Friday, 6:00 PM',
    hall: 'Hall B',
    synopsis:
      'A Tokyo caretaker follows the same quiet routine every day. A film about noticing small things, told with almost no dialogue.',
  },
  {
    id: 'the-brutalist',
    title: 'The Brutalist',
    year: 2024,
    director: 'Brady Corbet',
    runtime: 215,
    genre: 'History',
    screening: 'Saturday, 4:00 PM',
    hall: 'Hall A',
    synopsis:
      'An architect flees post-war Europe and tries to rebuild a career in America. Screened with a fifteen-minute intermission.',
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    year: 2023,
    director: 'Celine Song',
    runtime: 105,
    genre: 'Romance',
    screening: 'Sunday, 7:15 PM',
    hall: 'Hall C',
    synopsis:
      'Two childhood friends reconnect twenty years later in New York and weigh the life they did not choose.',
  },
]

// Helper used by the /films/:filmId page.
export function getFilmById(id) {
  return films.find((film) => film.id === id)
}
