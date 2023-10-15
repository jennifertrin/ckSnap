import { useEffect, useState } from "react";
import { backend } from "../declarations/backend/index";
import { Proposal } from "../declarations/backend/backend.did";
import EmptyContainer from "./EmptyContainer";

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const proposals = await backend.get_all_proposals();
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
      {proposals
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
                  You need to own {proposal.amount} token from Ethereum contract address {proposal.contract_address}
                </p>
              </div>
            </div>
          ))
        : <EmptyContainer pageTitle={'No proposals open at the moment'} pageMessage={'Create a proposal now'}></EmptyContainer>}
    </div>
  );
}
