
import type { Vehicle } from './types';

export const vehicles: Vehicle[] = [
  {
    "id": "1", "brand": "Maruti Suzuki", "model_name": "Swift", "model_year": 2024, "type": "Car", "fuel_type": "Petrol", "segment": "Hatchback",
    "price": { "min": 650000, "max": 970000 }, "mileage": { "city": 18, "highway": 25 }, "power": 89, "seatingCapacity": 5, "maintenanceCost": 15000,
    "popularity_score": 95, "features": ["LED Projector Headlamps", "Cruise Control", "9-inch SmartPlay Pro+"],
    "images": { "front": "https://shivamautozone.com/wp-content/uploads/2024/05/Swift-2-768x433.webp", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "2", "brand": "Hyundai", "model_name": "Creta", "model_year": 2024, "type": "SUV", "fuel_type": "Diesel", "segment": "Compact SUV",
    "price": { "min": 1100000, "max": 2015000 }, "mileage": { "city": 17, "highway": 21 }, "power": 114, "seatingCapacity": 5, "maintenanceCost": 25000,
    "popularity_score": 98, "features": ["Panoramic Sunroof", "Ventilated Seats", "Level 2 ADAS"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Hyundai_Creta.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "3", "brand": "Tata", "model_name": "Nexon EV", "model_year": 2023, "type": "EV", "fuel_type": "Electric", "segment": "Compact SUV",
    "price": { "min": 1450000, "max": 1950000 }, "mileage": { "city": 465, "highway": 465 }, "power": 143, "seatingCapacity": 5, "maintenanceCost": 10000,
    "popularity_score": 92, "features": ["12.3-inch Touchscreen", "V2L and V2V charging", "JBL Sound System"],
    "images": { "front": "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV/11024/1755845297648/front-left-side-47.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "4", "brand": "Royal Enfield", "model_name": "Classic 350", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Cruiser",
    "price": { "min": 193000, "max": 225000 }, "mileage": { "city": 35, "highway": 40 }, "power": 20.2, "seatingCapacity": 2, "maintenanceCost": 8000,
    "popularity_score": 97, "features": ["Tripper Navigation", "Dual-channel ABS", "Classic Teardrop Tank"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Royal_Enfield_Classic_350_%282017_Model_Year%29.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "5", "brand": "Mahindra", "model_name": "XUV700", "model_year": 2023, "type": "SUV", "fuel_type": "Diesel", "segment": "Mid-size SUV",
    "price": { "min": 1400000, "max": 2700000 }, "mileage": { "city": 13, "highway": 16 }, "power": 182, "seatingCapacity": 7, "maintenanceCost": 30000,
    "popularity_score": 94, "features": ["Dual 10.25-inch Screens", "ADAS", "Skyroof"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "6", "brand": "Tata", "model_name": "Tiago EV", "model_year": 2023, "type": "EV", "fuel_type": "Electric", "segment": "Hatchback",
    "price": { "min": 800000, "max": 1200000 }, "mileage": { "city": 315, "highway": 315 }, "power": 74, "seatingCapacity": 5, "maintenanceCost": 8000,
    "popularity_score": 88, "features": ["ZConnect", "Multi-mode Regen", "Automatic Climate Control"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/9/98/Tata_Tiago_%28117%29.JPG", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "7", "brand": "Kia", "model_name": "Seltos", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV",
    "price": { "min": 1090000, "max": 2035000 }, "mileage": { "city": 17, "highway": 20 }, "power": 158, "seatingCapacity": 5, "maintenanceCost": 22000,
    "popularity_score": 93, "features": ["Dual 10.25-inch Screens", "Bose Audio", "360-degree Camera"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Kia_Seltos_001.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "8", "brand": "Ather", "model_name": "450X", "model_year": 2024, "type": "EV", "fuel_type": "Electric", "segment": "Scooter",
    "price": { "min": 140000, "max": 155000 }, "mileage": { "city": 150, "highway": 150 }, "power": 8.58, "seatingCapacity": 2, "maintenanceCost": 5000,
    "popularity_score": 89, "features": ["7-inch TFT Display", "Google Maps", "Warp Mode"],
    "images": { "front": "https://auto.hindustantimes.com/htmobile1/atherenergy_450x/images/colours_atherenergy-450x_salt-green_600x400.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "9", "brand": "Toyota", "model_name": "Fortuner", "model_year": 2023, "type": "SUV", "fuel_type": "Diesel", "segment": "Full-size SUV",
    "price": { "min": 3350000, "max": 5150000 }, "mileage": { "city": 10, "highway": 14 }, "power": 201, "seatingCapacity": 7, "maintenanceCost": 40000,
    "popularity_score": 85, "features": ["Ventilated Seats", "JBL Audio", "4x4 Capability"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/c/c6/2020_Toyota_Fortuner_2.8_Legender_4WD.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "10", "brand": "Ola Electric", "model_name": "S1 Pro", "model_year": 2024, "type": "EV", "fuel_type": "Electric", "segment": "Scooter",
    "price": { "min": 130000, "max": 130000 }, "mileage": { "city": 195, "highway": 195 }, "power": 14.75, "seatingCapacity": 2, "maintenanceCost": 4000,
    "popularity_score": 91, "features": ["Large Touchscreen", "Proximity Unlock", "Cruise Control"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/2/24/Ola_electric_scooter.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "11", "brand": "Honda", "model_name": "City", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Sedan",
    "price": { "min": 1180000, "max": 1630000 }, "mileage": { "city": 17, "highway": 18 }, "power": 119, "seatingCapacity": 5, "maintenanceCost": 18000,
    "popularity_score": 86, "features": ["Honda Sensing (ADAS)", "LaneWatch Camera", "Sunroof"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/d/d9/2022_Honda_City_1.5_GN2_%2820220317%29_01.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "12", "brand": "Bajaj", "model_name": "Pulsar NS200", "model_year": 2024, "type": "Bike", "fuel_type": "Petrol", "segment": "Naked Sport",
    "price": { "min": 158000, "max": 158000 }, "mileage": { "city": 35, "highway": 40 }, "power": 24.13, "seatingCapacity": 2, "maintenanceCost": 7000,
    "popularity_score": 84, "features": ["USD Forks", "Dual-channel ABS", "Digital Console"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Bj_Pulsar_NS_200.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "13", "brand": "Hyundai", "model_name": "Venue", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV",
    "price": { "min": 794000, "max": 1350000 }, "mileage": { "city": 17, "highway": 20 }, "power": 118, "seatingCapacity": 5, "maintenanceCost": 16000,
    "popularity_score": 88, "features": ["2-step reclining rear seats", "Bluelink Connectivity", "Sunroof"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/9/95/2025_Hyundai_Venue_Turbo_%28front%29%2C_Pakuwon_Mall%2C_West_Surabaya.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "14", "brand": "TVS", "model_name": "Apache RR310", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Supersport",
    "price": { "min": 272000, "max": 272000 }, "mileage": { "city": 30, "highway": 34 }, "power": 33.5, "seatingCapacity": 2, "maintenanceCost": 12000,
    "popularity_score": 82, "features": ["Multiple Ride Modes", "TFT Display", "Bluetooth Connectivity"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/0/07/Apacherr310c.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "15", "brand": "Tata", "model_name": "Punch", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Micro SUV",
    "price": { "min": 613000, "max": 1020000 }, "mileage": { "city": 18, "highway": 20 }, "power": 86, "seatingCapacity": 5, "maintenanceCost": 12000,
    "popularity_score": 90, "features": ["5-Star GNCAP Rating", "90-degree opening doors", "Harman Audio"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Tata_H2X%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0645%29.jpg/250px-Tata_H2X%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0645%29.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "16", "brand": "Royal Enfield", "model_name": "Himalayan", "model_year": 2024, "type": "Bike", "fuel_type": "Petrol", "segment": "Adventure",
    "price": { "min": 216000, "max": 230000 }, "mileage": { "city": 28, "highway": 32 }, "power": 24.3, "seatingCapacity": 2, "maintenanceCost": 9000,
    "popularity_score": 87, "features": ["Tripper Navigation", "Switchable ABS", "Long-travel suspension"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/3/3b/2020_Royal_Enfield_Himalayan_%281%29.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "17", "brand": "Hyundai", "model_name": "i20", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Hatchback",
    "price": { "min": 700000, "max": 1120000 }, "mileage": { "city": 16, "highway": 20 }, "power": 118, "seatingCapacity": 5, "maintenanceCost": 17000,
    "popularity_score": 85, "features": ["Bose Sound System", "Sunroof", "10.25-inch Touchscreen"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Hyundai_i20_N_IMG_8773.jpg/1280px-Hyundai_i20_N_IMG_8773.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "18", "brand": "Mahindra", "model_name": "Scorpio-N", "model_year": 2023, "type": "SUV", "fuel_type": "Diesel", "segment": "Mid-size SUV",
    "price": { "min": 1360000, "max": 2450000 }, "mileage": { "city": 14, "highway": 16 }, "power": 172, "seatingCapacity": 7, "maintenanceCost": 28000,
    "popularity_score": 92, "features": ["4XPLOR Terrain System", "AdrenoX Infotainment", "High Seating Position"],
    "images": { "front": "https://imgd.aeplcdn.com/1200x900/n/cw/ec/125025/mahindra-scorpio-right-front-three-quarter0.jpeg?isig=0&wm=0", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "19", "brand": "Volkswagen", "model_name": "Virtus", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Sedan",
    "price": { "min": 1156000, "max": 1940000 }, "mileage": { "city": 18, "highway": 20 }, "power": 148, "seatingCapacity": 5, "maintenanceCost": 20000,
    "popularity_score": 80, "features": ["Digital Cockpit", "Ventilated Seats", "5-Star GNCAP Rating"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/2023_Volkswagen_Virtus_Topline_rear_20230520.jpg/250px-2023_Volkswagen_Virtus_Topline_rear_20230520.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "20", "brand": "TVS", "model_name": "Jupiter 125", "model_year": 2023, "type": "Scooter", "fuel_type": "Petrol", "segment": "Scooter",
    "price": { "min": 86000, "max": 97000 }, "mileage": { "city": 50, "highway": 55 }, "power": 8.04, "seatingCapacity": 2, "maintenanceCost": 5000,
    "popularity_score": 83, "features": ["External Fuel Fill", "Large Underseat Storage", "IntelliGO technology"],
    "images": { "front": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/103181/jupiter-125-right-front-three-quarter-5.png?isig=0", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "21", "brand": "Mahindra", "model_name": "Thar", "model_year": 2023, "type": "SUV", "fuel_type": "Diesel", "segment": "Lifestyle SUV",
    "price": { "min": 1125000, "max": 1760000 }, "mileage": { "city": 13, "highway": 15 }, "power": 130, "seatingCapacity": 4, "maintenanceCost": 25000,
    "popularity_score": 96, "features": ["Removable Roof Panels", "4x4 Capability", "Washable Interiors"],
    "images": { "front": "https://imgd.aeplcdn.com/664x374/n/cw/ec/124839/thar-roxx-exterior-right-front-three-quarter-2.png?isig=0&q=80", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "22", "brand": "Skoda", "model_name": "Slavia", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Sedan",
    "price": { "min": 1153000, "max": 1912000 }, "mileage": { "city": 18, "highway": 20 }, "power": 148, "seatingCapacity": 5, "maintenanceCost": 22000,
    "popularity_score": 79, "features": ["Sunroof", "5-Star GNCAP Rating", "Wireless SmartLink"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/9/92/2021_%C5%A0koda_Slavia_1.5_TSI_Style_%28India%29_front_view.png", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  { "id": "23", "brand": "Hero", "model_name": "Splendor Plus", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Commuter",
    "price": { "min": 75000, "max": 78000 }, "mileage": { "city": 65, "highway": 80 }, "power": 7.9, "seatingCapacity": 2, "maintenanceCost": 4000,
    "popularity_score": 99, "features": ["i3S Technology", "Integrated Braking System", "High Fuel Efficiency"],
    "images": { "front": "https://static.toiimg.com/thumb/msid-110582707,width-1280,height-720,resizemode-4/110582707.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "24", "brand": "Kia", "model_name": "Sonet", "model_year": 2024, "type": "SUV", "fuel_type": "Diesel", "segment": "Compact SUV",
    "price": { "min": 799000, "max": 1570000 }, "mileage": { "city": 18, "highway": 22 }, "power": 114, "seatingCapacity": 5, "maintenanceCost": 20000,
    "popularity_score": 89, "features": ["10.25-inch Touchscreen", "Ventilated Seats", "ADAS"],
    "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Kia_Sonet_front_view_%28India%29_01.png/250px-Kia_Sonet_front_view_%28India%29_01.png", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  {
    "id": "25", "brand": "Honda", "model_name": "Activa 6G", "model_year": 2023, "type": "Scooter", "fuel_type": "Petrol", "segment": "Scooter",
    "price": { "min": 76000, "max": 82000 }, "mileage": { "city": 45, "highway": 50 }, "power": 7.73, "seatingCapacity": 2, "maintenanceCost": 4500,
    "popularity_score": 98, "features": ["Silent Start", "Telescopic Suspension", "External Fuel Fill"],
    "images": { "front": "https://cdn.bikedekho.com/processedimages/honda/activa-6g/source/activa-6g690f0e2044c84.jpg", "secondary": "TO_BE_ADDED_MANUALLY" }
  },
  { "id": "26", "brand": "Maruti Suzuki", "model_name": "Brezza", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV", "price": { "min": 834000, "max": 1414000 }, "mileage": { "city": 17, "highway": 20 }, "power": 102, "seatingCapacity": 5, "maintenanceCost": 16000, "popularity_score": 91, "features": ["Sunroof", "360 View Camera", "Head-Up Display"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/2021_Suzuki_Vitara_Brezza_VXI_01.jpg/250px-2021_Suzuki_Vitara_Brezza_VXI_01.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "27", "brand": "Tata", "model_name": "Harrier", "model_year": 2024, "type": "SUV", "fuel_type": "Diesel", "segment": "Mid-size SUV", "price": { "min": 1549000, "max": 2644000 }, "mileage": { "city": 14, "highway": 16 }, "power": 168, "seatingCapacity": 5, "maintenanceCost": 28000, "popularity_score": 88, "features": ["ADAS", "Panoramic Sunroof", "JBL Speakers"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Tata_Buzzard_Sport%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0651%29.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "28", "brand": "Hyundai", "model_name": "Exter", "model_year": 2023, "type": "Car", "fuel_type": "Petrol", "segment": "Micro SUV", "price": { "min": 613000, "max": 1028000 }, "mileage": { "city": 19, "highway": 22 }, "power": 82, "seatingCapacity": 5, "maintenanceCost": 14000, "popularity_score": 87, "features": ["Dashcam with dual camera", "Sunroof", "6 Airbags"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/3/35/2023_Hyundai_Exter_SX_%28O%29.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "29", "brand": "Toyota", "model_name": "Innova Hycross", "model_year": 2023, "type": "SUV", "fuel_type": "Hybrid", "segment": "MPV", "price": { "min": 1977000, "max": 3098000 }, "mileage": { "city": 23, "highway": 23 }, "power": 184, "seatingCapacity": 8, "maintenanceCost": 32000, "popularity_score": 85, "features": ["Ottoman Seats", "Panoramic Sunroof", "Toyota Safety Sense"], "images": { "front": "https://static.toyotabharat.com/images/showroom/innova-hycross/super-white.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "30", "brand": "MG", "model_name": "Comet EV", "model_year": 2023, "type": "EV", "fuel_type": "Electric", "segment": "Hatchback", "price": { "min": 699000, "max": 940000 }, "mileage": { "city": 230, "highway": 230 }, "power": 41.4, "seatingCapacity": 4, "maintenanceCost": 7000, "popularity_score": 75, "features": ["Dual 10.25-inch Screens", "Compact Size", "i-SMART Tech"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/4/4d/2023_MG_Comet_EV_Plush_%28India%29.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "31", "brand": "Bajaj", "model_name": "Chetak", "model_year": 2024, "type": "EV", "fuel_type": "Electric", "segment": "Scooter", "price": { "min": 120000, "max": 140000 }, "mileage": { "city": 126, "highway": 126 }, "power": 5.7, "seatingCapacity": 2, "maintenanceCost": 4000, "popularity_score": 80, "features": ["Metal Body", "TFT Colour Display", "App Connectivity"], "images": { "front": "https://cdn.bajajauto.com/-/media/images/chetak/product-page/chetak-urbane-360/grey/webp/00.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "32", "brand": "KTM", "model_name": "390 Duke", "model_year": 2024, "type": "Bike", "fuel_type": "Petrol", "segment": "Naked Sport", "price": { "min": 311000, "max": 311000 }, "mileage": { "city": 25, "highway": 28 }, "power": 45.3, "seatingCapacity": 2, "maintenanceCost": 15000, "popularity_score": 86, "features": ["TFT Display", "Quickshifter+", "Supermoto ABS"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Ktm_duke_390.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "33", "brand": "Maruti Suzuki", "model_name": "Fronx", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV", "price": { "min": 751000, "max": 1304000 }, "mileage": { "city": 20, "highway": 22 }, "power": 99, "seatingCapacity": 5, "maintenanceCost": 16000, "popularity_score": 89, "features": ["Head-Up Display", "Wireless Charger", "Turbo Engine"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/2024_Suzuki_Fronx_rear.jpg/250px-2024_Suzuki_Fronx_rear.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "34", "brand": "TVS", "model_name": "iQube", "model_year": 2023, "type": "EV", "fuel_type": "Electric", "segment": "Scooter", "price": { "min": 117000, "max": 124000 }, "mileage": { "city": 100, "highway": 100 }, "power": 6, "seatingCapacity": 2, "maintenanceCost": 4000, "popularity_score": 82, "features": ["SmartXonnect", "Silent Operation", "Large Storage"], "images": { "front": "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--22-kwh1747293190144.jpg?q=80", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "35", "brand": "Honda", "model_name": "Elevate", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV", "price": { "min": 1160000, "max": 1620000 }, "mileage": { "city": 15, "highway": 17 }, "power": 119, "seatingCapacity": 5, "maintenanceCost": 18000, "popularity_score": 84, "features": ["Honda Sensing (ADAS)", "Large Boot Space", "Sunroof"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Honda_WR-V_Z%2B_%285BA-DG5%29_front.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "36", "brand": "Yamaha", "model_name": "R15 V4", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Supersport", "price": { "min": 182000, "max": 198000 }, "mileage": { "city": 40, "highway": 45 }, "power": 18.1, "seatingCapacity": 2, "maintenanceCost": 9000, "popularity_score": 90, "features": ["Traction Control", "Quick Shifter", "Upside Down Forks"], "images": { "front": "https://imgd.aeplcdn.com/1056x594/n/11u3ehb_1868367.jpg?q=80", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "37", "brand": "Skoda", "model_name": "Kushaq", "model_year": 2023, "type": "SUV", "fuel_type": "Petrol", "segment": "Compact SUV", "price": { "min": 1189000, "max": 2049000 }, "mileage": { "city": 17, "highway": 19 }, "power": 148, "seatingCapacity": 5, "maintenanceCost": 23000, "popularity_score": 78, "features": ["5-Star GNCAP Rating", "Ventilated Seats", "Wireless Charging"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/2/29/2021_%C5%A0koda_Kushaq_%28India%29_front_view.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "38", "brand": "Hero", "model_name": "Xpulse 200 4V", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Adventure", "price": { "min": 146000, "max": 154000 }, "mileage": { "city": 35, "highway": 40 }, "power": 18.9, "seatingCapacity": 2, "maintenanceCost": 8000, "popularity_score": 83, "features": ["Long Travel Suspension", "Spoke Wheels", "Rally Mode ABS"], "images": { "front": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Xpulse2002V.jpg/250px-Xpulse2002V.jpg", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "39", "brand": "Maruti Suzuki", "model_name": "Grand Vitara", "model_year": 2023, "type": "SUV", "fuel_type": "Hybrid", "segment": "Mid-size SUV", "price": { "min": 1080000, "max": 2000000 }, "mileage": { "city": 27, "highway": 27 }, "power": 114, "seatingCapacity": 5, "maintenanceCost": 24000, "popularity_score": 90, "features": ["AllGrip AWD", "Panoramic Sunroof", "Ventilated Seats"], "images": { "front": "https://www.varunmaruti.com/uploads/products/colors/grandvitara-arctic-white-midnight-black1.png", "secondary": "TO_BE_ADDED_MANUALLY" } },
  { "id": "40", "brand": "TVS", "model_name": "Ronin", "model_year": 2023, "type": "Bike", "fuel_type": "Petrol", "segment": "Cruiser", "price": { "min": 149000, "max": 173000 }, "mileage": { "city": 40, "highway": 42 }, "power": 20.1, "seatingCapacity": 2, "maintenanceCost": 7500, "popularity_score": 81, "features": ["USD Fork", "Glide Through Tech", "SmartXonnect"], "images": { "front": "https://imgd.aeplcdn.com/476x268/n/cw/ec/198071/ronin-right-side-view-3.png?isig=0", "secondary": "TO_BE_ADDED_MANUALLY" } }
];


export const getVehicles = () => vehicles;

export const getVehicleById = (id: string) =>
  vehicles.find((v) => v.id === id);

export const getTrendingVehicles = () => {
    return [...vehicles].sort((a,b) => b.popularity_score - a.popularity_score).slice(0, 4);
}

export const getImage = (url: string | undefined) => {
  const defaultImage = {
    description: 'Placeholder Image',
    imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
    imageHint: 'vehicle photo',
  };

  if (!url || url === 'TO_BE_ADDED_MANUALLY') {
    return defaultImage;
  }

  // If in the future, a real URL is provided, use it.
  return {
    description: 'Vehicle Image',
    imageUrl: url,
    imageHint: 'vehicle photo'
  };
};

    
    
    

    

    















