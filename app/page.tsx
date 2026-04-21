export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Join the Haramain Broadcast Team
        </h1>
        <p className="text-lg text-gray-600">
          We are recruiting dedicated volunteers across various departments. Review the requirements, prepare your portfolio, and submit your application.
        </p>
        <div className="pt-4">
          <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
            Start Application
          </button>
        </div>
      </div>
    </div>
  );
}
