import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import EventLocation from './EventLocation';
import TicketDetails from './TicketDetails';
import PublishEvent from './PublishEvent';

const stepTitles = [
  "Create Event",
  "Location Details",
  "Ticket Details",
  "Publish",
];

const EventCreaation = () => {
  const [step, setStep] = useState(0);
  const [eventData, setEventData] = useState({
    basicInfo: {},
    location: {},
    guests: [],
    tickets: [],
  });

  const updateData = (key, value) => {
    setEventData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => {
    if (step < stepTitles.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <CreateEvent
            next={nextStep}
            data={eventData.basicInfo}
            update={(val) => {
              updateData('basicInfo', val);
            }}
          />
        );
  
      case 1:
        return (
          <EventLocation
            next={nextStep}
            prev={prevStep}
            data={eventData.location}
            eventId={eventData.basicInfo.eventId}
            update={(val) => updateData('location', val)}
          />
        );
  
        case 2:
            return (
              <TicketDetails
                next={nextStep}
                prev={prevStep}
                data={eventData.tickets}
                eventId={eventData.basicInfo.eventId} // ✅ FIXED
                update={(val) => updateData('tickets', val)}
              />
            ); 
            case 3:
                return (
                  <PublishEvent
                    next={nextStep}
                    prev={prevStep}
                    data={eventData.tickets}
                    eventId={eventData.basicInfo.eventId} // ✅ FIXED
                    update={(val) => updateData('tickets', val)}
                  />
                );
          
  
      default:
        return null;
    }
  };
  

  return (
    <div className="event-stepper">
      <div className="step-header" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {stepTitles.map((title, index) => (
          <div
            key={index}
            style={{
              padding: '10px 15px',
              borderRadius: '5px',
              backgroundColor: index <= step ? '#007bff' : '#ccc',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'default'
            }}
          >
            {index < step ? '✓ ' : ''}{title}
          </div>
        ))}
      </div>

      <div className="step-body">
        {renderStep()}
      </div>
    </div>
  );
};

export default EventCreaation;
