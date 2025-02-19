"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [make, setMake] = useState<string | null>(
    searchParams.get("make") || null
  );
  const [year, setYear] = useState<number | null>(
    searchParams.get("year") ? Number(searchParams.get("year")) : null
  );
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const res = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await res.json();
      setVehicles(data.Results);
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    setButtonEnabled(make !== null && year !== null);
  }, [make, year]);

  const updateUrlParams = (make: string | null, year: number | null) => {
    const params = new URLSearchParams(searchParams);
    if (make) {
      params.set("make", make);
    } else {
      params.delete("make");
    }
    if (year) {
      params.set("year", year.toString());
    } else {
      params.delete("year");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleMakeChange = (value: string) => {
    setMake(value);
    updateUrlParams(value, year);
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    updateUrlParams(make, value);
  };

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2014 },
    (_, i) => 2015 + i
  );

  return (
    <main className="flex flex-col gap-10 justify-center items-center max-w-6xl mx-auto">
      <h1>Car Dealer App</h1>

      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8 items-center max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-lg p-4 md:p-6 lg:p-8 mt-6">
        <Select onValueChange={handleMakeChange} value={make || undefined}>
          <SelectTrigger className="w-full sm:w-[200px] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700">
            <SelectValue placeholder="Choose Vehicle Makes" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {vehicles.map((vehicle: any) => (
              <SelectItem key={vehicle.MakeId} value={vehicle.MakeName}>
                {vehicle.MakeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleYearChange(Number(value))}
          value={year ? year.toString() : undefined}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700">
            <SelectValue placeholder="Choose Model Year" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {modelYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        disabled={!isButtonEnabled}
        onClick={() => router.push(`/result/${make}/${year}`)}
      >
        Next
      </Button>
    </main>
  );
}
