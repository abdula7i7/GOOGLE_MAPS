import React from "react";
import './Home.css'
import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplate, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
// import '@reach/combobox/style.css';


const libraries = ["places"];

const Home = () => {

    const { isLoaded, loadError } = useLoadScript({

        googleMapsApiKey: "AIzaSyCIfiSgrOtwLks2oIZO3oIA526h2NKfxIs",
        libraries,

    })
    if (loadError) return <div><h1>Error loading maps</h1></div>;
    if (!isLoaded) return <div> <h1>Loading...</h1> </div>

    return (
        <div>
            <Map />
        </div>
    );
}

const Map = () => {

    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    const { selected, setSelected } = useState(null)

    return (
        <>

            <div className="places-container">
                <PlacesAutocomplate setSelected={setSelected} />
                <PlacesAutocomplate2 setSelected={setSelected} />
            </div>

            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" >
                {selected && <Marker position={{ lat: selected.lat, lng: selected.lng }} />}
            </GoogleMap>

        </>
    )
}

const PlacesAutocomplate = ({ setSelected }) => {

    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplate()

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    }


    return (
        <>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>


    )
}

const PlacesAutocomplate2 = ({ setSelected }) => {

    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplate()

    const handleSelect = async (address) => {

        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    }

    return (
        <>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    )
}

export default Home;