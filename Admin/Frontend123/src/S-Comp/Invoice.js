import { Box,Typography,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Theme } from "../Theme";
import axios from 'axios';
import { useEffect, useState } from "react";

import Header from "./Header";


const Invoice = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "fname", headerName: "NAME", flex: 1, cellClassName: "name-column--cell" },   
        { field: "pass", headerName: "PHONE NUMBER", flex: 1 },
        { field: "email", headerName: "EMAIL", flex: 1 },
        { field: "id", headerName: "COST", flex: 1, renderCell: (params) =>{
            <Typography color={colors.greenAccent[500]}>
                ${params.row.id}
            </Typography>
        } },
        { field: "email", headerName: "Date", flex: 1 },
        
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:1414/adminuser");
                // Generate custom IDs starting from 1
                const usersWithCustomIds = response.data.map((user, index) => ({ ...user, id: index + 1 }));

                setUsers(usersWithCustomIds);

            } catch (error) {
                console.error("Error fetching User", error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <Box m="10px">
            <Header title="INVOICES" subtitle=" List Of Invoice Balance" />
            <Box m="40px 0 0 0" height="74vh" overflow="auto" 
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell":{
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller":{
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer":{
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`
                }
            }}
            >
                {users.length > 0 ? (
                    <DataGrid checkboxSelection rows={users} columns={columns} />
                ) : (
                    <h1>Loading...</h1>
                )}
            </Box>
        </Box>
    );
};

export default Invoice;
