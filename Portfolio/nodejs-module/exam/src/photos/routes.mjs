import express from 'express';
import * as controller from './controller.mjs';

export const router = express.Router();

// get all photos
router.get('/', controller.readPhotos);

// get a photo details
router.get('/:photoId', controller.readPhoto);

// create a photo
router.post('/', controller.createPhoto);

// update a photo
router.put('/:photoId', controller.updatePhoto);

//delete a photo
router.delete('/:photoId', controller.deletePhoto);
