import type {
  ScoredVehicle,
  UserPreferences,
  Vehicle,
} from '@/lib/types';

const WEIGHTS = {
  budget: 0.3,
  type: 0.25,
  usage: 0.15,
  fuel: 0.1,
  priority: 0.1,
  maintenance: 0.1,
};

const normalize = (value: number, min: number, max: number) => {
  if (max === min) return 1;
  return (value - min) / (max - min);
};

const calculateBudgetScore = (
  vehicle: Vehicle,
  preferences: UserPreferences
) => {
  const [minBudget, maxBudget] = preferences.budget;
  const overlapMin = Math.max(minBudget, vehicle.price.min);
  const overlapMax = Math.min(maxBudget, vehicle.price.max);

  if (overlapMin > overlapMax) return 0; // No overlap

  const avgVehiclePrice = (vehicle.price.min + vehicle.price.max) / 2;
  const budgetMidpoint = (minBudget + maxBudget) / 2;
  const priceCloseness = 1 - Math.abs(avgVehiclePrice - budgetMidpoint) / budgetMidpoint;
  
  return Math.max(0, priceCloseness);
};

const calculateTypeScore = (
  vehicle: Vehicle,
  preferences: UserPreferences
) => {
  return preferences.vehicleTypes.includes(vehicle.type) ? 1 : 0;
};

const calculateUsageScore = (
  vehicle: Vehicle,
  preferences: UserPreferences,
  vehicles: Vehicle[]
) => {
  const allMileages = vehicles.map(v => v.type === 'EV' ? v.mileage.highway / 4 : v.mileage.highway); // rough conversion for range to kmpl
  const minMileage = Math.min(...allMileages);
  const maxMileage = Math.max(...allMileages);
  
  let relevantMileage = 0;
  if (vehicle.type === 'EV') {
    // Convert km range to an arbitrary comparable scale
    relevantMileage = ((vehicle.mileage.city + vehicle.mileage.highway) / 2) / 4;
  } else {
    switch (preferences.usage) {
      case 'City':
        relevantMileage = vehicle.mileage.city;
        break;
      case 'Highway':
        relevantMileage = vehicle.mileage.highway;
        break;
      case 'Mixed':
        relevantMileage = (vehicle.mileage.city + vehicle.mileage.highway) / 2;
        break;
    }
  }
  return normalize(relevantMileage, minMileage, maxMileage);
};

const calculateFuelScore = (
  vehicle: Vehicle,
  preferences: UserPreferences
) => {
  return preferences.fuelTypes.includes(vehicle.fuel_type) ? 1 : 0;
};

const calculatePriorityScore = (
  vehicle: Vehicle,
  preferences: UserPreferences,
  vehicles: Vehicle[]
) => {
    const allPowers = vehicles.map(v => v.power);
    const minPower = Math.min(...allPowers);
    const maxPower = Math.max(...allPowers);
    const powerScore = normalize(vehicle.power, minPower, maxPower);

    const allMileages = vehicles.map(v => (v.mileage.city + v.mileage.highway) / 2);
    const minMileage = Math.min(...allMileages);
    const maxMileage = Math.max(...allMileages);
    const mileageScore = normalize((vehicle.mileage.city + vehicle.mileage.highway) / 2, minMileage, maxMileage);

    return preferences.priority === 'Performance' ? powerScore : mileageScore;
}

const calculateMaintenanceScore = (
  vehicle: Vehicle,
  preferences: UserPreferences,
  vehicles: Vehicle[]
) => {
    const allCosts = vehicles.map(v => v.maintenanceCost);
    const minCost = Math.min(...allCosts);
    const maxCost = Math.max(...allCosts);

    // Inverse score: higher cost = lower score
    const maintenanceScore = 1 - normalize(vehicle.maintenanceCost, minCost, maxCost);
    
    switch (preferences.maintenance) {
        case 'Low':
            return maintenanceScore > 0.7 ? 1 : maintenanceScore * 0.5;
        case 'Medium':
            return 1; // No penalty or bonus
        case 'High':
            return maintenanceScore < 0.3 ? 1 : 1 - maintenanceScore * 0.5;
    }
};

export const getRecommendations = (
  preferences: UserPreferences,
  vehicles: Vehicle[]
): ScoredVehicle[] => {
  const scoredVehicles = vehicles.map((vehicle) => {
    const budgetMatch = calculateBudgetScore(vehicle, preferences);
    const typeMatch = calculateTypeScore(vehicle, preferences);
    const usageMatch = calculateUsageScore(vehicle, preferences, vehicles);
    const fuelCompatibility = calculateFuelScore(vehicle, preferences);
    const priorityMatch = calculatePriorityScore(vehicle, preferences, vehicles);
    const maintenanceSuitability = calculateMaintenanceScore(vehicle, preferences, vehicles);

    // If type or fuel doesn't match at all, it's a very poor recommendation
    const hardFilter = typeMatch > 0 && fuelCompatibility > 0 ? 1 : 0.1;

    const overallScore =
      (budgetMatch * WEIGHTS.budget +
        typeMatch * WEIGHTS.type +
        usageMatch * WEIGHTS.usage +
        fuelCompatibility * WEIGHTS.fuel +
        priorityMatch * WEIGHTS.priority +
        maintenanceSuitability * WEIGHTS.maintenance) * hardFilter;

    return {
      vehicle,
      scores: {
        budgetMatch: Math.round(budgetMatch * 100),
        usageMatch: Math.round(usageMatch * 100),
        fuelCompatibility: Math.round(fuelCompatibility * 100),
        maintenanceSuitability: Math.round(maintenanceSuitability * 100),
        overallScore: Math.round(overallScore * 100),
      },
    };
  });

  return scoredVehicles
    .filter(v => v.scores.overallScore > 10) // Filter out very low scores
    .sort((a, b) => b.scores.overallScore - a.scores.overallScore)
    .slice(0, 3);
};
