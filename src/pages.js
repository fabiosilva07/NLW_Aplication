//imports
const { subjects, weekdays, getSubject , convertHoursToMinutes} = require("./utils/format");
const Database = require("./database/db");

//funcionalidades de renderização das pages
//pagina principal
function pageIndex(req, res){
    return res.render("index.html");
};

//pagina de consulta de proffys
async function pageEstudar(req, res){
    const filters = req.query;

    /* if(!filters.subject && !filters.weekday && filters.time == ""){
        try {
            const db = await Database;
            const proffys = await db.all(`
                SELECT classes.*, proffys.*
                FROM proffys
                JOIN classes ON (classes.proffy_id = proffys.id)
                WHERE EXISTS (
                    SELECT class_schedules.*
                    FROM class_schedules
                    WHERE class_schedules.class_id = classes.id);          
            `);
            
            proffys.map((proffy) => {
                proffy.subject = getSubject(proffy.subject);
            });

            return res.render("estudar.html", { proffys, filters, subjects, weekdays });
        } catch (error) {
            console.log(error)
        }
    }; */

    //condicional caso alguns dos campos estejam vazios ao submit
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("estudar.html", { filters, subjects, weekdays });
    };

    //funcionalidade para converter o valor recebido em horas para minutos
    const timeToMinutes = convertHoursToMinutes(filters.time);

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedules.*
            FROM class_schedules
            WHERE class_schedules.class_id = classes.id
            AND class_schedules.weekday = ${filters.weekday}
            AND class_schedules.time_from <= ${timeToMinutes}
            AND class_schedules.time_to > ${timeToMinutes}
        ) AND classes.subject = "${filters.subject}";
    `;
    
    //bloco try para obter e reeviar os resultados da query
    try{
        const db = await Database;
        const proffys = await db.all(query);

        proffys.map((proffy) => {
            //funcionalidade para transformar o numero da materia em seu respectivo nome
            proffy.subject = getSubject(proffy.subject);
        });
    
        return res.render("estudar.html", { proffys, filters, subjects, weekdays });
    } catch(error) {
        console.log(error);
    };

    return res.render("estudar.html", {proffys, filters, subjects, weekdays});
};

//pagina de cadastro de proffys
function pageCadastro(req, res){
    return res.render("cadastro.html", {subjects, weekdays});
};

//pagina de redirecionamento dos dados do formulario para realizar o cadastro
async function pageSaveCadastro(req, res){
    const createProffy = require("./database/createProffy");
    
    //valores do proffy
    const proffyValues = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    };

    //valores da aula/class
    const classValues = {
        subject: req.body.subject,
        cost: req.body.cost
    };

    //valores dos horarios e dias disponiveis
    const classesScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        };
    });

    //bloco try para cadastrar o professor, aula/class e horaios/dias disponiveis
    try {
        const db = await Database;
        await createProffy(db, {proffyValues, classValues, classesScheduleValues});

        //String de redicionamento da pagina com os filtros do cadastro anterior
        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];

        return res.redirect("/estudar" + queryString);
    } catch (error) {
        console.log(error);
    };  
};

//exportação das funcionalidades
module.exports = {
    pageIndex,
    pageEstudar,
    pageCadastro,
    pageSaveCadastro
};