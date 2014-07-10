# html-parts-lazyloading

Uitbreiding op [html startup](https://github.com/am-impact/html-startup)

## Bestanden
 * scripts/fw.lazyloading.js

## Voorbeelden

### Html
    <img src="blank.gif" class="lazy" data-src="origineel.jpg" width="240" height="152">

### Javascript
    var foo = new LazyLoad();

    /* Bijv na Ajaxcall */
    foo.rebuildLazyloadImages();