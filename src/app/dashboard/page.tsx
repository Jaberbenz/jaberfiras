export default function DashboardHome() {
  return (
    <div className="flex min-h-screen bg-light-background dark:bg-dark-background">
      {/* Main Content */}
      <main className="flex-1 p-8 sm:p-20 bg-gradient-to-b from-light-secondary to-light-card dark:from-dark-secondary dark:to-dark-card">
        <div className="mx-auto max-w-5xl text-center">
          {/* Title */}
          <h1 className="mb-6 text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            Do everything you want!
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-lg text-light-secondary dark:text-dark">
            Modify your code, see your app running, supervise, learn...
          </p>

          {/* Content Section */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-xl bg-light-card p-6 shadow-lg transition hover:shadow-xl dark:bg-dark-card dark:shadow-md">
              <h2 className="mb-2 text-xl font-semibold text-light-primary dark:text-dark-highlight">
                Supervision
              </h2>
              <p className="text-light-text dark:text-dark-text">
                Keep track of all your projects and ensure everything runs
                smoothly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl bg-light-card p-6 shadow-lg transition hover:shadow-xl dark:bg-dark-card dark:shadow-md">
              <h2 className="mb-2 text-xl font-semibold text-light-primary dark:text-dark-highlight">
                Development
              </h2>
              <p className="text-light-text dark:text-dark-text">
                Dive into the code and enhance your app with new features.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl bg-light-card p-6 shadow-lg transition hover:shadow-xl dark:bg-dark-card dark:shadow-md">
              <h2 className="mb-2 text-xl font-semibold text-light-primary dark:text-dark-highlight">
                Learn and Explore
              </h2>
              <p className="text-light-text dark:text-dark-text">
                Access learning resources to master new skills and technologies.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl bg-light-card p-6 shadow-lg transition hover:shadow-xl dark:bg-dark-card dark:shadow-md">
              <h2 className="mb-2 text-xl font-semibold text-light-primary dark:text-dark-highlight">
                Manage Your Team
              </h2>
              <p className="text-light-text dark:text-dark-text">
                Collaborate effectively and achieve your project goals together.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
