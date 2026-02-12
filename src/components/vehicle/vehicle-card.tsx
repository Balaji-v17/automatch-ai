'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Vehicle } from '@/lib/types';
import { getImage } from '@/lib/data';
import { Button } from '../ui/button';
import { ArrowRight, Check, Fuel, Gauge, Plus, Wrench } from 'lucide-react';
import { useCompare } from '@/context/compare-context';
import { cn } from '@/lib/utils';

type VehicleCardProps = {
  vehicle: Vehicle;
  className?: string;
};

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const frontImage = getImage(vehicle.images.front);
  const name = `${vehicle.brand} ${vehicle.model_name}`;
  const { selectedIds, toggleVehicleSelection, isSelected } = useCompare();
  const isVehicleSelected = isSelected(vehicle.id);

  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden shadow-md transition-shadow hover:shadow-xl',
        isVehicleSelected && 'ring-2 ring-primary',
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={frontImage.imageUrl}
            alt={`Front view of ${name}`}
            fill
            className="object-cover"
            data-ai-hint={frontImage.imageHint}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg">
              <Link
                href={`/vehicles/${vehicle.id}`}
                className="hover:text-primary transition-colors"
              >
                {name}
              </Link>
            </CardTitle>
            <Badge variant="secondary">{vehicle.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 px-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Fuel className="mr-2 h-4 w-4 text-primary" />
          <span>{vehicle.fuel_type}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Gauge className="mr-2 h-4 w-4 text-primary" />
          <span>{vehicle.power} BHP</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Wrench className="mr-2 h-4 w-4 text-primary" />
          <span>~₹{vehicle.maintenanceCost.toLocaleString('en-IN')}/year</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            ₹{vehicle.price.min.toLocaleString('en-IN')}
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/vehicles/${vehicle.id}`}>
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Button
          variant={isVehicleSelected ? 'secondary' : 'default'}
          onClick={() => toggleVehicleSelection(vehicle.id)}
          disabled={!isVehicleSelected && selectedIds.length >= 3}
          className="w-full"
        >
          {isVehicleSelected ? (
            <Check className="mr-2" />
          ) : (
            <Plus className="mr-2" />
          )}
          {isVehicleSelected ? 'Selected' : 'Select for Compare'}
        </Button>
      </CardFooter>
    </Card>
  );
}
