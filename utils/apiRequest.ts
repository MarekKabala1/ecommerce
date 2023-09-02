export const makeApiRequest = async (url: string, method: string, data?: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};