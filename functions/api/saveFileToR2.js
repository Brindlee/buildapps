export async function onRequestPut({request, env}) {
	let reqBody = await request.json();
	console.log('reqBody: ', reqBody);
	
	console.log('filename: ', reqBody.fileName);
	const url = 'https://worker-r2.integrately.workers.dev/'+reqBody.fileName; //todo : file name dynamic
	/*var newRequest = new Request( url,request );
	//newRequest.url = url;
	newRequest.headers.append( "X-Custom-Auth-Key", `${env.R2_AUTH_KEY_SECRET}` );
	return fetch( newRequest );*/
	const options = {
	  method: "PUT",
	  
	  headers: {
		//"Content-Type": "multipart/form-data",
        "X-Custom-Auth-Key" : `${env.R2_AUTH_KEY_SECRET}`
	  },
	  body: JSON.stringify(reqBody)
	};
  
	try {
	  const result = await fetch(url, options);
	 //console.log("result", await result.text());
	  return result;
	} catch (e) {
	  console.log(e);
	}
}