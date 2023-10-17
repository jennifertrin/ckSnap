import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createProposal' : ActorMethod<
    [string, string, number, string, string],
    {
      'id' : string,
      'title' : string,
      'description' : string,
      'contract_address' : string,
      'amount' : number,
    }
  >,
  'getAllProposals' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'title' : string,
        'description' : string,
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
        'contract_address' : string,
        'amount' : number,
      }
    ]
  >,
}
