import React, { useEffect, useState } from 'react';
import { Tooltip } from '../ui/tooltip';
import { getcontactdetails } from '@/Services/ContactDetails';

// --- 1. Define the Interface ---
interface ContactDetail {
    id: string; // Unique ID
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    productName: string; // Product the enquiry was about
    date: string; // The date/time the contact was created
}

// --- DUMMY DATA ---
const dummyContacts: ContactDetail[] = [
    {
        id: '1',
        name: 'Amit Sharma',
        email: 'amit.sharma@corp.com',
        phone: '9876543210',
        company: 'Innovatech Solutions',
        subject: 'Inquiry on Bulk Order',
        message: 'We are looking to purchase 500 units of your latest product. Please provide a quote and lead time for delivery.',
        productName: 'Bulk Coenzyme Q10 Powder',
        date: '2025-11-18T10:00:00Z',
    },
    {
        id: '2',
        name: 'Priya Singh',
        email: 'priya.singh@healthplus.net',
        phone: '8012345678',
        company: 'HealthPlus Pharmacy',
        subject: 'Product Specification Request',
        message: 'Could you please send the detailed specification sheet for the Marigold Extract powder? We need it for regulatory approval.',
        productName: 'Marigold Extract',
        date: '2025-11-17T15:30:00Z',
    },
    {
        id: '3',
        name: 'Rajesh Kumar',
        email: 'rajesh@smallbiz.in',
        phone: '7778889990',
        company: '', // Empty company field
        subject: 'Price check for small quantity',
        message: 'What is the current price for a 5kg batch of ferulic acid powder? I am a new customer.',
        productName: 'ferulic acid powder',
        date: '2025-11-16T08:15:00Z',
    },
];
// --- END DUMMY DATA ---


const PhoneNumberList: React.FC = () => {
    const [contacts, setContacts] = useState<ContactDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchContacts = () => {
    //         setLoading(true);
    //         setError(null);
            
    //         setTimeout(() => {
    //             try {
    //                 // Use dummy data instead of API call
    //                 const data = dummyContacts; 
                    
    //                 const sortedData = data.sort((a: ContactDetail, b: ContactDetail) => 
    //                     new Date(b.date).getTime() - new Date(a.date).getTime()
    //                 );
                    
    //                 setContacts(sortedData);
    //             } catch (err) {
    //                 console.error("Failed to load dummy data:", err);
    //                 setError("Failed to load data.");
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }, 500); // 500ms delay to simulate loading
    //     };

    //     fetchContacts();
    // }, []);
useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getcontactdetails(); 
                
                const data = response.data || response; 
                
                if (!Array.isArray(data)) {
                    throw new Error("API did not return a list of contacts.");
                }

                const sortedData = data.sort((a: ContactDetail, b: ContactDetail) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                
                setContacts(sortedData);
            } catch (err) {
                console.error("Failed to fetch contact details:", err);
                setError("Failed to load contact data. Please verify your API connection or credentials.");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []); // Empty dependency array ensures it runs only once on mount
    // --- 3. Loading and Error States ---
    if (loading) {
        return <div className="p-8 text-center text-lg text-blue-600">Loading contact requests... 🚀</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 font-bold">Error: {error}</div>;
    }

    if (contacts.length === 0) {
        return <div className="p-8 text-center text-gray-500">No contact requests found.</div>;
    }
    
    // Helper function to format date
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateString; // Fallback
        }
    };


    // --- 4. Table Rendering ---
    return (
        <div className="p-4 sm:p-6 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-extrabold mb-6 text-green-800 border-b pb-2">
                📞 Product Enquiry List (Dummy Data)
            </h2>
            
            {/* Table Container for horizontal scrolling on small screens */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                           
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company / Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-green-50 transition duration-150 ease-in-out">
                              
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {contact.name}
                                    <br/>      <span className="text-xs text-gray-500">   {formatDate(contact.date)}  </span>                             

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-medium">
                                    {contact.productName} 
                                </td>
                                <td className="px-6 py-4 max-w-xs overflow-hidden text-sm text-gray-700">
                                    {contact.subject}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {contact.company || 'N/A'} <br/> 
                                    <a href={`mailto:${contact.email}`} className="text-xs text-indigo-500 hover:underline">
                                        {contact.email}
                                    </a>
                                </td>
                             <td 
    className="px-6 py-4 max-w-xs overflow-auto text-sm text-gray-600"
    title={contact.message}
>
    {contact.message.length > 50 ? contact.message.substring(0, 50) + '...' : contact.message}
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PhoneNumberList;