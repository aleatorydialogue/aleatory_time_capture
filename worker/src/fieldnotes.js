// Approved outbound videos only; random URLs are bearer capabilities.
const TOKEN=/^[a-f0-9]{64}$/;
const headers={'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Access-Control-Allow-Origin':'https://rememberingpresence.com'};
export async function fieldnotes(request,env){
 const url=new URL(request.url);
 if(!url.pathname.startsWith('/fieldnotes/'))return null;
 const parts=url.pathname.split('/').filter(Boolean),token=parts[1]?.replace(/\.mp4$/,'');
 if(!TOKEN.test(token||''))return new Response('Not found',{status:404,headers});
 if(!env.FIELDNOTES_MEDIA)return new Response('Unavailable',{status:503,headers});
 const key=token+'.mp4';
 if(request.method==='GET'||request.method==='HEAD'){
  if(parts.length!==2)return new Response('Not found',{status:404,headers});
  const info=await env.FIELDNOTES_MEDIA.head(key);
  if(!info)return new Response('Not found',{status:404,headers});
  const h=new Headers(headers);h.set('Content-Type','video/mp4');h.set('Accept-Ranges','bytes');
  let start=0,end=info.size-1,status=200;
  const range=request.headers.get('Range');
  if(range){
   const m=/^bytes=(\d*)-(\d*)$/.exec(range);
   if(!m||(!m[1]&&!m[2]))return new Response(null,{status:416,headers:{...headers,'Content-Range':'bytes */'+info.size}});
   if(!m[1]){start=Math.max(0,info.size-Number(m[2]));}
   else{start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end;}
   if(start>end||start>=info.size)return new Response(null,{status:416,headers:{...headers,'Content-Range':'bytes */'+info.size}});
   status=206;h.set('Content-Range','bytes '+start+'-'+end+'/'+info.size);
  }
  h.set('Content-Length',String(end-start+1));
  if(request.method==='HEAD')return new Response(null,{status,headers:h});
  const object=await env.FIELDNOTES_MEDIA.get(key,{range:{offset:start,length:end-start+1}});
  return new Response(object?.body||null,{status:object?status:404,headers:h});
 }
 if(!env.FIELDNOTES_UPLOAD_KEY||request.headers.get('Authorization')!=='Bearer '+env.FIELDNOTES_UPLOAD_KEY)return new Response('Unauthorized',{status:401,headers});
 if(request.method==='DELETE'&&parts.length===2){await env.FIELDNOTES_MEDIA.delete(key);return Response.json({deleted:true},{headers});}
 if(request.method!=='POST'&&request.method!=='PUT')return new Response(null,{status:405,headers});
 try{
  if(parts[2]==='start'&&request.method==='POST'){
   if(await env.FIELDNOTES_MEDIA.head(key))return new Response('Already exists',{status:409,headers});
   const upload=await env.FIELDNOTES_MEDIA.createMultipartUpload(key,{httpMetadata:{contentType:'video/mp4'}});
   return Response.json({uploadId:upload.uploadId},{headers});
  }
  const uploadId=url.searchParams.get('uploadId');if(!uploadId)return new Response('Missing upload',{status:400,headers});
  const upload=env.FIELDNOTES_MEDIA.resumeMultipartUpload(key,uploadId);
  if(parts[2]==='part'&&request.method==='PUT'){
   const part=Number(parts[3]),size=Number(request.headers.get('Content-Length'));
   if(!Number.isInteger(part)||part<1||part>10000||size<=0||size>8*1024*1024)return new Response('Invalid part',{status:400,headers});
   return Response.json(await upload.uploadPart(part,request.body),{headers});
  }
  if(parts[2]==='complete'&&request.method==='POST'){
   if(Number(request.headers.get('Content-Length'))>1048576)return new Response(null,{status:413,headers});
   const body=await request.json();
   if(!Array.isArray(body.parts)||!body.parts.length||body.parts.length>10000)return new Response(null,{status:400,headers});
   if(await env.FIELDNOTES_MEDIA.head(key)){await upload.abort();return new Response('Already exists',{status:409,headers});}
   await upload.complete(body.parts);return Response.json({complete:true},{headers});
  }
  return new Response('Not found',{status:404,headers});
 }catch{return new Response('Media operation failed',{status:400,headers});}
}
