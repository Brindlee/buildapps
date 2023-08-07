import {
	S3Client,
	DeleteObjectCommand
  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export async function onRequestPost({request, env}) {
	const reqbody = await request.json()
	//console.log( 'reqbody', reqbody['sinst'] );
	try {
		console.log('R2_ACCOUNT_KEY',env.R2_ACCOUNT_KEY);
		console.log('updated1 R2_AUTH_KEY_ID',env.R2_AUTH_KEY_ID);
		console.log('R2_AUTH_KEY_SECRET',env.R2_AUTH_KEY_SECRET);
		  const S3 = new S3Client({
			region: "auto",
			endpoint: `https://${env.R2_ACCOUNT_KEY}.r2.cloudflarestorage.com`,
			credentials: {
			  accessKeyId: env.R2_AUTH_KEY_ID,
			  secretAccessKey: env.R2_AUTH_KEY_SECRET
			},
		  });
		  //return new Response('hi there');
		//return new Response( JSON.stringify(await S3.send(new DeleteObjectCommand({ Bucket: reqbody.bucket, Key: reqbody.key })) ))
        const url = await getSignedUrl(
            S3,
            new DeleteObjectCommand({ Bucket: reqbody.bucket, Key: reqbody.key }),
            { expiresIn: 3600 }
          );
          return new Response( JSON.stringify( await fetch(url, { method: 'DELETE'}) ) );
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}
}