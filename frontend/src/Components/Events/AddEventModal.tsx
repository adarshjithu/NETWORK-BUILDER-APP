import React, { useState } from "react";
import eventSchema from "../../Utils/eventValidations";
import { createEvent } from "../../api/userServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setNewEvent } from "../../features/eventSlice";

function AddEventModal({ setShowModal }: any) {
    const events = useSelector((data: RootState) => data?.event?.events);
    console.log(events);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        region: "",
        chapter: "",
    });

    const [error, setError] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        region: "",
        chapter: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await eventSchema.validate(formData, { abortEarly: false });
            const res = await createEvent(formData);
            dispatch(setNewEvent(res?.data?.data));
            setShowModal(false);
        } catch (err: any) {
            const validationErrors: any = {};
            if (err.inner) {
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
            }
            setError(validationErrors);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg w-1/3 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">
                            Title
                        </label>
                        {error?.title && <span className="text-red-500">{error?.title}</span>}
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">
                            Description
                        </label>
                        {error?.description && <span className="text-red-500">{error?.description}</span>}
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700">
                            Location
                        </label>
                        {error?.location && <span className="text-red-500">{error?.location}</span>}
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">
                            Date
                        </label>
                        {error?.date && <span className="text-red-500">{error?.date}</span>}
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="region" className="block text-gray-700">
                            Region
                        </label>
                        {error?.region && <span className="text-red-500">{error?.region}</span>}
                        <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="chapter" className="block text-gray-700">
                            Chapter
                        </label>
                        {error?.chapter && <span className="text-red-500">{error?.chapter}</span>}
                        <select
                            id="chapter"
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="" disabled>
                                Select Chapter
                            </option>
                            <option value="Technology Innovations">Technology Innovations</option>
                            <option value="Business Development">Business Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                            <option value="Finance & Investment">Finance & Investment</option>
                            <option value="Environmental Sustainability">Environmental Sustainability</option>
                            <option value="Education & E-learning">Education & E-learning</option>
                            <option value="Creative Arts & Media">Creative Arts & Media</option>
                            <option value="Legal & Regulatory Affairs">Legal & Regulatory Affairs</option>
                            <option value="HR & Talent Management">HR & Talent Management</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal;
