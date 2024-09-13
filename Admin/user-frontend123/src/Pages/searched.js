import { IconButton, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Searched = () => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionClicked, setSuggestionClicked] = useState(false); // State to track if a suggestion has been clicked
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get('http://localhost:1415/product_name');
                if (result && result.data) {
                    setProducts(result.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // Extract product names from filtered products
        const suggestions = filteredProducts.map(product => product);
        setSuggestions(suggestions);
        // Reset suggestionClicked state when search query changes
        setSuggestionClicked(false);   //---------------------------------------- Problem is here -------------------------------
    }, [searchQuery, products]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        // Set search query to clicked suggestion
        setSearchQuery(suggestion);
        // Navigate to the next page
        navigate(`/serch_product/${suggestion}`);
        // Set suggestionClicked state to true
        setSuggestionClicked(true);
    };

    return (
        <div>
            {/* Search */}
            <Box display="flex" alignItems="center" component={Paper} elevation={3} borderRadius="3px" 
                backgroundColor={colors.grey[6000]}  >
                <InputBase
                    sx={{ ml: 0.5, flex: 1 }}
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <IconButton  sx={{ p: 1 }} onClick={() => handleSuggestionClick(searchQuery)}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {/* Suggestions */}
            {searchQuery && suggestions.length > 0 && !suggestionClicked && (
                <Paper component={List} elevation={3} sx={{ zIndex: 9999, position: 'absolute' }}>
                    {suggestions.map((suggestion, index) => (
                        <ListItem button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            <ListItemText primary={suggestion} sx={{ borderBottom: "1px solid white" }} />
                        </ListItem>
                    ))}
                </Paper>
            )}
        </div>
    );
};

export default Searched;
