const apiUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV  
    : process.env.REACT_APP_API_URL_PROD;

const processRun =   
    process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_ENV  
    : process.env.REACT_APP_PROD_ENV;

export { apiUrl,processRun };