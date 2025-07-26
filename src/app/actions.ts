
'use server';

import { redirect } from 'next/navigation';

export async function createCheckoutLink(productId: number) {
  const baseUrl = process.env.PAYMENTER_API_URL;
  const apiKey = process.env.PAYMENTER_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('Paymenter API URL or Key is not configured in .env file.');
  }

  if (!productId) {
    throw new Error('Product ID is required to create a checkout link.');
  }

  // Ensure the base URL doesn't have a trailing slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  try {
    // The API endpoint for creating a guest checkout session.
    const guestCheckoutApiUrl = `${cleanBaseUrl}/api/guest/product/checkout`;

    const response = await fetch(guestCheckoutApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            product_id: productId,
        }),
    });

    if (!response.ok) {
        // If the modern API endpoint fails (e.g., 404 Not Found),
        // try constructing the checkout URL directly as a fallback.
        // This is a common pattern for older Paymenter versions.
        if (response.status === 404) {
             const directUrl = `${cleanBaseUrl}/checkout/${productId}`;
             return { checkoutUrl: directUrl };
        }

        // For other errors, try to parse the error message from the API.
        const errorData = await response.json().catch(() => ({ message: `Request failed with status: ${response.status}` }));
        console.error('Paymenter API Error:', errorData);
        const errorMessage = errorData?.error?.message || errorData?.message || `Unknown API error: ${response.statusText}`;

        return { error: `Could not create checkout: ${errorMessage}` };
    }

    const data = await response.json();
    
    // According to docs, the URL is in result.url, but some versions might have it at the top level.
    const checkoutUrl = data?.result?.url || data?.url;

    if (checkoutUrl) {
        return { checkoutUrl: checkoutUrl };
    } else {
        console.error('Checkout URL not found in Paymenter response:', data);
        // Fallback to direct URL if the response is successful but doesn't contain a URL
        const directUrl = `${cleanBaseUrl}/checkout/${productId}`;
        return { checkoutUrl: directUrl };
    }
  } catch (error) {
    console.error('Error creating checkout link:', error);
    // As a last resort, try the direct URL construction on any exception
    const directUrl = `${cleanBaseUrl}/checkout/${productId}`;
    return { checkoutUrl: directUrl };
  }
}
