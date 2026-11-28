/* Serve the repo over HTTP and run with Playwright and Chromium installed. */
'use strict';
const {chromium, devices}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.RT_BASE_URL||'http://127.0.0.1:8796/';
(async()=>{
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try{
 for(const mobile of [false,true]){
  const ctx=await browser.newContext(mobile?devices['iPhone 13']:{viewport:{width:1440,height:1000}});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);
  if(!process.env.RT_SKIP_OFFLINE)await page.evaluate(()=>navigator.serviceWorker.ready.then(()=>true));
  await page.locator('a[href="breast-field-planner.html"]').first().click();
  const summary=()=>page.locator('#resultSummary').innerText();
  const state=heading=>page.locator('#regionResults article').filter({has:page.getByRole('heading',{name:heading,exact:true})}).locator('.state').innerText();
  await page.locator('[data-example="masN1"]').click();
  assert.match(await summary(),/PMRTを個別検討/);
  for(const heading of ['胸壁／再建乳房','鎖骨上・鎖骨下（Level III）'])assert.equal(await state(heading),'個別検討');
  assert(await page.locator('#regionResults a[href$="/2026/h_index/bq7/"]').count());
  assert(await page.locator('#regionResults a[href$="/2026/h_index/bq8/"]').count());
  await page.locator('#nodes').fill('4');
  assert.equal(await state('胸壁／再建乳房'),'照射する');
  await page.locator('#surgery').selectOption('bcs');
  assert.equal(await state('鎖骨上・鎖骨下（Level III）'),'照射する');
  await page.locator('#nodes').fill('3');
  assert.match(await summary(),/全乳房.*鎖骨上照射を個別検討/);
  assert(await page.locator('#regionResults a[href$="/2026/h_index/bq6/"]').count());
  await page.locator('[data-example="masSLN"]').click();
  assert.equal(await page.locator('#regionResults a[href$="/2026/h_index/bq7/"]').count(),0);
  await page.locator('[data-example="neoN0"]').click();
  assert.equal(await page.locator('#regionResults a[href$="/2026/h_index/bq7/"]').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(!process.env.RT_SKIP_OFFLINE){
   await ctx.setOffline(true);
   await page.reload();
   await page.locator('[data-example="masN1"]').click();
   assert.match(await summary(),/PMRTを個別検討/);
  }
  assert.deepEqual(errors,[]);
  await ctx.close();
 }
 console.log('PASS: desktop and iPhone-size Chromium, actual planner entry point and BQ6–8 decision/citation checks');
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
