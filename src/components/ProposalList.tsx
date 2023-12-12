import { useEffect, useState } from "react";
import { backend } from "../declarations/backend";
import EmptyContainer from "./EmptyContainer";
import Proposal from "./Proposal";

interface Execution  {
  to_address: string,
  from_address: string,
  token_amount: number,
}

interface Proposal {
   id: number,
   contract_address: string,
   amount: number,
   title: string,
   description: string,
   deadline: number,
   block: string,
   execution: Execution,
}

export default function ProposalList() {
  const [newProposals, setNewProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    async function fetchProposals() {
      try {
        const proposals = await backend.getAllProposals();
        if (proposals) {
          setNewProposals(proposals);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    }
    fetchProposals();
  }, [backend]);

  return (
    <div className="mt-6">
      {newProposals.length > 0
        ? newProposals.map((proposal) => (
            <Proposal id={proposal.id} title={proposal.title} description={proposal.description} contractAddress={proposal.contract_address} amount={proposal.amount} />
          ))
        : <EmptyContainer pageTitle={'No proposals open at the moment'} pageMessage={'Create a proposal now'}></EmptyContainer>}
    </div>
  );
}