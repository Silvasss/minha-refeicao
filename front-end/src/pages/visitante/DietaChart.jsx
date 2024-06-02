import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from '../../components/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
    chart: {
        type: 'bar',
        height: 430,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 4,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Dieta']
    },
    yaxis: {
        title: {
            text: '(gramas)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `${val}g`;
            }
        }
    },
    legend: {
        show: false
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false
                }
            }
        }
    ]
};

// ==============================|| Dieta COLUMN CHART ||============================== //

export default function DietaChart({ seriesChart, seriesPesoChart, seriesAreaChart }) {
    const theme = useTheme();

    const [legend, setLegend] = useState({
        carboidrato: true,
        proteina: true,
        gordura: true,
        fibra: true
    });

    const { carboidrato, proteina, gordura, fibra } = legend;

    const { secondary } = theme.palette.text;

    const line = theme.palette.divider;

    const primaryMain = theme.palette.primary.main;

    const [series, setSeries] = useState(seriesChart);

    const handleLegendChange = (event) => {
        setLegend({ ...legend, [event.target.name]: event.target.checked });
    };

    const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        if (carboidrato && proteina && gordura && fibra) {
            setSeries(seriesChart);
        } else if (carboidrato) {
            setSeries([
                {
                    name: 'Carboidrato',
                    data: seriesAreaChart[0].data,
                    color: '#1976d2'
                }
            ]);
        } else if (proteina) {
            setSeries([
                {
                    name: 'Proteina',
                    data: seriesAreaChart[1].data,
                    color: "#606c38"
                }
            ]);
        } else if (gordura) {
            setSeries([
                {
                    name: 'Gordura',
                    data: seriesAreaChart[2].data,
                    color: '#dc2f02'
                }
            ]);
        } else if (fibra) {
            setSeries([
                {
                    name: 'Fibra',
                    data: seriesAreaChart[3].data,
                    color: "#ffb703"
                }
            ]);
        } else {
            setSeries([]);
        }
    }, [carboidrato, proteina, gordura, fibra, seriesAreaChart, seriesChart]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [primaryMain, "#606c38", '#dc2f02', "#ffb703"],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
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
            },
            plotOptions: {
                bar: {
                    columnWidth: xsDown ? '60%' : '30%'
                }
            }
        }));
    }, [secondary, line, primaryMain, carboidrato, proteina, xsDown]);

    return (
        <MainCard sx={{ mt: 1 }} content={false}>
            <Box sx={{ p: 2.5, pb: 0 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1.5}>
                        <Typography variant="h6" color="secondary">
                            Peso
                        </Typography>

                        <Typography variant="h4">{seriesPesoChart}Kg</Typography>
                    </Stack>

                    <FormControl component="fieldset">
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox checked={carboidrato} onChange={handleLegendChange} name="carboidrato" />} label="Carboidrato" />

                            <FormControlLabel control={<Checkbox sx={{ color: "#606c38", '&.Mui-checked': { color: "#606c38", }, }} checked={proteina} onChange={handleLegendChange} name="proteina" />} label="Proteína" />

                            <FormControlLabel control={<Checkbox sx={{ color: "#dc2f02", '&.Mui-checked': { color: "#dc2f02", }, }} checked={gordura} onChange={handleLegendChange} name="gordura" />} label="Gordura" />

                            <FormControlLabel control={<Checkbox sx={{ color: "#ffb703", '&.Mui-checked': { color: "#ffb703", }, }} checked={fibra} onChange={handleLegendChange} name="fibra" />} label="Fibra" />
                        </FormGroup>
                    </FormControl>
                </Stack>

                <Box id="chart" sx={{ bgcolor: 'transparent' }}>
                    <ReactApexChart options={options} series={series} type="bar" height={360} />
                </Box>
            </Box>
        </MainCard>
    );
}

DietaChart.propTypes = { seriesChart: PropTypes.any, seriesPesoChart: PropTypes.string, seriesAreaChart: PropTypes.array };