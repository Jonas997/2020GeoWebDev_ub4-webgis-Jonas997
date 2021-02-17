        // Projektion umstellen mit proj4js 
        proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
        ol.proj.proj4.register(proj4)

        var coords = proj4("EPSG:32632", [8.65701, 49.42150])

        // View definieren
        var view = new ol.View({
            projection: "EPSG:32632",
            center: coords,
            zoom: 17.5,
        })

        // definieren des OSM Hintergrund layers Layer (EPSG: 32632)
        var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
        })

        // Zugriff auf Datenquelle im Geoserver und wmsLayer erstellen
        var wmsArea = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: "http://osmatrix.geog.uni-heidelberg.de:8080/geoserver-2.18/mauer/wms",
                serverType: "geoserver",
                params: {
                    "LAYERS": "mauer:ub4_baugebiet"
                },
                format: new ol.format.GeoJSON(),
            })
        })

        // Zugriff auf Layer Bebauung und erstellen des wfsLayers
        var wfsBuildings = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: function(extent) {
                    return (
                        "http://osmatrix.geog.uni-heidelberg.de:8080/geoserver-2.18/mauer/ows?service=WFS&" +
                        'version=1.0.0&request=GetFeature&typeName=mauer%3Aub4_bebauung&maxFeatures=50&' +
                        'outputFormat=application%2Fjson&srsname=EPSG:32632&' +
                        'bbox=' +
                        extent.join(',') +
                        ',EPSG:32632'
                    );
                },
                strategy: ol.loadingstrategy.bbox,
            })
        });

        // implementieren der Funktionen "Auswählen" und "Bewegen"
        var select = new ol.interaction.Select();

        var translate = new ol.interaction.Translate({
            features: select.getFeatures(),
        });

        // Map definieren 
        function map() {
            const map = new ol.Map({
                interactions: ol.interaction.defaults().extend([select, translate]), // ermöglicht Interaktionen auf/mit der Karte
                projection: "EPSG:32632",
                target: 'map',
                layers: [layer, wmsArea, wfsBuildings],
                view: view
            });
        }