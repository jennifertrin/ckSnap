import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Proposal {
  'title' : string,
  'description' : string,
  'contract_address' : string,
  'amount' : bigint,
}
export interface _SERVICE {
  'get' : ActorMethod<[string], Proposal>,
  'update' : ActorMethod<[Proposal], undefined>,
}
