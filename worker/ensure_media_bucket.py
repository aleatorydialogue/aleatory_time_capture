import os,json,urllib.request,urllib.error
url='https://api.cloudflare.com/client/v4/accounts/'+os.environ['CF_ACCOUNT']+'/r2/buckets'
headers={'Authorization':'Bearer '+os.environ['CF_TOKEN'],'Content-Type':'application/json'}
try:
 with urllib.request.urlopen(urllib.request.Request(url+'/aleatory-fieldnotes-outbound',headers=headers)) as r:print('Outbound bucket available')
except urllib.error.HTTPError as e:
 if e.code!=404:raise SystemExit('R2 bucket lookup denied: HTTP '+str(e.code)+'. Cloudflare token needs R2 Storage edit permission, and R2 must be enabled.')
 with urllib.request.urlopen(urllib.request.Request(url,data=json.dumps({'name':'aleatory-fieldnotes-outbound'}).encode(),headers=headers,method='POST')) as r:
  if not json.load(r).get('success'):raise SystemExit('R2 bucket creation failed')
 print('Outbound bucket created')
