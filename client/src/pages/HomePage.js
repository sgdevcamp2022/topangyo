import React, { useEffect, useState } from 'react'

const HomePage = () => {

    const {kakao} = window;

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(33.450701, 126.570667),
            level : 3
        };
        const map = new kakao.maps.Map(container, options);
    }, [])

    return (
        <div 
            id='map'
            style={{ width:'100%', height:'100%', position : 'absolute', top:'0', left:'0' }}
        >
        </div>
    )
}

export default HomePage