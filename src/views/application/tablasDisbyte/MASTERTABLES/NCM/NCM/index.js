// LISTED 11/7/2023 11:17AM 



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
import MainCard from 'ui-component/cards/MainCard';

//importamos el useNavigate para manejar navegaciones y redireccciones
import { redirect, useNavigate } from "react-router-dom";

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
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';

//importacion del helper fwette
import { NcmHelper } from '../../../../../../helpers/NcmHelper';
import { orange, red } from '@material-ui/core/colors';






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
        id: 'pos',
        numeric: false,
        label: 'Posicion',
        align: 'center'
    },

    {
        id: 'description',
        numeric: true,
        label: 'Description',
        align: 'center'
    },
    {
        id: 'anexo',
        numeric: true,
        label: 'Anexo',
        align: 'center'
    },
    {
        id: 'die',
        numeric: true,
        label: 'die',
        align: 'center'
    },
    {
        id: 'te',
        numeric: true,
        label: 'Te',
        align: 'center'
    },
    {
        id: 'iva',
        numeric: true,
        label: 'IVA',
        align: 'center'
    },
    {
        id: 'iva_ad',
        numeric: true,
        label: 'IVA Ad.',
        align: 'center'
    },
    {
        id: 'imp_int',
        numeric: true,
        label: 'Impuestos int',
        align: 'center'
    },
    {
        id: 'licensia',
        numeric: false,
        label: 'Tipo Lic.',
        align: 'center'
    },
    {
        id: 'bit_bk',
        numeric: false,
        label: 'bit_bk',
        align: 'center'
    },
    {
        id: 'vc',
        numeric: false,
        label: 'vc',
        align: 'center'
    },
    {
        id: 'peso_valor',
        numeric: true,
        label: 'Pedro/Valor',
        align: 'center'
    }

];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {<TableCell padding="checkbox" sx={{ pl: 3 }}>
                    {/*<Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />*/}
                </TableCell>}
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

// ==============================|| SEGURO LIST ||============================== //

