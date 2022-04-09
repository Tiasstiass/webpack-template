import { defineAsyncComponent } from 'vue';

export default {
  components: {
    ButtonCounter: defineAsyncComponent(() => import('./ButtonCounter.vue')),
    CountryPicker: defineAsyncComponent(() => import('./CountryPicker.vue')),
    DropdownItem: defineAsyncComponent(() => import('./DropdownItem.vue')),
    CollectionGrid: defineAsyncComponent(() => import('./CollectionGrid.vue')),
    GridBanner: defineAsyncComponent(() => import('./GridBanner.vue')),
    ColorSwatch: defineAsyncComponent(() => import('./ColorSwatch.vue')),
    CartProducts: defineAsyncComponent(() => import('./CartProducts.vue')),
    CartProductsProduct: defineAsyncComponent(() =>
      import('./CartProduct.vue')
    ),
    ProductQty: defineAsyncComponent(() => import('./ProductQty.vue')),
    CollectionSlider: defineAsyncComponent(() =>
      import('./CollectionSlider.vue')
    ),
    VIcon: defineAsyncComponent(() => import('./VIcon.vue')),
    VImage: defineAsyncComponent(() => import('./VImage.vue')),
    GridBlog: defineAsyncComponent(() => import('./GridBlog.vue')),
    VRating: defineAsyncComponent(() => import('./VRating.vue')),
    Product: defineAsyncComponent(() => import('./Product.vue')),
    ProductSizeFinder: defineAsyncComponent(() =>
      import('./ProductSizeFinder.vue')
    ),
    ProductReviewBadge: defineAsyncComponent(() =>
      import('./ProductReviewBadge.vue')
    ),
    ProductWidthPicker: defineAsyncComponent(() =>
      import('./ProductWidthPicker.vue')
    ),
    ProductLengthPicker: defineAsyncComponent(() =>
      import('./ProductLengthPicker.vue')
    ),
    ProductImages: defineAsyncComponent(() => import('./ProductImages.vue')),
    InstagramGrid: defineAsyncComponent(() => import('./InstagramGrid.vue')),
    InstagramModal: defineAsyncComponent(() => import('./InstagramModal.vue')),
    NavDrawer: defineAsyncComponent(() => import('./NavDrawer.vue')),
    NavMegaMenu: defineAsyncComponent(() => import('./NavMegaMenu.vue')),
  },
};
