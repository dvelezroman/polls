const profilePic = require('../../../../assets/perez.jpg');

const canton = 'Portoviejo';
const parroquia = 'Portoviejo';
const key = 'portoviejo';

const parroquias = [
    { label: 'Portoviejo', value: 'Portoviejo' },
    { label: '12 de Marzo', value: '12 de Marzo' },
    { label: '18 de Octubre', value: '18 de Octubre' },
    { label: 'Andres de Vera', value: 'Andres de Vera' },
    { label: 'Colon', value: 'Colon' },
    { label: 'Francisco Pacheco', value: 'Francisco Pacheco' },
    { label: 'San Pablo', value: 'San Pablo' },
    { label: 'Simon Bolivar', value: 'Simon Bolivar' },
    { label: 'Picoaza', value: 'Picoaza' },
    { label: 'Abdon Calderon', value: 'Abdon Calderón' },
    { label: 'Alhajuela', value: 'Alhajuela (Bajo Grande)' },
    { label: 'Chirijos', value: 'Chirijos' },
    { label: 'Crucita', value: 'Crucita' },
    { label: 'Pueblo Nuevo', value: 'Pueblo Nuevo' },
    { label: 'San Placido', value: 'San Plácido' },
    { label: 'Riochico', value: 'Riochico' }
];

const recintos = [];

export const portoviejo = {
    parroquias,
    recintos,
    profilePic,
    canton,
    parroquia,
    key
};
