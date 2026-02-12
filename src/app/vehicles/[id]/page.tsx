import { getVehicleById, getImage } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Fuel, Gauge, Users, Wrench, Zap, Calendar, Star } from 'lucide-react';

export default function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  const name = `${vehicle.brand} ${vehicle.model_name}`;

  const images = [
    getImage(vehicle.images.front),
    getImage(vehicle.images.secondary),
  ];

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={image.imageUrl}
                        alt={`${name} - ${image.description}`}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
        <div>
          <Badge variant="secondary">{vehicle.type}</Badge>
          <h1 className="font-headline mt-2 text-4xl font-bold">
            {name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-primary">
            ₹{vehicle.price.min.toLocaleString('en-IN')} - ₹
            {vehicle.price.max.toLocaleString('en-IN')}
          </p>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="flex items-center">
              {vehicle.fuel_type === 'Electric' ? <Zap className='mr-3 h-6 w-6 text-primary' /> : <Fuel className="mr-3 h-6 w-6 text-primary" /> }
              <span>{vehicle.fuel_type}</span>
            </div>
            <div className="flex items-center">
              <Gauge className="mr-3 h-6 w-6 text-primary" />
              <span>{vehicle.power} BHP</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-3 h-6 w-6 text-primary" />
              <span>{vehicle.seatingCapacity} Seater</span>
            </div>
            <div className="flex items-center">
              <Wrench className="mr-3 h-6 w-6 text-primary" />
              <span>~₹{vehicle.maintenanceCost.toLocaleString('en-IN')}/year</span>
            </div>
            <div className="flex items-center">
                <Calendar className="mr-3 h-6 w-6 text-primary" />
                <span>{vehicle.model_year} Model</span>
            </div>
            <div className="flex items-center">
                <Star className="mr-3 h-6 w-6 text-primary" />
                <span>Popularity: {vehicle.popularity_score}/100</span>
            </div>
          </div>
        </div>
      </div>
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {vehicle.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
