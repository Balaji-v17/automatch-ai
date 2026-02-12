'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  FuelType,
  MaintenanceSensitivity,
  Priority,
  UsagePattern,
  VehicleType,
} from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const vehicleTypes: { id: VehicleType; label: string }[] = [
  { id: 'Car', label: 'Car' },
  { id: 'SUV', label: 'SUV' },
  { id: 'EV', label: 'EV' },
  { id: 'Bike', label: 'Bike' },
  { id: 'Scooter', label: 'Scooter' },
];

const fuelTypes: { id: FuelType; label: string }[] = [
  { id: 'Petrol', label: 'Petrol' },
  { id: 'Diesel', label: 'Diesel' },
  { id: 'Electric', label: 'Electric' },
  { id: 'Hybrid', label: 'Hybrid' },
];

const preferenceSchema = z.object({
  budget: z.array(z.number()).min(2).max(2).default([500000, 2500000]),
  vehicleTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one vehicle type.',
  }),
  usage: z.string().nonempty('Please select your primary usage.'),
  fuelTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one fuel type.',
  }),
  priority: z.string().nonempty('Please select your priority.'),
  maintenance: z.string().nonempty('Please select your maintenance preference.'),
});

export function PreferenceForm() {
  const router = useRouter();
  const [budget, setBudget] = useState([500000, 2500000]);

  const form = useForm<z.infer<typeof preferenceSchema>>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      budget: [500000, 2500000],
      vehicleTypes: ['Car', 'SUV'],
      usage: 'Mixed',
      fuelTypes: ['Petrol', 'Electric'],
      priority: 'Mileage',
      maintenance: 'Medium',
    },
  });

  function onSubmit(data: z.infer<typeof preferenceSchema>) {
    const params = new URLSearchParams();
    params.set('budget', data.budget.join(','));
    params.set('vehicleTypes', data.vehicleTypes.join(','));
    params.set('usage', data.usage);
    params.set('fuelTypes', data.fuelTypes.join(','));
    params.set('priority', data.priority);
    params.set('maintenance', data.maintenance);

    router.push(`/recommendations?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Budget Range (INR)</FormLabel>
                <FormControl>
                  <Slider
                    min={100000}
                    max={6000000}
                    step={50000}
                    value={budget}
                    onValueChange={(value) => {
                      setBudget(value);
                      field.onChange(value);
                    }}
                    className="py-2"
                  />
                </FormControl>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{budget[0].toLocaleString('en-IN')}</span>
                  <span>₹{budget[1].toLocaleString('en-IN')}</span>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleTypes"
            render={() => (
              <FormItem>
                <FormLabel>Vehicle Types</FormLabel>
                <FormDescription>Select one or more types.</FormDescription>
                <div className="grid grid-cols-2 gap-4 pt-2">
                {vehicleTypes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="vehicleTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelTypes"
            render={() => (
              <FormItem>
                <FormLabel>Fuel Types</FormLabel>
                <FormDescription>Select one or more types.</FormDescription>
                <div className="grid grid-cols-2 gap-4 pt-2">
                {fuelTypes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="fuelTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Usage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage pattern" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="City">City Driving</SelectItem>
                    <SelectItem value="Highway">Highway Cruising</SelectItem>
                    <SelectItem value="Mixed">Mixed Usage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's your priority?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mileage">Better Mileage</SelectItem>
                    <SelectItem value="Performance">
                      Higher Performance
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenance"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Maintenance Preference</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maintenance preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low Cost</SelectItem>
                    <SelectItem value="Medium">Average Cost</SelectItem>
                    <SelectItem value="High">Don't mind higher cost for reliability</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Find My Match
          </Button>
        </div>
      </form>
    </Form>
  );
}
