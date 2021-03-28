const profilePic = require('../../../../assets/pesebre.jpg');

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
    { label: 'Rural', value: 'Rural' }
];

const recintos = [
    {
        label: 'UEF Miguel Letamendi',
        value: 'UEF Miguel Letamendi',
        from: 'Bachillero'
    },
    {
        label: 'UEF Anibal Gonzales',
        value: 'UEF Anibal Gonzales',
        from: 'Estancilla'
    },
    {
        label: 'UEF Magdalena Davalos',
        value: 'UEF Magdalena Davalos',
        from: 'Tosagua'
    },
    {
        label: 'UEF Pedro Schumacher',
        value: 'UEF Pedro Schumacher',
        from: 'Tosagua'
    },
    {
        label: 'UEF Eugenio Espejo',
        value: 'UEF Eugenio Espejo',
        from: 'Tosagua'
    },
    {
        label: 'El Tambo',
        value: 'El Tambo',
        from: 'Rural'
    },
    {
        label: 'El Junco',
        value: 'El Junco',
        from: 'Rural'
    },
    {
        label: 'Cerro Verde',
        value: 'Cerro Verde',
        from: 'Rural'
    },
    {
        label: 'La Botija',
        value: 'La Botija',
        from: 'Rural'
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
