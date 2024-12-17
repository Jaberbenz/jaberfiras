export default function DashboardHome() {
  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <main className="flex-1 p-8 sm:p-20 bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="mx-auto max-w-5xl text-center">
          {/* Title */}
          <h1 className="mb-6 text-5xl font-bold text-purple-800">
            Do everything you want!
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-lg text-purple-600">
            Modify your code, see your app running, supervise, learn...
          </p>

          {/* Content Section */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
              <h2 className="mb-2 text-xl font-semibold text-purple-700">
                Supervision
              </h2>
              <p className="text-gray-600">
                Keep track of all your projects and ensure everything runs smoothly.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
              <h2 className="mb-2 text-xl font-semibold text-purple-700">
                Development
              </h2>
              <p className="text-gray-600">
                Dive into the code and enhance your app with new features.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
              <h2 className="mb-2 text-xl font-semibold text-purple-700">
                Learn and Explore
              </h2>
              <p className="text-gray-600">
                Access learning resources to master new skills and technologies.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
              <h2 className="mb-2 text-xl font-semibold text-purple-700">
                Manage Your Team
              </h2>
              <p className="text-gray-600">
                Collaborate effectively and achieve your project goals together.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
