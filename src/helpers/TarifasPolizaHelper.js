export const TarifasPolizaHelper = {
    baseUrl: process.env.REACT_APP_BASE_URL,
    rutaTabla: 'TarifasPoliza',
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    },

 //Consulta a la API
 fetchData: async function () {
    try {
        const response = await fetch(`${this.baseUrl}/${this.rutaTabla}`);
        const jsonData = await response.json();
        const jsonDataStatus = await response;
        return [jsonData, jsonDataStatus];
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}, 
    //CRUD CANAL 
    // Crear un registro en la tabla
    createData: async function (newData) {
        try {
            const response = await fetch(`${this.baseUrl}/${this.rutaTabla}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const jsonData = await response.json();
            console.log('Helper', newData)
            return jsonData;
        } catch (error) {
            console.error('Error', error);
            return null;
        }
    },
    // Leer un registro de la tabla por ID
    readDataById: async function(id) {
        try {
            const response = await fetch(`${this.baseUrl}/${this.rutaTabla}/${id}`);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error', error);
            return null;
        }
    },
    // Actualizar un registro de la tabla por ID
    updateDataById: async function (id, updatedData) {
        try {
            const response = await fetch(`${this.baseUrl}/${this.rutaTabla}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            console.log(updatedData);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error', error);
            return null;
        }
    },
    // Eliminar un registro de la tabla por ID
    deleteDataById: async function (id) {
        try {
            const response = await fetch(`${this.baseUrl}/${this.rutaTabla}/${id}`, {
                method: 'DELETE',
            });
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error', error);
            return null;
        }
    },

}