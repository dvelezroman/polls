const profilePic = require('../../../../assets/lasso.png');

const canton = 'Tosagua';

const parroquia = 'Tosagua';

const sexo = "Mujeres";

const key = 'tosagua';

const sexos = [
    {
        label: 'Mujeres',
        value: 'Mujeres',
    },
    {
        label: 'Hombres',
        value: 'Hombres',
    },
]
const parroquias = [
    { label: 'Tosagua', value: 'Tosagua' },
    { label: 'Bachillero', value: 'Bachillero' },
    { label: 'Angel Pedro Giler, Estancilla', value: 'Estancilla' },
];

const recintos = [
    {
        label: 'Miguel De Letamendi',
        value: 'Miguel De Letamendi',
        from: 'Bachillero'
    },
    {
        label: 'Anibal Gonzales Alava',
        value: 'Anibal Gonzales Alava',
        from: 'Estancilla'
    },
    {
        label: 'Magdalena Davalos',
        value: 'Magdalena Davalos',
        from: 'Tosagua'
    },
    {
        label: 'Pedro Schumacher',
        value: 'Pedro Schumacher',
        from: 'Tosagua'
    },
    {
        label: 'Eugenio Espejo',
        value: 'Eugenio Espejo',
        from: 'Tosagua'
    },
    {
        label: 'Carlos Julio Arosemena Tola',
        value: 'Carlos Julio Arosemena Tola',
        from: 'Tosagua'
    },
    {
        label: 'Jose Vicente Luque',
        value: 'Jose Vicente Luque',
        from: 'Tosagua'
    },
    {
        label: 'Maria Teresa Teron de Castro',
        value: 'Maria Teresa Teron de Castro',
        from: 'Tosagua'
    },
    {
        label: 'Jacinto Santos Verduga',
        value: 'Jacinto Santos Verduga',
        from: 'Tosagua'
    },
    {
        label: 'Gabriela Mero 24 de Mayo',
        value: 'Gabriela Mero 24 de Mayo',
        from: 'Tosagua'
    },
    {
        label: 'Jose Maria Huerta',
        value: 'Jose Maria Huerta',
        from: 'Tosagua'
    }
];

export const tosagua = {
    parroquias,
    recintos,
    profilePic,
    canton,
    parroquia,
    key,
    sexos,
};
