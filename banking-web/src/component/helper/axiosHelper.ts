import apiClient from "../auth/authInterceptors";

export const getCurrentUserInfo = async () => {
    return await apiClient.get("/api/users/profile");
};

export const getLastTransactions = async (accountNumber : string) => {
    return await apiClient.get(`/api/users/${accountNumber}/transactions?page=0&size=6&sort=transactionTime,desc`);
};

export const transferMoney = async (transferDetails: any) => {
    return await apiClient.post("/api/transfer", transferDetails);
};

export function handleApiError(error: unknown, fallbackMessage = "Something went wrong") {
    if (error instanceof Error) {
        const axiosError = error as any;
        const errorMsg = axiosError?.response?.data
            ? `Request failed: ${axiosError.response.data}`
            : `Request failed: ${error.message || fallbackMessage}`;
        alert(errorMsg);
    } else {
        alert(fallbackMessage);
    }
}
