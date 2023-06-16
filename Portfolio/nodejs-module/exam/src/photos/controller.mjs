import fs from 'fs/promises';
import moment from 'moment';
import { filterNotDeleted } from '../../utils/utils.mjs';

const DB_PATH = './db/photos.json';

export const readPhotos = async (req, res) => {
  let photos = await fs.readFile(DB_PATH, 'utf8');
  if (!photos) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Photos not found.`,
    });
    return;
  }
  photos = filterNotDeleted(JSON.parse(photos));
  res.send({ data: photos });
};

export const readPhoto = async (req, res) => {
  const id = req.params.photoId;
  const photos = await fs.readFile(DB_PATH, 'utf8');
  const photo = photos ? JSON.parse(photos)[id] : undefined;
  if (req.noHttp) {
    // function readPhoto has been called from another controller
    return photo.deleted ? undefined : photo;
  }
  return photo && !photo.deleted
    ? res.send({ data: photo })
    : res.status(404).send({
        data: {},
        error: true,
        message: `Photo with ID #${id} not found.`,
      });
};

export const createPhoto = async (req, res) => {
  let photos = await fs.readFile(DB_PATH, 'utf8');
  if (photos) photos = JSON.parse(photos);
  const nextId = photos ? Math.max(...Object.keys(photos)) + 1 : 1;
  if (!isFinite(nextId)) nextId = 1;
  const newPhoto = {
    name: req.body.name || '',
    imageSrc: req.body.imageSrc || '',
    hashtags: req.body.hashtags || [],
    createdOn: moment().format(),
    updatedOn: moment().format(),
  };
  const dataToWrite = { ...photos, [nextId]: newPhoto };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.status(201).end();
};

export const updatePhoto = async (req, res) => {
  const id = req.params.photoId;
  let photos = await fs.readFile(DB_PATH, 'utf8');
  let photo = undefined;
  if (photos) {
    photos = JSON.parse(photos);
    photo = photos[id];
  }
  if (!photo || photo.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Photo with ID #${id} not found.`,
    });
    return;
  }
  photo = { ...photo, ...req.body, updatedOn: moment().format() };
  const dataToWrite = { ...photos, [id]: photo };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};

export const deletePhoto = async (req, res) => {
  const id = req.params.photoId;
  let photos = await fs.readFile(DB_PATH, 'utf8');
  let photo = undefined;
  if (photos) {
    photos = JSON.parse(photos);
    photo = photos[id];
  }
  if (!photo || photo.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Photo with ID #${id} not found.`,
    });
    return;
  }
  photo = { ...photo, updatedOn: moment().format(), deleted: true };
  const dataToWrite = { ...photos, [id]: photo };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};
