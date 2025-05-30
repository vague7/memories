import React ,{useState, useEffect} from 'react';
import makeStyles from './styles';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch , useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts.js';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId,setCurrentId }) => {
  const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const classes = makeStyles(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: ''});
  }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if(currentId){
  //     dispatch(updatePost(currentId,postData));
  //   } else {
  //     dispatch(createPost(postData));
  //   }
  //   clear();
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId===null) {
      dispatch(createPost({ ...postData, name: user?.result?.name },navigate));
      
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

 

  return (
      <Paper className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId? 'Editing':'Creating'} a Memory</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
          <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
          <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
          <div className={classes.fileInput}>
            <input  type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();  // Declare 'reader' first
                    reader.onload = () => {
                      setPostData({ ...postData, selectedFile: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper> 
    )
};

export default Form;