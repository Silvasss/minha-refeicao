import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// assets
import UserOutlined from '@ant-design/icons/UserOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import MedicineBoxOutlined from '@ant-design/icons/MedicineBoxOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';


export default function MuiTabs() {
    const [value, setValue] = useState(false);

    const location = useLocation();

    useEffect(() => {
        location.pathname === '/perfil/conta' && setValue(0)

        location.pathname === '/perfil/conta/update' && setValue(1)

        location.pathname === '/perfil/conta/medicacao' && setValue(2)

        location.pathname === '/perfil/conta/dieta' && setValue(3)

        location.pathname === '/perfil/conta/settings' && setValue(4)
    }, [location.pathname]);

    return (        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            { value !== false && <Tabs value={value} aria-label="account profile tab" variant="scrollable" scrollButtons="auto">
                <Tab icon={<UserOutlined fontSize="small" />} href='/perfil/conta' iconPosition="start" label="Perfil" sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }} />

                <Tab icon={<FileTextOutlined fontSize="small" />} href='/perfil/conta/update' iconPosition="start" label="Pessoal" sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }} />
                
                <Tab icon={<MedicineBoxOutlined fontSize="small" />} href='/perfil/conta/medicacao' iconPosition="start" label="Medicação" sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }} />
                
                <Tab icon={<DashboardOutlined fontSize="small" />} href='/perfil/conta/dieta' iconPosition="start" label="Dieta" sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }} />

                <Tab icon={<SettingOutlined fontSize="small" />} href='/perfil/conta/settings' iconPosition="start" label="Configurações" sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }} />  
            </Tabs>
            }
        </Box>
    );
}