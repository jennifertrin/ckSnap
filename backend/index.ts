import { Canister, query, update, Record, text, nat, Opt, StableBTreeMap, Vec, int8 } from "azle";

const Proposal = Record({
    id: text,
    contract_address: text,
    amount: int8,
    title: text,
    description: text,
})

let proposals = StableBTreeMap(text, Proposal, 0);

export default Canister({
    getProposal: query([text], Opt(Proposal), (id) => {
        return proposals.get(id);
    }),
    getAllProposals: query([], Vec(Proposal), () => {
        const proposalList = proposals.values();
        return proposalList;
    }),
    createProposal: update([text, text, int8, text, text], Proposal, (id, contract_address, amount, title, description) => {
        const proposal : typeof Proposal = {
            id, contract_address, amount, title, description
        }
       proposals.insert(id, proposal);
       return proposal;
    })
})