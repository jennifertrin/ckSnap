import { useState } from "react";
import ProposalForm from "./ProposalForm";
import ProposalList from "./ProposalList";
import ConnectWallet from "./ConnectWallet";

export default function MainCTA() {
  const [proposalSection, setProposalSection] = useState<boolean>(false);
  const [proposalListSection, setProposalListSection] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex relative isolate px-6 pt-14 lg:px-8 w-full sm:w-3/5">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className={`m-auto -mt-4 max-w-2xl py-48 lg:py-56`}>
            <div className="text-center">
              <h1 className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl`}>
                Welcome to ckSnap
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                on-chain proposal summoning, voting, and execution
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                <ConnectWallet />
                <button
                  onClick={() => {
                    setProposalSection(!proposalSection);
                    setProposalListSection(false);
                  }}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create a Proposal
                </button>
                <button onClick={() => {
                    setProposalSection(false);
                    setProposalListSection(!proposalListSection);
                  }} className="rounded-md bg-slate-200 px-12 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Vote
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div className="flex mx-auto w-full lg:w-2/5">
          {proposalSection ? <ProposalForm></ProposalForm> : null}
          {proposalListSection ? <ProposalList></ProposalList> : null}
        </div>
      </div>
    </div>
  );
}
