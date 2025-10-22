
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.BDB_h_yW.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.D-nUDLV9.js","/cdn/shopifycloud/checkout-web/assets/c1/en-legacy.Z1r1g5up.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.CR3XAboP.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.DvoGzuKF.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.BOxpvq-Y.js","/cdn/shopifycloud/checkout-web/assets/c1/pt-PT.json-legacy.DKz1XfH1.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer-legacy.5Dx4oDcR.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList-legacy.hZK1Q4z3.js","/cdn/shopifycloud/checkout-web/assets/c1/DeliveryMethodSelectorSection-legacy.B1Gt2RXK.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName-legacy.D1LH2CsA.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment-legacy.4UBlecuQ.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.Bmxev-JC.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.nde9ycGV.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.CXtVrfEY.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.DiCcZQzl.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.nQqdakrH.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch-legacy.CJamjbuL.js","/cdn/shopifycloud/checkout-web/assets/c1/de.json-legacy.D7m-IJJJ.js","/cdn/shopifycloud/checkout-web/assets/c1/it.json-legacy.DXpkc_Eb.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection-legacy.B7uZz22U.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0514/9494/4962/files/Cursive_Masthead_f20bbe72-7f90-47e3-adea-b0577d516ace_x320.png?v=1725721599"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  