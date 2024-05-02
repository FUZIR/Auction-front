import React from 'react'
import MoreInfoLot from '../components/MoreInfoLot'
import { useParams } from 'react-router-dom'

function MoreInfoPage() {
    let {id} = useParams();
    return (
        <>
            <MoreInfoLot props={id}/>
        </>
    )
}

export default MoreInfoPage
