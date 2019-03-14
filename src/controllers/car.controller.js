import boom from 'boom';

import Car from '../models/Car';

// Get all cars
export const getCars = async () => {
  try {
    const cars = await Car.find();
    return cars;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single car by ID
export const getSingleCar = async (req) => {
  try {
    const { params: { id } } = req;
    const car = await Car.findById(id);
    return car;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new car
export const addCar = async (req) => {
  try {
    const car = new Car(req.body);
    return car.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing car
export const updateCar = async (req) => {
  try {
    const { params: { id } } = req;
    const car = req.body;
    const { ...updateData } = car;
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a car
export const deleteCar = async (req) => {
  try {
    const { params: { id } } = req;
    const car = await Car.findByIdAndRemove(id);
    return car;
  } catch (err) {
    throw boom.boomify(err);
  }
};
