import Header from "../../S-Comp/Header"
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material"
import { mockTransactions } from "../../Data/data"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Linechart from "../../chart/Linechart";
import BarChart from "../../chart/Barchart";
import Statebox from "../../chart/Statebox";
import { Theme } from "../../Theme";
import ProgressCircle from "../../chart/Progresscircle";
import Bar from "../../S-Comp/bar";


const Dashboard = () => {
  const theme = useTheme()
  const colors = Theme(theme.palette.mode);

  return <Box m="20px">

    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Welcome To Your Dashboard" />

      <Box>
        <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>
    </Box>

    {/* GRID & CHARTS */}

    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" mt="10px">

      {/* ROW 1 */}

      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <Statebox title="12,361" subtitle="Email Sent" progress="0.75" increase="+14%"
          icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />

      </Box>

      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <Statebox title="431,225" subtitle="Sales Obtain" progress="0.50" increase="+21%"
          icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />

      </Box>

      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <Statebox title="32,441" subtitle="New Client" progress="0.30" increase="+5%"
          icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />

      </Box>

      <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
        <Statebox title="1,354,654" subtitle="Traffic Inbound" progress="0.80" increase="+43%"
          icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />

      </Box>

      {/* ROW 2 */}

      <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
        <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignContent="center">

          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} >
              Revenus Generated
            </Typography>

            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]} >
              $59,345,34
            </Typography>

          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
        </Box>

        <Box height="250px" ml="-20px">
          <Linechart isDashboard={true} />
        </Box>
      </Box>

      {/* TRANSACTIONS */}

      <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]} p="15px">
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Recent Transaction
          </Typography>
        </Box>
        {mockTransactions.map((transaction, i) => (
          <Box key={`${transaction.txId}-${i}`} display="flex" justifyContent="space-between" alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`} p="15px" >

            <Box>
              <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                {transaction.txId}
              </Typography>
              <Typography color={colors.grey[100]} >
                {transaction.user}
              </Typography>
            </Box>
            <Box color={colors.grey[100]}> {transaction.date}</Box>
            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
              ${transaction.cost}

              {transaction.date}
            </Box>
          </Box>
        ))}
      </Box>
          
      {/* ROW 3 */}
      <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px" >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px"}} >
              $48,234 Revenue Generated
            </Typography>
            <Typography >
              Include Extra Expansive and Costa
            </Typography>

          </Box>
      </Box>

          {/* BARCHAR */}
      <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} >
          <Typography variant="h5" fontWeight="600" sx={{ p: "30px 30px 0 30px"}}>
            Sales/Order Quality
          </Typography>
          <Box height="250px"  mt="-20px" >
            <Bar isDashboard={true} />
            <BarChart isDashboard={true} />
          </Box>
      </Box>

      <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600" sx={{ mb: "15px"}}>
            GeoGrphy Based Traffic Comming Soon
          </Typography>
          <Box height="250px"  mt="-20px" p="90px" fontSize="30px">
            Comming Soon...
            {/* <BarChart isDashboard={true} /> */}
          </Box>
      </Box>

    </Box>
  </Box>
}

export default Dashboard;