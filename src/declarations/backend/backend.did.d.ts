import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createProposal' : ActorMethod<
    [
      string,
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
      'id' : string,
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
  'ethGetBalance' : ActorMethod<[string], string>,
  'ethGetBlockByNumber' : ActorMethod<[number], string>,
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
        'id' : string,
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
  'getProposal' : ActorMethod<
    [string],
    [] | [
      {
        'id' : string,
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
  'publicKey' : ActorMethod<[], { 'publicKey' : Uint8Array | number[] }>,
  'sign' : ActorMethod<
    [Uint8Array | number[]],
    { 'signature' : Uint8Array | number[] }
  >,
}
