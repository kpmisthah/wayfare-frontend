interface ExportColumn<T> {
    header: string;
    accessor: keyof T | ((row: T) => string | number);
}


export function exportToCSV<T extends object>(
    data: T[],
    columns: ExportColumn<T>[],
    filename: string
): void {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }


    const headers = columns.map((col) => `"${col.header}"`).join(',');


    const rows = data.map((row) => {
        return columns
            .map((col) => {
                let value: unknown;
                if (typeof col.accessor === 'function') {
                    value = col.accessor(row);
                } else {
                    value = row[col.accessor];
                }
                const stringValue = String(value ?? '');
                return `"${stringValue.replace(/"/g, '""')}"`;
            })
            .join(',');
    });

    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

export function formatDateForExport(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}


export function formatCurrencyForExport(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
}
