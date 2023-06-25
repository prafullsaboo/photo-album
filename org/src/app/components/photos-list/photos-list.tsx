import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPhotos,
  selectPhotosByAlbumId,
  selectSelectedAlbumId,
} from '../../+state/photosListSlice';
import styles from './photos-list.module.scss';
import { Dispatch } from '@reduxjs/toolkit';
import { Grid } from '@mui/material';

/* eslint-disable-next-line */
export interface PhotosListProps {}

/**
 * Function used to display all photos relevant to specific albums
 * @param props - PhotosListProps
 * @example <PhotosList />
 */
export function PhotosList(props: PhotosListProps) {
  const dispatch: Dispatch<any> = useDispatch();
  const photos = useSelector(selectPhotosByAlbumId);
  const selectedAlbumId = useSelector(selectSelectedAlbumId);
  const [filteredPhoto, setfilteredPhoto] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchPhotos(selectedAlbumId));
  }, [dispatch, selectedAlbumId]);

  useEffect(() => {
    const filterPhoto = photos.filter(
      (photo) => selectedAlbumId === photo.albumId
    );
    setfilteredPhoto(filterPhoto);
  }, [selectedAlbumId, photos]);

  return (
    <Grid container className={styles.gridContainer} spacing={{ xs: 1, md: 1 }}>
      {filteredPhoto?.map((photo: any) => (
        <Grid item key={photo.id}>
          <img alt={photo.title} src={photo.thumbnailUrl} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotosList;
