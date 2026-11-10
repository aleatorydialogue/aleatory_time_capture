import test from 'node:test';
import assert from 'node:assert/strict';
import {fieldnotes} from '../src/fieldnotes.js';
const token='a'.repeat(64),url='https://forms.rememberingpresence.com/fieldnotes/'+token+'.mp4';
test('media read ranges and no-index; unknown URL and mutations denied',async()=>{
 const env={FIELDNOTES_MEDIA:{head:async()=>({size:100}),get:async(_,o)=>({body:new Uint8Array(o.range.length)})},FIELDNOTES_UPLOAD_KEY:'secret'};
 assert.equal(await fieldnotes(new Request('https://forms.rememberingpresence.com/health'),env),null);
 assert.equal((await fieldnotes(new Request(url,{method:'DELETE'}),env)).status,401);
 assert.equal((await fieldnotes(new Request('https://forms.rememberingpresence.com/fieldnotes/no'),env)).status,404);
 const res=await fieldnotes(new Request(url,{headers:{Range:'bytes=10-19'}}),env);
 assert.equal(res.status,206);assert.equal(res.headers.get('Content-Range'),'bytes 10-19/100');assert.equal((await res.arrayBuffer()).byteLength,10);
 assert.match(res.headers.get('X-Robots-Tag'),/noindex/);
 assert.equal((await fieldnotes(new Request(url,{headers:{Range:'bytes=100-'}}),env)).status,416);
 assert.equal((await fieldnotes(new Request(url,{headers:{Range:'bytes=-0'}}),env)).status,416);
 assert.equal((await fieldnotes(new Request(url,{method:'HEAD'}),env)).headers.get('Content-Length'),'100');
});
