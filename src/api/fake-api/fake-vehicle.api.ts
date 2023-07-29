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
    //getSubmodels(make: number, model: number, year: number): Promise<string[]> {
  getSubmodels(make: string, model: string, year: number): Promise<string[]> {
    // Get a list of submodels for a given make, model, and year.
    let submodels: string[] = [];
    if (make == "Honda" && model == "Accord" && year == 2015) {
      submodels = ["LX", "EX", "EX-L", "Touring"];
    } else if (make == "Toyota" && model == "Camry" && year == 2015) {
      submodels = ["LE", "SE", "SE Hybrid", "XLE"];
    } else if (make == "Ford" && model == "F-150" && year == 2015) {
      submodels = ["XL", "XLT", "Lariat", "Platinum"];
    } else if (make == "Chevy" && model == "Silverado" && year == 2015) {
      submodels = ["WT", "LT", "LT Trail Boss", "High Country"];
    }

    // Return a Promise of a list of string submodels.
    return Promise.resolve(submodels);
        //return getSubmodels(make, model, year)
    }
    //getVariants(make: number, model: number, year: number, submodel: string): Promise<string[]> {
  getVariants(make: string, model: string, year: number, submodel: string): Promise<string[]> {
    // Get a list of variants for a given make, model, year, and submodel.
    let variants: string[] = [];
    if (make == "Honda" && model == "Accord" && year == 2015 && submodel == "LX") {
      variants = ["LX-S", "LX-P", "LX-G"];
    } else if (make == "Toyota" && model == "Camry" && year == 2015 && submodel == "LE") {
      variants = ["LE", "LE Plus", "SE"];
    } else if (make == "Ford" && model == "F-150" && year == 2015 && submodel == "XL") {
      variants = ["XL", "XLT", "Lariat"];
    } else if (make == "Chevy" && model == "Silverado" && year == 2015 && submodel == "WT") {
      variants = ["WT", "LT", "LT Trail Boss"];
    }

    // Return a Promise of a list of string variants.
    return Promise.resolve(variants);
        //return getVariants(make, model, year, submodel)
    }
    //getVehicles(make: number, model: number, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
getVehicles(make: string, model: string, year: number, submodel: string, variant: string): Promise<IVehicle[]> {
// Get a list of vehicles for a given make, model, year, submodel, and variant.
let vehicles: IVehicle[] = [];
if (make == "Honda" && model == "Accord" && year == 2015 && submodel == "LX" && variant == "LX-S") {
vehicles = [
  {
      carId: 1,
    make: 1,
    model: 1,
    year: 2015,
    submodel: "LX",
    variant: "LX-S",
  //  price: 25,000,
 //   mileage: 10,000,
 //   fuelEfficiency: 30 mpg,
      engine: "2.0L L4",
  },
];
} else if (make == "Toyota" && model == "Camry" && year == 2015 && submodel == "LE" && variant == "LE") {
vehicles = [
{
carId: 1,
make: 1,
model: "Camry",
year: 2015,
submodel: "LE",
variant: "LE",
//price: 25,500,
//mileage: 15,000,
//fuelEfficiency: 35 mpg,
},
];
} else if (make == "Ford" && model == "F-150" && year == 2015 && submodel == "XL" && variant == "XL") {
vehicles = [
{
carId: 1,
make: 3,
model: "F-150",
year: 2015,
submodel: "XL",
variant: "XL",
//price: 35,000,
//mileage: 20,000,
//fuelEfficiency: 20 mpg,
},
];
} else if (make == "Chevy" && model == "Silverado" && year == 2015 && submodel == "WT" && variant == "WT") {
vehicles = [
{
id: 4,
make: "Chevy",
model: "Silverado",
year: 2015,
submodel: "WT",
variant: "WT",
price: 37,500,
mileage: 25,000,
fuelEfficiency: 18 mpg,
},
];
}

// Return a Promise of a list of IVehicles.
return Promise.resolve(vehicles);
        //return getVehicles(make, model, year, submodel, variant);
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
