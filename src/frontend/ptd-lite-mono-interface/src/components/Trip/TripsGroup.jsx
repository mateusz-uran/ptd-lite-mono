import React, { useState } from 'react';

function TripsGroup(props) {
    const { selected } = props;
    const [groupedTrips, setGroupedTrips] = useState([]);
    
    console.log(selected)
    return (
        <div>
        </div>
    );
}

export default TripsGroup;