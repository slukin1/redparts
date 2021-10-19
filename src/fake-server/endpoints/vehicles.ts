// application
import { clone, delayResponse, error } from '~/fake-server/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/fake-server/database/vehicles';

export async function getMakes(): Promise<object[]> {
    const result: object[] = [];
    let Makes = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4`)
    .then(res => res.json())

    Makes.Data.Make.forEach((make) => {
        if (result.indexOf(make.manuName) === -1) {
            result.push({key:make.manuName, value: make.Id});
        }
    });
    debugger
    return Promise.resolve(result.sort((a, b)=> (a.key).localeCompare(b.key)))
}

export async function getModels(make: number): Promise<object[]> {
    const result: object[] = [];
    let Models = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}`)
    .then(res => res.json())
    console.log(Models);
    
    Models.Data.Model.forEach((model) => {
        if (result.indexOf(model.ModelName) === -1) {
            result.push({key: model.ModelName, value:model.Id});
        }
    });
    debugger
    return Promise.resolve(result.sort())
}

export async function getYears(make: number, model: number): Promise<number[]> {
    // const result: number[] = [];
    let Years = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}`)
    .then(res => res.json())
    console.log(Years);
    const result: number[] = Years.Data.Year
    debugger
    return Promise.resolve(result.sort().reverse())
}

export async function getSubmodels(make: number, model: number, year: number): Promise<object[]> {
    const result: object[] = [];
    let Submodels = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}&Year=${year}`)
    .then(res => res.json())
    if(Submodels.Data.Submodel.length == 0) {
        return []
    }
    Submodels.Data.Submodel.forEach((submodel:any) => {
        if(result.indexOf(submodel.modelName) === -1) {
            let x = submodel.modelName + ' ' + submodel.typeName
            result.push({key:x, value:x})
        }
    })
    debugger
    return Promise.resolve(result.sort())
}

export async function getVariants(make: number, model: number, year: number, submodel: string): Promise<object[]> {
    const result: object[] = []
    let Variants = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}&Year=${year}`)
    .then(res => res.json())
    Variants.Data.Submodel.filter(x => `${x.modelName} ${x.typeName}` == submodel).forEach((variant) => {
        if(result.indexOf(variant.impulsionType) === -1) {
            let y = variant.impulsionType + ' ' + Math.floor(variant.cylinderCapacityLiter/100) + 'L ' + variant.cylinder + 'cyl ' +
            variant.powerKwFrom + 'KW ' + variant.motorCodes[0].motorCode 
            result.push({key:y, value:y})
        }
    })
    debugger
    return Promise.resolve(result.sort())
}

export async function getVehicles(make: number, model: number, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
    const result: IVehicle[] = []
    // const result: object[] = []
    let Engines = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}&Year=${year}`)
    .then(res => res.json())
    Engines.Data.Submodel.filter(x => `${x.modelName} ${x.typeName}` == submodel && (
        `${x.impulsionType + ' ' + Math.floor(x.cylinderCapacityLiter/100) + 'L ' + x.cylinder + 'cyl ' +
        x.powerKwFrom + 'KW ' + x.motorCodes[0].motorCode}` == variant
    )).forEach((engine) => {
        let y = engine.cylinderCapacityCcm + 'cc ' + engine.powerKwFrom + 'KW(' + engine.fuelType + ')'
        result.push({carId: engine.carId, make, model, year, submodel, variant, engine: y})
    })
    debugger
    return Promise.resolve(result.sort())
}

export function getVehicleByVin(vin: string): Promise<IVehicle> {
    const vinValue = vin.trim();

    const vehicle = vehicles.find((x) => x.model === 'Focus S');

    if (vinValue === '' || vinValue === 'error' || !vehicle) {
        return error('Page Not Found');
    }

    return Promise.resolve(vehicle);
}

export function getUserVehicles(): Promise<IVehicle[]> {
    return Promise.resolve(clone(userVehicles));
}

export function addUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);
    const vehicle = vehicles.find((x) => x.id === vehicleId);

    if (vehicle && index === -1) {
        userVehicles.push(vehicle);
    }

    return delayResponse(Promise.resolve());
}

export function removeUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);

    if (index !== -1) {
        userVehicles.splice(index, 1);
    }

    return delayResponse(Promise.resolve());
}
