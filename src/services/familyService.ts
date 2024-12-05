// src/services/familyService.ts
export const getFamilies = async () => {
    const response = await fetch('/api/families');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
};

export const updateStatus = async (id: number, status: string) => {
    const response = await fetch('/api/families/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status })
    });
    if (!response.ok) throw new Error('Failed to update');
};