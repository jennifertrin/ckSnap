export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createProposal' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Int8,
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
          IDL.Record({
            'token_amount' : IDL.Int8,
            'to_address' : IDL.Text,
            'from_address' : IDL.Text,
          }),
        ],
        [
          IDL.Record({
            'id' : IDL.Text,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'deadline' : IDL.Nat32,
            'execution' : IDL.Record({
              'token_amount' : IDL.Int8,
              'to_address' : IDL.Text,
              'from_address' : IDL.Text,
            }),
            'block' : IDL.Text,
            'contract_address' : IDL.Text,
            'amount' : IDL.Int8,
          }),
        ],
        [],
      ),
    'ethGetBalance' : IDL.Func([IDL.Text], [IDL.Text], []),
    'ethGetBlockByNumber' : IDL.Func([IDL.Nat32], [IDL.Text], []),
    'ethTransform' : IDL.Func(
        [
          IDL.Record({
            'context' : IDL.Vec(IDL.Nat8),
            'response' : IDL.Record({
              'status' : IDL.Nat,
              'body' : IDL.Vec(IDL.Nat8),
              'headers' : IDL.Vec(
                IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
              ),
            }),
          }),
        ],
        [
          IDL.Record({
            'status' : IDL.Nat,
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(
              IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
            ),
          }),
        ],
        ['query'],
      ),
    'getAllProposals' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'description' : IDL.Text,
              'deadline' : IDL.Nat32,
              'execution' : IDL.Record({
                'token_amount' : IDL.Int8,
                'to_address' : IDL.Text,
                'from_address' : IDL.Text,
              }),
              'block' : IDL.Text,
              'contract_address' : IDL.Text,
              'amount' : IDL.Int8,
            })
          ),
        ],
        ['query'],
      ),
    'getProposal' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'description' : IDL.Text,
              'deadline' : IDL.Nat32,
              'execution' : IDL.Record({
                'token_amount' : IDL.Int8,
                'to_address' : IDL.Text,
                'from_address' : IDL.Text,
              }),
              'block' : IDL.Text,
              'contract_address' : IDL.Text,
              'amount' : IDL.Int8,
            })
          ),
        ],
        ['query'],
      ),
    'publicKey' : IDL.Func(
        [],
        [IDL.Record({ 'publicKey' : IDL.Vec(IDL.Nat8) })],
        [],
      ),
    'sign' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Record({ 'signature' : IDL.Vec(IDL.Nat8) })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
