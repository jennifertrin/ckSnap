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
        console.log('getProposals');
        console.log('backend', backend);
        const proposals = await backend.getAllProposals();
        console.log('proposals', proposals);
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
            </div>
          ))
        : <EmptyContainer pageTitle={'No proposals open at the moment'} pageMessage={'Create a proposal now'}></EmptyContainer>}
    </div>
  );
}
