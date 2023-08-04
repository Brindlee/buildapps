import S3 from 'aws-sdk/clients/s3.js';
export async function gets3Instance() {
    const s3 = new S3({
        endpoint: `https://${import.meta.env.VITE_R2_ACCOUNT_KEY}.r2.cloudflarestorage.com`,
        accessKeyId: `${import.meta.env.VITE_R2_AUTH_KEY_ID}`,
        secretAccessKey: `${import.meta.env.VITE_R2_AUTH_KEY_SECRET}`,
        signatureVersion: 'v4'
    });
    return s3;
}