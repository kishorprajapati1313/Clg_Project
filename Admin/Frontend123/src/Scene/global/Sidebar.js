import React from 'react';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link as RouterLink } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';  // Corrected import path
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Theme } from '../../Theme';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import OrderIcon from '@mui/icons-material/LibraryBooks';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  return (
    <MenuItem active={selected === title}
      style={{
        color: colors.grey[100],
        fontSize: "100px",  // Set the desired font size
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >

      <RouterLink to={to}>
        <Typography>{title}</Typography>
      </RouterLink>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setselected] = useState("Dashboard");

  return (
    <Box
      sx={{

        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user" width="100px" height="100px" src={`../../asstes/user.png`} style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/*  Menu Item   */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} >
            {/* DSHBOARD */}
            <Item title="DashBoard" to="/admin/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setselected} />

            {/* DATA */}
            <Typography variant='h6' color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Data</Typography>
            <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Contacta Information" to="/admin/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Invoice Balance" to="/admin/invoice" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setselected} />

            {/* PAGES */}
            <Typography variant='h6' color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
            <Item title="Profile Form" to="/admin/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Products" to="/admin/product" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Order" to="/admin/allorder" icon={<OrderIcon />} selected={selected} setSelected={setselected} />
            <Item title="Calender" to="/admin/calender" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="FAQ Page" to="/admin/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setselected} />

            {/* CHARTS */}
            <Typography variant='h6' color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Charts </Typography>
            <Item title="Bar Chart" to="/admin/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Pie Chart" to="/admin/pie" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setselected} />
            <Item title="Line Chart" to="/admin/Line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setselected} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;