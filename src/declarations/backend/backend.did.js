export const idlFactory = ({ IDL }) => {
  const Proposal = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
    'contract_address' : IDL.Text,
    'amount' : IDL.Float64,
  });
  return IDL.Service({
    'get' : IDL.Func([IDL.Text], [Proposal], ['query']),
    'update' : IDL.Func([Proposal], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
