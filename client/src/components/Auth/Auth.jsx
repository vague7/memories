import React, { useState,Fragment } from 'react';
import {Avatar, Button, Paper, Grid2, Typography, Container, Grid} from '@mui/material';
import makeStyles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const classes = makeStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignup){
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup? 'Sign Up': 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    {isSignup && (
                        <Fragment>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </Fragment>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid2>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup? 'Sign Up': 'Sign In'}
                </Button>
                <Grid2 container justifyContent="flex-end">
                    <Grid2>
                        <Button onClick={switchMode}>
                            {isSignup? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth