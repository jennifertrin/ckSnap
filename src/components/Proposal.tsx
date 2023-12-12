import { useSignMessage } from "wagmi";
import { backend } from "../declarations/backend";
import { SetStateAction, useState } from "react";

interface ProposalType {
    id: number,
    title: string,
    description: string,
    contractAddress: string,
    amount: number
}

interface Decision {
    No: boolean,
    Yes: boolean,
    Abstain: boolean
}

export default function Proposal({ id, title, description, contractAddress, amount }: ProposalType) {
    const [decision, setDecision] = useState<Decision>({ No: false, Yes: false, Abstain: false });

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: `Sign to check voting eligibility for Proposal ${id} for DAO ${contractAddress}`,
    });

    async function voteOnProposal() {

        const message = await signMessage();

        if (isSuccess && data) {
            return await backend.voteOnProposal(id, decision, contractAddress, data)
        }

    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as keyof Decision;
    
        setDecision((prevDecision) => ({
          ...prevDecision,
          [selectedValue]: !prevDecision[selectedValue],
        }));
      };
    
    return (
        <div
            key={title}
            className="flex flex-row space-between-4 max-w-sm mb-4 mt-2 rounded overflow-hidden shadow-lg bg-white"
        >
            <div className="px-12 py-8">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base mb-2">
                    {description}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    You need to own {amount.toString()} token from Ethereum contract address {contractAddress}
                </p>
            </div>
            <select onChange={handleSelectChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
                <option value={"Abstain"}>Abstain</option>
            </select>
            <button onClick={() => voteOnProposal()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vote</button>
        </div>
    )
}