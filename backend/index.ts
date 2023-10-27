import {
    blob,
    Canister,
    ic,
    int8,
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
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "ethers";

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
    deadline: int8,
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
    createProposal: update([text, text, int8, text, text, int8, Execution], Proposal, async (id, contract_address, amount, title, description, deadline, execution) => {
        const block = await ethGetCurrentBlock();
        const proposal : typeof Proposal = {
            id, contract_address, amount, title, description, deadline, block, execution
        }
       proposals.insert(id, proposal);
       return proposal;
    }),
    ethGetTokenBalance: update([text, text, text], text, async (ethereumAddress, contractAddress, blockNumber) => {
        const url = "https://rpc.ankr.com/eth";

        const signature = keccak256(toUtf8Bytes(`balanceOf(${ethereumAddress})`)).substring(0, 10);
        const addressWithout0x = ethereumAddress.slice(2);
        const hash = signature + "000000000000000000000000" + addressWithout0x;


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
                                method: 'eth_call',
                                params: [{"data":hash,"to":contractAddress}, blockNumber],
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
    ethGetCurrentBlock: update([], text, async () => {
        return ethGetCurrentBlock();
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

    async function ethGetCurrentBlock() {
        const url = "https://rpc.ankr.com/eth";

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
                                    method: 'eth_blockNumber',
                                    params: [],
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

            const jsonResponse = JSON.parse(Buffer.from(httpResponse.body.buffer).toString('utf-8'));
            return jsonResponse.result;
    }