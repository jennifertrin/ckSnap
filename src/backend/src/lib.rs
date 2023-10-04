use ic_cdk::{
    export::{
        candid::{CandidType, Deserialize},
        Principal,
    }
};
use std::cell::RefCell;
use std::collections::BTreeMap;
use ic_cdk_macros::{query, update, export_candid};

type IdStore = BTreeMap<String, Principal>;
type ProposalStore = BTreeMap<Principal, Proposal>;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Proposal {
    pub contract_address: String,
    pub amount: f64,
    pub title: String,
    pub description: String,
}

thread_local! {
    static PROPOSAL_STORE: RefCell<ProposalStore> = RefCell::default();
    static ID_STORE: RefCell<IdStore> = RefCell::default();
}

#[query]
fn get_all_proposals() -> Vec<Proposal> {
    ID_STORE.with(|id_store| {
        PROPOSAL_STORE.with(|proposal_store| {
            let id_store = id_store.borrow();
            let proposal_store = proposal_store.borrow();
            
            let mut proposals = Vec::new();
            
            for id in id_store.values() {
                if let Some(proposal) = proposal_store.get(id) {
                    proposals.push(proposal.clone());
                }
            }
            
            proposals
        })
    })
}

#[query]
fn get(title: String) -> Proposal {
    ID_STORE.with(|id_store| {
        PROPOSAL_STORE.with(|proposal_store| {
            id_store
                .borrow()
                .get(&title)
                .and_then(|id| proposal_store.borrow().get(id).cloned()).unwrap_or_default()
        })
    })
}

#[update]
fn update(proposal: Proposal) {
    let principal_id = ic_cdk::api::caller();
    ID_STORE.with(|id_store| {
        id_store
            .borrow_mut()
            .insert(proposal.title.clone(), principal_id);
    });
    PROPOSAL_STORE.with(|proposal_store| {
        proposal_store.borrow_mut().insert(principal_id, proposal);
    });
}

export_candid!();