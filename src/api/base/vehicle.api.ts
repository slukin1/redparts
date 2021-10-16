/* eslint-disable import/prefer-default-export */

// application
import { IVehicle } from '~/interfaces/vehicle';

export abstract class VehicleApi {

    abstract getMakes(): Promise<string[]>;

    abstract getModels(make: string): Promise<string[]>;

    abstract getYears(make: string, model: string): Promise<number[]>;

    abstract getSubmodels(make: string, model: string, year: number): Promise<string[]>;

    abstract getVariants(make: string, model: string, year: number, submodel: string): Promise<string[]>;

    abstract getVehicles(make: string, model: string, year: number, submodel: string, variant: string): Promise<IVehicle[]>;

    abstract getVehicleByVin(vin: string): Promise<IVehicle>;

    abstract getUserVehicles(): Promise<IVehicle[]>;

    abstract addUserVehicle(vehicleId: number): Promise<void>;

    abstract removeUserVehicle(vehicleId: number): Promise<void>;
}
