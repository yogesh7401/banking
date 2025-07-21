import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getLastTransactions } from "./helper/axiosHelper";

interface Props {
    refreshTrigger: boolean;
}

export default function LastTransactions(props: Props) {
    const user = useAppSelector((state) => state.auth.user);
    const [transactions, setTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getLastTransactions(user?.accountNumber as string);
                setTransactions(response.data.content);
                setTransactionsLoading(false);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        if (user?.accountNumber) {
            fetchTransactions();
        }
    }, [user?.accountNumber, props.refreshTrigger]);

    return (
        <div className="rounded-3xl w-full shadow-md bg-white px-5 py-3">
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Last Transactions</h2>
            <div className="rounded-2xl">
                {transactions.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {transactions.map((transaction: any) => (
                            <li key={transaction.id} className="flex justify-between items-center bg-purple-50 text-gray-700 px-4 py-2 rounded shadow-sm">
                                <p>
                                    {transaction.senderAccountId === user?.accountNumber
                                        ? transaction.receiverAccountId
                                        : transaction.senderAccountId}
                                    <span className="text-gray-500 text-xs ml-2 before:content-['•'] before:mr-2">
                                        {new Date(transaction.transactionTime).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </p>
                                <span
                                    className={
                                        transaction.senderAccountId === user?.accountNumber
                                            ? "text-red-500 font-medium before:content-['-']"
                                            : "text-green-500 font-medium"
                                    }
                                >
                                    ₹{transaction.amount.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : !transactionsLoading ? (
                    <p className="text-gray-500">No transactions found.</p>
                ) : (
                    <p className="text-gray-500">Loading transactions...</p>
                )}
            </div>
        </div>
    );
}
