import React, { useEffect, useState } from 'react'
import { Grid, ListItemText, Paper, Typography } from '@mui/material';
import Sidebar from '../../Componets/Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getuser } from '../../Componets/Navbar';
import axios from 'axios';

const Profilehome = () => {
    const user = getuser();
    const [userdata, setUserData] = useState(null);


    useEffect(() => {
        const fetchdata = async () => {
            const userid = user.user._id
            const response = await axios.get(`http://localhost:5000/getdata/${userid}`);
            setUserData(response.data)
        }
        fetchdata();
    }, [])

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Grid item xs={12} md={3}>
                    <Sidebar /> {/* Use the Sidebar component here */}
                </Grid>
                {/* Content */}
                <Grid item xs={12} md={9}>
                    <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "center", color:"white" }}>
                        Personal Information
                    </Typography>
                    <Paper style={{ padding: '20px' }} sx={{background:"lightgrey"}}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} md={3} style={{ textAlign: 'center' }}>
                                <AccountCircleIcon sx={{ height: "200px", width: "auto", color: "grey" }} />
                            </Grid> 
                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <ListItemText primary={`Name: ${userdata && userdata.user.username}`} />
                                        <ListItemText primary={`Email: ${userdata && userdata.user.email}`} />
                                        <ListItemText primary={`Credit: ${userdata && userdata.user.credit}`} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profilehome