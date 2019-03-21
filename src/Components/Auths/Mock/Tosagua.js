const profilePic = require('../../../../assets/pesebre.jpg');

const canton = 'Tosagua';

const parroquia = 'Tosagua';

const recinto = 'U.E.F. Magdalena Davalos';

const key = 'tosagua';

const parroquias = [
    { label: 'Tosagua', value: 'Tosagua' },
    { label: 'Bachillero', value: 'Bachillero' },
    { label: 'Angel Pedro Giler, Estancilla', value: 'Estancilla' },
    { label: 'Rural', value: 'Rural' }
];

const recintos = [
    {
        label: 'U.E.F. Miguel Letamendi',
        value: 'U.E.F. Miguel Letamendi',
        from: 'Bachillero'
    },
    {
        label: 'U.E.F. Anibal Gonzales',
        value: 'U.E.F. Anibal Gonzales',
        from: 'Estancilla'
    },
    {
        label: 'U.E.F. Magdalena Davalos',
        value: 'U.E.F. Magdalena Davalos',
        from: 'Tosagua'
    },
    {
        label: 'U.E.F. Pedro Schumacher',
        value: 'U.E.F. Pedro Schumacher',
        from: 'Tosagua'
    },
    {
        label: 'U.E.F. Eugenio Espejo',
        value: 'U.E.F. Eugenio Espejo',
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
    recinto,
    key
};
