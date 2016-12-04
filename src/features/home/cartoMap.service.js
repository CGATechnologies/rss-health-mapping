import angular from 'angular';

class cartoMap { 

  loadMap() {
    // console.log('hitting')
    let url = 'https://cgamap.carto.com/api/v2/viz/ef0fd039-511e-4c78-a39a-a739351493e7/viz.json';
    cartodb.createVis('map', url, {
        shareable: true,
        title: true,
        description: true,
        search: true,
        tiles_loader: true,
        center_lat: 7.123519,
        center_lon: 30.119062,
        zoom: 6
    })
    .done((vis, layers) => {

      // Set max zoom out
      vis.map.set({
        minZoom: 4,
        maxZoom: 10
      });

      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', (e, latlng, pos, data) => {
        cartodb.log.log(e, latlng, pos, data);
      });
      // you can get the native map to work with it
      var map = vis.getNativeMap();
      // now, perform any operations you need
      // map.setZoom(3);
      // map.panTo([50.5, 30.5]);
    })
    .error(function(err) {
      console.log(err);
    });
  }
}

export default angular.module('services.carto-map', [])
  .service('cartoMap', cartoMap)
  .name;