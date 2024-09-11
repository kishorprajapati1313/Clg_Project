import React from 'react'
import { Box, useTheme, Typography } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Theme } from "../Theme"
import Header from './Header'

const Faq = () => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode)



    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Question Page" />
            <Box mt="10px">
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography color={colors.greenAccent[500]} variant='h5'>
                            An Importan Questions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, tempora repellendus, impedit quam sint illo quasi doloremque debitis sapiente illum obcaecati architecto nemo amet? Nisi nam dolore eos illo dicta?
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography color={colors.greenAccent[500]} variant='h5'>
                            An Importan Questions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, tempora repellendus, impedit quam sint illo quasi doloremque debitis sapiente illum obcaecati architecto nemo amet? Nisi nam dolore eos illo dicta?
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography color={colors.greenAccent[500]} variant='h5'>
                            An Importan Questions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, tempora repellendus, impedit quam sint illo quasi doloremque debitis sapiente illum obcaecati architecto nemo amet? Nisi nam dolore eos illo dicta?
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>

    )
}

export default Faq;