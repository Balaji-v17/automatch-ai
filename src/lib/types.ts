export type VehicleType = 'Bike' | 'Car' | 'SUV' | 'EV' | 'Scooter';
export type UsagePattern = 'City' | 'Highway' | 'Mixed';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
export type MaintenanceSensitivity = 'Low' | 'Medium' | 'High';
export type Priority = 'Mileage' | 'Performance';

export type Vehicle = {
  id: string;
  brand: string;
  model_name: string;
  model_year: number;
  type: VehicleType;
  fuel_type: FuelType;
  segment: string;
  price: {
    min: number;
    max: number;
  };
  mileage: {
    city: number;
    highway: number;
  };
  power: number; // in BHP
  seatingCapacity: number;
  maintenanceCost: number; // yearly in INR
  popularity_score: number;
  features: string[];
  images: {
    front: string;
    secondary: string;
  };
};

export type UserPreferences = {
  budget: [number, number];
  vehicleTypes: VehicleType[];
  usage: UsagePattern;
  fuelTypes: FuelType[];
  priority: Priority;
  maintenance: MaintenanceSensitivity;
};

export type RecommendationScore = {
  budgetMatch: number;
  usageMatch: number;
  fuelCompatibility: number;
  maintenanceSuitability: number;
  overallScore: number;
};

export type ScoredVehicle = {
  vehicle: Vehicle;
  scores: RecommendationScore;
};
