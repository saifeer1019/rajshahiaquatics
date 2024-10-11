import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-4">
                We would love to hear from you! If you have any questions, comments, or inquiries, 
                please feel free to reach out to us using the contact information below.
            </p>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p className="text-lg">Phone: <a href="tel:01755201753" className="text-blue-500">01755201753</a></p>
                <p className="text-lg">Email: <a href="mailto:aquarajshahi@gmail.com" className="text-blue-500">aquarajshahi@gmail.com</a></p>
                <p className="text-lg">Address: House 285, Road 2, Padma R/A, Rajshahi-6205</p>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
            <p className="text-lg">Stay connected with us on social media for the latest updates and promotions!</p>
            {/* Add social media links here if needed */}
        </div>
    );
};

export default Contact;