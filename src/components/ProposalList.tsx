import { useEffect, useState } from "react";
import { backend } from "../declarations/backend";
import EmptyContainer from "./EmptyContainer";

interface Execution  {
  to_address: string,
  from_address: string,
  token_amount: number
}

interface Proposal {
   id: string,
   contract_address: string,
   amount: number,
   title: string,
   description: string,
   deadline: number,
   block: string,
   execution: Execution,
}

export default function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const proposals = await backend.getAllProposals();
        if (proposals) {
          setProposals(proposals);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    }
    fetchProposals();
  }, []);

  return (
    <div>
      {proposals.length > 0
        ? proposals.map((proposal) => (
            <div
              key={proposal.title}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{proposal.title}</div>
                <p className="text-gray-700 text-base mb-2">
                  {proposal.description}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  You need to own {proposal.amount.toString()} token from Ethereum contract address {proposal.contract_address}
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vote</button>
            </div>
          ))
        : <EmptyContainer pageTitle={'No proposals open at the moment'} pageMessage={'Create a proposal now'}></EmptyContainer>}
    </div>
  );
}
