import React from 'react'

const PlaceItem = ({data, idx}) => {

    const handleSelectPlace = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(data.place_name);
        console.log(data.road_address_name);
        console.log(data.place_url);
    }
    
  return (
    <a className="info" href={data.place_url} target="_blank" style={{ display:'flex', justifyContent : 'space-between' }}>
        <div>
            <h4>{data.place_name}</h4>
            <p>{data.category_group_name}</p>
            <p>{data.road_address_name}</p>
        </div>
        <button onClick={handleSelectPlace}>선택</button>
    </a>
    )
}

export default PlaceItem