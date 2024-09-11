import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Theme } from "../Theme";
import axios from 'axios';
import { useEffect, useState } from "react";

import Header from "./Header";
import { useTheme } from "@mui/material";


const Contacts = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "id", headerName: "REGISTER ID", flex: 0.5 },            //Registerid
        { field: "fname", headerName: "NAME", flex: 1, cellClassName: "name-column--cell" },   
        { field: "pass", headerName: "PHONE NUMBER", flex: 1 },
        { field: "email", headerName: "EMAIL", flex: 1 },
        { field: "email", headerName: "ADDRESS", flex: 1 },
        { field: "email", headerName: "CITY", flex: 1 },
        { field: "email", headerName: "ZIPCODE", flex: 1 },
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
            <Header title="CONTECTS" subtitle=" List Of Contacts For Future Referece" />
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                    color: `${colors.grey[100]} !important`,
                }
            }}
            >
                {users.length > 0 ? (
                    <DataGrid rows={users} columns={columns} components={{Toolbar: GridToolbar}}/>
                ) : (
                    <h1>Loading...</h1>
                )}
            </Box>
        </Box>
    );
};

export default Contacts;
