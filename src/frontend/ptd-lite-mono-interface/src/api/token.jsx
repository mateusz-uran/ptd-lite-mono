export const getAuthConfig = async (getAccessTokenSilently) => {
    const token = await getAccessTokenSilently(); // Obtain the access token
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}