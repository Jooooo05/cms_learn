export function formatDate(isoDate: string) {
    const date = new Date(isoDate);

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}