const ProductList = () => {
    //almaceno en una constante el navigate para poder utilizarlo
    const navigate = useNavigate();
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
    // Este flag indica que al menos una entrada esta siendo editada e inhibe la edicion para 
    // todas las demas
    const [oneEditing, setOneEditing] = React.useState(false);
    // Este flag indica que se esta editando una entrada nueva. Sirve para indicar al click del 
    // diskette (cassette) que hacer, si llamar a update o a insert.
    const [enableEditPK, setEnableEditPK] = React.useState(false);

    const [rows, setRows] = React.useState([]); //estoy almacenando la data fwette
    const [rowsOrig, setRowsOrig] = React.useState([]); //estoy almacenando la data fwette

    // logica para que actuallizar / renderizar el componente a la hora de eliminar
    const [actualizacion, SetActualizacion] = React.useState(false);
    React.useEffect(() => {
        fetchData();
        SetActualizacion(false);
    }, [actualizacion]);

    const fetchData = async (accessToken) => {
        try{
            //traigo 2 parametros del helper, uno es la data y el otro es el response crudo de la api para manejar los redirect
            const [jsonData, jsonDataStatus] = await NcmHelper.fetchData();
            // const jsonData = await BancoHelper.fetchData(accessToken);

            //console.log(jsonData);
            //console.log(jsonDataStatus.status);
            setRows(jsonData);
            setRowsOrig(jsonData);
            // aca manejo los errores, y rederijo hay q importar navegate
            if(jsonDataStatus.status !== 200){
                navigate('/pages/error');
            }
            //console.log(accessToken);
            // console.log('Data del json: ', jsonData)
            //setRows(jsonData);
        }catch(error){
            console.log(error);
            console.log('Prueba')
            navigate('/pages/error');
        }
    };
    React.useEffect(() => {
        fetchData();
        console.log(rows);
    }, []);

    // AQUI ELEMINO ELEMENTOS
    const handleDelete = async (code) => {
        // Aquí debes implementar la lógica para eliminar los productos seleccionados
        await NcmHelper.deleteDataByCode(code);
        // para actualizar el componente
        SetActualizacion(true);
        console.log(`La Posicion ${code} ha sido eliminado`);
    };



    const handleEdit = async (pos, id) => {

        setOneEditing(true);
        console.log(editMode);

        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [id]: true,
        }));

        console.log(editMode);
        console.log(`La posicion: ${pos}, ID ${id}, ha sido Editado`)
    };


    // HANDLERS de actualizacion:
    // Por el momento hay un HANDLER por cada CAMPO de la tabla.
    // TOMA EL CAMBIO "DESCRIPCION"

    const handlePosChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, code: value } : row
            )
        );
    };

    const handleDescriptionChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, description: value } : row
            )
        );
    };

    // TOMA EL CAMBIO DEL campo "ANEXO"
    const handleAnexoChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, anexo: value } : row
            )
        );
    };

    // TOMA EL CAMBIO DE textField "DIE" 
    const handleDIEChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, die: value } : row
            )
        );
    };

    // TOMA EL CAMBIO DE textField "TE"
    const handleTEChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, te: value } : row
            )
        );
    };
    // TOMA EL CAMBIO DE textField "IVA"
    const handleIVAChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, iva: value } : row
            )
        );
    };
    // TOMA EL CAMBIO DE textField "IVA Adic"
    const handleIVAadChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, iva_ad: value } : row
            )
        );
    };
    // TOMA EL CAMBIO DE textField "Imp_int"
    const handleIMP_INTChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, imp_int: value } : row
            )
        );
    };

    // TOMA EL CAMBIO DE textField "Licensia"
    const handleLICChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, licensia: value } : row
            )
        );
    };

    // TOMA EL CAMBIO DE textField "BIT_BK"
    const handleBIT_BKChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, bit_bk: value } : row
            )
        );
    };
    // TOMA EL CAMBIO DE textField "VC"
    const handleVCChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, vc: value } : row
            )
        );
    };
    // TOMA EL CAMBIO DE textField "Peso/Valor"
    const handlePESO_VALORChange = (e, id) => {
        const { value } = e.target;

        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, peso_valor: value } : row
            )
        );
    };

    const handleUpdate = async (id) => {
        setEnableEditPK(false);
        setOneEditing(false);
        const registro = rows.find((row) => row.id === id);
        // cuando finalmente se hace update a la base, actualizo la copia original de ROWS.
        // de forma de mantenerlo coherente. Quiza esta linea deberia ejecutarse LUEGO de corroborar
        // que la operacion a la base se ejecuto con exito.
        setRowsOrig(rowsOrig.map((myRow) => id === myRow.id ? registro : myRow));
        // Llamar a la función del helper para modificar el registro
        await NcmHelper.updateDataById(registro.code, registro);
        console.log(registro)
        //para cuando se actualice el componente
        // SetActualizacion(true);
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [id]: false,
        }));
    };

    // Cuando presionan AGREGAR, se crea una entrada dummy en la lista de ROWS con los contenidos que aparecen aca
    // Luego la RIW queda como si estuviere en modo edicion, pendiente de que completen los valores.
    const handleAddRowToTable = ()=>{
        // Contenido x defecto que aparece dentro de las celdas cuando la entrada es creada
        const newData = {
            code: "PK !",
            id: 0,
            description: "!EDIT",
            anexo: "!EDIT",
            die: 0,
            te: 0,
            iva: 0,
            iva_ad: 0,
            imp_int: 0,
            licensia: "!EDIT",
            bit_bk: "!EDIT",
            vc: "!EDIT",
            peso_valor: 0
          };
          
          rows.unshift(0);
          rows[0]=newData;
          console.log(rows);
        //   SetActualizacion(true);
        
        // Cancelo los botones de editar y borrar a todas las otras entradas
        setOneEditing(true);
        // Aviso que estoy creando una entrada (DISKETTE?INSERT:UPDATE)
        setEnableEditPK(true);
        // Lo marco como en modo edicion tambien.
        setEditMode((prevEditMode) => ({
         ...prevEditMode,
        [0]: true,
        }));

        

    }

    // "SUSTITUYE" a NCMadd. El add se hace desde el mismo form.
    // El caso en que le dan SAVE a una entrada DUMMY creada con el metodo handleRowToTable, se usara por unica vez
    // este metodo y no UPDATE. Se usa el mismo ICONO (DISKETTE ... AKA CASSETTE). Hay un flag que indica
    // que se esta CREANDO una entrada y redirige el clik en el diskette a handleupdate o handleinsert.
    const handleInsert = () => {

        if(rows[0].code==="" || rows    [0].code==="PK !")
        {
            return;
        }

        setEnableEditPK(false);  
        setOneEditing(false);
        NcmHelper.createData(rows[0]) // Pasar el nombre del data al manejador handleAdd
          .then((response) => {
              // Actualizar el estado con la nueva lista de elementos
              // setDataList([...dataList, response]);
          })
          .catch((error) => {
              console.error('Error', error);
          });
          setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [0]: false,
        }))
    };

    // Salen del modo EDICION sin guardar cambios.
    // Dado que los cambios se van guardando a medida que cambian los textboxes, no tengo forma de volver
    // a la data original, excepto que haga un render de nuevo
    // Mantengo una copia de los ROWS originales y si me dan cancelar sustituyo a "rows" con estos.
    // Limitacion: Si habia mas ee una edicion en curso, cancelar una implica cancelar TODAS. 
    // Lo ideal seria que solo de pudiera editar una a la vez.
    const handleReject = (id) => {
        setOneEditing(false);
        setEnableEditPK(false);
        setRows(rowsOrig);
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [id]: false,
        }));
        SetActualizacion(true);
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
        if (event.target.value == '') {
            SetActualizacion(true);
        };

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                // las propiedades que debe listar/buscar, deben de ser igual al modelo
                const properties = [
                    'code',
                    'id',
                    'description',
                    'anexo',
                    'die',
                    'te',
                    'iva',
                    'iva_ad',
                    'imp_int',
                    'licensia',
                    'bit_bk',
                    'vc',
                    'peso_valor'
                ];

        

                let containsQuery = false;

                properties.forEach((property) => {
                    //console.log(newString)
                    if (row[property]?.toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            console.log(newRows);
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
        <MainCard title="Maestro NCM" content={false}>
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
                            placeholder="Buscar NCM"
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
                        {!oneEditing &&
                            <>
                            <Tooltip title="Add item">
                            <Fab
                                color="primary"
                                size="small"
                                // onClick={handleClickOpenDialog}
                                onClick={handleAddRowToTable}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        {/* <ProductAdd open={open} handleCloseDialog={handleCloseDialog} /> */}
                        </>}
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
                                        {
                                            // Para cada ROW: Si la ROW no esta en modo edicion, se muestra la info en CELLs. Hay una CELL por atributo
                                            // Se listan todas aca abajo. 
                                            // Si la ROW esta en modo edicion, ir a la linea 990 (aprox) donde se muestra la ROW pero en forma de cuadros de 
                                            // ingreso de datos. Es la misma lista repetida 2 veces. Una para mostrar como celdas y la otra para mostrar como 
                                            // campos de ingreso.                                        
                                            !editMode[row.id] && (
                                                <>


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
                                                            {row.code}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO ANEXO */}
                                                            {row.anexo}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO "DIE" */}
                                                            {row.die}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO "TE" */}
                                                            {row.te}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO IVA */}
                                                            {row.iva}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO IVA Adic */}
                                                            {row.iva_ad}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO imp_int */}
                                                            {row.imp_int}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO Tipo de Licensia */}
                                                            {row.licensia}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO BIT_BK */}
                                                            {row.bit_bk}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO VC */}
                                                            {row.vc}{' '}


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

                                                            {/* AQUI SE LISTA EL ATRIBUTO Peso/Valor */}
                                                            {row.peso_valor}{' '}


                                                        </Typography>


                                                    </TableCell>
                                                </>
                                            )}

                                        {
                                            // Para cada ROW: Si esta en modo edicion en lugar de motrar los campos como celdas, los muestro como cuadros de texto
                                            // de ingreso.
                                            editMode[row.id] ? (
                                                <>


                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic2"
                                                            fullWidth label="ID"
                                                            value={row.id}  
                                                        />
                                                    </TableCell>
                                                    {/* En este caso especial, el NCM es el PK
                                                        NUNCA HABILITAR la edicion del NCM, salvo que se este creando un  nuevo
                                                        NCM. Cuando se pide agregar una entrada, el flag enableEditPK se activa */}
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic2"
                                                            fullWidth label="Posicion Aranc."
                                                            value={row.code}
                                                            onChange={(e) => enableEditPK&&handlePosChange(e, row.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="Descripcion"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.description}
                                                            onChange={(e) => handleDescriptionChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="Anexo"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.anexo}
                                                            onChange={(e) => handleAnexoChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="Die"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.die}
                                                            onChange={(e) => handleDIEChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="TE"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.te}
                                                            onChange={(e) => handleTEChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="IVA"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.iva}
                                                            onChange={(e) => handleIVAChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="IVA Adic."
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.iva_ad}
                                                            onChange={(e) => handleIVAadChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="Impuestos Int"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            placeholder=""
                                                            value={row.imp_int}
                                                            onChange={(e) => handleIMP_INTChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="LICENSIA"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder=""
                                                            value={row.licensia}
                                                            onChange={(e) => handleLICChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="BIT_BK"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder=""
                                                            value={row.bit_bk}
                                                            onChange={(e) => handleBIT_BKChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="VC"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.vc}
                                                            onChange={(e) => handleVCChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth label="PESO/VALOR"
                                                            //defaultValue="Ingrese el nombre de fwette"
                                                            //placeholder='Nueva Descrip'
                                                            value={row.peso_valor}
                                                            onChange={(e) => handlePESO_VALORChange(e, row.id)} // evento que detecta cambio en el textfield
                                                        />
                                                    </TableCell>


                                                    <TableCell>
                                                        <Tooltip title="Edit">
                                                            {/* Uso el icono del diskette (CASSETTE) para hacer update pero tambien para hacer insert si es una nueva entrada
                                                                Cuando una entrada esta siendo creada, el flag enableEditPK esta seteado. */}
                                                            <IconButton onClick={() => enableEditPK?handleInsert():handleUpdate(row.id)}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>

                                                    <TableCell>
                                                        {/* Botton Deshacer */}
                                                        <Tooltip title="Cancel">
                                                            <IconButton onClick={() => handleReject(row.id)}>
                                                                <UndoOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                {/* Solo muestro los iconos de edicion y borrado si ninguna entrada esta siendo editada
                                                 La idea es que solo pueda haber una entrada en modo edicion en un momento dado */}
                                                    {!oneEditing && <TableCell>
                                                        <Tooltip title="Delete">
                                                            <IconButton size="large">
                                                                <DeleteIcon fontSize="small" onClick={() => handleDelete(row.code)} />
                                                            </IconButton>

                                                        </Tooltip>
                                                        <IconButton onClick={() => handleEdit(row.code, row.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>}
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
