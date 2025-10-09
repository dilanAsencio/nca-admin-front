"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-red-500 text-xl mb-2">Ocurrió un error</h2>
      <p className="text-gray-500">{error.message}</p>
    </div>
  );
}
