const SupportPage = () => {
  return (
    <div className="mt-20 flex min-h-screen flex-col items-center p-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-4 text-center text-4xl font-bold">Need Help ?</h1>
      <p className="mb-8 text-center text-lg">
        Sometimes just read the doc is the best option...
      </p>
      <div className="flex space-x-8">
        <div className="flex w-80 flex-col justify-between rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-bold">Learn</h2>
          <p className="text-2xl font-semibold">Documentation</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            &lt;page_number&gt;
          </p>
          <div className="mt-4">
            <button className="text-right text-xl">&rarr;</button>
          </div>
        </div>
        <div className="flex w-80 flex-col justify-between rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-bold">Community</h2>
          <p className="text-2xl font-semibold">Discord</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            &lt;member_number&gt;
          </p>
          <div className="mt-4">
            <button className="text-right text-xl">&rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
