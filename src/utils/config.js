export const $log = process.env.NODE_ENV === 'production';
export const $host = $log ? "https://production" : "https://development";
