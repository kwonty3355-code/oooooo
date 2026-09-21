(function(){
 const load=(src)=>new Promise((resolve,reject)=>{const s=document.createElement('script');const timer=setTimeout(()=>{s.remove();reject(Error('연결 시간이 길어지고 있어요. 인터넷 연결 후 다시 열어주세요.'));},18000);s.src=src;s.crossOrigin='anonymous';s.onload=()=>{clearTimeout(timer);resolve();};s.onerror=()=>{clearTimeout(timer);reject(Error('앱 파일을 불러오지 못했어요. 인터넷 연결 후 다시 열어주세요.'));};document.head.append(s);});
 (async()=>{try{
 await load('https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js');
 await load('https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js');
 await Promise.allSettled([load('https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js'),load('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/dist/umd/supabase.js')]);
 await load('./app.js?v=5.0.1');
 if('serviceWorker'in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
 }catch(e){document.getElementById('load-status').textContent=e.message;document.getElementById('retry').hidden=false;}})();
})();
