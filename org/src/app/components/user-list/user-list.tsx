import { useEffect } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, selectUsers } from '../../+state/userListSlice';
import { albumAction } from '../../+state/albumListSlice';
import styles from './user-list.module.scss';
import { Dispatch } from '@reduxjs/toolkit';

/* eslint-disable-next-line */
export interface UserListProps {}

/**
 * Component used to display the user list of all the user fetched from api
 * @param props - UserListProps
 * @example <UserList />
 * @returns It returns the user list
 */
export function UserList(props: UserListProps) {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const userList = useSelector(selectUsers);
  const { setSelectedUserId } = albumAction;

  /**
   * Function used to handle on click for every user list item
   * @param userId
   * @example handleUserClick(1)
   */
  const handleUserClick = (userId: number) => {
    dispatch(setSelectedUserId(userId));
    navigate('/albumlist');
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box>
      <Box className={styles.userListHeading}>
        Please select a user to see their Albums
      </Box>
      <List>
        {userList.map((user) => (
          <ListItem
            className={styles.userList}
            key={user.id}
            onClick={() => handleUserClick(user.id)}
          >
            {user.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
