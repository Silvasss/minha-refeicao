import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from '../../../../../components/@extended/Avatar';
import MainCard from '../../../../../components/MainCard';
import Transitions from '../../../../../components/@extended/Transitions';
import { store } from '../../../../../contexts/auth-reducer/auth'

// assets
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LoginOutlined from '@ant-design/icons/LoginOutlined';


// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
    const theme = useTheme();

    const anchorRef = useRef(null);

    const user = store.getState().userState.user

    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.100';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            {!user ?
                <>
                    <ButtonBase
                        sx={{
                            p: 0.25,
                            bgcolor: 'transparent',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'secondary.lighter' },
                            '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
                        }}
                        aria-label="botão entrar"
                        component={Link}
                        to={'/auth/login'}
                    >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <LoginOutlined />

                            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                                Entrar
                            </Typography>
                        </Stack>
                    </ButtonBase>
                </>
                :
                <>
                    <ButtonBase
                        sx={{
                            p: 0.25,
                            bgcolor: open ? iconBackColorOpen : 'transparent',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'secondary.lighter' },
                            '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
                        }}
                        aria-label="open profile"
                        ref={anchorRef}
                        aria-controls={open ? 'profile-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <Avatar alt="profile user" size="sm" />
                        </Stack>
                    </ButtonBase>

                    <Popper
                        placement="bottom-end"
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 9]
                                    }
                                }
                            ]
                        }}
                    >
                        {({ TransitionProps }) => (
                            <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
                                <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MainCard elevation={0} border={false} content={false}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                                                    <Tab
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            textTransform: 'capitalize'
                                                        }}
                                                        icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                        label="Profile"
                                                        {...a11yProps(0)}
                                                    />
                                                    <Tab
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            textTransform: 'capitalize'
                                                        }}
                                                        icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                        label="Setting"
                                                        {...a11yProps(1)}
                                                    />
                                                </Tabs>
                                            </Box>

                                            <TabPanel value={value} index={0} dir={theme.direction}>
                                                <ProfileTab />
                                            </TabPanel>

                                            <TabPanel value={value} index={1} dir={theme.direction}>
                                                <SettingTab />
                                            </TabPanel>
                                        </MainCard>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </Popper>
                </>
            }
        </Box>
    );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
