import {
    Canister,
    ic,
    int8,
    nat32,
    Opt,
    Principal,
    query,
    Record,
    Some,
    StableBTreeMap,
    text,
    update,
    Vec
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

let stableStorage = StableBTreeMap(text, text, 0);

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
    }),
    ethGetBalance: update([text], text, async (ethereumAddress) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }
        const url = urlOpt.Some;
        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBalance',
                                params: [ethereumAddress, 'earliest'],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });
        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethGetBlockByNumber: update([nat32], text, async (number) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBlockByNumber',
                                params: [`0x${number.toString(16)}`, false],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
})