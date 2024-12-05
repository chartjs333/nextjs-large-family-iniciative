'use client';
import React, { useState, useEffect } from 'react';

interface FamilyData {
    id: number;
    name: string;
    surname: string;
    email: string;
    country: string;
    institution: string;
    status: string;
    notes: string;
    surveyTwoId: string;
}
const FamilyViewer = () => {
    const [familyData, setFamilyData] = useState<FamilyData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFamily, setSelectedFamily] = useState<FamilyData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusOptions = ["New", "In Progress", "Completed", "Cancelled"];
    const fetchFamilies = async () => {
        try {
            const response = await fetch('https://monogenic.gp2.org/api/families');
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setFamilyData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchFamilies();
    }, []);

    const handleStatusChange = async (surveyTwoId: string, newStatus: string) => {
        try {
            const response = await fetch(`https://monogenic.gp2.org/api/families/survey/${surveyTwoId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus || 'Новый' })
            });

            if (!response.ok) throw new Error('Failed to update status');
            await fetchFamilies();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error updating status');
        }
    };

    const handleNotesChange = async (surveyTwoId: string, newNotes: string) => {
        try {
            const response = await fetch(`https://monogenic.gp2.org/api/families/survey/${surveyTwoId}/notes`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes: newNotes })
            });

            if (!response.ok) throw new Error('Failed to update notes');
            await fetchFamilies();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error updating notes');
        }
    };

    const handleRowClick = (family: FamilyData) => {
        setSelectedFamily(family);
        setIsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Новый': return 'bg-green-100 text-green-800';
            case 'В обработке': return 'bg-blue-100 text-blue-800';
            case 'Завершен': return 'bg-gray-100 text-gray-800';
            case 'Отменен': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto mt-6 p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9C4F96] mx-auto"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto mt-6 p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto mt-6 bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#0A2942]">Family Data Viewer</h2>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Surname</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Country</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Institution</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#0A2942] uppercase tracking-wider">Notes</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {familyData.map((family) => (
                                <tr
                                    key={family.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(family)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.surname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{family.institution}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={family.status || 'New'}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStatusChange(family.surveyTwoId, e.target.value);
                                            }}
                                            className={`px-2 py-1 text-sm rounded-full border-0 ${getStatusColor(family.status || 'New')}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {family.notes?.length > 30 ? `${family.notes.substring(0, 30)}...` : family.notes || ''}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedFamily && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#0A2942]">Detailed Information</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">ID</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Surname</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.surname}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Country</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.country}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Institution</label>
                                <p className="mt-1 text-sm text-gray-900">{selectedFamily.institution}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Status</label>
                                <select
                                    value={selectedFamily.status}
                                    onChange={(e) => selectedFamily?.surveyTwoId && handleStatusChange(selectedFamily.surveyTwoId, e.target.value)}
                                    className={`mt-1 px-2 py-1 text-sm rounded-full ${getStatusColor(selectedFamily.status)}`}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#0A2942]">Notes</label>
                                <textarea
                                    value={selectedFamily.notes}
                                    onChange={(e) => selectedFamily?.surveyTwoId && handleNotesChange(selectedFamily.surveyTwoId, e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9C4F96] focus:border-[#9C4F96]"
                                    rows={4}
                                    placeholder="Enter notes..."
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full px-4 py-2 bg-[#9C4F96] text-white rounded-md hover:bg-[#8A458B]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FamilyViewer;