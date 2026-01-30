import WidgetCard from "@/components/common/WidgetCard"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"

const MapWidget = ({ isMaximized, onMaximizeToggle }: { isMaximized: boolean, onMaximizeToggle: () => void }) => {
    return (
        <WidgetCard title="Map" isMaximized={isMaximized} onMaximizeToggle={onMaximizeToggle}>
            <MapContainer
                center={[39.8283, -98.5795]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            </MapContainer>
        </WidgetCard>
    )
}

export default MapWidget;