import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from '@nivo/bar'
import { Theme } from "../Theme";
import { mockBarData as data } from "../Data/data";

const TestBarChart = ({ data, keys, isDashboard = false}) => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);
    console.log(data)
    // const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'time') : [];

    console.log(keys)
    return (
        <>
        <ResponsiveBar
        data={data}
        theme={{
            axis:{
                domain:{
                    line: {
                        stroke: colors.grey[100]  // Error likely occurs here
                    }
                },
                legend : {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                ticks: {
                    line: {
                        stroke: colors.grey[100],
                        strokeWidth:1
                    },
                    text: {
                        fill: colors.grey[200]
                    }
                },

            },
            legends:{
                text: {
                    fill: colors.grey[100]
                }
            }
        }}
        keys={keys}
        indexBy="time"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.15}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat=" >-"
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'time',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'keys',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={36}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.9'
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.keys+": "+e.formattedValue+" in country: "+e.indexValue}
    />
</>
    );
};

export default TestBarChart;