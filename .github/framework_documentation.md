## Theme Structure & Guides

### 1. CSS Variables
All global CSS rules need to be configurable in the theme.settings. Therefore we must add them into a `css-variables.liquid`. 
We should never use static values inside a component or stylesheet - always use CSS Variable if there is none, then make sure to either add them "only" if it makes sense to have it set global or if there is no other option.
You should never use static font size value - always use css-variable or calculate new value based on css-variable.
`width: calc(var(--myVar), - 80px);`

Example contents of css-variables.liquid:
```
- General Paddings
- General Margins
- page widths
- Font Settings
- Buttons Settings (Primary, Secondary, Neutral)
- Color Settings (Titles, Subtitles, Prices, Sale Price, Savings)
- Lines and Borders
```

- Existing CSS classes:  

- `.page-width`, `.page-width-half` - section containers
- `.heading` - headings text, e.g. section heading  
- `.page-heading` - separate page heading, e.g. cart page or contacts page  
- `.button` - standard buttons
- `.button.cta` - CTA buttons   
- `.arrow[.up,.right,.down,.left]` - standard arrow  
- `.icon.arrow` - boxed arrow  
- `.image-responsive__container[.image-square]` and `.image-responsive__image` inside - responsive images  
- `.scrollbar` - for custom scrollbar blocks
- `.icon [.arrow, .close, .plus, .minus]` - css icons
- `.drop-down` - custom drop-down list

----

### 2. Theme Settings
Global theme.settings should be structured based on page.types:

Globals:
- Theme Localization (Pick the store the theme is installed: .com / .de / .co.uk / .eu )
- 3rd Party Tracking (Input Field for Header Snippets - JS or HTML)
- Typography 
- Colors
- Content (Buttons, Margins, Widths)
- Social Media
- Favicon
- Menu Settings
--------
Pages:
- Collection
- Product
- Cart
- Checkout
- Search

----

### 3. Snippets + Sections
By default, we want all sections we build, to be build as snippets.  
All snippets should contains {%- comment -%} at the top with the data which this snippet accept  
Example:  
`{%- comment -%}`  
  `Inputs:`  
    `object - section or block object`  
 `{%- endcomment -%}`
 
 Snippets we have from the start and need to use it when possible:  
 - image - any images rendering
 - icons-factory - icons rendering
 - collection-vue - for collection grid
 - collection-vue-item - for collection grid item (Vue's template)

----

### 4. VUE Components
- When to use Vue Components  
  Any place we have a lot of repeatable data or html elements we need to use Vue for dynamic loading. You can see collection-vue snippet as example
  
- Vue Skeleton by default  
  We are using Vue's `<Suspense>` component for show fallback template while dynamic content loading.  
  For show skeleton loading animation, we need to apply `.loading` class to parent block and `.skeleton-loading` class for child elements where we need to show it.
  
- Vue Component Structure  
  It is planned to use Vue components defined in liquid snippets, you can see snippets/vue-example.liquid as example.
  This contains component template markup and script definitions.
  
- Dumping Shopify Schema Liquid Data in JSON format or fetching data from JSON Endpoints /products.json /collections.json /my-handle.json  
  We should use JSON enpdoints call for fetch cart, product, collections etc. where this possible.  
  But, for render menu items, this will need to dump it as JSON (because we have no such Shopify API endpoint available) and then use inside Vue's component.
  
----

### 5. Cart (Callbacks & Methods)
Methods:  
 - `theme.cart.addItem(event.target)` - Add to cart method, event.target should have data-product-id property or be a part of product form.
 - `theme.cart.changeItem(variant_id, 0)` - Remove item from the cart
 - `theme.cart.getCart()` - get cart json

Callbacks:  
- Item added to Cart (return cart.item)  
  `cart:added` event
  
- Updated Cart (remove, change) (return cart object)  
  `cart:updated` event

----

### 6. Javascript Helpers
- Reinit images lazy loading for dynamically added elements    
  `theme.initImages(container_element)`
  
- Money Formatter  
  `theme.Currency.formatMoney(cents[, format])`

- Element in Viewport  
  `theme.utils.isVisible(element)`
  
- Is mobile view (based on screen width)  
  `theme.utils.isMobile()`
  
- Carousel slider  
  Applied class `.carousel-slider` or `.carousel-slider-mobile` will trigger Splide js initialized to this container (need to have also splide js layout coded)  
  No arrows or dots enabled by default, you can add extra data-splide parameters.
  
- Function available (DOMContentLoaded replacement)
  `theme.waitForLoad()` - wait for some needed function will be available.  
  Example: `theme.waitForLoad("Splide")`
  
- Modal popups  
  You can use `modal-popup.liquid` snippet for example layout.  
  Actually, this just need `.modal-popup` wrapper (width data-modal-id) and `.modal-popup__content` inside it    
  `data-modal-id` - unique id (you can use section or block id)  
  For add open button, you can use `.modal-trigger` with the same data-modal-id  
  Or, access the modal in window.Modals and call .open() method.
----

### 7. Liquid Helper Snippets
You have to use those snippets, whenever you use those defined media types. You can always pass the object settings to the snippet.
These snippets will have rules like `if image.src contains '.jpg' -> image, format: 'pjpg'` also it will take care of lazyloading class and srcset settings.  
So, you don't need to care about some general things and use exising snippets.
  
- `img.liquid` (render image tag with pre-defined rules)
- `img-vue.liquid` (render image tag with pre-defined rules for render inside javascript functions)
- `video.liquid` (render video tag supporting vimeo, youtube or html5)