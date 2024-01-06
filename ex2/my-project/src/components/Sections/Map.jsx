import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import silverMapStyle from "../data/mapStyle.json";

const center = { lat: 41.12118893425201, lng: -73.43283741633479 };
const googleMapsApiKey = "AIzaSyBUstuBUHe-HtvTtI1mL57p9dKzsOSzcgo";

const MyMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) {
    return <p>Error</p>;
  }

  return (
    <div className="mt-40">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "700px" }}
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
    </div>
  );
};

export default MyMap;
