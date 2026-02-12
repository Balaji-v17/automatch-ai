import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { getVehicles } from '@/lib/data';
import type { Vehicle, VehicleType } from '@/lib/types';

export default function TrendsPage() {
  const allVehicles = getVehicles();

  const getVehiclesBySegment = (segment: string, limit: number = 4) => {
    return allVehicles.filter((v) => v.segment === segment).slice(0, limit);
  };
  
  const getVehiclesByType = (type: VehicleType, limit: number = 4) => {
    return allVehicles.filter((v) => v.type === type).slice(0, limit);
  };

  const trendCategories: { title: string; vehicles: Vehicle[] }[] = [
    { title: 'Popular SUVs', vehicles: getVehiclesByType('SUV') },
    { title: 'Top EVs', vehicles: getVehiclesByType('EV') },
    { title: 'Budget Friendly Cars', vehicles: getVehiclesBySegment('Hatchback') },
    { title: 'Adventure Bikes', vehicles: getVehiclesBySegment('Adventure') },
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Market Trends
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover what's popular and new in the automotive world.
        </p>
      </div>

      <div className="space-y-12">
        {trendCategories.map((category) => (
          <section key={category.title}>
            <h2 className="font-headline mb-6 text-3xl font-bold tracking-tight">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
