import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Stack, Typography, IconButton } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";

const GifCard = ({ item }) => {
    const firebaseConfig = {
        apiKey: "AIzaSyCFo1UR1TLoGfhusgSUGHLUHb0MIR96QSQ",
        authDomain: "giffy-3557a.firebaseapp.com",
        projectId: "giffy-3557a",
        storageBucket: "giffy-3557a.appspot.com",
        messagingSenderId: "644099496659",
        appId: "1:644099496659:web:ee145247538781e7669226",
        measurementId: "G-J5BCR54KVQ"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getDatabase();
    const dbRef = ref(db);
    const [isFav, setIsFav] = useState(false);
    const [uid, setUserId] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const UID = user.uid;
                setUserId(UID);
            } else {
                alert("please login first")
            }
        })
    }, [])

    const addtofavorites = async () => {
        await set(ref(db, 'users/' + uid + '/favorites/' + `${item.id}`), {
            added: true
        });
        setIsFav(!isFav);
    }


    return (
        <Card sx={{ width: { md: 480, xs: '100%' }, borderRadius: 2, mb: 1 }}>
            <CardMedia
                image={item.images.original.url}
                sx={{ width: '100%', height: 180, borderRadius: '10px' }}
            />


            <CardContent sx={{ backgroundColor: 'white', height: 90 }}>
                <Stack direction='row' justifyContent='space-between' sx={{ padding: '2px' }}>
                    <Typography variant='h6'>{item.title}</Typography>
                    <IconButton onClick={addtofavorites}>
                        {!isFav ? (<StarBorderOutlinedIcon sx={{ color: 'black' }} />) : (<StarIcon sx={{ color: '#F4CF08' }} />)}
                    </IconButton>
                </Stack>
                <Typography sx={{ color: 'grey' }}>@ {item.source_tld || 'www.griphy.com'}</Typography>
            </CardContent>
        </Card>
    )
}

export default GifCard