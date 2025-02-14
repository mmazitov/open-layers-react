import { Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { OSM } from 'ol/source';
import { useEffect, useRef, useState } from 'react';
const OpenLayersMap = () => {
	const mapDivRef = useRef<HTMLDivElement>(null);

	const [olMap, setOlMap] = useState<Map | null>(null);
	const [clickedCoordinate, setClickedCoordinate] = useState<Coordinate>();

	useEffect(() => {
		const map = new Map({
			target: mapDivRef.current as HTMLElement,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: [0, 0],
				zoom: 2,
			}),
		});

		map.on('click', (event) => {
			setClickedCoordinate(event.coordinate);
		});
		setOlMap(olMap);

		return () => {
			map.setTarget(undefined);
		};
	}, []);
	return (
		<>
			<div className="map" ref={mapDivRef} />
			{clickedCoordinate && (
				<span className="coordinate-container">
					You clicked at: {clickedCoordinate[0]} / {clickedCoordinate[1]}
				</span>
			)}
		</>
	);
};

export default OpenLayersMap;
