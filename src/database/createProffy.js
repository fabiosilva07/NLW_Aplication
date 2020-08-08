//funcionalidade de cadastrar o proffy, aula/class e horario/dias disponiveis
module.exports = async function(db, {proffyValues, classValues, classesScheduleValues}){
    //insersão dos proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValues.name}",
            "${proffyValues.avatar}",
            "${proffyValues.whatsapp}",
            "${proffyValues.bio}"
        );
    `);
    
    //obtenção do id do proffy para ser usado no cadastro da aula/class
    const proffyID = insertedProffy.lastID;
    
    //insersão das aulas/classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValues.subject}",
            "${classValues.cost}",
            "${proffyID}"
        );
    `);
    
    //obteção do id da aula/class para ser usado no cadastro dos horarios/dias
    const classeID = insertedClass.lastID;

    //Insersão das datas e horarios disponiveis
    const insertedAllClassSchedulesValues = classesScheduleValues.map((classesScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedules (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classeID}",
                "${classesScheduleValue.weekday}",
                "${classesScheduleValue.time_from}",
                "${classesScheduleValue.time_to}"
            );
        `);
    });

    //aguarda todos as querys solicitadas anteriormente
    await Promise.all(insertedAllClassSchedulesValues);
};