const cambridgeLoc = [52.23535372699674, 0.15384150556855017];

const cambridgeMap = L.map("cambridgeMap", {
    center: cambridgeLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(cambridgeMap);

const cambridgeMarker = L.marker(cambridgeLoc).addTo(cambridgeMap);
const cambridgePopup = cambridgeMarker.bindPopup(`Unit 1.28, <br>
St John's Innovation Centre, <br>
Cowley Road, Milton, <br>
Cambridge,<br>
CB4 0WS`);

new L.Control.Zoom({ position: "bottomright" }).addTo(cambridgeMap);

const wymondhamLoc = [52.57604207982481, 1.136548940521879];

const wymondhamMap = L.map("wymondhamMap", {
    center: wymondhamLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(wymondhamMap);

const wymondhamMarker = L.marker(wymondhamLoc).addTo(wymondhamMap);
const wymondhamPopup = wymondhamMarker.bindPopup(`Unit 15, <br>
Penfold Drive, <br>
Gateway 11 Business Park, <br>
Wymondham, Norfolk,<br>
NR18 0WZ`);

new L.Control.Zoom({ position: "bottomright" }).addTo(wymondhamMap);

const yarmouthLoc = [52.5559156548259, 1.7132934550676306];

const yarmouthMap = L.map("yarmouthMap", {
    center: yarmouthLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(yarmouthMap);

const yarmouthMarker = L.marker(yarmouthLoc).addTo(yarmouthMap);
const yarmouthPopup = yarmouthMarker.bindPopup(`Suite F23, <br>
Beacon Innovation Centre, <br>
Beacon Park, Gorleston, <br>
Great Yarmouth, Norfolk,<br>
NR31 7RA`);

new L.Control.Zoom({ position: "bottomright" }).addTo(yarmouthMap);
