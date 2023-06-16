import fs from 'fs/promises';
import moment from 'moment';
import { readPhoto } from '../photos/controller.mjs';
import { filterNotDeleted } from '../../utils/utils.mjs';

const DB_PATH = './db/albums.json';

export const readAlbums = async (req, res) => {
  let albums = await fs.readFile(DB_PATH, 'utf8');
  if (!albums) {
    res.status(404).send({
      data: {},
      error: true,
      message: `No album found.`,
    });
    return;
  }
  albums = filterNotDeleted(JSON.parse(albums));
  res.send({ data: albums });
};

export const readAlbum = async (req, res) => {
  const id = req.params.albumId;
  const albums = await fs.readFile(DB_PATH, 'utf8');
  const album = albums ? JSON.parse(albums)[id] : undefined;
  if (album && !album.deleted) {
    const photos = await readAlbumPhotos({
      params: { albumId: id },
      noHttp: true,
    });
    res.send({ data: { ...album, photos } });
  } else
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
};

export const createAlbum = async (req, res) => {
  let albums = await fs.readFile(DB_PATH, 'utf8');
  if (albums) albums = JSON.parse(albums);
  const nextId = albums ? Math.max(...Object.keys(albums)) + 1 : 1;
  if (!isFinite(nextId)) nextId = 1;
  const newAlbum = {
    name: req.body.name || '',
    photos: [],
    hashtags: req.body.hashtags || [],
    createdOn: moment().format(),
    updatedOn: moment().format(),
  };
  const dataToWrite = { ...albums, [nextId]: newAlbum };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.status(201).end();
};

export const updateAlbum = async (req, res) => {
  const id = req.params.albumId;
  let albums = await fs.readFile(DB_PATH, 'utf8');
  let album = undefined;
  if (albums) {
    albums = JSON.parse(albums);
    album = albums[id];
  }
  if (!album || album.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
    return;
  }
  if (req.body.photos) {
    req.body.photos = album.photos;
  }
  album = { ...album, ...req.body, updatedOn: moment().format() };
  const dataToWrite = { ...albums, [id]: album };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};

export const readAlbumPhotos = async (req, res) => {
  const id = req.params.albumId;
  let albums = await fs.readFile(DB_PATH, 'utf8');
  let album = undefined;
  if (albums) {
    albums = JSON.parse(albums);
    album = albums[id];
  }
  if (!album || album.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
    return;
  }
  let photos = {};
  for (let i = 0; i < album.photos.length; i++) {
    photos = {
      ...photos,
      [album.photos[i]]: await readPhoto({
        params: { photoId: album.photos[i] },
        noHttp: true,
      }),
    };
  }
  if (req.noHttp) {
    // function readAlbumPhotos has been called from another controller
    return photos;
  }
  res.send({ data: photos });
};

export const addPhotoToAlbum = async (req, res) => {
  const id = req.params.albumId;
  let albums = await fs.readFile(DB_PATH, 'utf8');
  let album = undefined;
  if (albums) {
    albums = JSON.parse(albums);
    album = albums[id];
  }
  if (!album || album.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
    return;
  }
  const photoId = req.params.photoId;
  if (album.photos.includes(photoId)) {
    res.status(409).send({
      data: {},
      error: true,
      message: `Photo with ID #${photoId} is already in this album`,
    });
    return;
  }
  for (let i = 0; i < album.photos.length; i++) {
    const photo = await readPhoto({
      params: { photoId },
      noHttp: true,
    });
    if (!photo) {
      res.status(404).send({
        data: {},
        error: true,
        message: `Photo with ID #${photoId} not found`,
      });
      return;
    }
  }
  album = { ...album, updatedOn: moment().format() };
  album.photos.push(photoId);
  const dataToWrite = { ...albums, [id]: album };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};

export const deleteAlbum = async (req, res) => {
  const id = req.params.albumId;
  let albums = await fs.readFile(DB_PATH, 'utf8');
  let album = undefined;
  if (albums) {
    albums = JSON.parse(albums);
    album = albums[id];
  }
  if (!album || album.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
    return;
  }
  album = { ...album, updatedOn: moment().format(), deleted: true };
  const dataToWrite = { ...albums, [id]: album };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};

export const deletePhotoFromAlbum = async (req, res) => {
  const id = req.params.albumId;
  let albums = await fs.readFile(DB_PATH, 'utf8');
  let album = undefined;
  if (albums) {
    albums = JSON.parse(albums);
    album = albums[id];
  }
  if (!album || album.deleted) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Album with ID #${id} not found.`,
    });
    return;
  }
  const photoId = req.params.photoId;
  const photo = await readPhoto({
    params: { photoId },
    noHttp: true,
  });
  if (!photo) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Photo with ID #${photoId} not found`,
    });
    return;
  }
  album = { ...album, updatedOn: moment().format() };
  var index = album.photos.indexOf(photoId);
  if (index == -1) {
    res.status(404).send({
      data: {},
      error: true,
      message: `Photo with ID #${photoId} is not in album`,
    });
    return;
  }
  album.photos.splice(index, 1);
  const dataToWrite = { ...albums, [id]: album };
  await fs.writeFile(DB_PATH, JSON.stringify(dataToWrite, null, 2));
  res.end();
};
