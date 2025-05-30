import React from "react";
import {Link} from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button} from "@mui/material";
import makeStyles from "./styles";
import memories from "../../images/mem1.jpg";
import memoriesText from "../../images/memories-Text.png";
import memoriesLogo from "../../images/memories-Logo.png";
import {useDispatch} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes= makeStyles();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = jwtDecode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]
    );

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="35px" />
                <img className={classes.image} src={memoriesLogo} alt="icon1" height="25px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result? (
                    <div className= {classes.profile}>
                        <Avatar className= {classes.purple} alt={user?.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )};
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;