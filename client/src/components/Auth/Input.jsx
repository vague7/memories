import { Grid2, TextField, InputAdornment, IconButton } from '@mui/material';
import  Visibility from '@mui/icons-material/Visibility';
import  VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';

const Input = ({name , half, handleChange,  label, autoFocus,type,handleShowPassword}) => {
  return (
    <Grid2 xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            slotProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }:null}
        />
    </Grid2>
  )
}

export default Input;