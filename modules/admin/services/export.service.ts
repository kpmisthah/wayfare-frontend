import api from "@/lib/api";

const downloadCsv = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
};

export const exportUsers = async () => {
    try {
        const response = await api.get('/admin/export/users', {
            responseType: 'blob',
        });
        downloadCsv(response.data, `users_export_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
        console.error("Failed to export users", error);
    }
};

export const exportPayouts = async () => {
    try {
        const response = await api.get('/admin/export/payouts', {
            responseType: 'blob',
        });
        downloadCsv(response.data, `payouts_export_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
        console.error("Failed to export payouts", error);
    }
};

export const exportTransactions = async () => {
    try {
        const response = await api.get('/admin/export/transactions', {
            responseType: 'blob',
        });
        downloadCsv(response.data, `transactions_export_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
        console.error("Failed to export transactions", error);
    }
};

export const exportAgencyRevenue = async () => {
    try {
        const response = await api.get('/admin/export/agency-revenue', {
            responseType: 'blob',
        });
        downloadCsv(response.data, `agency_revenue_export_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
        console.error("Failed to export agency revenue", error);
    }
};
