// Gantari.Lab — local Supabase-compatible mock adapter
var supabase = null;
var gantarikuSupabaseReady = Promise.resolve(true);
(function(){
  var DB = window.GANTARI_LAB_DB;
  function copy(v){ try{return structuredClone(v);}catch(e){return JSON.parse(JSON.stringify(v));} }
  function pick(fields,row){
    if(!fields || fields.trim()==="*") return copy(row);
    var out={};
    fields.split(",").forEach(function(part){
      var key=part.trim();
      if(!key)return;
      var rel=key.match(/^([A-Za-z0-9_]+):([A-Za-z0-9_]+)\s*\((.*)\)$/s);
      if(rel){
        var alias=rel[1], fk=rel[2];
        var table=fk.indexOf("guru_id")>=0?"pengguna":"siswa";
        var target=(DB[table]||[]).find(function(x){return String(x.id)===String(row[fk]);});
        if(!target){out[alias]=null;return;}
        var obj={}; rel[3].split(",").forEach(function(k){k=k.trim();if(k)obj[k]=target[k];}); out[alias]=obj; return;
      }
      out[key]=row[key];
    });
    return out;
  }
  function Query(table){this.table=table;this.filters=[];this.fields="*";this.ordering=null;this.limitN=null;this.rangeFrom=null;this.rangeTo=null;this.mode="select";this.payload=null;this.singleMode=null;this.options={};}
  Query.prototype.select=function(f){this.fields=f||"*";this.mode="select";return this;};
  Query.prototype.eq=function(k,v){this.filters.push(function(r){return String(r[k])===String(v);});return this;};
  Query.prototype.in=function(k,vs){vs=(vs||[]).map(String);this.filters.push(function(r){return vs.indexOf(String(r[k]))>=0;});return this;};
  Query.prototype.gte=function(k,v){this.filters.push(function(r){return String(r[k])>=String(v);});return this;};
  Query.prototype.lte=function(k,v){this.filters.push(function(r){return String(r[k])<=String(v);});return this;};
  Query.prototype.order=function(k,o){this.ordering={key:k,asc:!o||o.ascending!==false};return this;};
  Query.prototype.limit=function(n){this.limitN=n;return this;};
  Query.prototype.range=function(a,b){this.rangeFrom=a;this.rangeTo=b;return this;};
  Query.prototype.maybeSingle=function(){this.singleMode="maybe";return this;};
  Query.prototype.single=function(){this.singleMode="single";return this;};
  Query.prototype.insert=function(p){this.mode="insert";this.payload=p;return this;};
  Query.prototype.update=function(p){this.mode="update";this.payload=p;return this;};
  Query.prototype.delete=function(){this.mode="delete";return this;};
  Query.prototype.upsert=function(p,o){this.mode="upsert";this.payload=p;this.options=o||{};return this;};
  Query.prototype.then=function(resolve,reject){return this.execute().then(resolve,reject);};
  Query.prototype.execute=async function(){
    var src=DB[this.table]||[], i,row, ok, data;
    if(this.mode==="insert"){var items=Array.isArray(this.payload)?this.payload:[this.payload];var ins=items.map(function(x,n){var y=copy(x);if(!y.id)y.id="lab-"+Date.now()+"-"+n;return y;});DB[this.table]=src.concat(ins);return {data:copy(ins),error:null};}
    if(this.mode==="update"){var changed=[];for(i=0;i<src.length;i++){row=src[i];ok=this.filters.every(function(f){return f(row);});if(ok){Object.assign(row,copy(this.payload));changed.push(row);}}return {data:copy(changed),error:null};}
    if(this.mode==="delete"){var kept=[],removed=[];for(i=0;i<src.length;i++){row=src[i];ok=this.filters.every(function(f){return f(row);});(ok?removed:kept).push(row);}DB[this.table]=kept;return {data:copy(removed),error:null};}
    if(this.mode==="upsert"){var arr=Array.isArray(this.payload)?this.payload:[this.payload], keys=String(this.options.onConflict||"").split(",").filter(Boolean), out=[];arr.forEach(function(x,n){var ex=keys.length?src.find(function(y){return keys.every(function(k){return String(y[k])===String(x[k]);});}):null;if(ex){Object.assign(ex,copy(x));out.push(ex);}else{var y=copy(x);if(!y.id)y.id="lab-"+Date.now()+"-"+n;src.push(y);out.push(y);}});return {data:copy(out),error:null};}
    var rows=src.filter(function(r){return this.filters.every(function(f){return f(r);});},this);
    if(this.ordering){var o=this.ordering;rows.sort(function(a,b){if(a[o.key]===b[o.key])return 0;var z=a[o.key]>b[o.key]?1:-1;return o.asc?z:-z;});}
    if(this.rangeFrom!==null)rows=rows.slice(this.rangeFrom,this.rangeTo+1);
    if(this.limitN!==null)rows=rows.slice(0,this.limitN);
    data=rows.map(function(r){return pick(this.fields,r);},this);
    if(this.singleMode){if(!data.length)return {data:null,error:this.singleMode==="single"?{message:"No rows found"}:null};if(data.length>1&&this.singleMode==="single")return {data:null,error:{message:"Multiple rows found"}};return {data:data[0],error:null};}
    return {data:data,error:null,count:data.length};
  };
  var auth={current:null};
  supabase={
    from:function(t){return new Query(t);},
    auth:{
      getSession:async function(){return {data:{session:auth.current?{user:copy(auth.current)}:null},error:null};},
      getUser:async function(){return {data:{user:copy(auth.current)},error:null};},
      signOut:async function(){auth.current=null;return {error:null};},
      signUp:async function(p){var u={id:"lab-auth-"+Date.now(),email:p.email||"",user_metadata:(p.options&&p.options.data)||{}};auth.current=u;return {data:{user:u,session:{user:u}},error:null};}
    },
    storage:{from:function(){return {upload:async function(path){return {data:{path:path},error:null};},createSignedUrl:async function(path){return {data:{signedUrl:"#lab-file/"+encodeURIComponent(path)},error:null};},remove:async function(){return {data:[],error:null};}};}},
    channel:function(){return {on:function(){return this;},subscribe:function(){return this;}};},
    removeChannel:function(){return Promise.resolve();}
  };
})();