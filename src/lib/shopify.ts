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

