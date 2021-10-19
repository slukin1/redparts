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

    getMakes(): Promise<object[]> {
        return getMakes();
    }

    getModels(make: number): Promise<number[]> {
        return getModels(make);
    }

    getYears(make: number, model: number): Promise<number[]> {
        return getYears(make, model);
    }
    getSubmodels(make: number, model: number, year: number): Promise<string[]> {
        return getSubmodels(make, model, year)
    }
    getVariants(make: number, model: number, year: number, submodel: string): Promise<string[]> {
        return getVariants(make, model, year, submodel)
    }
    getVehicles(make: number, model: number, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
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
