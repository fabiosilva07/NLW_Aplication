//valores fixos das materias/subjects
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
];

//valores fixos dos dias da semana/weekday
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

//funcionalidade para transformar a materia/subject recebida em numero para o valor respectivo em string
function getSubject(subjectNumber){
    const position = +subjectNumber -1;

    return subjects[position];
};

//funcionalidade para tranformar a hora recebida em formato hh:mm em numero unico em minutos
function convertHoursToMinutes(time){
    const [hours, minutes] = time.split(":");

    return Number((hours * 60) + Number(minutes));
};

//exportação das funcionalidades
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
};