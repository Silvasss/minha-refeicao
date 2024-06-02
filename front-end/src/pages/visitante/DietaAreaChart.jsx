import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function DietaAreaChart({ series }) {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;

    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, "#606c38", '#dc2f02', "#ffb703"],
            xaxis: {
                labels: {
                    style: {
                        colors: [
                            secondary
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            }
        }));
    }, [primary, secondary, line, theme]);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

DietaAreaChart.propTypes = { series: PropTypes.array };