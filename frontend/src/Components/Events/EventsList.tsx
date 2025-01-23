import React, { useState } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import Modal from "./Modal";


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
  const events = useSelector((state: RootState) => state?.event?.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-8">{events.length>0&&'Upcoming Events'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <div className="h-20 bg-[black] border to-purple-700 flex items-center justify-center text-white">
              <h3 className="text-xl font-bold text-center px-4">{event.title}</h3>
            </div>
            <div className="p-4 flex flex-col">
              <p className="text-gray-700 text-sm mb-4">
                {event.description.length > 80
                  ? `${event.description.substring(0, 80)}...`
                  : event.description}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Chapter:</strong> {event.chapter}
              </p>
              <p className={`text-sm font-medium mb-4 ${event.rsvp ? "text-green-600" : "text-red-600"}`}>
                {event.rsvp ? "RSVP Confirmed" : "RSVP Pending"}
              </p>
              <button
                onClick={() => handleViewDetails(event)}
                className="mt-auto bg-pink-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <Modal isOpen={!!selectedEvent} onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Chapter:</strong> {selectedEvent.chapter}
            </p>
            <p className={`text-sm font-medium mb-4 ${selectedEvent.rsvp ? "text-green-600" : "text-red-600"}`}>
              {selectedEvent.rsvp ? "RSVP Confirmed" : "RSVP Pending"}
            </p>
            <button
              onClick={closeModal}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventList;
