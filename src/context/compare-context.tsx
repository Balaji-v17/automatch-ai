'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useToast } from '@/hooks/use-toast';

const MAX_COMPARE_ITEMS = 3;

type CompareContextType = {
  selectedIds: string[];
  toggleVehicleSelection: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleVehicleSelection = useCallback(
    (id: string) => {
      setSelectedIds((prevIds) => {
        if (prevIds.includes(id)) {
          return prevIds.filter((prevId) => prevId !== id);
        } else {
          if (prevIds.length >= MAX_COMPARE_ITEMS) {
            toast({
              title: 'Comparison limit reached',
              description: `You can only compare up to ${MAX_COMPARE_ITEMS} vehicles at a time.`,
              variant: 'destructive',
            });
            return prevIds;
          }
          return [...prevIds, id];
        }
      });
    },
    [toast]
  );

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{ selectedIds, toggleVehicleSelection, isSelected, clearSelection }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
