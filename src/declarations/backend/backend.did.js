export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createProposal' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Text,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'contract_address' : IDL.Text,
            'amount' : IDL.Nat,
          }),
        ],
        [],
      ),
    'getAllProposals' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'description' : IDL.Text,
              'contract_address' : IDL.Text,
              'amount' : IDL.Nat,
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
              'contract_address' : IDL.Text,
              'amount' : IDL.Nat,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
