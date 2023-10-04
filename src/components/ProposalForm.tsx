export default function ProposalForm() {
  const formVariables = [
    {
      label: "Contract Address",
      id: "contractAddress",
      placeholder: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      type: "text",
    },
    {
      label: "Minimum Token Amount to Vote",
      id: "tokenAmount",
      placeholder: "0.5",
      type: "number",
    },
    {
      label: "Proposal Title",
      id: "proposalTitle",
      type: "text",
    },
    {
      label: "Proposal Description",
      id: "proposalDescription",
      type: "text",
    },
  ];

  return (
    <form className="flex flex-col w-full m-auto">
      <div className="block w-full">
        <div className="mt-4 border-b border-gray-900/10 pb-12 pr-8">
          <h2 className="text-base text-lg font-semibold leading-7 text-gray-900">
            Add a Proposal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Set up a proposal for an Ethereum-based DAO
          </p>

          <div className="mt-10 w-full">
            {formVariables.map((form) => (
              <div className="w-full">
                <label
                  htmlFor={form.label}
                  className="block text-sm lg:text-md font-medium mx-auto lg:text-left lg:ml-8 leading-6 text-gray-900"
                >
                  {form.label}
                </label>
                <div className="px-4 py-6 w-full">
                  <div className="flex rounded-md w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type={form.type}
                      name={form.id}
                      id={form.id}
                      autoComplete={form.id}
                      className="border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                      placeholder={form.placeholder}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-6 flex items-center justify-end mr-20">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  );
}
