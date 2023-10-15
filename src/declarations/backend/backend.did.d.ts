import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Proposal {
  'title' : string,
  'description' : string,
  'contract_address' : string,
  'amount' : number,
}
export interface _SERVICE {
  'get' : ActorMethod<[string], Proposal>,
  'get_all_proposals' : ActorMethod<[], Array<Proposal>>,
  'update' : ActorMethod<[Proposal], undefined>,
}
