import { Box, useTheme, Typography } from "@mui/material"
import { Theme } from "../Theme"
import Progresscircle from "./Progresscircle"

const Statebox = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }} >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <Progresscircle progress={progress} />
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }} >
                    {subtitle}
                </Typography>

                <Typography variant="h5" fontWeight="Italic" sx={{ color: colors.greenAccent[600] }} >
                    {increase}
                </Typography>
            </Box>

        </Box>
    )

}

export default Statebox;