// application
import { clone, delayResponse, error } from '~/fake-server/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/fake-server/database/vehicles';
import { debug } from 'console';

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
    // console.log(result);
    return Promise.resolve(result.sort())
}

export async function getYears(make: number, model: number): Promise<number[]> {
    // const result: number[] = [];
    let Years = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}`)
    .then(res => res.json())
    console.log(Years);
    const result: number[] = Years.Data.Year
    debugger
    // console.log(result);
    return Promise.resolve(result.sort().reverse())
}

export async function getSubmodels(make: number, model: number, year: number): Promise<string[]> {
    debugger
    const result: string[] = [];
    let Submodels = await fetch(`https://catalogueapi.super10.com.au/v1/aPms/TecAlliance/VehicleMetadata4x4?Make=${make}&Model=${model}&Year=${year}`)
    .then(res => res.json())
    Submodels.Data.Submodel.forEach((vehicle) => {
        if(result.indexOf(vehicle.submodel) === -1) {
            result.push(vehicle.submodel)
        }
    })
    debugger
    console.log(result);
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getVariants(make: string, model: string, year: number, submodel: string): Promise<string[]> {
    const result: string[] = []
    vehicles.filter((x) => x.make === make && x.model === model && x.year === year && x.submodel === submodel).forEach((vehicle) => {
        if(result.indexOf(vehicle.variant) === -1) {
            result.push(vehicle.variant)
        }
    })
    debugger
    console.log(result);
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getVehicles(make: string, model: string, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model && x.submodel === submodel && x.variant === variant);
    debugger
    console.log(result);
    return delayResponse(Promise.resolve(result.sort()), 750);
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
