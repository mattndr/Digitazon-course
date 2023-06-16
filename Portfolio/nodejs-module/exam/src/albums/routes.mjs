import express from 'express';
import * as controller from './controller.mjs';

export const router = express.Router();

// get all albums
router.get('/', controller.readAlbums);

// get an album details
router.get('/:albumId', controller.readAlbum);

// get album photos only
router.get('/:albumId/photos', controller.readAlbumPhotos);

// create a new album with no photos
router.post('/', controller.createAlbum);

// update an album. Changing photos array will not have any effect.
router.put('/:albumId', controller.updateAlbum);

// add a photo to an album
router.put('/:albumId/photos/:photoId', controller.addPhotoToAlbum);

// delete an album
router.delete('/:albumId', controller.deleteAlbum);

// remove a photo from an album
router.delete('/:albumId/photos/:photoId', controller.deletePhotoFromAlbum);
