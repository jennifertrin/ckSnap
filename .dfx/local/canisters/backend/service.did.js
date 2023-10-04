export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'keywords' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'get' : IDL.Func([IDL.Text], [Profile], ['query']),
    'getSelf' : IDL.Func([], [Profile], ['query']),
    'update' : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
