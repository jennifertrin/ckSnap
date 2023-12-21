import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createProposal' : ActorMethod<
    [
      string,
      number,
      string,
      string,
      number,
      {
        'token_amount' : number,
        'to_address' : string,
        'from_address' : string,
      },
    ],
    {
      'id' : number,
      'title' : string,
      'description' : string,
      'deadline' : number,
      'execution' : {
        'token_amount' : number,
        'to_address' : string,
        'from_address' : string,
      },
      'block' : string,
      'contract_address' : string,
      'amount' : number,
    }
  >,
  'ethGetCurrentBlock' : ActorMethod<[], string>,
  'ethGetTokenBalance' : ActorMethod<[string, string, string], string>,
  'ethTransform' : ActorMethod<
    [
      {
        'context' : Uint8Array | number[],
        'response' : {
          'status' : bigint,
          'body' : Uint8Array | number[],
          'headers' : Array<{ 'value' : string, 'name' : string }>,
        },
      },
    ],
    {
      'status' : bigint,
      'body' : Uint8Array | number[],
      'headers' : Array<{ 'value' : string, 'name' : string }>,
    }
  >,
  'getAllProposals' : ActorMethod<
    [],
    Array<
      {
        'id' : number,
        'title' : string,
        'description' : string,
        'deadline' : number,
        'execution' : {
          'token_amount' : number,
          'to_address' : string,
          'from_address' : string,
        },
        'block' : string,
        'contract_address' : string,
        'amount' : number,
      }
    >
  >,
  'getAllVotes' : ActorMethod<
    [],
    Array<
      {
        'signature' : string,
        'decision' : { 'No' : boolean } |
          { 'Yes' : boolean } |
          { 'Abstain' : boolean },
        'voteId' : number,
        'address' : string,
        'proposalId' : number,
      }
    >
  >,
  'getProposal' : ActorMethod<
    [number],
    [] | [
      {
        'id' : number,
        'title' : string,
        'description' : string,
        'deadline' : number,
        'execution' : {
          'token_amount' : number,
          'to_address' : string,
          'from_address' : string,
        },
        'block' : string,
        'contract_address' : string,
        'amount' : number,
      }
    ]
  >,
  'getVoteById' : ActorMethod<
    [number],
    [] | [
      {
        'signature' : string,
        'decision' : { 'No' : boolean } |
          { 'Yes' : boolean } |
          { 'Abstain' : boolean },
        'voteId' : number,
        'address' : string,
        'proposalId' : number,
      }
    ]
  >,
  'publicKey' : ActorMethod<[], { 'publicKey' : Uint8Array | number[] }>,
  'sign' : ActorMethod<
    [Uint8Array | number[]],
    { 'signature' : Uint8Array | number[] }
  >,
  'voteOnProposal' : ActorMethod<
    [
      number,
      { 'No' : boolean } |
        { 'Yes' : boolean } |
        { 'Abstain' : boolean },
      string,
      string,
    ],
    {
      'signature' : string,
      'decision' : { 'No' : boolean } |
        { 'Yes' : boolean } |
        { 'Abstain' : boolean },
      'voteId' : number,
      'address' : string,
      'proposalId' : number,
    }
  >,
}
