export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createProposal' : IDL.Func(
        [
          IDL.Text,
          IDL.Int8,
          IDL.Text,
          IDL.Text,
          IDL.Int8,
          IDL.Record({
            'token_amount' : IDL.Int8,
            'to_address' : IDL.Text,
            'from_address' : IDL.Text,
          }),
        ],
        [
          IDL.Record({
            'id' : IDL.Int8,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'deadline' : IDL.Int8,
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
    'ethGetCurrentBlock' : IDL.Func([], [IDL.Text], []),
    'ethGetTokenBalance' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
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
              'id' : IDL.Int8,
              'title' : IDL.Text,
              'description' : IDL.Text,
              'deadline' : IDL.Int8,
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
        [IDL.Int8],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Int8,
              'title' : IDL.Text,
              'description' : IDL.Text,
              'deadline' : IDL.Int8,
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
    'getVoteById' : IDL.Func(
        [IDL.Int8],
        [
          IDL.Opt(
            IDL.Record({
              'signature' : IDL.Text,
              'decision' : IDL.Variant({
                'No' : IDL.Bool,
                'Yes' : IDL.Bool,
                'Abstain' : IDL.Bool,
              }),
              'voteId' : IDL.Int8,
              'address' : IDL.Text,
              'proposalId' : IDL.Int8,
            })
          ),
        ],
        ['query'],
      ),
    'getVoteByProposalId' : IDL.Func(
        [IDL.Int8],
        [
          IDL.Vec(
            IDL.Record({
              'signature' : IDL.Text,
              'decision' : IDL.Variant({
                'No' : IDL.Bool,
                'Yes' : IDL.Bool,
                'Abstain' : IDL.Bool,
              }),
              'voteId' : IDL.Int8,
              'address' : IDL.Text,
              'proposalId' : IDL.Int8,
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
    'voteOnProposal' : IDL.Func(
        [
          IDL.Int8,
          IDL.Variant({
            'No' : IDL.Bool,
            'Yes' : IDL.Bool,
            'Abstain' : IDL.Bool,
          }),
          IDL.Text,
          IDL.Text,
        ],
        [
          IDL.Record({
            'signature' : IDL.Text,
            'decision' : IDL.Variant({
              'No' : IDL.Bool,
              'Yes' : IDL.Bool,
              'Abstain' : IDL.Bool,
            }),
            'voteId' : IDL.Int8,
            'address' : IDL.Text,
            'proposalId' : IDL.Int8,
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
