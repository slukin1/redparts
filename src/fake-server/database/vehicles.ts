// application
import { IVehicle } from '~/interfaces/vehicle';
import { makeIdGenerator } from '~/fake-server/utils';
import { IVehicleDef } from '~/fake-server/interfaces/vehicle-def';

const getNextId = makeIdGenerator();

function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs.map((def) => {
        const range = typeof def.year === 'number' ? [def.year, def.year] : def.year;
        const years = [];

        for (let i = range[0]; i <= range[1]; i += 1) {
            years.push(i);
        }

        return years.map((year) => ({
            id: getNextId(),
            make: def.make,
            model: def.model,
            year,
            submodel: def.submodel,
            variant: def.variant,
            engine: def.engine,
        }));
    }).reduce((acc, v) => [...acc, ...v], []);
}

const vehiclesDef: IVehicleDef[] = [
    {
        make: 'Ford',
        model: 'Focus S',
        year: 2011,
        submodel: 'Focus S-1',
        variant: 'Focus S-2',
        engine: '2.0L 1742DA L4 FI Turbo',
    },
    {
        make: 'Audi',
        model: 'Q7 Premium',
        year: 2019,
        submodel: 'Q7 Premium-1',
        variant: 'Q7 Premium-2',
        engine: '3.0L 5626CC L6 QK',
    },
    {
        make: 'Kia',
        model: 'Rio LX',
        year: 2015,
        submodel: 'Rio LX-1',
        variant: 'Rio LX-2',
        engine: '1.6L 8306JK L5 RL',
    },
    {
        make: 'BMW',
        model: 'M5',
        year: 2008,
        submodel: 'M5-1',
        variant: 'M5-2',
        engine: '5.0L 8351XZ V10 DB',
    },
    {
        make: 'Alfa Romeo',
        model: '4C',
        year: [2008, 2018],
        submodel: '4C-1',
        variant: '4C-2',
        engine: '1.7L 1742CC L4 FI Turbo',
    },
    {
        make: 'Aston Martin',
        model: 'DB11',
        year: [2008, 2018],
        submodel: 'DB11-1',
        variant: 'DB11-2',
        engine: '5.2L 5204CC V12 FI Turbo',
    },
    {
        make: 'Dodge',
        model: 'Challenger GT',
        year: [2008, 2018],
        submodel: 'Challenger GT-1',
        variant: 'Challenger GT-2',
        engine: '3.6L 3604CC V6 FI',
    },
    {
        make: 'Lexus',
        model: 'LS460',
        year: [2008, 2018],
        submodel: 'LS460-1',
        variant: 'LS460-2',
        engine: '4.6L 4608CC V8 FI',
    },
    {
        make: 'Nissan',
        model: 'Juke S',
        year: [2008, 2018],
        submodel: 'Juke S-1',
        variant: 'Juke S-1',
        engine: '1.6 1618CC L4 FI Turbo',
    },
];

export const vehicles: IVehicle[] = makeVehicles(vehiclesDef);

export const userVehicles: IVehicle[] = vehicles.slice(0, 3);
