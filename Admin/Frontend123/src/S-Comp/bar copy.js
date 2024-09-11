import { Box } from "@mui/material";
import Header from "./Header";
import React, { useEffect, useState } from "react";
import TestBarChart from "../chart/Barchart copy";
import axios from "axios";

const TestBar = () => {
    // State to store the fetched and processed data
    const [barchartdata, setBarchartdata] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchdata();
    }, []);

    // Function to fetch data from the server
    const fetchdata = async () => {
        try {
            // Fetch data from the server
            const response = await axios.get("http://localhost:1414/getAllorders");
            const data = response.data;
            // Process the fetched data
            const processedData = await getFilteredData(data);
            // Update the state with the processed data
            setBarchartdata(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to format the time
    const formatTime = (time) => {
        return new Date(time).toLocaleDateString();
    };

    // Function to filter and organize the data
    const getFilteredData = async (data) => {
        const filteredData = {};
        const productTotals = {};
    
        // Check if the data or orders are missing
        if (!data || !data.orders) {
            return filteredData;
        } 
    
        // Iterate over each order
        data.orders.forEach((order) => {
            const time = formatTime(order.time);
    
            // Create a new entry for the date if it doesn't exist
            if (!filteredData[time]) {
                filteredData[time] = { time };
            }
    
            // Iterate over each item in the order
            order.orderItems.forEach((item) => {
                const product = item.product_name;
                const totalQty = item.qty;
    
                // Initialize the product quantity if it doesn't exist
                if (!filteredData[time][product]) {
                    filteredData[time][product] = 0;
                }
    
                // Update the product quantity
                filteredData[time][product] += totalQty;
    
                // Update the total quantity for the product
                productTotals[product] = (productTotals[product] || 0) + totalQty;
                console.log(productTotals)
            });
        });
    
        // Sort products by total quantity and select the top 4
        const topProducts = Object.keys(productTotals)
            .sort((a, b) => productTotals[b] - productTotals[a])
            .slice(0, 4);
    
        // Filter data to include only the top 4 products
        const filteredDataArray = Object.values(filteredData).map((entry) => {
            return {
                time: entry.time,
                ...topProducts.reduce((acc, product) => {
                    acc[product] = entry[product] || 0;
                    // console.log(acc)
                    return acc;
                }, {})
            };
        });
        
    
        // Update the state with the filtered data
        setBarchartdata(filteredDataArray);
        return filteredDataArray;
    };
    
    // Log the processed data
    console.log(barchartdata)

    // const allKeys = barchartdata.reduce((keys, obj) => {
    //     Object.keys(obj).forEach(key => {
    //         if (key !== 'time' && !keys.includes(key)) {
    //             keys.push(key);
    //         }
    //     });
    //     return keys;
    // }, []);


    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart" />
            <Box height="75vh">
                {/* Render the Bar Chart component if data exists */}
                {barchartdata.length > 0 &&
                    <TestBarChart
                        data={barchartdata}
                        keys= { Object.keys(barchartdata[0]).filter(key => key !== 'time') }
                    />
                }
            </Box>
        </Box>
    );
};

export default TestBar;
