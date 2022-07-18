import { Popup, Circle } from "react-leaflet";

const colorType = {
    color: 'red',
    multiplier: 10000
}

export const colorOnMap = (data) => (
    data.map((country) => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        opacity={0.6}
        color={colorType.color}
        fillColor={colorType.color}
        radius={
            Math.sqrt(colorType.multiplier * country['cases'])
        }
        >
            <Popup>
                Cases: <h4>{country['cases']}</h4>
            </Popup>
        </Circle>
    ))
)

export const sortedData = (data) => {
    let sortedArr = [...data]

    sortedArr = data.sort((a, b) => {
        if(a.cases > b.cases){
            return -1
        }else if(a.cases < b.cases){
            return 1
        }else{
            return 0
        }
    })
    return sortedArr
}