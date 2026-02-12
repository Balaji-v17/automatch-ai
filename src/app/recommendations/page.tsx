import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRecommendations } from '@/lib/recommendations';
import { getVehicles } from '@/lib/data';
import type { UserPreferences, ScoredVehicle } from '@/lib/types';
import { explainRecommendations, type ExplainRecommendationsOutput } from '@/ai/flows/explainable-recommendations';
import Image from 'next/image';
import { getImage } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type RecommendationsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function parsePreferences(
  searchParams: RecommendationsPageProps['searchParams']
): UserPreferences | null {
  try {
    const budget = (searchParams.budget as string)
      .split(',')
      .map(Number) as [number, number];
    const vehicleTypes = (searchParams.vehicleTypes as string).split(',') as UserPreferences['vehicleTypes'];
    const usage = searchParams.usage as UserPreferences['usage'];
    const fuelTypes = (searchParams.fuelTypes as string).split(',') as UserPreferences['fuelTypes'];
    const priority = searchParams.priority as UserPreferences['priority'];
    const maintenance = searchParams.maintenance as UserPreferences['maintenance'];
    
    if (!budget || !vehicleTypes || !usage || !fuelTypes || !priority || !maintenance) {
        return null;
    }

    return { budget, vehicleTypes, usage, fuelTypes, priority, maintenance };
  } catch (error) {
    console.error('Failed to parse preferences:', error);
    return null;
  }
}

function RecommendationResult({ scoredVehicle, explanation }: { scoredVehicle: ScoredVehicle, explanation?: ExplainRecommendationsOutput['results'][0] }) {
  const { vehicle, scores } = scoredVehicle;
  const vehicleName = `${vehicle.brand} ${vehicle.model_name}`;
  
  const frontImage = getImage(vehicle.images.front);

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg">
      <CardHeader className="flex-row items-start gap-4 p-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={frontImage.imageUrl}
            alt={vehicleName}
            fill
            className="object-cover"
            data-ai-hint={frontImage.imageHint}
          />
        </div>
        <div>
          <Badge variant="secondary">{vehicle.type}</Badge>
          <CardTitle className="font-headline mt-1 text-xl">{vehicleName}</CardTitle>
          <div className="mt-2 text-2xl font-bold text-primary">
            ₹{vehicle.price.min.toLocaleString('en-IN')} - ₹{vehicle.price.max.toLocaleString('en-IN')}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col space-y-4 p-4 pt-0">
        <div className="flex-grow space-y-2">
            {explanation ? (
                <>
                    <div className="rounded-md border bg-primary/5 p-4">
                        <h4 className="mb-2 font-semibold">Why this is a match:</h4>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-primary/90">
                            {explanation.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <Accordion type="single" collapsible className="w-full px-1 text-sm">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="py-1 text-muted-foreground hover:no-underline justify-start gap-1">
                                <span className="text-xs">Full AI Explanation</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {explanation.explanation}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            ) : null}
        </div>
        
        <div className="space-y-3 pt-2">
            <div>
                <div className="mb-1 flex justify-between text-sm"><span>Budget Match</span><span>{scores.budgetMatch}%</span></div>
                <Progress value={scores.budgetMatch} />
            </div>
            <div>
                <div className="mb-1 flex justify-between text-sm"><span>Usage Match</span><span>{scores.usageMatch}%</span></div>
                <Progress value={scores.usageMatch} />
            </div>
            <div>
                <div className="mb-1 flex justify-between text-sm"><span>Maintenance Suitability</span><span>{scores.maintenanceSuitability}%</span></div>
                <Progress value={scores.maintenanceSuitability} />
            </div>
        </div>
        <div className='flex justify-end'>
          <Button asChild>
            <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function RecommendationsPage({
  searchParams,
}: RecommendationsPageProps) {
  const preferences = parsePreferences(searchParams);

  if (!preferences) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid Preferences</AlertTitle>
          <AlertDescription>
            There was an error with your selected preferences. Please go back and try again.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const allVehicles = getVehicles();
  const recommendations = getRecommendations(preferences, allVehicles);

  let explanations: ExplainRecommendationsOutput['results'] = [];
  let explanationsAvailable = false;
  if (recommendations.length > 0) {
      const explanationResponse = await explainRecommendations({
          recommendations: recommendations.map((rec) => {
              const vehicleName = `${rec.vehicle.brand} ${rec.vehicle.model_name}`;
              return {
                  budgetMatchPercentage: rec.scores.budgetMatch,
                  usageMatchPercentage: rec.scores.usageMatch,
                  fuelCompatibilityScore: rec.scores.fuelCompatibility,
                  maintenanceSuitability: rec.scores.maintenanceSuitability,
                  overallMatchScore: rec.scores.overallScore,
                  vehicleName: vehicleName,
              };
          }),
      });

      if (explanationResponse?.results && explanationResponse.results.length > 0) {
          explanations = explanationResponse.results;
          explanationsAvailable = true;
      }
  }


  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm" className='mb-4'>
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Refine Search</Link>
        </Button>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          Your Top Recommendations
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Based on your preferences, here are the best matches we found for you.
        </p>
        {!explanationsAvailable && recommendations.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground italic">
                Recommendations are based on your selected preferences.
            </p>
        )}
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {recommendations.map((rec, index) => {
             const explanation = explanations[index];
             return <RecommendationResult key={rec.vehicle.id} scoredVehicle={rec} explanation={explanation} />
          })}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Matches Found</h3>
            <p className="mt-2 text-muted-foreground">We couldn't find any vehicles that match your criteria. Try adjusting your preferences.</p>
        </Card>
      )}
    </div>
  );
}
