const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '7ws6g0-0t.myshopify.com';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '6f35d5e03990374a363e0601a81c5085';

// Reusable Shopify Fetch Helper
async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'no-store'
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
}): Promise<{ status: number; body: T }> {
  try {
    const endpoint = `https://${domain}/api/2024-04/graphql.json`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({ query, variables }),
      cache
    });

    const body = await response.json();
    return {
      status: response.status,
      body
    };
  } catch (error) {
    console.error('Error during Shopify Fetch:', error);
    throw new Error('Failed to fetch from Shopify Storefront API');
  }
}

// Define simplified product interfaces for the frontend
export interface ShopifyImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: ShopifyVariant[];
  tags: string[];
  productType?: string;
  collections?: {
    id: string;
    title: string;
    handle: string;
  }[];
}

// 10 Premium Products mapped exactly from the magicmeat-products.csv
export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Fresh Chicken Curry Cut - 500g",
    handle: "fresh-chicken-curry-cut-500g",
    descriptionHtml: "<p>Freshly cut chicken pieces, cleaned and ready for curry. Ideal for family meals and everyday cooking. Antibiotic residue-free and sourced from healthy farms.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600", altText: "Fresh Chicken Curry Cut 500g", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "189", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/101", title: "500g Pack", price: { amount: "189", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["chicken", "fresh meat", "curry cut", "non veg"]
  },
  {
    id: "gid://shopify/Product/2",
    title: "Boneless Chicken Breast - 500g",
    handle: "boneless-chicken-breast-500g",
    descriptionHtml: "<p>Lean boneless chicken breast, cleaned and packed for grills, curries, salads and meal prep. High protein, tender, and vacuum-sealed for maximum freshness.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600", altText: "Boneless Chicken Breast 500g", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "249", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/201", title: "500g Pack", price: { amount: "249", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["chicken", "boneless", "breast", "protein"]
  },
  {
    id: "gid://shopify/Product/3",
    title: "Chicken Drumsticks - 500g",
    handle: "chicken-drumsticks-500g",
    descriptionHtml: "<p>Juicy chicken drumsticks, perfect for tandoori, frying, roasting and rich, spicy curries. Perfectly portioned and fresh.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600", altText: "Chicken Drumsticks 500g", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "219", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/301", title: "500g Pack", price: { amount: "219", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["chicken", "drumsticks", "fresh meat"]
  },

  {
    id: "gid://shopify/Product/5",
    title: "Rohu Fish Cleaned - 500g",
    handle: "rohu-fish-cleaned-500g",
    descriptionHtml: "<p>Cleaned Rohu fish cuts, scaled and ready for curry, fry and home-style seafood dishes. Hand-selected for ultimate quality.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=600", altText: "Rohu Fish Cleaned 500g", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "199", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/501", title: "500g Pack", price: { amount: "199", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["fish", "rohu", "seafood", "fresh"]
  },
  {
    id: "gid://shopify/Product/6",
    title: "Farm Fresh Eggs - 12 pcs",
    handle: "farm-fresh-eggs-12-pcs",
    descriptionHtml: "<p>Fresh farm eggs packed safely for your breakfast, baking, protein meals and daily family cooking. High nutrition profile.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600", altText: "Farm Fresh Eggs 12 pieces", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "119", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/601", title: "12 pcs Pack", price: { amount: "119", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["eggs", "breakfast", "grocery"]
  },
  {
    id: "gid://shopify/Product/7",
    title: "Whole Wheat Atta - 1kg",
    handle: "whole-wheat-atta-1kg",
    descriptionHtml: "<p>Daily-use whole wheat flour (atta) for soft, warm rotis, parathas and home baking. Ground from premium grains.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600", altText: "Whole wheat atta 1kg", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "65", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/701", title: "1kg Pack", price: { amount: "65", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["atta", "flour", "grocery", "essentials"]
  },
  {
    id: "gid://shopify/Product/8",
    title: "Basmati Rice - 1kg",
    handle: "basmati-rice-1kg",
    descriptionHtml: "<p>Aromatic long-grain basmati rice, aged to perfection. Perfect for biryani, festive pulao, and elegant everyday meals.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1596560548464-f010687ad1e5?auto=format&fit=crop&q=80&w=600", altText: "Basmati rice 1kg", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "149", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/801", title: "1kg Pack", price: { amount: "149", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["rice", "basmati", "grocery", "essentials"]
  },
  {
    id: "gid://shopify/Product/9",
    title: "Fresh Milk - 1L",
    handle: "fresh-milk-1l",
    descriptionHtml: "<p>Pure fresh pasteurized milk, packed under hygienic conditions for your daily tea, coffee, breakfast, and family needs.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600", altText: "Fresh milk 1L", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "45", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/901", title: "1L Bottle", price: { amount: "45", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["milk", "dairy", "grocery"]
  },
  {
    id: "gid://shopify/Product/11",
    title: "Chef's Secret Biryani Masala",
    handle: "chefs-secret-biryani-masala",
    descriptionHtml: "<p>Hand-crafted organic spice blend formulated by our head chef to elevate mutton and chicken biryanis. Pure aromatic ingredients, stone-ground under cold climates to lock in essential oils.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600", altText: "Chef's Secret Biryani Masala", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "59", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1101", title: "50g Glass Jar", price: { amount: "59", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["spices", "biryani", "grocery", "essentials"]
  },
  {
    id: "gid://shopify/Product/12",
    title: "Pure Organic Cow Ghee",
    handle: "pure-organic-cow-ghee-200ml",
    descriptionHtml: "<p>Traditional slow-cooked organic cow ghee. Possesses a rich granular texture and mouthwatering aroma, perfect for curries, sears, and aromatic basmati rice.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1589733901241-5e391270fe0a?auto=format&fit=crop&q=80&w=600", altText: "Pure Organic Cow Ghee", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "179", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1201", title: "200ml Jar", price: { amount: "179", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["dairy", "ghee", "grocery", "essentials"]
  },
  {
    id: "gid://shopify/Product/13",
    title: "Premium Red Onion (Pyaj) - 1kg",
    handle: "premium-red-onion-1kg",
    descriptionHtml: "<p>Fresh, crisp, and high-quality premium red onions sourced directly from selected farms. Perfect for daily cooking, curries, and gourmet salads.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600", altText: "Premium Red Onion 1kg", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "49", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1301", title: "1kg Pack", price: { amount: "49", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["vegetables", "vegetable", "onion", "grocery"]
  },
  {
    id: "gid://shopify/Product/14",
    title: "Fresh Organic Tomato - 500g",
    handle: "fresh-organic-tomato-500g",
    descriptionHtml: "<p>Juicy, vine-ripened organic tomatoes. Hand-picked at peak ripeness for rich color and perfect flavor. Perfect for curries, salads, and soups.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600", altText: "Fresh Organic Tomato 500g", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "39", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1401", title: "500g Pack", price: { amount: "39", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["vegetables", "vegetable", "tomato", "grocery"]
  },
  {
    id: "gid://shopify/Product/15",
    title: "Premium New Crop Potato - 1kg",
    handle: "premium-potato-1kg",
    descriptionHtml: "<p>Cleaned, sorted, and direct-from-farm premium quality potatoes. Perfect for roasting, frying, boiling, or curry preparation.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600", altText: "Premium Potato 1kg", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "35", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1501", title: "1kg Pack", price: { amount: "35", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["vegetables", "vegetable", "potato", "grocery"]
  },

  {
    id: "gid://shopify/Product/17",
    title: "Premium Alphonso Mango (Devgad) - 2 pcs",
    handle: "premium-alphonso-mango-2pcs",
    descriptionHtml: "<p>The king of mangoes! Hand-selected, rich, sweet, and incredibly aromatic Alphonso mangoes from Devgad orchards. Hand-inspected for pristine quality.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600", altText: "Premium Alphonso Mango 2pcs", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "199", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1701", title: "2 pcs Pack", price: { amount: "199", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["fruits", "fruit", "mango", "fresh"]
  },
  {
    id: "gid://shopify/Product/18",
    title: "Fresh Royal Gala Apple - 4 pcs",
    handle: "fresh-royal-gala-apple-4pcs",
    descriptionHtml: "<p>Sweet, crisp, and refreshing premium imported Royal Gala apples. Direct from orchards, hand-inspected for pristine quality.</p>",
    images: [
      { url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600", altText: "Fresh Royal Gala Apple 4pcs", width: 600, height: 600 }
    ],
    priceRange: { minVariantPrice: { amount: "149", currencyCode: "INR" } },
    variants: [
      { id: "gid://shopify/ProductVariant/1801", title: "4 pcs Pack", price: { amount: "149", currencyCode: "INR" }, availableForSale: true, selectedOptions: [] }
    ],
    tags: ["fruits", "fruit", "apple", "fresh"]
  },

];

