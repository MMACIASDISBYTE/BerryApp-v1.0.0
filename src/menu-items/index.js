import dashboard from './dashboard';
import application from './application';
import forms from './forms';
import pages from './pages';

// ELEMENTOS SECUNDARIOS
import elements from './elements';
import utilities from './utilities';
import support from './support';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //
    //aqui exporto en menuItems los items en forma de objeto para armar la barra navegadora
const menuItems = {
    items: [
        dashboard,
        application,
        forms
        //pages,
        // elements,
        // utilities,
        // support,
        // other
    ]
};

export default menuItems;
