// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import HomeIcon from '@mui/icons-material/Home';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'home',
            title: <FormattedMessage id="home" />,
            type: 'item',
            url: '/dashboard/home',
            icon: HomeIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'default',
        //     title: <FormattedMessage id="default" />,
        //     type: 'item',
        //     url: '/dashboard/default',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'analytics',
        //     title: <FormattedMessage id="analytics" />,
        //     type: 'item',
        //     url: '/dashboard/analytics',
        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false
        // }
        
    ]
};

export default dashboard;