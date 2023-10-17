export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createProposal' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Int8, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Text,
            'title' : IDL.Text,
            'description' : IDL.Text,
            'contract_address' : IDL.Text,
            'amount' : IDL.Int8,
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
              'contract_address' : IDL.Text,
              'amount' : IDL.Int8,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
