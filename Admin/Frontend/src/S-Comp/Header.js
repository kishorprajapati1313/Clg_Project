import { Typography, Box, useTheme } from "@mui/material";
import { Theme } from "../Theme"

const Header = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode)

    return <Box ml="30px">
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb:"5px"}}>{title}</Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>{subtitle}</Typography>

    </Box>
}

export default Header