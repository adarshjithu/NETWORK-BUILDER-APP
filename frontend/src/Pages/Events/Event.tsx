import React, { useState, useEffect } from "react";
import AddEventModal from "../../Components/Events/AddEventModal";
import { doRsvp, getAllEvents } from "../../api/userServices";
import { useDispatch, useSelector } from "react-redux";
import { setAllEvents } from "../../features/eventSlice";
import { RootState } from "../../app/store";
import EventList from "../../Components/Events/EventsList";
import MyEventList from "../../Components/Events/MyEventList";


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<any[]>([]); // Use a better type for events
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state?.event?.events);

    // Normalize date to ignore time zone differences
    const normalizeDate = (date: Date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);  // Set time to midnight to avoid mismatches
        return normalizedDate;
    };

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the last day of the current month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Days in the month
    const daysInMonth = lastDayOfMonth.getDate();

    // Days to pad before the first day of the month
    const startPaddingDays = firstDayOfMonth.getDay();

    // Change month
    const changeMonth = (direction: "prev" | "next") => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
        setCurrentDate(newDate);
        setSelectedDate(null);
        setSelectedEvents([]);
    };

    // Handle date click
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        const normalizedSelectedDate = normalizeDate(date);

        const eventsForDate = events.filter((event: any) => {
            const eventDate = normalizeDate(new Date(event.date)); // Normalize both the selected date and the event date
            return eventDate.getTime() === normalizedSelectedDate.getTime();
        });

        setSelectedEvents(eventsForDate);
    };


    const makeRsvp = async(event:any)=>{
       
      const res = await doRsvp(event?._id)
    const newEvents = events.map((obj: any) => {
        console.log(obj);
        if (obj?._id?.toString() === event?._id?.toString()) {
            // Don't mutate the original object; create a new one with the updated rsvp
            return { ...obj, rsvp: !obj.rsvp };
        }
        return obj;
    });
    
    const newSelectedEvents = events.map((obj: any) => {
        console.log(obj);
        if (obj?._id?.toString() === event?._id?.toString()) {
            // Don't mutate the original object; create a new one with the updated rsvp
            return { ...obj, rsvp: !obj?.rsvp };
        }
        return obj;
    });
    
     dispatch(setAllEvents(newEvents))
     setSelectedEvents(newSelectedEvents)
     
    }


    

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllEvents(); // Get events from API
            dispatch(setAllEvents(res?.data?.data));
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen text-gray-900 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <header className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => changeMonth("prev")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                    >
                        Prev
                    </button>
                    <h2 className="text-xl font-semibold">
                        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                    </h2>
                    <button
                        onClick={() => changeMonth("next")}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                    >
                        Next
                    </button>
                </header>

                <div className="flex justify-between mb-4">
                    <div className="w-4/5">
                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="font-semibold text-gray-700">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for padding */}
                            {Array.from({ length: startPaddingDays }).map((_, index) => (
                                <div key={index} className="bg-gray-200 h-12"></div>
                            ))}

                            {/* Calendar Days */}
                            {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayIndex + 1);
                                const dateString = date.toISOString().split("T")[0];
                                const hasEvent = events.some((event: any) => {
                                    const eventDate = new Date(event?.date).toISOString().split("T")[0];
                                    return eventDate === dateString;
                                });

                                return (
                                    <div
                                        key={dayIndex}
                                        onClick={() => handleDateClick(date)}
                                        className={`h-12 flex justify-center items-center cursor-pointer rounded ${
                                            hasEvent ? "bg-green-300" : "bg-gray-100"
                                        } hover:bg-green-400`}
                                    >
                                        {dayIndex + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add Event Button */}
                    <div className="w-1/5 flex justify-center items-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Event
                        </button>
                    </div>
                </div>

                {/* Event Details */}
                {selectedDate && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Events on {selectedDate.toDateString()}</h3>
                        {selectedEvents.length > 0 ? (
                            <ul className="mt-4">
                                {selectedEvents.map((event: any) => (
                                    <li key={event.id} className="bg-gray-200 p-4 rounded-lg mb-2">
                                        <h4 className="text-lg font-semibold">{event.title}</h4>
                                        <p>{event.description}</p>
                                        {event?.rsvp?
                                        <button onClick={()=>makeRsvp(event)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                                       Cancel RSVP
                                    </button>
                                        :<button onClick={()=>makeRsvp(event)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                                            RSVP
                                        </button>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-gray-600">No events on this date.</p>
                        )}
                    </div>
                )}

                {/* Modal for Adding Event */}
                {showModal && <AddEventModal setShowModal={setShowModal} />}
            </div>
            <div>
               <EventList/>
               <MyEventList/>
            </div>
        </div>


    );
};

export default Calendar;
