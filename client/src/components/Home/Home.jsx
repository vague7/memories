import React ,{useState,useEffect} from "react";
import { Container,  Grow, Grid2,Paper , AppBar, Button, TextField} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input'
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import makeStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = makeStyles();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
  
    // useEffect(() => {
    //   dispatch(getPosts());
    // }, [currentId,dispatch]);

    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        navigate('/');
      }
    };
  

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost();
      }
    };
    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return(
        <Grow in>
          <Container maxWidth="xl">
            <Grid2 container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid2  xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid2>
              <Grid2  xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField
                    name="search"
                    variant="outlined"
                    label="Search Memories"
                    onKeyUp={handleKeyPress}
                    fullWidth
                    value= {search}
                    onChange={(e)=> setSearch(e.target.value)}
                  />
                  <MuiChipsInput style={{margin: '10px 0'}} 
                  value={tags}
                  onAddChip={handleAdd}
                  onDeleteChip={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                  />
                  <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                {(!searchQuery && !tags.length) && (
                  <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page}/>
                </Paper>
              )}
                
              </Grid2>
            </Grid2>
          </Container>
        </Grow>
    )
}

export default Home;