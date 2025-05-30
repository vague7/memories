import React, { Fragment } from 'react';
import {Grid2, CircularProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import Post from './Post/Post';
import makeStyles from './styles';


const Posts = ({setCurrentId}) => {   
    const {posts, isLoading} = useSelector((state) => state.posts);

   const classes = makeStyles(); 
   console.log(posts);
   if(!posts.length && !isLoading) return 'No posts';
    return (
         isLoading ? <CircularProgress /> : (
            <Fragment>
                <Grid2 className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid2 key={post._id} xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid2>
                    ))}
                </Grid2>
            </Fragment>
        )
    )
}

export default Posts;