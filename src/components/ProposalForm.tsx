import { useState } from "react";
import { backend } from "../declarations/backend";

export default function ProposalForm() {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [proposalTitle, setProposalTitle] = useState<string>("");
  const [proposalDescription, setProposalDescription] = useState<string>("");
  const [proposalExpiration, setProposalExpiration] = useState<number>(200000);
  const [proposalToAddress, setProposalToAddress] = useState<string>("");
  const [proposalFromAddress, setProposalFromAddress] = useState<string>("");
  const [proposalTokenPayment, setProposalTokenPayment] = useState<number>(0.01);

  const executionVariables = {
    token_amount: proposalTokenPayment,
    to_address: proposalToAddress,
    from_address: proposalFromAddress
  }

  const formVariables = [
    {
      label: "Contract Address",
      id: "contractAddress",
      placeholder: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      type: "text",
      value: contractAddress,
      setFunction: setContractAddress,
    },
    {
      label: "Minimum Token Amount to Vote",
      id: "tokenAmount",
      placeholder: "0.5",
      type: "number",
      value: tokenAmount,
      setFunction: setTokenAmount,
    },
    {
      label: "Proposal Title",
      id: "proposalTitle",
      type: "text",
      value: proposalTitle,
      setFunction: setProposalTitle,
    },
    {
      label: "Proposal Description",
      id: "proposalDescription",
      type: "text",
      value: proposalDescription,
      setFunction: setProposalDescription,
    },
    {
      label: "Proposal Expiration (in seconds)",
      id: "proposalExpiration",
      type: "number",
      value: proposalExpiration,
      setFunction: setProposalExpiration
    },
    {
      label: "From Address",
      id: "proposalFromAddress",
      type: "text",
      value: proposalFromAddress,
      setFunction: setProposalFromAddress
    },
    {
      label: "To Address",
      id: "proposalToAddress",
      type: "text",
      value: proposalToAddress,
      setFunction: setProposalToAddress
    },
    {
      label: "Number of Tokens (Payment)",
      id: "proposalTokenPayment",
      value: proposalTokenPayment,
      setFunction: setProposalTokenPayment
    },
  ];

  return (
    <form className="flex flex-col w-full m-auto mb-8 lg:mb-16">
      <div className="block w-full">
        <div className="my-auto lg:mt-14 border-b border-gray-900/10 pb-12 px-8">
          <h2 className="text-base text-xl font-semibold leading-7 text-gray-900">
            Add a Proposal
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-600">
            Set up a proposal for an Ethereum-based DAO
          </p>

          <div className="mt-10 w-full">
            {formVariables.map((form) => (
              <div key={form.label} className="w-full">
                <label
                  htmlFor={form.label}
                  className="block text-md mt-1 font-medium mx-auto lg:text-left lg:ml-8 leading-6 text-gray-900"
                >
                  {form.label}
                </label>
                <div className="py-4 px-4 w-full">
                  <div className="flex rounded-md w-full shadow-sm ring-1 ring-inset ring-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type={form.type}
                      name={form.id}
                      id={form.id}
                      autoComplete={form.id}
                      className="bg-white rounded-md py-2.5 pl-2.5 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                      placeholder={form.placeholder}
                      value={form.value as any}
                      onChange={(e) => {
                        const inputValue = form.type === 'number' ? parseFloat(e.target.value) : e.target.value;
                        form.setFunction(inputValue as any);
                      }}
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
          className="text-md font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          onSubmit={async (e) => { e.preventDefault(); return await backend.createProposal("1", contractAddress, tokenAmount, proposalTitle, proposalDescription, proposalExpiration, executionVariables)}}
          className="rounded-md bg-indigo-600 px-8 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}