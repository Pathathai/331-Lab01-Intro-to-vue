const productDisplay = {
  template:
    /*html*/
    `
  <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img v-bind:src="image" :class="{outofstockimg: !inStock}">
                </div>
            </div>
        </div>
        <div class="product-info">
            <h1><a :href="link">{{title}}</a></h1>
            <p>{{productDescription}}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <p v-if="onSale">On Sale</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
            </div>
            <p>Size: <span v-for="size in sizes">{{size}}</span></p>

            <button class="button" :disabled="!inStock" @click="addToCart" :class="{disabledButton: !inStock}">Add To Cart</button>
            <button class="button" @click="updateStock"> {{ inStock ? "In Stock" : "Out of Stock" }}</button> 
       <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>

        </div>
         
      `,
  props: {
    premium: Boolean,
  },
  setup(props, { emit }) {
    const shipping = computed(() => {
      if (props.premium) {
        return "Free";
      } else {
        return 30;
      }
    });

    const reviews = ref([]);

    function addReview(review) {
      console.log(review);
      reviews.value.push(review);
    }

    
    const product = ref("Boots");
    const brand = ref("SE 331");
    const productDescription = ref("This is good boots!");
    //  const image = ref("./assets/images/socks_green.jpg");
    const link = ref("https://camt.cmu.ac.th/index.php/th/");
    //const inStock = ref(true);
    const inventory = ref(100);
    const onSale = ref(false);
    const details = ref(["50% cotton", "30% wool", "20% polyester"]);
    const variants = ref([
      {
        id: 2234,
        color: "green",
        image: "./assets/images/socks_green.jpg",
        quantity: 50,
      },
      {
        id: 2235,
        color: "blue",
        image: "./assets/images/socks_blue.jpg",
        quantity: 0,
      },
    ]);
    const selectedVariant = ref(0);

    const sizes = ref(["S", "M", "L"]);
    const cart = ref(0);

    function addToCart() {
      cart.value += 1;
      emit("add-to-cart", variants.value[selectedVariant.value].id);
    }
    function updateImage(variantImage) {
      image.value = variantImage;
    }
    function updateVariant(index) {
      selectedVariant.value = index;
    }

    function updateStock() {
      inStock.value = !inStock.value;
    }
    const title = computed(() => {
      if (onSale.value) {
        return brand.value + " " + product.value + " is on sale.";
      } else return brand.value + " " + product.value;
    });
    const image = computed(() => {
      return variants.value[selectedVariant.value].image;
    });
    const inStock = computed(() => {
      return variants.value[selectedVariant.value].quantity;
    });

    return {
      title,
      productDescription,
      image,
      link,
      inStock,
      inventory,
      onSale,
      details,
      variants,
      sizes,
      cart,
      addToCart,
      updateImage,
      updateStock,
      updateVariant,
      shipping,
      addReview,
      reviews
    };
  },
};
