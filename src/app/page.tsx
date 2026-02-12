import { PreferenceForm } from '@/components/forms/preference-form';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { getTrendingVehicles } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ConversationalForm } from '@/components/forms/conversational-form';

export default function Home() {
  const trendingVehicles = getTrendingVehicles();

  return (
    <div className="container py-8 md:py-12">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
          Find Your Perfect Match on Wheels
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
          Our AI-powered engine analyzes your needs to recommend the best vehicle
          for you. Answer a few questions or just tell us what you want below.
        </p>
      </section>

      <section id="ask" className="mb-12">
        <Card className="mx-auto max-w-4xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Ask AutoMatch AI
            </CardTitle>
            <CardDescription>
              Start by describing what you're looking for in your own words.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConversationalForm />
          </CardContent>
        </Card>
      </section>

      <section id="find" className="mb-16">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Or, Tell us what you're looking for
            </CardTitle>
            <CardDescription>
              Your preferences help us find the ideal vehicle for your lifestyle
              and budget.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PreferenceForm />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-headline mb-6 text-3xl font-bold tracking-tight">
          Trending Vehicles
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </div>
  );
}
