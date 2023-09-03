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

export const fetchData = async (
  setFetchedData: (data: any) => void,
  setLoading: (isLoading: boolean) => void,
  dataType: 'brands' | 'categorys' | 'products'
) => {
  setLoading(true);

  try {
    let apiUrl = '';

    switch (dataType) {
      case 'brands':
        apiUrl = '/api/brands/getBrands';
        break;
      case 'categorys':
        apiUrl = '/api/categorys/getCategorys';
        break;
      case 'products':
        apiUrl = '/api/products/getProducts';
        break;
      default:
        throw new Error(`Invalid data type: ${dataType}`);
    }

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      setFetchedData(data);
    } else {
      console.error(`Error fetching ${dataType}:`, response.status);
    }
  } catch (error) {
    console.error(`An error occurred while fetching ${dataType}:`, error);
  } finally {
    setLoading(false);
  }
};