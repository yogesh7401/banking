import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import ButtonComponent from "./utils/ButtonComponent";
import { inputClassName } from "./utils/ClassName";
import { handleApiError, transferMoney } from "./helper/axiosHelper";

interface Props {
    onTransferSuccess: () => void;
}

export default function MoneyTransfer(props: Props) {
    const user = useAppSelector((state) => state.auth.user);
    const [transferDetails, setTransferDetails] = useState({
        receiverAccountNumber: '',
        expireMonth: '',
        expireYear: '',
        amount: '',
    });

    const handleMonthAutoFormat = (e :  React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        const num = Math.min(12, Math.max(0, parseInt(value || "0", 10)));
        num === 0 ? e.target.value = '' : e.target.value = num.toString().padStart(2, '0');
    };
    const handleYearAutoFormat = (e :  React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        const num = Math.min(99, Math.max(0, parseInt(value || "0", 10)));
        num === 0 ? e.target.value = '' : e.target.value = num.toString().padStart(2, '0');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTransferDetails(prev => {
            let newValue: string | number = value;
            if (['expireMonth', 'expireYear', 'amount'].includes(name)) {
                const parsed = parseInt(value, 10);
                newValue = isNaN(parsed) ? '' : parsed;
            }
            return {
                ...prev,
                [name]: newValue,
            };
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            await transferMoney(transferDetails);
            alert('Transfer successful');
            props.onTransferSuccess();
        } catch (error: unknown) {
            handleApiError(error, 'Transfer failed. Please try again.');
        }
    }

    return <div className="rounded-3xl w-full shadow-md bg-white grid-cols-6 px-5 py-3">
        <div className="flex justify-between">
            <p className="font-bold">Transfer</p>
            <div className="flex items-center gap-2 justify-between">
                <p className="text-sm px-3 my-auto py-1 rounded-2xl bg-purple-100">
                    {user?.accountNumber}
                </p>
                <p className="text-sm px-3 my-auto py-1 rounded-2xl bg-purple-100 italic">
                    Exp: {user?.expireMonth}/{user?.expireYear}
                </p>
            </div>
        </div>
        <form className="mt-5 grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-2">
                <input type="text" onChange={handleChange} name="receiverAccountNumber" id="account_number" className={inputClassName} placeholder="Account Number" required />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <input type="number" onChange={handleChange} name="expireMonth" onBlur={handleMonthAutoFormat} id="expire_month" min={0} max={12} maxLength={2} className={inputClassName} placeholder="MM" required />
                <input type="number" onChange={handleChange} name="expireYear" onBlur={handleYearAutoFormat} id="expire_year" min={0} max={99} maxLength={2} className={inputClassName} placeholder="YY" required />
            </div>
            <div className="col-span-2">
                <input type="text" className={inputClassName} placeholder="Account Holder Name" required />
            </div>
            <div>
                <input type="number" onChange={handleChange} name="amount" id="transfer_amount" className={inputClassName} placeholder="Amount" required />
            </div>
            <div className="col-span-2 flex h-full">
                <small className="text-purple-800 text-[10px] sm:text-xs mt-auto underline">Please double-check the recipient and amount.</small>
            </div>
            <div>
                <ButtonComponent text="Transfer" className="w-full"/>
            </div>
        </form>
        
    </div>
}