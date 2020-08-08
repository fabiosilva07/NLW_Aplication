//arquivo apenas para teste das funcionalidades de adicionar os dados ao banco de dados
const Database = require("./db");
const createProffy = require("./createProffy");

//Testando as funcionalidades com o banco de dados
Database.then(async (db) => {
    //valores ficticios usado no teste
    const proffyValues = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "984708936",
        bio: `Entusiasta das melhores tecnologias de química avançadaApaixonado por explodir coisas
         em laboratório e por mudara vida das pessoas através de experiências.
         Mais de 200.000 pessoasjá passaram por uma das minhas explosões.`
    };

    const classValues = {
        subject: 1,
        cost: "20"
    };

    const classesScheduleValues = [
        {
            weekday: [0],
            time_from: [700],
            time_to: [1200]
        },
        {
            weekday: [1],
            time_from: [400],
            time_to: [700]
        }
    ];

    //Adicionar dados no Banco
    await createProffy (db, {proffyValues, classValues, classesScheduleValues});

    //Select com todos os professores (proffys)
    const selectedProffys = await db.all(`SELECT * FROM proffys`);
    //console.log(selectedProffys);

    //Select com todos classes que pertensam a determinado professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1; 
    `);
    //console.log(selectedClassesAndProffys);

    //Select com os horarios disponiveis em determinados dias e horarios
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedules.*
        FROM class_schedules
        WHERE class_schedules.class_id = 1
        AND class_schedules.weekday = 0
        AND class_schedules.time_from <= 800
        AND class_schedules.time_to > 800
    `);
    //console.log(selectedClassesSchedules);
})