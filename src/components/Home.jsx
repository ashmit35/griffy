import React from 'react'
import { Stack, Paper, Button, TextField, Box } from '@mui/material'
import { IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import GifCard from './Card'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const [searchTerm, setSearchTerm] = useState("cat");
    const [arr, setArray] = useState([]);
    const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=6`);
            const data = await response.json();
            setArray(data.data);
            console.log(data);
        }
        fetchData();
    }, [searchTerm])

    return (
        <Box sx={{ padding: '20px' }}>

            {/* //Navbar section */}
            <Stack direction='row' justifyContent='center' marginBottom='50px'>
                <Paper component="form" sx={{ backgroundColor: '#F2F4F8', padding: '5px', mr: '20px', width: '90%', borderRadius: '10px' }}>
                    <IconButton type="diabled" sx={{ padding: { sx: '0px', md: '5px' }, color: 'black', mt: '8px' }}>
                        <Search />
                    </IconButton>

                    <TextField id="standard-basic" label="Article name of keyword" variant="standard" sx={{ width: '80%', mt: '-6px', borderBottom: 'none' }} onChange={(e) => setSearchTerm(e.target.value)} />
                </Paper>
                <Button sx={{ backgroundColor: 'black', color: 'white', width: '150px', borderRadius: '10px' }}> Search</Button>
            </Stack >

            {/* GIF SECTION */}
            <Box display={'flex'}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', p: '5px', justifyContent: 'space-between' }}>
                    {arr?.map((item) => (
                        <GifCard item={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home