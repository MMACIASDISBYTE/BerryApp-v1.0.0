import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import TotalGrowthBarChart from '../Default/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';
import { DolarHoyBlue } from 'ui-component/componentesCreados/DolarHoyBlue';
import RevenueCard from 'ui-component/cards/RevenueCard';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import { PresupuestoHelper } from 'helpers/PresupuestoHelper';


// ==============================|| HOME DASHBOARD ||============================== //
const Inicio = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const dev = 'dev-7qwkde4r318nfwz7/roles';    
    const userDetails = {
        id: user?.id || '#1Card_Phoebe',
        avatar: user.avatar || 'avatar-2.png',
        name: user?.name || 'Gaetano',
        role: user?.roll[dev] || 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: user?.email,
        contact: '253-418-5940',
        location: 'Herminahaven'
    };

    const [data, setData] = useState([]);
    const [distinctEstNumberCount, setDistinctEstNumberCount] = useState();
    const [countPerDate, setCountPerDate] = useState([]);

    const presupuesto = async () => {
        let data = await PresupuestoHelper.fetchData();
        const { distinctEstNumberCount, totalEstVersCount } = await PresupuestoHelper.amountDataFetch();
        const dataPerDate = await PresupuestoHelper.AmountDate();
        setData(data);
        setDistinctEstNumberCount(distinctEstNumberCount);
        setCountPerDate(dataPerDate);
    };
    
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        presupuesto();
        setLoading(false);
    }, []);
    console.log(countPerDate);


    return (
        <>
            {/* <h2>Componente Home</h2> */}
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <RevenueCard
                                primary="Presupuestos Realizados"
                                secondary={distinctEstNumberCount}
                                content="Presupuestos Realizados"
                                iconPrimary={MonetizationOnTwoToneIcon}
                                color={theme.palette.secondary.main}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <RevenueCard
                                primary="Versiones Realizadas"
                                secondary={data.length}
                                content="Versiones realizadas"
                                iconPrimary={AccountCircleTwoTone}
                                color={theme.palette.primary.main}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <DolarHoyBlue />
                                    {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                                </Grid>
                                {/* <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard isLoading={isLoading} />
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12}>
                            <TotalGrowthBarChart isLoading={isLoading} countPerDate={countPerDate} />
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} lg={4}>
                    <SubCard title="Basic Card Style 1">
                        <UserDetailsCard {...userDetails} />
                    </SubCard>
                </Grid> */}
            </Grid>
        </>
    )
}

export default Inicio;