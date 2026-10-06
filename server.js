import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';

const PORT=process.env.PORT||3000;
const MAX_BODY=16*1024*1024;
const DATA_DIR=process.env.DATA_DIR||'/data';
const STORE_FILE=join(DATA_DIR,'caplany-demo-v2.json');
const STATUS=['ΝΕΟ','ΕΠΙΚΟΙΝΩΝΗΣΑΜΕ','ΠΡΟΓΡΑΜΜΑΤΙΣΤΗΚΕ','ΟΛΟΚΛΗΡΩΘΗΚΕ'];
const memory={requests:[],keys:{}};
let store=memory;

async function loadStore(){try{await mkdir(DATA_DIR,{recursive:true});store=JSON.parse(await readFile(STORE_FILE,'utf8'));if(!Array.isArray(store.requests)||!store.keys)throw new Error('bad_store')}catch{store={requests:[],keys:{}};try{await saveStore()}catch{store=memory}}}
async function saveStore(){if(store===memory)return;const tmp=STORE_FILE+'.tmp';await writeFile(tmp,JSON.stringify(store));await writeFile(STORE_FILE,await readFile(tmp))}
await loadStore();

const allowed={
 faultCategory:['Νερό / ποιότητα νερού','Αντλία / κυκλοφορία','Φίλτρο / εξοπλισμός πισίνας','Διαρροή','Καθαρισμός / συντήρηση','Άλλο πρόβλημα','Δεν γνωρίζω'],
 noticed:['Σήμερα','Τις τελευταίες ημέρες','Εδώ και περισσότερο καιρό','Δεν γνωρίζω'],
 service:['Τακτική συντήρηση','Καθαρισμός','Έλεγχος πισίνας','Προετοιμασία / επανεκκίνηση','Δεν είμαι σίγουρος','Άλλο'],
 propertyType:['Ιδιωτική κατοικία','Villa / τουριστικό κατάλυμα','Ξενοδοχείο','Επαγγελματικό χώρο','Άλλο']
};
const clean=v=>String(v??'').trim().slice(0,2000);
export function validateSubmission(body={}){const errors={};const req=k=>{if(!clean(body[k]))errors[k]='Συμπληρώστε αυτό το πεδίο για να συνεχίσετε.'};if(!['fault','maintenance'].includes(body.requestType))errors.requestType='Επιλέξτε τύπο αιτήματος.';['fullName','phone','location','availability'].forEach(req);if(body.requestType==='fault'){['faultCategory','description','noticed','urgent'].forEach(req);if(body.faultCategory&&!allowed.faultCategory.includes(body.faultCategory))errors.faultCategory='Μη έγκυρη επιλογή.';if(body.noticed&&!allowed.noticed.includes(body.noticed))errors.noticed='Μη έγκυρη επιλογή.';if(body.urgent&&!['yes','no'].includes(body.urgent))errors.urgent='Μη έγκυρη επιλογή.'}if(body.requestType==='maintenance'){['service','propertyType','existingMaintenance'].forEach(req);if(body.service&&!allowed.service.includes(body.service))errors.service='Μη έγκυρη επιλογή.';if(body.propertyType&&!allowed.propertyType.includes(body.propertyType))errors.propertyType='Μη έγκυρη επιλογή.';if(body.existingMaintenance&&!['yes','no'].includes(body.existingMaintenance))errors.existingMaintenance='Μη έγκυρη επιλογή.'}if(body.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))errors.email='Ελέγξτε τη διεύθυνση email.';if(body.phone&&!/^[+0-9 ()-]{7,20}$/.test(body.phone))errors.phone='Ελέγξτε τον αριθμό τηλεφώνου.';return errors}
export function structureRequest(body,photos=[],id='DEMO-'+randomUUID().slice(0,6).toUpperCase()){const common={id,createdAt:new Date().toISOString(),requestType:body.requestType,type:body.requestType==='fault'?'Πρόβλημα / Βλάβη':'Συντήρηση / Καθαρισμός',fullName:clean(body.fullName),phone:clean(body.phone),email:clean(body.email)||'—',location:clean(body.location),address:clean(body.address)||'—',photos,photoCount:photos.length,availability:clean(body.availability),status:'ΝΕΟ',internalNote:'',scheduledAt:'',completedAt:'',amount:null};return body.requestType==='fault'?{...common,category:body.faultCategory,description:clean(body.description),noticed:body.noticed,urgent:body.urgent==='yes'?'Ναι':'Όχι'}:{...common,service:body.service,propertyType:body.propertyType,existingMaintenance:body.existingMaintenance==='yes'?'Ναι':'Όχι',frequency:body.existingMaintenance==='yes'?(clean(body.frequency)||'—'):'—',notes:clean(body.notes)||'—'}}
function headers(extra={}){return {'cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer','x-frame-options':'DENY',...extra}}
function json(res,status,data){res.writeHead(status,headers({'content-type':'application/json; charset=utf-8'}));res.end(JSON.stringify(data))}
async function parseJson(req){let size=0,chunks=[];for await(const c of req){size+=c.length;if(size>MAX_BODY)throw Object.assign(new Error('too_large'),{status:413});chunks.push(c)}return JSON.parse(Buffer.concat(chunks).toString('utf8'))}
function notificationFor(r){return {event:'NEW_SERVICE_REQUEST',createdAt:r.createdAt,deliveredTo:'DEMO CONTROLLED SINK',content:{type:r.type,customer:r.fullName,location:r.location,phone:r.phone,urgent:r.urgent||'—',requestId:r.id},status:'CAPTURED'}}

