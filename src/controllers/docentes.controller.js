//requiero traer los docentes con sus atrubutos
const docentes = require('../../datos/docentes.json')
//obtener todos los docentes
const getAllDocentes =(req,res)=>{
    res.json(docentes).status(200)
}
//obtener un docente por Legajo
const getDocenteByLegajo= (req,res)=>{
     //req.params : sería para obtener información de un 
    //elemento de un catálogo de colecciones
  const legajo =req.params.legajo
  const resultado = docentes.find( docente => docente.legajo == legajo)
  if(resultado) {
      res.status(200).json(resultado).status(200)
  } else {
      res.status(404).json({ mensaje: `El docente con legajo ${legajo} no fue encontrado`} )
  } 
}
//eliminar un Docente por Legajo
const deleteDocenteByLegajo=(req,res)=>{
   const legajo = req.params.legajo
  //findIndex : retorna el primer índice
 // en el que se puede encontrar un elemento dado en el array
 const indiceDocente = docentes.findIndex(docente => docente.legajo = legajo)
 if(indiceDocente==-1) {
    res.status(404).
    json(
        {
        resultado: "La operación de borrado no pudo ser realizada",
        mensaje: `El docente con legajo ${legajo} no fue encontrado`
        }
    )
}else{
    const docente = docentes[indiceDocente];
    //cambia el contenido de un array eliminando 
    //elementos existentes y/o agregando nuevos elementos.
        const resultado = docentes.splice(indiceDocente,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  docente : docente
            }
        )
    }       
}
//Crear un docente 
const createDocente = (req, res) => {
    //req.body : nos sirve para obtener los valores
    // que un formulario envía a nuestra API.
    const docentesData = req.body
    const existeDoc = docentes.find(docente => docente.legajo == docentesData.legajo )
    if (!existeDoc) {
        if( ! docentesData.concursado)
            docentesData.concursado = false
    
        if (!docentesData.nombre ) {
            res.status(400).json({mensaje: `No puedo generar el docente con legajo ${docentesData.legajo} por no tener nombre `})    
        } else  {
            docentes.push(docentesData)
            res.status(201).json({mensaje: `El docente con legajo ${docentesData.legajo} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El docente con legajo ${docentesData.legajo} ya existe en la base de datos`})
    }
}
//modifico el concursado de los docentes
const updateDocente = (req, res)=>{
    const legajo = req.params.legajo
    const docentesData = req.body 
    const indice = docentes.findIndex(docente => docente.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docentesData.nombre
        if (docentesData.concursado!==undefined) {
            docentes[indice].concursado = docentesData.concursado 
        }
        res.status(201).json({"docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}
module.exports = { 
    getAllDocentes, 
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    createDocente,
    updateDocente
}