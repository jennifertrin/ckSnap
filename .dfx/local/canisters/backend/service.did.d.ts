import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Profile {
  'name' : string,
  'description' : string,
  'keywords' : Array<string>,
}
export interface _SERVICE {
  'get' : ActorMethod<[string], Profile>,
  'getSelf' : ActorMethod<[], Profile>,
  'update' : ActorMethod<[Profile], undefined>,
}
