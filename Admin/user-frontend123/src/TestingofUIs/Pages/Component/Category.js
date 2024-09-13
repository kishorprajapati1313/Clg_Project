import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const clothingData = [
        { id: 1, name: "shirt", src: "Texture/p1.jpg" },
        { id: 2, name: "Jeans", src: "Texture/p2.jpg" },
        { id: 3, name: "Pants", src: "Texture/p3.jpg" },
        { id: 4, name: 'Other', src: "Texture/p3.jpg" },
        { id: 5, name: 'Hat', src: "Texture/p3.jpg" },
        { id: 6, name: 'Jacket', src: "Texture/p3.jpg" },
        { id: 7, name: 'Socks', src: "Texture/p3.jpg" },
        { id: 8, name: 'Shorts', src: "Texture/p3.jpg" },
        { id: 9, name: 'Skirt', src: "Texture/p3.jpg" },
        { id: 10, name: 'Sweater', src: "Texture/p3.jpg" },
    ]

    const clothslice = clothingData.slice(0, window.innerWidth < 800 ? 5 : 10);
    // console.log(clothslice)
    return (
        <div style={{ overflowX: "auto" }}>
            <Container sx={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 9 }}>
                {clothslice.map((item) => (
                    <Box key={item.id}>
                        <Box sx={{ textAlign: "center", padding: "10px " }}>
                        <Link to={`/category/${item.name}`} style={{ textDecoration: 'none',color: 'inherit' }}>
                            <img src={item.src} alt="Category" style={{ borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover" }} />
                            <h1 style={{ fontSize: "1.5rem" }}>{item.name}</h1>
                            </Link>
                        </Box>
                    </Box>
                ))}
            </Container>
        </div>
    );
}

export default Category;
