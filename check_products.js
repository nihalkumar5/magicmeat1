const domain = '7ws6g0-0t.myshopify.com';
const storefrontAccessToken = '6f35d5e03990374a363e0601a81c5085';

async function check() {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            title
            tags
            productType
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
  const response = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  const products = data.data.products.edges.map(e => e.node);
  products.forEach(p => {
    console.log(`Title: ${p.title}`);
    console.log(`Tags: ${p.tags}`);
    console.log(`Type: ${p.productType}`);
    console.log(`Collections: ${p.collections.edges.map(c => c.node.title)}`);
    console.log('---');
  });
}
check();
