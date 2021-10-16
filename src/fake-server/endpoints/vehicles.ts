// application
import { clone, delayResponse, error } from '~/fake-server/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/fake-server/database/vehicles';

export function getMakes(): Promise<string[]> {
    const result: string[] = [];

    vehicles.forEach((vehicle) => {
        if (result.indexOf(vehicle.make) === -1) {
            result.push(vehicle.make);
        }
    });
    debugger
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getModels(make: string): Promise<string[]> {
    const result: string[] = [];

    vehicles.filter((x) => x.make === make).forEach((vehicle) => {
        if (result.indexOf(vehicle.model) === -1) {
            result.push(vehicle.model);
        }
    });
    debugger
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getYears(make: string, model: string): Promise<number[]> {
    const result: number[] = [];

    vehicles.filter((x) => x.make === make && x.model === model).forEach((vehicle) => {
        if (result.indexOf(vehicle.year) === -1) {
            result.push(vehicle.year);
        }
    });
    debugger
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getSubmodels(make: string, model: string, year: number): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model);
    debugger
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getVariants(make: string, model: string, year: number, submodel: string): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model && x.submodel === submodel);
    debugger
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getVehicles(make: string, model: string, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model && x.submodel === submodel && x.variant === variant);
    debugger
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
