// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { CommentOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ListItemButton component="a" href="/perfil/conta/settings">
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>

                <ListItemText primary="Configurações de Conta" />
            </ListItemButton>

            <ListItemButton component="a" href="/sobre">
                <ListItemIcon>
                    <QuestionCircleOutlined />
                </ListItemIcon>

                <ListItemText primary="Sobre" />
            </ListItemButton>

            <ListItemButton component="a" href="/feedback">
                <ListItemIcon>
                    <CommentOutlined />
                </ListItemIcon>

                <ListItemText primary="Feedback" />
            </ListItemButton>
        </List>
    );
}
