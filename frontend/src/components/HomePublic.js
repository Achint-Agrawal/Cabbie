import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import { Navigate, useNavigate } from 'react-router-dom';

const HomePublic = () => {

    const navigate = useNavigate();
    return (
        <div>
            {/* <Stack spacing={2}>
                <Button variant="contained">Contained</Button>
                <Button variant="contained">Contained</Button>
            </Stack> */}
            <h1>Welcome to CABBIE</h1>
            <h2>SignIn to have a ride</h2>
            <Card variant="outlined" style={{marginTop:"5%", padding:"5%"}}>
                <ButtonGroup color="primary" aria-label="medium secondary button group" orientation="vertical">
                    <Button variant="contained" style={{margin:"3%"}} onClick={() => navigate('/signin')}>Signin as Rider</Button>
                    <Button variant="contained" style={{margin:"3%"}} onClick={() => navigate('/driver/signin')}>Signin as Driver</Button>
                    <Button variant="contained" style={{margin:"3%"}} onClick={() => navigate('/signup')}>Signup as rider</Button>
                    <Button variant="contained" style={{margin:"3%"}} onClick={() => navigate('/driver/signup')}>signup as driver</Button>
                </ButtonGroup>
            </Card>

        </div>
    );
};

export default HomePublic;