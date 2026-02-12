import { getVehicleById } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { getImage } from '@/lib/data';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/lib/types';

type ComparePageProps = {
  searchParams: { ids?: string };
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const ids = searchParams.ids ? searchParams.ids.split(',') : [];
  const vehiclesToCompare = ids
    .map((id) => getVehicleById(id))
    .filter(Boolean)
    .slice(0, 3) as Vehicle[];

  if (vehiclesToCompare.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Nothing to Compare</h1>
        <p className="mt-2 text-muted-foreground">
          Select up to 3 vehicles from our listings to compare them.
        </p>
        <Button asChild className="mt-6">
          <Link href="/vehicles">Browse Vehicles</Link>
        </Button>
      </div>
    );
  }
  
  const specs = [
    { label: 'Price Range', getValue: (v: Vehicle) => `₹${v.price.min.toLocaleString('en-IN')} - ₹${v.price.max.toLocaleString('en-IN')}` },
    { label: 'Vehicle Type', getValue: (v: Vehicle) => v.type },
    { label: 'Fuel Type', getValue: (v: Vehicle) => v.fuel_type },
    { label: 'Power (BHP)', getValue: (v: Vehicle) => v.power },
    { label: 'City Mileage', getValue: (v: Vehicle) => v.type === 'EV' ? `${v.mileage.city} km` : `${v.mileage.city} kpl` },
    { label: 'Highway Mileage', getValue: (v: Vehicle) => v.type === 'EV' ? `${v.mileage.highway} km` : `${v.mileage.highway} kpl` },
    { label: 'Maintenance Cost/Year', getValue: (v: Vehicle) => `₹${v.maintenanceCost.toLocaleString('en-IN')}` },
    { label: 'Seating Capacity', getValue: (v: Vehicle) => v.seatingCapacity },
  ];

  return (
    <div className="container py-8 md:py-12">
      <h1 className="font-headline text-center text-4xl font-bold">
        Vehicle Comparison
      </h1>
      <div className="mt-8 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-bold">Feature</TableHead>
              {vehiclesToCompare.map((vehicle) => (
                <TableHead key={vehicle!.id}>
                  <div className="relative mx-auto mb-2 h-24 w-36">
                    <Image
                      src={getImage(vehicle!.images.front).imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model_name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center font-bold text-foreground">{`${vehicle.brand} ${vehicle.model_name}`}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {specs.map((spec) => (
              <TableRow key={spec.label}>
                <TableCell className="font-medium">{spec.label}</TableCell>
                {vehiclesToCompare.map((vehicle) => (
                  <TableCell key={vehicle!.id} className="text-center">
                    {spec.getValue(vehicle)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
