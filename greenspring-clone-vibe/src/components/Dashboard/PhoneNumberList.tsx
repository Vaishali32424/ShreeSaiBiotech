import React, { useEffect, useState } from 'react';
import { getcontactdetails } from '@/Services/ContactDetails';

interface ContactDetail {
    product_name: string;
    id: number;
    name: string;
    email: string;
    phone: string | null;
    description: string;
    created_at: string;
}

const PhoneNumberList: React.FC = () => {
    const [contacts, setContacts] = useState<ContactDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getcontactdetails();
                const data = response.data || response;

                if (!Array.isArray(data)) {
                    throw new Error("API did not return a valid list");
                }

                // Sort by created_at DESC
                const sortedData = data.sort(
                    (a: ContactDetail, b: ContactDetail) =>
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setContacts(sortedData);
            } catch (err) {
                console.error("Fetch failed:", err);
                setError("Failed to load contact data.");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) return <div className="p-8 text-center text-lg text-blue-600">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600 font-bold">{error}</div>;

    return (
        <div className="p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-extrabold mb-6 text-green-800 border-b pb-2">
                📞 Contact Enquiries
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Message</th>
                                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Product Name</th>


                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-green-50">
                                <td className="px-6 py-4">{contact.name}
                                    <br/>                             <p className="text-sm text-gray-500"> {formatDate(contact.created_at)}
                                    </p>      

                                </td>

                                <td className="px-6 py-4">
                                    <a href={`mailto:${contact.email}`} className="text-blue-600 underline">
                                        {contact.email}
                                    </a>
                                </td>

                                <td className="px-6 py-4">
                                    {contact.phone ? (
                                        <a href={`tel:${contact.phone}`} className="text-green-700">
                                            {contact.phone}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>

                                <td className="px-6 py-4 max-w-xs">
                                    {contact.description?.length > 60
                                        ? contact.description.slice(0, 60) + "..."
                                        : contact.description}
                                </td>
    <td className="px-6 py-4 max-w-xs">
                                    {contact.product_name || "N/A"}
                                </td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PhoneNumberList;
