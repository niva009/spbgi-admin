import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";




const EventList = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/showallevents`);
            console.log("response", response);
            setEvents(response?.data?.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchEvents();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const deleteEvent = async (eventId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL}/deleteevent/${eventId}`);
            console.log("Event deleted successfully", response.data);
            setEvents(events.filter(event => event.id !== eventId)); // Update state to remove the deleted event
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }
    
    return (
        <div>
        <h1 style={{display:"flex", justifyContent:"center", alignContent:"center", marginBottom:"20px"}}>Registered Events</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>no</th>
                <th>Title</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>ticket price</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={event.id ?? `event-${index}`}>
                    <td>{index+1}</td>
                    <td>{event.title}</td>
                    <td>{event.category}</td>
                    <td>{new Date(event.start_date).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        })}</td>

                        <td>{new Date(event.end_date).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        })}</td>

                    <td>{event?.tickets?.sale_price}</td>
                    <td style={{ color: event.status === "published" ? "green" : "red", fontWeight: "bold" }}>
                    {event.status}
                    </td>
                    <button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={() => window.location.href=`/event/${event.id}`}>View</button>
                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={() => deleteEvent(event._id)}>Delete</button>
                    </tr>
                ))}
                </tbody>
        </table>
        </div>
    );
}

export default EventList;