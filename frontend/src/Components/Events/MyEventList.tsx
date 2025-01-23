import React, { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import ConfirmModal from "../Confirm/Confirm";
import { deleteEvent } from "../../api/userServices";
import { setAllEvents } from "../../features/eventSlice";
import EventEditForm from "./EventEditForm";

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    chapter: string;
    rsvp: boolean;
}

const EventList: React.FC = () => {
    const data = useSelector((state: RootState) => state?.event?.events);
    const [events, setEvents] = useState<any>([]);
    const dispatch = useDispatch(); // For dispatching actions like delete
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const userData = useSelector((data: RootState) => data.auth?.userData);
    const [eventId,setEventId] = useState('')
    const [isOpen,setIsopen] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [eventData,setEventData] = useState({})
     const handleDeleteConfirm = async(arg:any)=>{
             
             setIsopen(false)
             if(arg){
                console.log(eventId)
                  const res = await deleteEvent(eventId)
                  if(res?.data?.success){
                    const newEvents = data?.filter((obj:any)=>String(obj?._id)!==String(eventId))
                    dispatch(setAllEvents(newEvents))
                  }
             }
     }

    const handleViewDetails = (event: Event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const handleDelete = (eventId: string) => {
      setIsopen(true)
      setEventId(eventId)
    };

    const handleEdit = (event: Event) => {
       setEventData(event)
       setShowModal(true)
    };

    useEffect(() => {

        setEvents(data.filter((obj: any) => String(userData?._id) == String(obj?.userId)));
    }, [data]);
    return (
        <div className="p-6 bg-gradient-to-b from-indigo-50 to-indigo-100">
            {showModal&&<EventEditForm setShowModal={setShowModal} eventData={eventData}/>}
            {<ConfirmModal isOpen={isOpen} handleDeleteConfirm={handleDeleteConfirm}/>}
            <h2 className="text-3xl font-bold text-center text-pink-500 mb-8">{events.length>0&&'My  Events'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {events.map((event: any) => (
                    <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all">
                        <div className="h-20 bg-[black] flex items-center justify-center text-white">
                            <h3 className="text-xl font-bold text-center px-4">{event.title}</h3>
                        </div>
                        <div className="p-4 flex flex-col">
                            <p className="text-gray-600 text-sm mb-4">
                                {event.description.length > 80 ? `${event.description.substring(0, 80)}...` : event.description}
                            </p>
                            <p className="text-gray-500 text-sm mb-2">
                                <strong>Location:</strong> {event.location}
                            </p>
                            <p className="text-gray-500 text-sm mb-2">
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500 text-sm mb-2">
                                <strong>Chapter:</strong> {event.chapter}
                            </p>
                            <p className={`text-sm font-medium mb-4 ${event.rsvp ? "text-green-500" : "text-red-500"}`}>
                                {event.rsvp ? "RSVP Confirmed" : "RSVP Pending"}
                            </p>
                            <button
                                onClick={() => handleViewDetails(event)}
                                className="mt-auto bg-pink-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                            >
                                View Details
                            </button>
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedEvent && (
                <Modal isOpen={!!selectedEvent} onClose={closeModal}>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                        <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                        <p className="text-gray-500 mb-2">
                            <strong>Location:</strong> {selectedEvent.location}
                        </p>
                        <p className="text-gray-500 mb-2">
                            <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 mb-2">
                            <strong>Chapter:</strong> {selectedEvent.chapter}
                        </p>
                        <p className={`text-sm font-medium mb-4 ${selectedEvent.rsvp ? "text-green-500" : "text-red-500"}`}>
                            {selectedEvent.rsvp ? "RSVP Confirmed" : "RSVP Pending"}
                        </p>
                        <button onClick={closeModal} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default EventList;
