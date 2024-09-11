import { Box } from "@mui/material";
import Header from "./Header";
import BarChart from "../chart/Barchart";
import React, { useEffect, useState } from "react";

const Bar = ({ isDashboard = false }) => {
    const [barchartdata, setBarchartdata] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:1414/getAllorders");
            const data = await response.json();
            // console.log(data)
            // Process fetched data and organize it
            const processedData = processData(data);
            setBarchartdata(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // const processData = (data) => {
    //     const today = new Date();
    //     const fiveDaysAgo = new Date(today);
    //     fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    //     const processedData = [];
    //     const uniqueProducts = new Set();

    //     // Helper function to format date as "dd-mm-yyyy"
    //     const formatDate = (date) => {
    //         return date.toLocaleDateString('en-GB'); // Specify the locale to format as "dd-mm-yyyy"
    //     };

    //     // Iterate over each order
    //     data.orders.forEach(order => {
    //         const orderDate = new Date(order.time);
    //         // Check if the order is within the specified time range
    //         if (orderDate >= fiveDaysAgo && orderDate <= today) {
    //             const formattedDate = formatDate(orderDate);
    //             // Find if the date already exists in processedData
    //             const existingDateIndex = processedData.findIndex(item => item.date === formattedDate);
    //             if (existingDateIndex === -1) {
    //                 // If date doesn't exist, create a new entry
    //                 const dateEntry = {
    //                     date: formattedDate,
    //                 };
    //                 // Iterate over each item in the order
    //                 order.orderItems.forEach(item => {
    //                     dateEntry[item.product_name] = item.qty;
    //                     uniqueProducts.add(item.product_name);
    //                 });
    //                 processedData.push(dateEntry);
    //             } else {
    //                 // If date exists, update the quantities
    //                 const existingDate = processedData[existingDateIndex];
    //                 order.orderItems.forEach(item => {
    //                     if (existingDate[item.product_name]) {
    //                         existingDate[item.product_name] += item.qty;
    //                     } else {
    //                         existingDate[item.product_name] = item.qty;
    //                         uniqueProducts.add(item.product_name);
    //                     }
    //                 });
    //             }
    //         }
    //     });

    //     // Ensure every object has all product keys, initializing missing ones with 0
    //     processedData.forEach(entry => {
    //         uniqueProducts.forEach(product => {
    //             if (!entry[product]) {
    //                 entry[product] = 0;
    //             }
    //         });
    //     });

    //     console.log(processedData);

    //     return processedData;
    // };

    const processData = (data) => {
        const today = new Date();
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const processedData = [];
        const productTotals = {};

        // Helper function to format date as "dd-mm-yyyy"
        const formatDate = (date) => {
            return date.toLocaleDateString('en-GB');
        };

        // Iterate over each order
        data.orders.forEach(order => {
            const orderDate = new Date(order.time);
            // Check if the order is within the last 5 days
            if (orderDate >= fiveDaysAgo && orderDate <= today) {
                const formattedDate = formatDate(orderDate);
                // Find existing date entry
                const existingDateIndex = processedData.findIndex(item => item.date === formattedDate);
                if (existingDateIndex === -1) {
                    // Create new date entry if it doesn't exist
                    const dateEntry = { date: formattedDate };
                    order.orderItems.forEach(item => {
                        dateEntry[item.product_name] = item.qty;
                        productTotals[item.product_name] = (productTotals[item.product_name] || 0) + item.qty;
                    });
                    processedData.push(dateEntry);
                } else {
                    // Update existing date entry
                    const existingDate = processedData[existingDateIndex];
                    order.orderItems.forEach(item => {
                        if (existingDate[item.product_name]) {
                            existingDate[item.product_name] += item.qty;
                        } else {
                            existingDate[item.product_name] = item.qty;
                        }
                        productTotals[item.product_name] = (productTotals[item.product_name] || 0) + item.qty;
                    });
                }
            }
        });

        // Determine the top 4 products by quantity
        const topProducts = Object.keys(productTotals)
            .sort((a, b) => productTotals[b] - productTotals[a])
            .slice(0, 4);

        // Filter each date entry to include only the top 4 products
        const filteredProcessedData = processedData.map(entry => {
            const filteredEntry = { date: entry.date };
            topProducts.forEach(product => {
                filteredEntry[product] = entry[product] || 0;
            });
            return filteredEntry;
        });

        // console.log(filteredProcessedData);

        return filteredProcessedData;
    };


    // console.log(barchartdata)

    return (
        <Box m="20px">
            {!isDashboard ?
                <>
                    <Header title="Bar Chart" subtitle="Simple Bar Chart" />
                    <Box height="75vh">
                        <BarChart data={barchartdata} />
                    </Box>
                </> :
                <><Box height="250px">
                    <BarChart data={barchartdata} />
                </Box>
                </>}

        </Box>
    );
};

export default Bar;
