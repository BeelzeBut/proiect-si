import React, { useState } from 'react';
import axios from 'axios';
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";

function Login({ setIsLoggedIn } : { setIsLoggedIn: (isLoggedIn: boolean) => void}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:8000/login', {
                username,
                password
            });

            if(response.status === 200)
                setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper style={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h4" component="h1">Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Login;
