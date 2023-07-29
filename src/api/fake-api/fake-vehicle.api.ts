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

    //getMakes(): Promise<object[]> {
    getMakes(): Promise<string[]> {
        // Get a list of car makes.
        let makes = ["Honda", "Toyota", "Ford", "Chevy"];
        // Return a Promise of a list of string makes.
        return Promise.resolve(makes);
        //return getMakes();
    }

    //getModels(make: number): Promise<number[]> {
    getModels(make: string): Promise<string[]> {
    // Get a list of car models for a given make.
    let models: string[] = [];
    if (make == "Honda") {
      models = ["Accord", "Civic", "CR-V"];
    } else if (make == "Toyota") {
      models = ["Camry", "Corolla", "RAV4"];
    } else if (make == "Ford") {
      models = ["F-150", "Mustang", "Explorer"];
    } else if (make == "Chevy") {
      models = ["Silverado", "Camaro", "Tahoe"];
    }

    // Return a Promise of a list of string models.
    return Promise.resolve(models);
        //return getModels(make);
    }

    //getYears(make: number, model: number): Promise<number[]> {
    getYears(make: string, model: string): Promise<number[]> {
    // Get a list of years for a given make and model.
    let years: number[] = [];
    if (make == "Honda" && model == "Accord") {
      years = [2015, 2016, 2017, 2018, 2019];
    } else if (make == "Toyota" && model == "Camry") {
      years = [2015, 2016, 2017, 2018, 2019];
    } else if (make == "Ford" && model == "F-150") {
      years = [2015, 2016, 2017, 2018, 2019];
    } else if (make == "Chevy" && model == "Silverado") {
      years = [2015, 2016, 2017, 2018, 2019];
    }

    // Return a Promise of a list of number years.
    return Promise.resolve(years);
        //return getYears(make, model);
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
