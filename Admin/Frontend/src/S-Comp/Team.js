import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Theme } from "../Theme";
import axios from 'axios';
import { useEffect, useState } from "react";
import AdminPanelSettingsOutlineIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlineIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlineIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";

const Team = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const colors = Theme(theme.palette.mode); 

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "fname", headerName: "NAME", flex: 1, cellClassName: "name-column--cell" },
        { field: "pass", headerName: "PASSWORD", flex: 1 },
        { field: "email", headerName: "EMAIL", flex: 1 },
        {
            field: "access", headerName: "ACCESS LEVEL", flex: 1, renderCell: ({ row }) => {
                return (
                    <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" 
                        backgroundColor={row.access === "admin" ? colors.greenAccent[600] : row.access === "marchent" ? colors.blue[600] : colors.orange[600]}
                        borderRadius="4px" sx={{ ml:"1%"}}>
                        {row.access === "admin" && <AdminPanelSettingsOutlineIcon />}
                        {row.access === "marchent" && <SecurityOutlineIcon />}
                        {row.access === "user" && <LockOpenOutlineIcon />}

                        <Typography color={colors.grey[100]} sx={{ ml: "5px"}}>
                            {row.access}
                        </Typography>
                    </Box>
                )
            }
        },
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
            <Header title="TEAM" subtitle="Managing the Team Member" />
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
                }
            }}
            >
                {users.length > 0 ? (
                    <DataGrid rows={users} columns={columns} />
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Team;
