- Erstellen eines ordners als repository und erstellen aller Dateien (html, md, css, js)
- html Grundgerüst erstellt, Navigationbar und sonstige visuelle Elemente der Seite erstellt 
- View der Karte definiert, Layer (osmLayer) definiert, Karte definiert 
- Download der proj4js Bibliothek und einbinden der beiden im Ordner /dist befindlichen js-Dateien
- Zielprojektion mit Definitionsstring definieren und anschließend registrieren. Anschließend wurden die Koordinaten für View umgerechnet
- Einstellen der Zielprojektion als Kartenprojektion
- Einbinden der WMS Source mit angepassten Parametern (mauer:baugebiet)
- Finden der Abfrage URL durch Layervorschau (GeoJson)
- Einbinden des Layers "bebauung" durch WFS Abfrage mittels URL und anhängen der benötigten Projektion
- Definieren der Funktionen select und rotate und implementieren der Funktion in map (interactions: ol.interaction.defaults().extend([select, translate]))
- Schreiben des Texts auf der Homepage und Impressum
- Anpassen der Seitengestaltung (Abstände, Schriftgröße, etc.)
