/* Run against a local static server: RT_BASE_URL=http://127.0.0.1:8766 node tests/breast-field-ui.cjs
 * Requires Playwright and Chromium. Test data is fictional and contains no patient identifiers. */
const {chromium,devices}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const url=process.env.RT_BASE_URL||'http://127.0.0.1:8766';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const reports=[];
 for(const mobile of [false,true]){
  const context=await browser.newContext(mobile?devices['iPhone 13']:{viewport:{width:1440,height:1000}});
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  const page=await context.newPage(),errors=[],failed=[],outgoing=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)failed.push(r.url()+':'+r.status())});page.on('request',r=>{if(!r.url().startsWith(url)&&!r.url().startsWith('data:'))outgoing.push(r.url())});
  const baseline=execFileSync('git',['show','575def0:index.html'],{encoding:'utf8'});
  await page.route(url+'/',r=>r.fulfill({contentType:'text/html',body:baseline}));await page.goto(url+'/');
  await page.locator('[data-act="addMemo"]').click();await page.locator('#mTitle').fill('UI保存確認');await page.locator('#mBody').fill('患者情報を含まないテスト');await page.locator('#formMemo button[type=submit]').click();
  const saved=await page.evaluate(()=>localStorage.getItem('rt_reference_beta_v01'));
  await page.unroute(url+'/');await page.reload();assert.match(await page.title(),/v0.5/);await page.locator('[data-tab="notes"]').click();assert.match(await page.locator('#content').innerText(),/UI保存確認/);
  await page.locator('#search').fill('乳癌');await page.locator('#searchResults.show [data-search-go]').first().click();
  await page.goto(url+'/index.html#breast');await page.locator('[data-tab="overview"]').click();await page.locator('[data-note-open]').first().click();await page.locator('[data-article-back]').first().click();
  assert.equal(await page.evaluate(()=>RT_SEED.clinicalNotes.length),50);
  await page.locator('a[href="breast-field-planner.html"]').click();
  async function fill(patch={}){
   await page.locator('#reset').click();
   const values={surgery:'mas',hist:'inv',tstage:'t2',site:'outer',margin:'neg',neo:'no',cn:'c0',ax:'slnb',micro:'macro',ene:'no',ct:'ct2',strategy:'omit_rt',rt:'yes',systemic:'yes',gross:'no',quality:'unk',imn:'no',...patch};
   for(const [id,v] of Object.entries(values))if(!['nodes','examined'].includes(id))await page.locator('#'+id).selectOption(v);
   await page.locator('#nodes').fill(patch.nodes||'1');await page.locator('#examined').fill(patch.examined||'2');
  }
  async function submit(expected){await page.locator('button[type=submit]').click();await page.locator('#output:not(.hidden)').waitFor();assert.equal(await page.locator('#cards article').count(),5);if(expected)assert.equal(await page.locator('[data-plan-status]').getAttribute('data-plan-status'),expected)}
  await fill();await submit('combined');assert.equal(await page.locator('#cards .result.strong').count(),3);assert.match(await page.locator('#combined').innerText(),/日本2022/);assert.match(await page.locator('#combined').innerText(),/米国2025/);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`/tmp/rt-${mobile?'iphone':'pc'}-combined.png`,fullPage:true});
  await page.locator('#copy').click();assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/ALNDを追加する場合/);
  for(const [patch,status] of [[{nodes:'2'},'combined'],[{rt:'unk'},'review'],[{rt:'no'},'alnd-needed'],[{strategy:'add_alnd'},'planned-alnd'],[{nodes:'3',examined:'3'},'outside'],[{ct:'ct3',tstage:'t3'},'review'],[{micro:'micro'},'review'],[{cn:'unk'},'review'],[{neo:'yes',ypn:'ypp'},'review'],[{gross:'yes'},'review'],[{ax:'alnd',quality:'adequate',strategy:'undecided'},'post-alnd'],[{ax:'alnd',quality:'unk',strategy:'undecided'},'review']]){await fill(patch);await submit(status);if(status!=='combined'&&status!=='post-alnd')assert.equal(await page.locator('#cards .result.strong').count(),0)}
  await fill({imn:'yes'});await submit('combined');assert.match(await page.locator('#cards article').nth(2).innerText(),/治療標的/);
  await page.locator('#rt').selectOption('no');assert(await page.locator('#output').evaluate(e=>e.classList.contains('hidden')));
  await fill({ax:'slnb',quality:'adequate'});let msg='';page.once('dialog',async d=>{msg=d.message();await d.accept()});await page.locator('button[type=submit]').click();assert.match(msg,/SLNBのみ/);assert(await page.locator('#output').evaluate(e=>e.classList.contains('hidden')));
  await fill({surgery:'bcs',nodes:'0'});await submit();assert.equal(await page.locator('[data-plan-status]').count(),0);assert.match(await page.locator('#cards article').first().innerText(),/全乳房/);
  await page.locator('header a').click();assert.match(await page.locator('h1').innerText(),/乳癌/);
  await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);await page.locator('a[href="breast-field-planner.html"]').click();await fill();await submit('combined');await page.locator('header a').click();await context.setOffline(false);
  assert.equal(await page.evaluate(()=>localStorage.getItem('rt_reference_beta_v01')),saved);
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);assert.deepEqual(outgoing,[]);
  reports.push({device:mobile?'iPhone 13 Chromium emulation':'PC Chromium',jsErrors:errors.length,httpErrors:failed.length,externalRequests:outgoing.length,result:'PASS'});await context.close();
 }
 fs.writeFileSync('/tmp/rt-breast-ui-results.json',JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
