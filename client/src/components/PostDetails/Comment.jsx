import React from "react";
import {Typography, TextField, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import makeStyles from "./styles";
import { useRef, useState } from "react";
import { commentPost } from "../../actions/posts";

const Comment = ({post}) => {
    
    const classes = makeStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

       const newComments= await dispatch(commentPost(finalComment, post._id));

       setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior :'smooth'});
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subititle1">
                            <strong>{c.split(':')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (
                <div style={{width: '70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
                </div>
                )}

            </div>
        </div>
    )
};

export default Comment;

