import { useState } from "react";
import ProposalForm from "./ProposalForm";
import ProposalList from "./ProposalList";
import ConnectWallet from "./ConnectWallet";

export default function MainCTA() {
  const [proposalSection, setProposalSection] = useState<boolean>(false);
  const [proposalListSection, setProposalListSection] = useState<boolean>(false);

  return (
    <div className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-indigo-400 via-indigo-300 to-fuchsia-100 bg-scroll">
      <div className="flex flex-col lg:flex-row">
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
                  }} className="rounded-md bg-white px-12 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Vote
                </button>
              </div>
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