export const server=http.createServer(async(req,res)=>{try{
 const requestUrl=new URL(req.url,'http://localhost'),pathname=requestUrl.pathname;
 if(req.method==='GET'&&pathname==='/health')return json(res,200,{ok:true,version:'v2'});
 if(req.method==='POST'&&pathname==='/api/submit'){
  if(req.headers['x-demo-fail']==='1')return json(res,503,{ok:false,error:'temporary_failure'});
  const payload=await parseJson(req),{photos=[],submissionKey,...body}=payload,errors=validateSubmission(body);
  if(Object.keys(errors).length)return json(res,400,{ok:false,errors});
  if(!submissionKey)return json(res,400,{ok:false,errors:{submissionKey:'missing'}});
  if(store.keys[submissionKey]){const existing=store.requests.find(x=>x.id===store.keys[submissionKey]);return json(res,200,{ok:true,duplicate:true,request:existing})}
  if(!Array.isArray(photos)||photos.length>4)return json(res,400,{ok:false,errors:{photos:'Έως 4 φωτογραφίες.'}});
  const safePhotos=[];for(const p of photos){if(!['image/jpeg','image/png','image/webp'].includes(p.type)||!/^data:image\/(jpeg|png|webp);base64,/.test(p.data))return json(res,400,{ok:false,errors:{photos:'Επιτρέπονται JPG, PNG ή WEBP.'}});const b=Buffer.from(p.data.split(',')[1]||'','base64');if(b.length>2.5*1024*1024)return json(res,400,{ok:false,errors:{photos:'Κάθε φωτογραφία πρέπει να είναι έως 2.5 MB.'}});safePhotos.push({name:clean(p.name).slice(0,120),type:p.type,data:p.data})}
  const structured=structureRequest(body,safePhotos);store.requests.unshift(structured);store.keys[submissionKey]=structured.id;await saveStore();console.log('DEMO_NOTIFICATION',JSON.stringify(notificationFor(structured)));return json(res,201,{ok:true,duplicate:false,request:structured,notification:{status:'CAPTURED',destination:'DEMO CONTROLLED SINK'}})
 }
 if(req.method==='GET'&&pathname==='/api/requests')return json(res,200,{ok:true,requests:store.requests});
 const detail=pathname.match(/^\/api\/requests\/([^/]+)$/);
 if(req.method==='GET'&&detail){const r=store.requests.find(x=>x.id===decodeURIComponent(detail[1]));return r?json(res,200,{ok:true,request:r}):json(res,404,{ok:false,error:'not_found'})}
 if(req.method==='PATCH'&&detail){const r=store.requests.find(x=>x.id===decodeURIComponent(detail[1]));if(!r)return json(res,404,{ok:false,error:'not_found'});const p=await parseJson(req);if(p.status!==undefined){if(!STATUS.includes(p.status))return json(res,400,{ok:false,error:'invalid_status'});if(p.status==='ΟΛΟΚΛΗΡΩΘΗΚΕ'){const amount=typeof p.amount==='number'?p.amount:Number(String(p.amount??'').replace(',','.'));if(!Number.isFinite(amount)||amount<0||amount>1000000)return json(res,400,{ok:false,error:'valid_amount_required'});r.amount=Math.round(amount*100)/100;r.completedAt=r.completedAt||new Date().toISOString()}else if(r.status!=='ΟΛΟΚΛΗΡΩΘΗΚΕ'){r.amount=null;r.completedAt=''}r.status=p.status}if(p.internalNote!==undefined)r.internalNote=clean(p.internalNote);if(p.scheduledAt!==undefined){const v=clean(p.scheduledAt);if(v&&Number.isNaN(Date.parse(v)))return json(res,400,{ok:false,error:'invalid_schedule'});r.scheduledAt=v}if(r.status==='ΠΡΟΓΡΑΜΜΑΤΙΣΤΗΚΕ'&&!r.scheduledAt)return json(res,400,{ok:false,error:'schedule_required'});await saveStore();return json(res,200,{ok:true,request:r})}
 const url=pathname==='/'?'/index.html':pathname;if(url.includes('..')){res.writeHead(400,headers());return res.end()}const path=join(process.cwd(),'public',url);const data=await readFile(path);const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};res.writeHead(200,headers({'content-type':types[extname(path)]||'application/octet-stream'}));res.end(data)
}catch(e){if(e.code==='ENOENT'){res.writeHead(404,headers());res.end('Not found')}else if(e instanceof SyntaxError)json(res,400,{ok:false,error:'malformed_input'});else json(res,e.status||500,{ok:false,error:'server_error'})}});
if(process.argv[1]&&new URL(import.meta.url).pathname===process.argv[1])server.listen(PORT,()=>console.log(`Caplany demo v2 on ${PORT}`));
