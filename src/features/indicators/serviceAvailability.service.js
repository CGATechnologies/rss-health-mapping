import angular from 'angular';

class availability {
  basicAmenitiesMap() {
    const url = 'https://cgamap.carto.com/api/v2/viz/ea140d38-1a18-11e7-ba66-0e8c56e2ffdb/viz.jso' +
        'n';

    let currentHeight = window.innerHeight - 50;
    let mapHeight = document
      .getElementById('map')
      .style
      .height;

    if (currentHeight < mapHeight) {
      mapHeight = currentHeight;
    }

    cartodb
      .createVis('map', url, {
      shareable: true,
      title: false,
      description: true,
      search: true,
      tiles_loader: true,
      time_slider: false,
      layer_selector: false,
      scrollwheel: false,
      center_lat: 7.123519,
      center_lon: 30.119062,
      zoom: 6
    })
      .done((vis, layers) => {
        layers[1].setInteraction(true);

        const map = vis.getNativeMap();
        console.log(map);
      })
      .error(function (err) {
        console.log(err);
      });

  }
}

export default angular
  .module('services.availability', [])
  .service('availability', availability)
  .name;