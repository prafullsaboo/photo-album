import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAlbums,
  selectAlbumsByUserId,
  selectSelectedUserId,
} from '../../+state/albumListSlice';
import { photoAction } from '../../+state/photosListSlice';
import styles from './album-list.module.scss';
import { Dispatch } from '@reduxjs/toolkit';

/* eslint-disable-next-line */
export interface AlbumListProps {}

/**
 * Component used to display the Album list fir selected user
 * @param props AlbumListProps
 * @returns It returns the album list
 */
export function AlbumList(props: AlbumListProps) {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const albums = useSelector(selectAlbumsByUserId);
  const { setSelectedAlbumId } = photoAction;
  const selectedUserId = useSelector(selectSelectedUserId);
  const [filteredAlbum, setFilteredAlbum] = useState([]);

  useEffect(() => {
    dispatch(fetchAlbums(selectedUserId));
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    const filterAlbum = albums.filter(
      (album) => selectedUserId === album.userId
    );
    setFilteredAlbum(filterAlbum);
  }, [albums, selectedUserId]);

  /**
   * Function used to handle individual album click
   * @param albumId - number
   * @example handleAlbumClick(1);
   */
  const handleAlbumClick = (albumId: number) => {
    dispatch(setSelectedAlbumId(albumId));
    navigate('/photolist');
  };

  return (
    <>
      <Box className={styles.albumListHeading}>Album List</Box>
      <Grid
        container
        className={styles.gridContainer}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredAlbum &&
          filteredAlbum.map((album: any) => (
            <Grid
              item
              xs={3}
              sm={4}
              md={4}
              key={album.id}
              className={styles.gridBlock}
              onClick={() => handleAlbumClick(album.id)}
            >
              <Typography>{album.title}</Typography>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default AlbumList;
