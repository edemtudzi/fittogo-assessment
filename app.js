const form = document.getElementById('assessment-form');
const results = document.getElementById('results');
const panel = document.getElementById('assessment-panel');
const $ = (id) => document.getElementById(id);
const num = (v) => Number(v);

function estimate(a) {
  const age=num(a.age), w=num(a.weight), h=num(a.height);
  const bmi=w/((h/100)**2);
  const bmr = a.sex==='male' ? 10*w+6.25*h-5*age+5 : a.sex==='female' ? 10*w+6.25*h-5*age-161 : 10*w+6.25*h-5*age-78;
  const factor={sedentary:1.2,light:1.375,moderate:1.55,high:1.725}[a.activity];
  const maintenance=bmr*factor;
  let calories=maintenance;
  if(a.goal==='fatloss') calories-=350;
  if(a.goal==='recomp') calories-=200;
  if(a.goal==='muscle') calories+=200;
  calories=Math.round(Math.max(1400,calories)/50)*50;
  let proteinFactor=(a.goal==='fatloss'||a.goal==='recomp'||a.goal==='muscle')?1.8:1.6;
  let protein=Math.round(w*proteinFactor);
  let fat=Math.round(w*.8);
  let carbs=Math.max(0,Math.round((calories-protein*4-fat*9)/4));
  return {bmi,maintenance:Math.round(maintenance),calories,protein,fat,carbs};
}
const proteinFoods={
  none:['eggs','grilled fish (tilapia, sardines or mackerel)','chicken','beans','plain yoghurt or milk'],
  pesc:['eggs','grilled fish (tilapia, sardines or mackerel)','beans','plain yoghurt or milk'],
  veg:['eggs','beans and lentils','plain yoghurt or milk','soy foods'],
  vegan:['beans and lentils','soy foods or tofu','groundnuts (small portions)','fortified soy milk'],
  nofish:['eggs','chicken','beans','plain yoghurt or milk']
};
function mealFor(a,day){
  const p=proteinFoods[a.diet]||proteinFoods.none;
  const fish=p.includes('grilled fish (tilapia, sardines or mackerel)');
  const meat=p.includes('chicken');
  const egg=p.includes('eggs');
  const main=fish?'grilled tilapia or sardines':meat?'grilled chicken':'beans, eggs or soy protein';
  const breakfast= a.diet==='vegan'?'Oats with fortified soy milk, banana and a small portion of groundnuts':`Oats with milk and ${egg?'2 boiled eggs':'a serving of soy yoghurt'}`;
  const lunches=[
    `Akoumé with adémè or okra sauce and ${main}`,
    `Ayimolou (rice and beans) with ${fish?'grilled fish':egg?'boiled eggs':'extra beans'}`,
    `Boiled yam, kontomiré/gboma stew and ${main}`,
    `Ablo with ${main} and fresh tomato-pepper sauce`,
    `Rice with tomato stew, vegetables and ${main}`,
    `Sweet potato with ${main} and cabbage-carrot salad`,
    `Moderate fufu portion with light soup and ${main}`
  ];
  const dinners=[
    `Beans stew, vegetables and a small serving of ripe plantain`,
    `Akoumé with gboma sauce and ${main}`,
    `Rice with vegetable sauce and ${main}`,
    `Boiled yam with adémè and ${main}`,
    `Vegetable omelette with a small serving of boiled plantain`,
    `Ablo with ${main} and vegetables`,
    `Light bean and vegetable soup with a modest starch portion`
  ];
  const snacks=a.meals==='2'?'Optional: fruit if hungry':a.diet==='vegan'?'Fruit with fortified soy yoghurt':`Fruit with plain yoghurt or ${egg?'a boiled egg':'a small handful of groundnuts'}`;
  const i=day%7;
  return {breakfast,lunch:lunches[i],dinner:dinners[(i+2)%7],snack:snacks};
}
function workoutDays(a){
 const n=num(a.days), home=a.place==='home', eq=a.equipment;
 const sets=a.level==='beginner'?2:3;
 const rep=a.level==='beginner'?'8–12':'8–15';
 const hasWeights=['dumbbells','homekit','gym'].includes(eq)||a.place==='gym';
 const push=hasWeights?'Dumbbell or machine chest press':'Push-ups (use an incline if needed)';
 const row=hasWeights?'Dumbbell, cable or machine rows':'Backpack rows or resistance-band rows';
 const squat=hasWeights?'Goblet squats':'Bodyweight squats';
 const hinge=hasWeights?'Dumbbell Romanian deadlifts':'Backpack hip hinges / glute bridges';
 const templates=[
  {name:'Full Body A',items:[`${squat} — ${sets} × ${rep}`,`${push} — ${sets} × ${rep}`,`${row} — ${sets} × ${rep}`,'Reverse lunges — 2–3 × 10 each leg','Plank — 3 × 20–45 seconds']},
  {name:'Full Body B',items:[`${hinge} — ${sets} × ${rep}`,'Overhead press or pike push-ups — 3 × 8–12','Band/backpack row — 3 × 10–15','Glute bridges — 3 × 12–15','Dead bugs — 3 × 10 each side']},
  {name:'Upper Body',items:[`${push} — 3 × ${rep}`,`${row} — 3 × ${rep}`,'Shoulder press or pike push-ups — 3 × 8–12','Biceps curls (band/backpack/weights) — 2 × 12','Triceps extensions — 2 × 12']},
  {name:'Lower Body + Core',items:[`${squat} — 3 × ${rep}`,'Bulgarian split squats or reverse lunges — 3 × 8–10 each leg',`${hinge} — 3 × ${rep}`,'Calf raises — 3 × 15–20','Side plank — 3 × 20–40 seconds each side']},
  {name:'Conditioning + Mobility',items:['Brisk walking or low-impact intervals — 20–30 minutes','Bird dogs — 2 × 10 each side','Hip and shoulder mobility — 8 minutes']},
  {name:'Full Body C',items:[`${push} — 3 × ${rep}`,`${row} — 3 × ${rep}`,`${squat} — 3 × ${rep}`,'Hip hinge — 3 × 12','Farmer carry or march in place — 3 × 30 seconds']}
 ];
 let chosen=n===2?[templates[0],templates[1]]:n===3?[templates[0],templates[2],templates[3]]:n===4?[templates[0],templates[3],templates[2],templates[1]]:n===5?[templates[0],templates[2],templates[3],templates[1],templates[4]]:[templates[0],templates[2],templates[3],templates[1],templates[4],templates[5]];
 const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
 return days.map((d,i)=>({day:d,plan:chosen[i]||null,rest:!chosen[i]}));
}
function render(a){
 const e=estimate(a), bmiLabel=e.bmi<18.5?'below the standard adult BMI range':e.bmi<25?'within the standard adult BMI range':e.bmi<30?'above the standard adult BMI range':'in the higher adult BMI range';
 $('summary-line').textContent=`${a.goal==='recomp'?'Muscle gain + fat loss':a.goal==='muscle'?'Muscle gain':a.goal==='fatloss'?'Fat loss':a.goal==='fitness'?'Strength and endurance':'General fitness'} · ${a.days} training days · ${a.place==='home'?'Home training':a.place==='gym'?'Gym training':'Home and gym'}`;
 $('metrics').innerHTML=[
  ['Estimated calories',e.calories,'kcal / day'],['Protein target',e.protein,'grams / day'],['Body weight',`${a.weight} kg`,'starting measurement'],['BMI estimate',e.bmi.toFixed(1),bmiLabel]
 ].map(x=>`<div class="metric"><small>${x[0]}</small><strong>${x[1]}</strong><span>${x[2]}</span></div>`).join('');
 const notes=[];
 if(a.limitations.trim()&&a.limitations.trim().toLowerCase()!=='none')notes.push(`You reported: ${a.limitations}. Avoid movements that aggravate symptoms and obtain professional guidance before training.`);
 notes.push('Calorie needs are estimates, not measurements. Monitor average weight, waist, energy and strength for 2–3 weeks, then adjust gradually. BMI is a rough screening measure and does not distinguish muscle from fat.');
 $('safety-note').textContent=notes.join(' ');
 $('nutrition').innerHTML=`<p>Estimated maintenance: <b>${e.maintenance.toLocaleString()} kcal/day</b>. Your starting target is <b>${e.calories.toLocaleString()} kcal/day</b>.</p><div class="nutrition-grid"><div class="nutrition-item"><b>${e.protein} g</b><span>Protein</span></div><div class="nutrition-item"><b>${e.carbs} g</b><span>Carbohydrates</span></div><div class="nutrition-item"><b>${e.fat} g</b><span>Fat</span></div><div class="nutrition-item"><b>2–3 L</b><span>Water baseline</span></div></div><p class="helper">Protein is estimated at about 1.8 g/kg. Spread it across meals. If you have kidney disease or a prescribed diet, ask your clinician about protein targets.</p>`;
 $('meal-plan').innerHTML=Array.from({length:7},(_,i)=>{const m=mealFor(a,i);const d=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i];return `<article class="meal-day"><h4>${d}</h4><div class="meal-items"><div class="meal"><b>Breakfast</b>${m.breakfast}</div><div class="meal"><b>Lunch</b>${m.lunch}</div><div class="meal"><b>Dinner</b>${m.dinner}</div><div class="meal"><b>Snack</b>${m.snack}</div></div></article>`}).join('');
 const schedule=workoutDays(a);
 $('workouts').innerHTML=schedule.map(x=>`<article class="workout-day"><h4>${x.day} · ${x.rest?'Recovery':x.plan.name}</h4>${x.rest?'<p class="muted">Rest day. Optional easy walk and gentle mobility.</p>':`<ul class="exercise-list">${x.plan.items.map(i=>`<li>${i}</li>`).join('')}</ul>`}</article>`).join('')+`<p class="helper">Warm up 5–8 minutes. Rest 60–120 seconds between sets. Finish most sets with 1–3 good repetitions left. When all sets reach the top of the rep range with good form, add a little resistance or choose a harder variation. Aim for 20–30 minutes of brisk walking on most days.</p>`;
 const budget=a.budget;
 const proteins=budget==='low'?['Eggs','Beans / cowpeas','Sardines when affordable','Seasonal fish']:budget==='moderate'?['Eggs','Beans / cowpeas','Tilapia or sardines','Chicken','Plain yoghurt']:['Eggs','Fish and chicken','Beans / lentils','Plain yoghurt / milk','Soy foods'];
 const groups={'Protein':proteins,'Staples':['Maize flour','Rice','Yam','Sweet potatoes','Plantain','Oats'],'Produce':['Tomatoes','Onions and peppers','Adémè / gboma / kontomiré','Cabbage and carrots','Bananas or seasonal fruit'],'Extras':['Milk or unsweetened yoghurt','Groundnuts','Avocado','Cooking oil (measure portions)']};
 $('shopping').innerHTML=Object.entries(groups).map(([k,v])=>`<div class="shopping-group"><h4>${k}</h4>${v.map(x=>`<label><input type="checkbox"> ${x}</label>`).join('')}</div>`).join('');
 panel.classList.add('hidden');results.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});
}
form.addEventListener('submit',e=>{e.preventDefault();const a=Object.fromEntries(new FormData(form).entries());if(num(a.age)<16){alert('This general plan is designed for adults aged 16 and older. Please seek age-appropriate guidance.');return;}render(a);});
$('edit-button').addEventListener('click',()=>{results.classList.add('hidden');panel.classList.remove('hidden');window.scrollTo({top:panel.offsetTop-10,behavior:'smooth'});});
$('restart-button').addEventListener('click',()=>{form.reset();results.classList.add('hidden');panel.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});});
$('print-button').addEventListener('click',()=>window.print());