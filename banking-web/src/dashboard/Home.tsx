import { useState } from "react";
import IncomeSpentchart from "../component/IncomeSpentChart";
import LastTransactions from "../component/LastTransactions";
import MoneyTransfer from "../component/MoneyTransfer";
import Offers from "../component/Offers";
import { useAppSelector } from "../redux/hooks";

export default function Home() {
    const user = useAppSelector((state) => state.auth.user);

    const [refreshTransactions, setRefreshTransactions] = useState(false);
    const triggerRefresh = () => setRefreshTransactions(prev => !prev);
    
    return <div>
        <h1 className="text-3xl font-bold text-purple-800 mb-3">Hello, {user?.username}</h1>
        <p className="text-gray-500">Welcome back!</p>
        <div className="grid lg:grid-cols-2 gap-4 mt-5">
            <MoneyTransfer onTransferSuccess={triggerRefresh}/>
            <Offers />
            <IncomeSpentchart />
            <LastTransactions refreshTrigger={refreshTransactions}/>
        </div>
    </div>
}