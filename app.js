
const languageSelect = document.getElementById('language-select');
const originalText = new WeakMap();
const originalAttrs = new WeakMap();
const FR = {
 'Fitness that fits your life':'Le fitness adapté à votre quotidien',
 'Language':'Langue','YOUR PERSONAL FITNESS BLUEPRINT':'VOTRE PROGRAMME FITNESS PERSONNALISÉ',
 'Build a stronger you.':'Devenez plus fort.',
 'Eat local. Train smart.':'Mangez local. Entraînez-vous intelligemment.',
 'Answer a few questions to receive a practical workout and nutrition plan built around your goals, schedule, budget and familiar West African foods.':'Répondez à quelques questions pour obtenir un programme pratique d’entraînement et de nutrition adapté à vos objectifs, votre emploi du temps, votre budget et aux aliments africains.',
 '✓ Home or gym':'✓ À domicile ou en salle','✓ African meals':'✓ Repas africains','✓ Personalized guidance':'✓ Conseils personnalisés',
 'FITNESS ASSESSMENT':'ÉVALUATION FITNESS','Tell us about yourself':'Parlez-nous de vous','01 / 02':'01 / 02',
 '1. Personal details':'1. Informations personnelles','Age':'Âge','Sex for calorie estimate':'Sexe pour estimer les calories','Male':'Homme','Female':'Femme','Prefer not to say':'Je préfère ne pas préciser',
 'Weight (kg)':'Poids (kg)','Height (cm)':'Taille (cm)','Country':'Pays','Togo':'Togo','Ghana':'Ghana','Benin':'Bénin','Other':'Autre',
 'Daily activity outside exercise':'Activité quotidienne hors entraînement','Mostly sitting / office work':'Principalement assis / travail de bureau','Lightly active':'Légèrement actif','Moderately active':'Modérément actif','Very active / physical work':'Très actif / travail physique',
 '2. Your goal and experience':'2. Vos objectifs et votre expérience','Primary goal':'Objectif principal','Build muscle and lose belly fat':'Développer les muscles et réduire la graisse abdominale','Build muscle and gain weight':'Développer les muscles et prendre du poids','Lose weight and reduce body fat':'Perdre du poids et réduire la masse grasse','Improve strength and endurance':'Améliorer la force et l’endurance','Maintain fitness and general health':'Maintenir sa forme et sa santé générale',
 'Training experience':'Expérience en entraînement','Beginner':'Débutant','Intermediate':'Intermédiaire','Advanced':'Avancé',
 '3. Training setup':'3. Organisation de l’entraînement','Where will you train?':'Où allez-vous vous entraîner ?','At home':'À domicile','At a gym':'En salle','Both':'Les deux','Days available per week':'Jours disponibles par semaine','Available equipment':'Équipement disponible','Bodyweight only':'Poids du corps uniquement','Resistance bands':'Bandes de résistance','Dumbbells':'Haltères','Dumbbells and bands':'Haltères et bandes','Full gym equipment':'Équipement complet de salle','Typical workout duration':'Durée habituelle de la séance','About 30 minutes':'Environ 30 minutes','About 45 minutes':'Environ 45 minutes','About 60 minutes':'Environ 60 minutes',
 '4. Food preferences and budget':'4. Préférences alimentaires et budget','Dietary preference':'Préférences alimentaires','No restrictions — I eat everything':'Aucune restriction — je mange de tout','No meat; fish, eggs and dairy are okay':'Pas de viande ; poisson, œufs et produits laitiers autorisés','Vegetarian — eggs and dairy are okay':'Végétarien — œufs et produits laitiers autorisés','Vegan':'Végétalien','No fish':'Sans poisson','Food budget':'Budget alimentaire','Economical':'Économique','Moderate':'Moyen','Flexible':'Flexible','Meals per day':'Repas par jour','2 meals':'2 repas','3 meals':'3 repas','3 meals + 1 snack':'3 repas + 1 collation','3 meals + 2 snacks':'3 repas + 2 collations','Foods you want included (optional)':'Aliments à inclure (facultatif)','e.g. ayimolou, ablo, yam':'ex. ayimolou, ablo, igname',
 '5. Health and limitations':'5. Santé et limitations','Injuries, medical restrictions or exercises you need to avoid':'Blessures, restrictions médicales ou exercices à éviter','Write \'None\' if not applicable. Please mention relevant medical restrictions.':'Écrivez « Aucun » si cela ne vous concerne pas. Mentionnez toute restriction médicale pertinente.',
 'This tool provides general wellness guidance, not medical diagnosis or treatment. If you have a medical condition, are pregnant, or have persistent pain, consult a qualified health professional before starting.':'Cet outil fournit des conseils généraux de bien-être et ne remplace pas un diagnostic ou un traitement médical. En cas de problème de santé, de grossesse ou de douleur persistante, consultez un professionnel de santé qualifié avant de commencer.',
 'Generate my personalized plan':'Générer mon programme personnalisé','YOUR PERSONAL BLUEPRINT':'VOTRE PROGRAMME PERSONNALISÉ','Your plan is ready':'Votre programme est prêt','Edit answers':'Modifier mes réponses','NUTRITION':'NUTRITION','Your daily nutrition targets':'Vos objectifs nutritionnels quotidiens','7-DAY MEAL GUIDE':'MENU SUR 7 JOURS','African-inspired meals':'Repas inspirés des cuisines africaines','Portions are starting estimates. Adjust to hunger, progress and professional advice.':'Les portions sont des estimations de départ. Ajustez-les selon votre faim, vos progrès et les conseils d’un professionnel.',
 'MOVEMENT':'ACTIVITÉ PHYSIQUE','Your weekly workout schedule':'Votre programme d’entraînement hebdomadaire','SHOPPING':'COURSES','Your shopping checklist':'Votre liste de courses','PROGRESS':'PROGRESSION','How to track your results':'Comment suivre vos résultats',
 'Weigh yourself 3 mornings per week and compare weekly averages.':'Pesez-vous 3 matins par semaine et comparez les moyennes hebdomadaires.','Measure your waist once a week under the same conditions.':'Mesurez votre tour de taille une fois par semaine dans les mêmes conditions.','Take front, side and back photos every 4 weeks.':'Prenez des photos de face, de profil et de dos toutes les 4 semaines.','Record exercise sets, repetitions and resistance so you can gradually progress.':'Notez les séries, répétitions et charges afin de progresser progressivement.',
 'Print / Save as PDF':'Imprimer / Enregistrer en PDF','Start a new assessment':'Commencer une nouvelle évaluation','Your answers are processed in this browser. This starter version does not send or store personal data on a server.':'Vos réponses sont traitées dans ce navigateur. Cette version ne transmet ni ne stocke vos données personnelles sur un serveur.',
 'Eat local. Train consistently. Progress patiently.':'Mangez local. Entraînez-vous régulièrement. Progressez avec patience.',
 'Muscle gain + fat loss':'Développement musculaire + perte de graisse','Muscle gain':'Développement musculaire','Fat loss':'Perte de graisse','Strength and endurance':'Force et endurance','General fitness':'Forme générale','Home training':'Entraînement à domicile','Gym training':'Entraînement en salle','Home and gym':'À domicile et en salle','training days':'jours d’entraînement',
 'Estimated calories':'Calories estimées','Protein target':'Objectif de protéines','Body weight':'Poids corporel','starting measurement':'mesure de départ','BMI estimate':'IMC estimé','below the standard adult BMI range':'inférieur à la plage IMC standard chez l’adulte','within the standard adult BMI range':'dans la plage IMC standard chez l’adulte','above the standard adult BMI range':'supérieur à la plage IMC standard chez l’adulte','in the higher adult BMI range':'dans une plage IMC adulte élevée',
 'You reported:':'Vous avez indiqué :','Avoid movements that aggravate symptoms and obtain professional guidance before training.':'Évitez les mouvements qui aggravent les symptômes et demandez conseil à un professionnel avant de vous entraîner.',
 'Calorie needs are estimates, not measurements. Monitor average weight, waist, energy and strength for 2–3 weeks, then adjust gradually. BMI is a rough screening measure and does not distinguish muscle from fat.':'Les besoins caloriques sont des estimations. Suivez votre poids moyen, votre tour de taille, votre énergie et votre force pendant 2 à 3 semaines, puis ajustez progressivement. L’IMC est un indicateur approximatif qui ne distingue pas les muscles de la graisse.',
 'Estimated maintenance:':'Maintien estimé :','kcal/day':'kcal/jour','Your starting target is':'Votre objectif de départ est','Protein':'Protéines','Carbohydrates':'Glucides','Fat':'Lipides','Water baseline':'Repère hydratation','Protein is estimated at about 1.8 g/kg. Spread it across meals. If you have kidney disease or a prescribed diet, ask your clinician about protein targets.':'Les protéines sont estimées à environ 1,8 g/kg. Répartissez-les sur vos repas. En cas de maladie rénale ou de régime prescrit, demandez conseil à votre professionnel de santé concernant cet objectif.',
 'Breakfast':'Petit-déjeuner','Lunch':'Déjeuner','Dinner':'Dîner','Snack':'Collation','Monday':'Lundi','Tuesday':'Mardi','Wednesday':'Mercredi','Thursday':'Jeudi','Friday':'Vendredi','Saturday':'Samedi','Sunday':'Dimanche',
 'Recovery':'Récupération','Rest day. Optional easy walk and gentle mobility.':'Jour de repos. Petite marche et mobilité douce facultatives.',
 'Warm up 5–8 minutes. Rest 60–120 seconds between sets. Finish most sets with 1–3 good repetitions left. When all sets reach the top of the rep range with good form, add a little resistance or choose a harder variation. Aim for 20–30 minutes of brisk walking on most days.':'Échauffez-vous pendant 5 à 8 minutes. Reposez-vous 60 à 120 secondes entre les séries. Terminez la plupart des séries en gardant 1 à 3 répétitions possibles. Lorsque vous atteignez le haut de la fourchette avec une bonne technique, augmentez légèrement la résistance ou choisissez une variante plus difficile. Visez 20 à 30 minutes de marche rapide la plupart des jours.',
 'Full Body A':'Corps entier A','Full Body B':'Corps entier B','Upper Body':'Haut du corps','Lower Body + Core':'Bas du corps + abdominaux','Conditioning + Mobility':'Cardio + mobilité','Full Body C':'Corps entier C',
 'Bodyweight squats':'Squats au poids du corps','Goblet squats':'Squats goblet','Push-ups (use an incline if needed)':'Pompes (surélevées si nécessaire)','Dumbbell or machine chest press':'Développé couché avec haltères ou machine','Backpack rows or resistance-band rows':'Tirage avec sac à dos ou bandes','Dumbbell, cable or machine rows':'Tirage avec haltères, poulie ou machine','Reverse lunges':'Fentes arrière','Plank':'Gainage','Overhead press or pike push-ups':'Développé épaules ou pompes en V','Band/backpack row':'Tirage avec bande ou sac à dos','Glute bridges':'Ponts fessiers','Dead bugs':'Dead bug','Shoulder press or pike push-ups':'Développé épaules ou pompes en V','Biceps curls (band/backpack/weights)':'Curl biceps (bande, sac ou haltères)','Triceps extensions':'Extensions triceps','Bulgarian split squats or reverse lunges':'Squats bulgares ou fentes arrière','Dumbbell Romanian deadlifts':'Soulevé de terre roumain avec haltères','Backpack hip hinges / glute bridges':'Charnière de hanche avec sac / ponts fessiers','Calf raises':'Extensions mollets','Side plank':'Gainage latéral','Brisk walking or low-impact intervals — 20–30 minutes':'Marche rapide ou intervalles à faible impact — 20 à 30 minutes','Bird dogs':'Bird dog','Hip and shoulder mobility — 8 minutes':'Mobilité des hanches et des épaules — 8 minutes','Hip hinge':'Charnière de hanche','Farmer carry or march in place':'Marche du fermier ou marche sur place',
 'Eggs':'Œufs','Beans / cowpeas':'Haricots / niébé','Sardines when affordable':'Sardines selon le budget','Seasonal fish':'Poisson de saison','Tilapia or sardines':'Tilapia ou sardines','Chicken':'Poulet','Plain yoghurt':'Yaourt nature','Fish and chicken':'Poisson et poulet','Beans / lentils':'Haricots / lentilles','Plain yoghurt / milk':'Yaourt nature / lait','Soy foods':'Aliments à base de soja','Staples':'Féculents','Produce':'Fruits et légumes','Extras':'Compléments','Maize flour':'Farine de maïs','Rice':'Riz','Yam':'Igname','Sweet potatoes':'Patates douces','Plantain':'Banane plantain','Oats':'Flocons d’avoine','Tomatoes':'Tomates','Onions and peppers':'Oignons et piments','Cabbage and carrots':'Chou et carottes','Bananas or seasonal fruit':'Bananes ou fruits de saison','Milk or unsweetened yoghurt':'Lait ou yaourt sans sucre','Groundnuts':'Arachides','Avocado':'Avocat','Cooking oil (measure portions)':'Huile de cuisson (portions mesurées)',
 'Jollof rice with vegetables and ':'Riz jollof avec légumes et ','Waakye (rice and beans) with ':'Waakye (riz et haricots) avec ','Boiled yam with kontomiré/gboma or leafy vegetable stew and ':'Igname bouillie avec sauce kontomiré/gboma ou légumes-feuilles et ','Ablo, plantain or rice with ':'Ablo, plantain ou riz avec ','Ndolé-inspired leafy greens and beans with ':'Légumes-feuilles façon ndolé et haricots avec ',' and a modest starch portion':' et une portion modérée de féculents','Moderate fufu portion with egusi or light vegetable soup and ':'Portion modérée de foufou avec soupe egusi ou soupe légère aux légumes et ','Brown rice or fonio with leafy vegetable sauce and ':'Riz complet ou fonio avec sauce aux légumes-feuilles et ','Boiled yam or cassava with okra sauce and ':'Igname ou manioc bouilli avec sauce gombo et ','Injera or whole-grain flatbread with lentil and vegetable stew':'Injera ou pain complet avec ragoût de lentilles et légumes','Ayimolou (rice and beans) with ':'Ayimolou (riz et haricots) avec ','grilled tilapia or sardines':'tilapia ou sardines grillés','grilled fish':'poisson grillé','boiled eggs':'œufs durs','extra beans':'haricots supplémentaires','Boiled yam, kontomiré/gboma stew and ':'Igname bouillie, sauce kontomiré/gboma et ','Ablo with ':'Ablo avec ',' and fresh tomato-pepper sauce':' et sauce fraîche tomate-piment','Rice with tomato stew, vegetables and ':'Riz à la sauce tomate, légumes et ','Sweet potato with ':'Patate douce avec ',' and cabbage-carrot salad':' et salade de chou et carottes','Moderate fufu portion with light soup and ':'Portion modérée de foufou avec soupe légère et ','Beans stew, vegetables and a small serving of ripe plantain':'Ragoût de haricots, légumes et petite portion de plantain mûr','Akoumé with gboma sauce and ':'Akoumé avec sauce gboma et ','Rice with vegetable sauce and ':'Riz avec sauce aux légumes et ','Boiled yam with adémè and ':'Igname bouillie avec adémè et ','Vegetable omelette with a small serving of boiled plantain':'Omelette aux légumes avec une petite portion de plantain bouilli',' and vegetables':' et légumes','Light bean and vegetable soup with a modest starch portion':'Soupe légère de haricots et légumes avec une portion modérée de féculents',
 'Oats with fortified soy milk, banana and a small portion of groundnuts':'Flocons d’avoine au lait de soja enrichi, banane et petite portion d’arachides','Oats with milk and ':'Flocons d’avoine au lait et ','2 boiled eggs':'2 œufs durs','a serving of soy yoghurt':'une portion de yaourt au soja','Optional: fruit if hungry':'Facultatif : un fruit en cas de faim','Fruit with fortified soy yoghurt':'Fruit avec yaourt au soja enrichi','Fruit with plain yoghurt or ':'Fruit avec yaourt nature ou ','a boiled egg':'un œuf dur','a small handful of groundnuts':'une petite poignée d’arachides',
 'No meat; fish, eggs and dairy are okay':'Pas de viande ; poisson, œufs et produits laitiers autorisés',
 'grilled chicken':'poulet grillé','beans, eggs or soy protein':'haricots, œufs ou protéines de soja','kcal / day':'kcal / jour','grams / day':'grammes / jour','kg':'kg','2–3 L':'2 à 3 L','2–3 weeks':'2 à 3 semaines','60–120 seconds':'60 à 120 secondes','5–8 minutes':'5 à 8 minutes','20–30 minutes':'20 à 30 minutes','8–12':'8–12','8–15':'8–15','each leg':'chaque jambe','each side':'de chaque côté','seconds':'secondes','minutes':'minutes'
};
const FR_PARTS = Object.keys(FR).sort((a,b)=>b.length-a.length);
function applyLanguage() {
 const lang=languageSelect?.value||'en';
 document.documentElement.lang=lang;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())){
   if(!originalText.has(node)) originalText.set(node,node.nodeValue);
   const original=originalText.get(node);
   if(lang==='en'){node.nodeValue=original;continue;}
   let value=original;
   const trimmed=value.trim();
   if(FR[trimmed]) value=value.replace(trimmed,FR[trimmed]);
   else for(const phrase of FR_PARTS) if(value.includes(phrase)) value=value.split(phrase).join(FR[phrase]);
   node.nodeValue=value;
 }
 document.querySelectorAll('[placeholder],[aria-label]').forEach(el=>{
  ['placeholder','aria-label'].forEach(attr=>{
   if(!el.hasAttribute(attr))return;
   let map=originalAttrs.get(el);if(!map){map={};originalAttrs.set(el,map);}
   if(map[attr]===undefined)map[attr]=el.getAttribute(attr);
   const original=map[attr];el.setAttribute(attr,lang==='fr'?(FR[original]||original):original);
  });
 });
}
languageSelect?.addEventListener('change',applyLanguage);
applyLanguage();

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
    `Jollof rice with vegetables and ${main}`,
    `Waakye (rice and beans) with ${fish?'grilled fish':egg?'boiled eggs':'extra beans'}`,
    `Boiled yam with kontomiré/gboma or leafy vegetable stew and ${main}`,
    `Ablo, plantain or rice with ${main} and fresh tomato-pepper sauce`,
    `Ndolé-inspired leafy greens and beans with ${main} and a modest starch portion`,
    `Sweet potato with ${main} and cabbage-carrot salad`,
    `Moderate fufu portion with egusi or light vegetable soup and ${main}`
  ];
  const dinners=[
    `Beans stew, vegetables and a small serving of ripe plantain`,
    `Brown rice or fonio with leafy vegetable sauce and ${main}`,
    `Rice with vegetable sauce and ${main}`,
    `Boiled yam or cassava with okra sauce and ${main}`,
    `Vegetable omelette with a small serving of boiled plantain`,
    `Injera or whole-grain flatbread with lentil and vegetable stew`,
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
 panel.classList.add('hidden');results.classList.remove('hidden');applyLanguage();window.scrollTo({top:0,behavior:'smooth'});
}
form.addEventListener('submit',e=>{e.preventDefault();const a=Object.fromEntries(new FormData(form).entries());if(num(a.age)<16){alert('This general plan is designed for adults aged 16 and older. Please seek age-appropriate guidance.');return;}render(a);});
$('edit-button').addEventListener('click',()=>{results.classList.add('hidden');panel.classList.remove('hidden');window.scrollTo({top:panel.offsetTop-10,behavior:'smooth'});});
$('restart-button').addEventListener('click',()=>{form.reset();results.classList.add('hidden');panel.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});});
$('print-button').addEventListener('click',()=>window.print());