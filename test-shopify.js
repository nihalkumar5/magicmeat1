const domain = '7ws6g0-0t.myshopify.com';
const storefrontAccessToken = '6f35d5e03990374a363e0601a81c5085';

async function test() {
  const query = `
    query getProducts {
      products(first: 50) {
        edges {
          node {
            title
            productType
            tags
            collections(first: 5) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
  const endpoint = `https://${domain}/api/2024-04/graphql.json`;
  const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
  });
  const json = await res.json();
  const products = json.data.products.edges.map(e => e.node);
  console.log(JSON.stringify(products.filter(p => p.title.toLowerCase().includes('aloo') || p.title.toLowerCase().includes('tomato') || p.title.toLowerCase().includes('onion') || p.title.toLowerCase().includes('garlic')), null, 2));
}

test();
