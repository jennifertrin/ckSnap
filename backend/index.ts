import {
    blob,
    Canister,
    ic,
    int8,
    nat32,
    None,
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

const PublicKey = Record({
    publicKey: blob
});

const Signature = Record({
    signature: blob
});

const Execution = Record({
   to_address: text,
   from_address: text,
   token_amount: int8
})

const Proposal = Record({
    id: text,
    contract_address: text,
    amount: int8,
    title: text,
    description: text,
    deadline: nat32,
    block: text,
    execution: Execution,
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
    createProposal: update([text, text, int8, text, text, nat32, Execution], Proposal, async (id, contract_address, amount, title, description, deadline, execution) => {
        const currentTime = new Date().getTime();
        const block = await ethGetBlockByNumber(currentTime);
        const proposal : typeof Proposal = {
            id, contract_address, amount, title, description, deadline, block, execution
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
        return ethGetBlockByNumber(number);
    }),
    ethTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    }),
    publicKey: update([], PublicKey, async () => {
        const caller = ic.caller().toUint8Array();

        const publicKeyResult = await ic.call(
            managementCanister.ecdsa_public_key,
            {
                args: [
                    {
                        canister_id: None,
                        derivation_path: [caller],
                        key_id: {
                            curve: { secp256k1: null },
                            name: 'dfx_test_key'
                        }
                    }
                ]
            }
        );

        return {
            publicKey: publicKeyResult.public_key
        };
    }),
    sign: update([blob], Signature, async (messageHash) => {
        if (messageHash.length !== 32) {
            ic.trap('messageHash must be 32 bytes');
        }

        const caller = ic.caller().toUint8Array();

        const signatureResult = await ic.call(
            managementCanister.sign_with_ecdsa,
            {
                args: [
                    {
                        message_hash: messageHash,
                        derivation_path: [caller],
                        key_id: {
                            curve: { secp256k1: null },
                            name: 'dfx_test_key'
                        }
                    }
                ],
                cycles: 10_000_000_000n
            }
        );

        return {
            signature: signatureResult.signature
        };
    })
})

async function ethGetBlockByNumber(number: number) {
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
}