// Transform Shopify API nesting (Edges & Nodes) into clean, flat arrays
function transformProduct(node: any): Product {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml,
    images: node.images.edges.map((edge: any) => edge.node),
    priceRange: node.priceRange,
    variants: node.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: edge.node.price,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions
    })),
    tags: node.tags || [],
    productType: node.productType || '',
    collections: node.collections?.edges.map((edge: any) => edge.node) || []
  };
}

// 1. Fetch All Products
export async function getProducts(): Promise<Product[]> {
  const query = `
    query getProducts {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            tags
            productType
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({ query });
    if (response.body?.data?.products?.edges && response.body.data.products.edges.length > 0) {
      const shopifyProducts = response.body.data.products.edges.map((edge: any) => transformProduct(edge.node));
      
      // Deduplicate products by normalized title to prevent admin duplicates
      const seenTitles = new Set<string>();
      const uniqueProducts = shopifyProducts.filter((product: Product) => {
        const normalized = product.title.toLowerCase().trim();
        if (seenTitles.has(normalized)) {
          return false;
        }
        seenTitles.add(normalized);
        return true;
      });
      
      // Merge mock products that are not present in the Shopify store
      const missingMocks = mockProducts.filter((mockProduct) => {
        return !seenTitles.has(mockProduct.title.toLowerCase().trim());
      });
      
      return [...uniqueProducts, ...missingMocks];
    }
  } catch (error) {
    console.warn('Shopify Storefront API connection failed or empty database. Serving local CSV fallback.', error);
  }
  
  return mockProducts;
}

// 2. Fetch Single Product by Handle
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        tags
        productType
        collections(first: 5) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<any>({
      query,
      variables: { handle }
    });

    if (response.body?.data?.productByHandle) {
      return transformProduct(response.body.data.productByHandle);
    }
  } catch (error) {
    console.warn(`Shopify Storefront API failed for product "${handle}". Searching local CSV fallback.`, error);
  }

  // Look in mock database
  return mockProducts.find((p) => p.handle === handle) || null;
}

// 3. Create Shopify Checkout and return its secure URL
export async function createCheckout(
  lineItems: { variantId: string; quantity: number }[]
): Promise<{ url: string | null; error?: string }> {
  // Check if checkout items belong to local fallback simulation
  const hasMockItems = lineItems.some(item => {
    const isMockId = item.variantId.includes('/ProductVariant/101') ||
                     item.variantId.includes('/ProductVariant/201') ||
                     item.variantId.includes('/ProductVariant/301') ||
                     item.variantId.includes('/ProductVariant/401') ||
                     item.variantId.includes('/ProductVariant/501') ||
                     item.variantId.includes('/ProductVariant/601') ||
                     item.variantId.includes('/ProductVariant/701') ||
                     item.variantId.includes('/ProductVariant/801') ||
                     item.variantId.includes('/ProductVariant/901') ||
                     item.variantId.includes('/ProductVariant/1001') ||
                     parseInt(item.variantId.split('/').pop() || '9999') < 2000;
    return isMockId;
  });

  if (hasMockItems) {
    // Simulated checkout helper - redirects customer straight to their main myshopify domain home page cleanly
    console.log('Simulating checkout for local CSV items. Redirecting to official store home.');
    return { url: `https://${domain}` };
  }

  // Modern Shopify Cart API checkout generator (Cart-based checkout)
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Standard merchandise input mapping
  const input = {
    lines: lineItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity
    }))
  };

  try {
    const response = await shopifyFetch<any>({
      query: mutation,
      variables: { input }
    });

    // Capture exact response payload for absolute clarity
    const rawDataStr = JSON.stringify(response.body?.data || response.body || {});
    console.log('Shopify Cart raw payload:', rawDataStr);

    if (!response.body?.data?.cartCreate) {
      return { url: null, error: `GraphQL Cart Error. Response: ${rawDataStr}` };
    }

    const errors = response.body?.data?.cartCreate?.userErrors;
    if (errors && errors.length > 0) {
      console.error('Cart Create user errors:', errors);
      const errMsg = errors.map((e: any) => e.message).join(', ');
      return { url: null, error: `Shopify Cart Error: ${errMsg}. Response: ${rawDataStr}` };
    }

    const checkoutUrl = response.body?.data?.cartCreate?.cart?.checkoutUrl || null;
    return { url: checkoutUrl, error: checkoutUrl ? undefined : `Shopify did not return a checkout link. Raw payload: ${rawDataStr}` };
  } catch (error: any) {
    console.error('Cart checkout generation failed, falling back to homepage redirect.', error);
    return { url: `https://${domain}`, error: `Network/API Error: ${error.message || error}` };
  }
}

