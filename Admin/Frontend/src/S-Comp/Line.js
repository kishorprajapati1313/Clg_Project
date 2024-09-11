import { Box } from "@mui/material";
import Header from "./Header";
import Linechart from "../chart/Linechart";

const Line = () => {
        return (
            <Box m="20px">
                <Header title="Line Chart" subtitle="Simple Line Chart" />
                <Box height="75vh">
                    <Linechart />
                </Box>
            </Box>
        )
    }

export default Line;