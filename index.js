
const express = require ('express');
const bodyParser = require ('body-parser');
import cors from 'cors';
const rutas = require ('./routes');
const path = require('path');


const app = express();
app.set('port',process.env.PORT || 4000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))




app.use('/api',rutas);

export let puerto_db = app.get('port');
app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
}); 




