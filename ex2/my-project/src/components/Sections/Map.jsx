import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import silverMapStyle from "../data/mapStyle.json";

const center = { lat: 41.12118893425201, lng: -73.43283741633479 };
const googleMapsApiKey = "AIzaSyBUstuBUHe-HtvTtI1mL57p9dKzsOSzcgo";

const MyMap = () => {
  const [mapHeight, setMapHeight] = useState("700px");

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerWidth >= 768 ? "700px" : "400px");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) {
    return <p>Error</p>;
  }

  return (
    <section id="map" className="mt-40">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: mapHeight,
        }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: silverMapStyle,
        }}
      >
        <MarkerF
          position={center}
          icon={{
            url: "https://i.postimg.cc/30jd33nS/Pin.png",
          }}
        />
      </GoogleMap>
    </section>
  );
};

export default MyMap;
