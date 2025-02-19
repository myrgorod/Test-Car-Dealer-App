import { Suspense } from "react";

export default function ResultPage({
  params,
}: {
  params: { make: string; year: string };
}) {
  return (
    <main className="flex flex-col items-center px-4 py-8 md:py-12 lg:py-16 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white">
        Search Result
      </h1>

      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded-lg p-4 md:p-6 lg:p-8 mt-6">
        <Suspense
          fallback={
            <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
              Loading vehicle details...
            </p>
          }
        >
          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100">
            <strong>Selected Make:</strong> {decodeURIComponent(params.make)}
          </p>
          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100">
            <strong>Selected Year:</strong> {params.year}
          </p>
        </Suspense>
      </div>
    </main>
  );
}
