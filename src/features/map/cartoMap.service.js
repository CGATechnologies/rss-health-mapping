import angular from 'angular';

class cartoMap {

  loadMap() {

    let currentHeight = window.innerHeight - 50;
    let mapHeight = document
      .getElementById('map')
      .style
      .height;

    if (currentHeight < mapHeight) {
      mapHeight = currentHeight;
    }

    let url = 'https://cgamap.carto.com/api/v2/viz/ef0fd039-511e-4c78-a39a-a739351493e7/viz.jso' +
        'n';
    cartodb
      .createVis('map', url, {
      shareable: true,
      title: false,
      description: false,
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

        // Set max zoom out
        const subLayer = layers[1].getSubLayer(0);
        const layerCount = layers[1].getSubLayerCount();
        let layerArrays = vis.getLayers(1);
        let layerArray = layerArrays[1].getSubLayers(0);
        console.log(layerArray);
        let zoom = vis
          .map
          .getZoom();
        // console.log('zoom zoom',getSubLayers);
        createSelector(subLayer);
        vis
          .map
          .set({minZoom: 6, maxZoom: 10});

        // layer 0 is the base layer, layer 1 is cartodb layer setInteraction is
        // disabled by default
        layers[1].setInteraction(true);

        // you can get the native map to work with it
        let map = vis.getNativeMap();

        // TODO: Fix the toggle here
        function createSelector(layer, i) {
          let $options = $('#layer_selector li');
          $options.click(function (e) {
            // get the area of the selected layer
            let $li = $(e.target);
            console.log($li);
            let area = $li.attr('data');
            // deselect all and select the clicked one
            $options.removeClass('selected');
            $li.addClass('selected');
            let isSelected = $li.toggleClass('selected');
            // for (let i = 0; i < layerCount; i++) {
            if (isSelected) {
              // isSelected = !isSelected;
              $li.addClass('selected');
              layerArray[area].toggle();
            }
            // }
          });
        }

      })
      .error(function (err) {
        console.log(err);
      });
  }
}

export default angular
  .module('services.carto-map', [])
  .service('cartoMap', cartoMap)
  .name;