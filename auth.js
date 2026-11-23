(function () {
  const $ = (id) => document.getElementById(id);
  const gate = $('auth-gate');
  const app = $('app-content');
  const footer = $('app-footer');
  const language = $('language-select');
  let supabase = null;
  let currentProfile = null;
  let authMode = 'login';

  const copy = {
    en: {
      title:'FitTogo member access', intro:'Create an account or sign in to access your personal fitness assessment.',
      login:'Sign in', signup:'Create account', email:'Email address', password:'Password', showPassword:'Show', hidePassword:'Hide',
      name:'Full name', submitLogin:'Sign in', submitSignup:'Create account', switchLogin:'Already registered? Sign in',
      switchSignup:'New to FitTogo? Create an account', config:'FitTogo access is not configured yet. The site owner must connect its Supabase project before users can register.',
      confirm:'Your account request was received. Check your inbox and spam folder for the verification email. After confirming your email, your account will wait for administrator approval.',
      existingAccount:'This email may already have an account. Switch to Sign in and use your existing password, or use password recovery. No new account was created.',
      pending:'Your email is confirmed and your account is awaiting approval. You will be able to use the assessment once an administrator approves you.',
      rejected:'Your access request was not approved. Please contact the FitTogo administrator.',
      suspended:'Your FitTogo access is currently suspended. Please contact the administrator.',
      approved:'Your account is approved. You can now use the assessment.',
      signout:'Sign out', admin:'Admin approval dashboard', requests:'Access requests', noRequests:'There are no pending requests.',
      approve:'Approve', reject:'Reject', suspend:'Suspend', restore:'Restore access', users:'Members',
      err:'Something went wrong. Please try again.', passwordHint:'At least 8 characters',
      loading:'Checking your access…', loginError:'Incorrect email or password, or your email is not confirmed.',
      signupError:'Could not create account. Check the email and password and try again.',
      missing:'Please enter your name, email and a password of at least 8 characters.',
      profileError:'Your account exists, but its access profile could not be loaded. Contact the administrator.'
    },
    fr: {
      title:'Accès membres FitTogo', intro:'Créez un compte ou connectez-vous pour accéder à votre évaluation fitness personnalisée.',
      login:'Connexion', signup:'Créer un compte', email:'Adresse e-mail', password:'Mot de passe', showPassword:'Afficher', hidePassword:'Masquer',
      name:'Nom complet', submitLogin:'Se connecter', submitSignup:'Créer mon compte', switchLogin:'Déjà inscrit ? Connectez-vous',
      switchSignup:'Nouveau sur FitTogo ? Créez un compte', config:'L’accès FitTogo n’est pas encore configuré. Le propriétaire du site doit connecter son projet Supabase avant toute inscription.',
      confirm:'Votre demande de création de compte a été reçue. Vérifiez votre boîte de réception et vos courriers indésirables. Après confirmation de votre adresse, votre compte attendra la validation de l’administrateur.',
      existingAccount:'Cette adresse e-mail possède peut-être déjà un compte. Passez à Connexion et utilisez votre mot de passe existant, ou récupérez votre mot de passe. Aucun nouveau compte n’a été créé.',
      pending:'Votre adresse e-mail est confirmée et votre compte attend l’approbation de l’administrateur. Vous pourrez utiliser le formulaire après validation.',
      rejected:'Votre demande d’accès n’a pas été approuvée. Veuillez contacter l’administrateur FitTogo.',
      suspended:'Votre accès à FitTogo est suspendu. Veuillez contacter l’administrateur.',
      approved:'Votre compte est approuvé. Vous pouvez maintenant utiliser le formulaire.',
      signout:'Se déconnecter', admin:'Tableau de validation administrateur', requests:'Demandes d’accès', noRequests:'Aucune demande en attente.',
      approve:'Approuver', reject:'Refuser', suspend:'Suspendre', restore:'Rétablir l’accès', users:'Membres',
      err:'Une erreur est survenue. Veuillez réessayer.', passwordHint:'8 caractères minimum',
      loading:'Vérification de votre accès…', loginError:'E-mail ou mot de passe incorrect, ou adresse e-mail non confirmée.',
      signupError:'Création du compte impossible. Vérifiez l’adresse e-mail et le mot de passe.',
      missing:'Veuillez saisir votre nom, votre e-mail et un mot de passe d’au moins 8 caractères.',
      profileError:'Votre compte existe, mais son profil d’accès est introuvable. Contactez l’administrateur.'
    }
  };
  const t = (key) => (copy[language?.value || 'en'] || copy.en)[key] || copy.en[key] || key;

  function message(text, kind='info') {
    const statusBox = $('auth-message');
    if (!statusBox) return;
    statusBox.textContent = text || '';
    statusBox.dataset.kind = kind;
    statusBox.hidden = !text;
  }

  function showGate() {
    gate.classList.remove('hidden');
    app.classList.add('hidden');
    footer.classList.add('hidden');
  }

  function showApp() {
    gate.classList.add('hidden');
    app.classList.remove('hidden');
    footer.classList.remove('hidden');
  }

  function renderAuth() {
    if (!gate) return;
    const nameField = authMode === 'signup'
      ? '<label>' + t('name') + '<input id="auth-name" type="text" autocomplete="name" required maxlength="100"></label>'
      : '';
    gate.innerHTML = '<section class="auth-card">' +
      '<p class="eyebrow">FITT0GO MEMBERS</p><h1>' + t('title') + '</h1><p class="auth-intro">' + t('intro') + '</p>' +
      '<div class="auth-tabs"><button type="button" id="mode-login" class="' + (authMode==='login'?'active':'') + '">' + t('login') + '</button><button type="button" id="mode-signup" class="' + (authMode==='signup'?'active':'') + '">' + t('signup') + '</button></div>' +
      '<form id="auth-form">' + nameField +
      '<label>' + t('email') + '<input id="auth-email" type="email" autocomplete="email" required></label>' +
      '<label>' + t('password') + '<div class="password-field"><input id="auth-password" type="password" autocomplete="' + (authMode==='signup'?'new-password':'current-password') + '" minlength="8" required><button type="button" class="password-toggle" id="password-toggle" aria-controls="auth-password" aria-pressed="false">' + t('showPassword') + '</button></div><small>' + t('passwordHint') + '</small></label>' +
      '<button class="primary-button auth-submit" type="submit">' + t(authMode==='login'?'submitLogin':'submitSignup') + '</button></form>' +
      '<button type="button" class="auth-switch" id="auth-switch">' + t(authMode==='login'?'switchSignup':'switchLogin') + '</button>' +
      '<p id="auth-message" class="auth-message" hidden></p></section>';
    $('mode-login').addEventListener('click',()=>{authMode='login';renderAuth();});
    $('mode-signup').addEventListener('click',()=>{authMode='signup';renderAuth();});
    $('auth-switch').addEventListener('click',()=>{authMode=authMode==='login'?'signup':'login';renderAuth();});
    $('auth-form').addEventListener('submit',submitAuth);
    $('password-toggle').addEventListener('click',()=>{
      const field=$('auth-password');
      const visible=field.type==='password';
      field.type=visible?'text':'password';
      $('password-toggle').textContent=t(visible?'hidePassword':'showPassword');
      $('password-toggle').setAttribute('aria-pressed',String(visible));
    });
    if (window.FITTOGO_AUTH_MESSAGE) message(window.FITTOGO_AUTH_MESSAGE);
  }

  async function submitAuth(event) {
    event.preventDefault();
    const email=$('auth-email').value.trim().toLowerCase();
    const password=$('auth-password').value;
    const name=$('auth-name')?.value.trim();
    if(authMode==='signup' && (!name || password.length<8)){message(t('missing'),'error');return;}
    const submit=$('auth-form').querySelector('button[type=submit]');
    submit.disabled=true;
    try {
      if(authMode==='signup') {
        const {data,error}=await supabase.auth.signUp({
          email,password,
          options:{data:{full_name:name},emailRedirectTo:window.location.origin + window.location.pathname}
        });
        if(error) throw error;
        if(data.session) {
          await refreshAccess();
        } else if(data.user && Array.isArray(data.user.identities) && data.user.identities.length===0) {
          authMode='login';
          renderAuth();
          message(t('existingAccount'),'info');
        } else {
          message(t('confirm'),'success');
        }
      } else {
        const {error}=await supabase.auth.signInWithPassword({email,password});
        if(error) throw error;
        await refreshAccess();
      }
    } catch(error) {
      message(authMode==='login'?t('loginError'):t('signupError') + ' ' + (error.message||''),'error');
    } finally {
      if($('auth-form')?.querySelector('button[type=submit]')) $('auth-form').querySelector('button[type=submit]').disabled=false;
    }
  }

  async function refreshAccess() {
    showGate();
    message(t('loading'));
    const {data:{user},error:userError}=await supabase.auth.getUser();
    if(userError || !user){renderAuth();return;}
    const {data:profile,error}=await supabase.from('members')
      .select('user_id,email,full_name,status,created_at')
      .eq('user_id',user.id).single();
    if(error || !profile){renderAuth();message(t('profileError'),'error');return;}
    const {data:isAdmin,error:adminError}=await supabase.rpc('is_admin');
    if(adminError){renderAuth();message(t('profileError'),'error');return;}
    currentProfile={...profile,role:isAdmin?'admin':'user',id:profile.user_id};
    if(profile.status!=='approved') {
      renderAuth();
      const key=profile.status==='pending'?'pending':profile.status==='rejected'?'rejected':'suspended';
      message(t(key),profile.status==='pending'?'info':'error');
      return;
    }
    showApp();
    addSessionBar(user.email,currentProfile.role);
    if(isAdmin) await loadAdminDashboard();
    else $('admin-dashboard')?.remove();
  }

  function addSessionBar(email,role) {
    let bar=$('session-bar');
    if(!bar){bar=document.createElement('div');bar.id='session-bar';bar.className='session-bar';gate.insertAdjacentElement('afterend',bar);}
    bar.innerHTML='<span>' + (role==='admin'?t('admin'):email) + '</span><button type="button" id="session-signout">' + t('signout') + '</button>';
    bar.classList.remove('hidden');
    $('session-signout').addEventListener('click',async()=>{await supabase.auth.signOut();currentProfile=null;bar.classList.add('hidden');showGate();authMode='login';renderAuth();});
  }

  async function loadAdminDashboard() {
    let dashboard=$('admin-dashboard');
    if(!dashboard){dashboard=document.createElement('section');dashboard.id='admin-dashboard';dashboard.className='admin-dashboard';$('app-content').prepend(dashboard);}
    dashboard.innerHTML='<h2>' + t('admin') + '</h2><h3>' + t('requests') + '</h3><p>Loading…</p>';
    const {data,error}=await supabase.rpc('admin_list_members');
    if(error){dashboard.innerHTML='<p class="auth-message" data-kind="error">' + t('err') + '</p>';return;}
    const pending=data.filter(p=>p.status==='pending');
    const others=data.filter(p=>p.status!=='pending');
    dashboard.innerHTML='<h2>' + t('admin') + '</h2><h3>' + t('requests') + ' ('+pending.length+')</h3>' +
      (pending.length?pending.map(p=>memberRow(p)).join(''):'<p>'+t('noRequests')+'</p>') +
      '<h3>'+t('users')+' ('+others.length+')</h3>' + others.map(p=>memberRow(p)).join('');
    dashboard.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>changeStatus(button.dataset.id,button.dataset.action)));
  }

  function memberRow(profile) {
    const action=profile.status==='approved'?'suspend':profile.status==='suspended'?'restore':'approve';
    const label=profile.status==='approved'?t('suspend'):profile.status==='suspended'?t('restore'):t('approve');
    const reject=profile.status==='pending'?'<button type="button" class="admin-action danger" data-action="rejected" data-id="'+profile.user_id+'">'+t('reject')+'</button>':'';
    return '<article class="member-row"><div><b>'+escapeHtml(profile.email)+'</b><small>'+escapeHtml(profile.status)+' · '+escapeHtml(profile.role)+'</small></div><div class="member-actions"><button type="button" class="admin-action" data-action="'+(action==='restore'?'approved':action==='suspend'?'suspended':'approved')+'" data-id="'+profile.user_id+'">'+label+'</button>'+reject+'</div></article>';
  }

  function escapeHtml(value) {
    return String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  async function changeStatus(id,status) {
    const {error}=await supabase.rpc('admin_set_member_status',{target_user_id:id,new_status:status});
    if(error){alert(t('err'));return;}
    await loadAdminDashboard();
    if(currentProfile?.id===id && status!=='approved'){
      await supabase.auth.signOut();
      currentProfile=null;
      showGate();
      renderAuth();
    }
  }

  async function init() {
    showGate();
    if(!window.supabase || !window.FITTOGO_SUPABASE_URL || window.FITTOGO_SUPABASE_URL.includes('YOUR-PROJECT') ||
       !window.FITTOGO_SUPABASE_ANON_KEY || window.FITTOGO_SUPABASE_ANON_KEY.includes('YOUR_SUPABASE')) {
      renderAuth();message(t('config'),'error');return;
    }
    supabase=window.supabase.createClient(window.FITTOGO_SUPABASE_URL,window.FITTOGO_SUPABASE_ANON_KEY,{
      db:{schema:'fittogo'},
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });
    const {data:{session}}=await supabase.auth.getSession();
    if(session) await refreshAccess(); else renderAuth();
    supabase.auth.onAuthStateChange(async(event,session)=>{
      if(event==='SIGNED_OUT'){currentProfile=null;showGate();renderAuth();}
      else if(event==='SIGNED_IN' || event==='TOKEN_REFRESHED'){await refreshAccess();}
    });
  }

  language?.addEventListener('change',()=>{
    if(!currentProfile || currentProfile.status!=='approved'){renderAuth();}
    if(currentProfile?.role==='admin') loadAdminDashboard();
  });
  let initialized=false;
  async function initializeOnce(){if(initialized)return;initialized=true;await init();}
  document.addEventListener('DOMContentLoaded',initializeOnce,{once:true});
  if(document.readyState!=='loading') initializeOnce();
})();
