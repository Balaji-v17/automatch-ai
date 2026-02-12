import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { getVehicles } from '@/lib/data';

export default function VehiclesPage() {
  const vehicles = getVehicles();

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Explore Our Fleet
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Browse through our entire collection of vehicles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
