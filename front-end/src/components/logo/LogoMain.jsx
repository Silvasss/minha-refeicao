// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <>
            <svg width="118" height="35" viewBox="0 0 118 35" fill="none" xmlns="http://www.w3.org/2000/svg">                
                <text
                    xmlSpace="preserve"
                    x={59.22}
                    y={25.71}
                    strokeWidth={0}
                    fontFamily="Helvetica"
                    fontSize={16}
                    fill={theme.palette.common.black}
                    fillOpacity="0.85"
                    fontWeight="bold"
                    textAnchor="middle"
                >Minha Refeição</text>
            </svg>
        </>
    );
};

export default Logo;