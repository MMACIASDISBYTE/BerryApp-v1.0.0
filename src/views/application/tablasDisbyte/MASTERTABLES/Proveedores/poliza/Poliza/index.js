import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';


// project imports
import ProductAdd from './PolizaAdd';
import MainCard from 'ui-component/cards/MainCard';

//vieja importacion de api generica de app
// import { useDispatch } from 'store';
// import { useDispatch, useSelector } from 'store';
// import { getProducts } from 'store/slices/customer';

// assets
import SaveIcon from '@mui/icons-material/Save'; // SE IMPORTA ICONO DE SAVE
import EditIcon from '@mui/icons-material/Edit'; // SE IMPORTA ICONO DE EDIT
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

//importacion del helper Poliza
import { PolizaHelper } from '../../../../../../../helpers/PolizaHelper';


// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options ATRIBUTOS DEL MODELO
const headCells = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'description',
        numeric: true,
        label: 'Description',
        align: 'center'
    },


];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell?.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ==============================|| Poliza LIST ||============================== //

const ProductList = () => {
    const theme = useTheme();

    //no utilizamos es de la version original
    // const dispatch = useDispatch();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        SetActualizacion(true);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');

    // SE AGREGA EL MODO EDICION
    const [editMode, setEditMode] = React.useState({});

    const [rows, setRows] = React.useState([]); //estoy almacenando la data Poliza
    
    // logica para que actuallizar / renderizar el componente a la hora de eliminar
    const [actualizacion, SetActualizacion] = React.useState(false);
    React.useEffect(()=>{
        fetchData();
        SetActualizacion(false);
    },[actualizacion]);

    // traigo data de Poliza Y LO ALMACENO EN EL STATE DE setRows
    const fetchData = async () => {
        const jsonData = await PolizaHelper.fetchData();
        setRows(jsonData);
    };
    React.useEffect(() => {
        fetchData();
        console.log(rows);
    }, []);

    // AQUI ELEMINO ELEMENTOS
    const handleDelete = async (id, description) => {
        // Aquí debes implementar la lógica para eliminar los productos seleccionados
        await PolizaHelper.deleteDataById(id);
        // para actualizar el componente
        SetActualizacion(true);
        console.log(`El Poliza ${description} con ${id}, ha sido eliminado`);
    };



    const handleEdit = async (id, description) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [id]: true,
        }));
        console.log(`El Poliza ${description} con ${id}, ha sido Editado`)
    };

    // TOMA EL CAMBIO DE textField
    const handleDescriptionChange = (e, id) => {
        const { value } = e.target;
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, description: value } : row
            )
        );
    };

    const handleUpdate = async (id) => {
        const registro = rows.find((row) => row.id === id);

        // Llamar a la función del helper para modificar el registro
        await PolizaHelper.updateDataById(id, registro);
        //para cuando se actualice el componente
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [id]: false,
        }));
    };

    // QUITO ESTE METODO Q ME TRAE CONFLICTO DE LA API ORIGINAL
    // const { products } = useSelector((state) => state.customer);
    // React.useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);
    // React.useEffect(() => {
    //     setRows(products);
    // }, [products]);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');
        
        //cuando se vacia el search renderiza nuevamente gracias al setActualizacion
        if(event.target.value == ''){
            SetActualizacion(true);
        };

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                // las propiedades que debe listar/buscar, deben de ser igual al modelo
                const properties = [
                    'id',
                    'description',
                ];

                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard title="Terminal List" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Terminal"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>


                        {/* BOTON COPY */}
                        {/* <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip> */}

                        {/* BOTON IMPRESION */}
                        {/* <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip> */}

                        {/* BOTON FILTRO */}
                        {/* <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip> */}

                        {/* product add & dialog */}
                        <Tooltip title="Add item">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <ProductAdd open={open} handleCloseDialog={handleCloseDialog} />
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.description);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.description)}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                #{row.id}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.description)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}

                                                {/* AQUI SE LISTA EL ATRIBUTO DESCRIPCION */}
                                                {row.description}{' '}
                                            </Typography>


                                        </TableCell>

                                            {editMode[row.id] ? (
                                                <>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="Enter new data*"
                                                            // defaultValue="Ingrese el nombre de Poliza"
                                                            placeholder='Ingrese la modificacion de Poliza'
                                                            value={row.description}
                                                            onChange={ (e) => handleDescriptionChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleUpdate(row.id)}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton size="large">
                                                            <DeleteIcon fontSize="small" onClick={() => handleDelete(row.id, row.description)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <IconButton onClick={() => handleEdit(row.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                                </>
                                            )}

                                        {/* BOTON DE ELIMINAR */}
                                        {/*
                                            <Tooltip title="Delete">
                                                <IconButton size="large">
                                                    <DeleteIcon fontSize="small" onClick={() => handleDelete(row.id, row.description)} />
                                                </IconButton>
                                            </Tooltip>
                                            */}

                                        {/* BOTON DE EDITAR */}
                                        {/* <Tooltip title="Edit">
                                                <IconButton size="large">
                                                    <EditIcon fontSize="small" onClick={() => handleEdit(row.id, row.description)} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell> */}

                                        {/* <TableCell>{row.category}Hola</TableCell> */}

                                        {/* <TableCell align="right">{row.price}$ precio-</TableCell>
                                        <TableCell align="center">{row.date} 02-11-1989</TableCell>
                                        <TableCell align="right">{row.qty} cantidad</TableCell> */}


                                        {/* <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton size="large" aria-label="more options">
                                                <MoreHorizOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </TableCell> */}

                                    {/* AQUI CERRAMOS LA TABLA */}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ProductList;
