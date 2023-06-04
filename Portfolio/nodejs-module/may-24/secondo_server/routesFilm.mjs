import film from './db/film.json' assert { type: 'json' };

export const cCFilms = (req, res) => {
  const filtered = film.filter((f) => f.casaProduzione == req.params.id);
  console.log(film, typeof req.params.id, filtered);
  res.send(filtered);
};

export const getAllFilms = (req, res) => {
  res.send(film);
};
