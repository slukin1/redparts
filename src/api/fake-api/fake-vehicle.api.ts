/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { IVehicle } from '~/interfaces/vehicle';
import { VehicleApi } from '~/api/base';
import {
    addUserVehicles,
    getMakes,
    getModels,
    getUserVehicles,
    getVehicleByVin,
    getVehicles,
    getYears,
    getSubmodels,
    getVariants,
    removeUserVehicles,
} from '~/fake-server/endpoints';

export class FakeVehicleApi extends VehicleApi {

    getMakes(): Promise<string[]> {
        return getMakes();
    }

    getModels(make: string): Promise<string[]> {
        return getModels(make);
    }

    getYears(make: string, model: string): Promise<number[]> {
        return getYears(make, model);
    }
    getSubmodels(make: string, model: string, year: number): Promise<string[]> {
        return getSubmodels(make, model, year)
    }
    getVariants(make: string, model: string, year: number, submodel: string): Promise<string[]> {
        return getVariants(make, model, year, submodel)
    }
    getVehicles(make: string, model: string, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
        return getVehicles(make, model, year, submodel, variant);
    }

    getVehicleByVin(vin: string): Promise<IVehicle> {
        return getVehicleByVin(vin);
    }

    getUserVehicles(): Promise<IVehicle[]> {
        return getUserVehicles();
    }

    addUserVehicle(vehicleId: number): Promise<void> {
        return addUserVehicles(vehicleId);
    }

    removeUserVehicle(vehicleId: number): Promise<void> {
        return removeUserVehicles(vehicleId);
    }
}
