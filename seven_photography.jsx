
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TRANSLATIONS ─── */
const T = {
  ar: {
    loginSub:"لوحة التحكم — تسجيل الدخول",loginUser:"اسم المستخدم",loginPass:"كلمة المرور",loginBtn:"دخول",
    loginHint:"تجربة: admin / admin123  |  editor / edit123",loginErr:"اسم المستخدم أو كلمة المرور غير صحيحة",
    portfolio:"أعمالنا",bookNav:"الحجز",contact:"تواصل",adminNav:"لوحة التحكم",
    heroSub:"نوثّق لحظاتك الثمينة بعدسة احترافية",heroBadge:"✦ متاح للحجز",
    bookBtn:"احجز موعدك",contactBtn:"تواصل معنا",
    st1:"مناسبة موثّقة",st2:"سنوات خبرة",st3:"رضا العملاء",
    calTitle:"📅 التقويم",contactTitle:"💬 تواصل معنا",
    calHint:"اختر تاريخاً متاحاً للمتابعة",bookNow:"احجز الآن",waBtn:"إرسال عبر واتساب",
    legAv:"متاح",legBk:"محجوز",legSel:"مختار",ghSub:"نماذج من أعمالنا",
    back:"العودة",ftTitle:"تفاصيل الحجز",ftSub:"أدخل بياناتك لتسجيل الحجز المبدئي",
    flName:"الاسم الكامل *",flPhone:"رقم الهاتف *",flTime:"توقيت المناسبة *",
    flVenue:"مكان المناسبة *",flMaps:"رابط Google Maps",flType:"نوع المناسبة",flNotes:"ملاحظات",
    submitBtn:"إرسال طلب الحجز",
    confTitle:"تم استلام طلبك!",confSub:"تم تسجيل حجزك المبدئي. لتأكيد الحجز نهائياً، يرجى إيداع مبلغ العربون.",
    confStatus:"⏳ في انتظار تأكيد الدفع",confBankHdr:"تفاصيل الإيداع البنكي",
    confSumHdr:"ملخص الحجز",confWaBtn:"أرسل إيصال الدفع عبر واتساب",confBack:"العودة للرئيسية",
    adminTitle:"لوحة التحكم",spBook:"حجز",spPend:"معلّق",spPhoto:"صورة",
    tabBook:"الحجوزات",tabGal:"المعرض",tabCal:"التقويم",tabUsers:"المستخدمون",tabSet:"الإعدادات",tabBank:"البنك",tabPkg:"الباقات",
    noBookings:"لا توجد حجوزات بعد",
    galManage:"إدارة معرض الأعمال",addPhoto:"إضافة صورة",editPhoto:"تعديل الصورة",
    epCaption:"العنوان",epCategory:"التصنيف",save:"حفظ",cancel:"إلغاء",delete:"حذف",edit:"تعديل",
    calManage:"إدارة التقويم",blockLbl:"إضافة يوم محجوز",addDate:"إضافة",
    usersManage:"إدارة المستخدمين والصلاحيات",addUserTitle:"إضافة مستخدم جديد",
    ulUser:"اسم المستخدم",ulPass:"كلمة المرور",ulRole:"الدور",ulPerms:"الصلاحيات",addUserBtn:"إضافة المستخدم",
    rolAdmin:"مدير",rolEditor:"محرر",rolViewer:"مشاهد",
    pcBook:"الحجوزات",pcGal:"المعرض",pcCal:"التقويم",pcSet:"الإعدادات",pcBank:"البنك",
    brandTitle:"هوية المنصة",sName:"اسم المنصة",sLogo:"الشعار",sUpload:"رفع شعار",
    sTag:"الوصف",sWa:"رقم واتساب",sLoc:"الموقع",sPh:"الهاتف",sEm:"البريد",sHr:"أوقات العمل",saveSet:"حفظ الإعدادات",
    bankTitle:"تفاصيل الحساب البنكي",bBank:"اسم البنك",bHolder:"اسم صاحب الحساب",
    bIban:"رقم IBAN",bDep:"مبلغ العربون (ريال)",bNote:"ملاحظة للعميل",saveBank:"حفظ بيانات البنك",
    logout:"تسجيل خروج",toSite:"الموقع",
    bkConf:"تأكيد",bkRej:"رفض",bkWa:"واتساب",
    ctLoc:"الموقع",ctPh:"الهاتف",ctEm:"البريد",ctHr:"أوقات العمل",
    bankRow:["البنك","الحساب","IBAN","العربون"],
    sumRow:["الاسم","الهاتف","التاريخ","التوقيت","المكان","النوع","الباقة"],
    noPerm:"⛔ ليس لديك صلاحية الوصول لهذا القسم",
    noBlocked:"لا توجد أيام محجوزة يدوياً",
    eventTypes:["زفاف / أفراح","تخرج","عيد ميلاد","جلسة تصوير","فعالية تجارية","أخرى"],
    categories:["أفراح","تخرج","جلسات","فعاليات","بورتريه","أخرى"],
    months:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    days:["أح","إث","ث","أر","خ","ج","س"],
    viewLocation:"موقع المناسبة",
    userExists:"اسم المستخدم مستخدم مسبقاً",fillAll:"يرجى تعبئة جميع الحقول المطلوبة",
    selectDate:"يرجى اختيار تاريخ أولاً",
    saved:"✅ تم الحفظ",photoAdded:"✅ تمت الإضافة",photoDeleted:"🗑️ تم الحذف",userAdded:"✅ تمت إضافة المستخدم",
    userUpdated:"✅ تم تحديث المستخدم",userDeleted:"🗑️ تم حذف المستخدم",
    catManage:"إدارة التصنيفات",catNew:"تصنيف جديد",catAdd:"إضافة",catEdit:"تعديل التصنيف",catSave:"حفظ",catCancel:"إلغاء",catDelete:"حذف",catAdded:"✅ تمت إضافة التصنيف",catUpdated:"✅ تم تحديث التصنيف",catDeleted:"🗑️ تم حذف التصنيف",catInUse:"⚠️ التصنيف مستخدم في صور، تعديله سيؤثر عليها",catEmpty:"اكتب اسم التصنيف",
    editUser:"تعديل المستخدم",newPass:"كلمة المرور الجديدة (اتركها فارغة للإبقاء على الحالية)",
    pkgTitle:"📦 باقاتنا",pkgSub:"اختر الباقة المناسبة لمناسبتك",pkgPrice:"ريال",pkgManage:"إدارة الباقات",
    pkgName:"اسم الباقة",pkgDesc:"الوصف",pkgPriceLbl:"السعر (ريال)",pkgFeatures:"المميزات (سطر لكل ميزة)",
    pkgAdd:"إضافة باقة",pkgAdded:"✅ تمت إضافة الباقة",pkgUpdated:"✅ تم تحديث الباقة",pkgDeleted:"🗑️ تم حذف الباقة",
    pkgNew:"باقة جديدة",flPackage:"الباقة المطلوبة",pkgNone:"بدون باقة محددة",pkgSelect:"اختر الباقة",
    waContactSub:"للاستفسار والتواصل المباشر معنا",waContactBtn:"تواصل معنا عبر واتساب",
  },
  en: {
    loginSub:"Dashboard — Sign In",loginUser:"Username",loginPass:"Password",loginBtn:"Sign In",
    loginHint:"Try: admin / admin123  |  editor / edit123",loginErr:"Invalid username or password",
    portfolio:"Portfolio",bookNav:"Book",contact:"Contact",adminNav:"Dashboard",
    heroSub:"We document your precious moments with a professional lens",heroBadge:"✦ Available for Booking",
    bookBtn:"Book Your Session",contactBtn:"Contact Us",
    st1:"Events Captured",st2:"Years Experience",st3:"Client Satisfaction",
    calTitle:"📅 Calendar",contactTitle:"💬 Contact Us",
    calHint:"Select an available date to continue",bookNow:"Book Now",waBtn:"Send via WhatsApp",
    legAv:"Available",legBk:"Booked",legSel:"Selected",ghSub:"Samples of Our Work",
    back:"Back",ftTitle:"Booking Details",ftSub:"Fill in your details to register a preliminary booking",
    flName:"Full Name *",flPhone:"Phone Number *",flTime:"Event Time *",
    flVenue:"Event Venue *",flMaps:"Google Maps Link",flType:"Event Type",flNotes:"Notes",
    submitBtn:"Submit Booking",
    confTitle:"Request Received!",confSub:"Your booking has been registered. To confirm, please deposit the advance payment to the bank account below.",
    confStatus:"⏳ Awaiting Payment Confirmation",confBankHdr:"Bank Transfer Details",
    confSumHdr:"Booking Summary",confWaBtn:"Send Payment Receipt via WhatsApp",confBack:"Back to Home",
    adminTitle:"Dashboard",spBook:"Booking",spPend:"Pending",spPhoto:"Photo",
    tabBook:"Bookings",tabGal:"Gallery",tabCal:"Calendar",tabUsers:"Users",tabSet:"Settings",tabBank:"Bank",tabPkg:"Packages",
    noBookings:"No bookings yet",
    galManage:"Manage Gallery",addPhoto:"Add Photo",editPhoto:"Edit Photo",
    epCaption:"Caption",epCategory:"Category",save:"Save",cancel:"Cancel",delete:"Delete",edit:"Edit",
    calManage:"Calendar Management",blockLbl:"Add Blocked Date",addDate:"Add",
    usersManage:"User & Permission Management",addUserTitle:"Add New User",
    ulUser:"Username",ulPass:"Password",ulRole:"Role",ulPerms:"Permissions",addUserBtn:"Add User",
    rolAdmin:"Admin",rolEditor:"Editor",rolViewer:"Viewer",
    pcBook:"Bookings",pcGal:"Gallery",pcCal:"Calendar",pcSet:"Settings",pcBank:"Bank",
    brandTitle:"Brand Identity",sName:"Platform Name",sLogo:"Logo",sUpload:"Upload Logo",
    sTag:"Tagline",sWa:"WhatsApp Number",sLoc:"Location",sPh:"Phone",sEm:"Email",sHr:"Working Hours",saveSet:"Save Settings",
    bankTitle:"Bank Account Details",bBank:"Bank Name",bHolder:"Account Holder",
    bIban:"IBAN",bDep:"Deposit Amount (OMR)",bNote:"Note to Client",saveBank:"Save Bank Details",
    logout:"Sign Out",toSite:"Website",
    bkConf:"Confirm",bkRej:"Reject",bkWa:"WhatsApp",
    ctLoc:"Location",ctPh:"Phone",ctEm:"Email",ctHr:"Hours",
    bankRow:["Bank","Account","IBAN","Deposit"],
    sumRow:["Name","Phone","Date","Time","Venue","Type","Package"],
    noPerm:"⛔ You do not have permission to access this section",
    noBlocked:"No manually blocked dates",
    eventTypes:["Wedding","Graduation","Birthday","Photo Session","Corporate Event","Other"],
    categories:["Weddings","Graduation","Sessions","Events","Portrait","Other"],
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    days:["Su","Mo","Tu","We","Th","Fr","Sa"],
    viewLocation:"View Location",
    userExists:"Username already taken",fillAll:"Please fill in all required fields",
    selectDate:"Please select a date first",
    saved:"✅ Saved",photoAdded:"✅ Photo added",photoDeleted:"🗑️ Photo deleted",userAdded:"✅ User added",
    userUpdated:"✅ User updated",userDeleted:"🗑️ User deleted",
    catManage:"Manage Categories",catNew:"New category",catAdd:"Add",catEdit:"Edit Category",catSave:"Save",catCancel:"Cancel",catDelete:"Delete",catAdded:"✅ Category added",catUpdated:"✅ Category updated",catDeleted:"🗑️ Category deleted",catInUse:"⚠️ Category is used in photos, editing it will affect them",catEmpty:"Enter category name",
    editUser:"Edit User",newPass:"New Password (leave blank to keep current)",
    pkgTitle:"📦 Our Packages",pkgSub:"Choose the right package for your event",pkgPrice:"OMR",pkgManage:"Manage Packages",
    pkgName:"Package Name",pkgDesc:"Description",pkgPriceLbl:"Price (OMR)",pkgFeatures:"Features (one per line)",
    pkgAdd:"Add Package",pkgAdded:"✅ Package added",pkgUpdated:"✅ Package updated",pkgDeleted:"🗑️ Package deleted",
    pkgNew:"New Package",flPackage:"Requested Package",pkgNone:"No specific package",pkgSelect:"Select Package",
    waContactSub:"For inquiries and direct contact with us",waContactBtn:"Contact Us via WhatsApp",
  }
};

const GAL_COLORS = ["#7A5C00","#1D9E75","#D4863A","#A8621E","#A57B00","#C9A020"];

const INIT_CATEGORIES = ["أفراح","تخرج","جلسات","فعاليات","بورتريه","أخرى"];

const INIT_GALLERY = [
  {id:1,src:null,caption:"زفاف عبدالله وريم",caption_en:"Abdullah & Reem Wedding",category:"أفراح",color:GAL_COLORS[0]},
  {id:2,src:null,caption:"حفل تخرج 2025",caption_en:"Graduation 2025",category:"تخرج",color:GAL_COLORS[1]},
  {id:3,src:null,caption:"جلسة بورتريه",caption_en:"Portrait Session",category:"بورتريه",color:GAL_COLORS[2]},
  {id:4,src:null,caption:"فعالية شركة تقنية",caption_en:"Tech Corporate Event",category:"فعاليات",color:GAL_COLORS[3]},
  {id:5,src:null,caption:"زفاف أحمد وسارة",caption_en:"Ahmed & Sara Wedding",category:"أفراح",color:GAL_COLORS[4]},
  {id:6,src:null,caption:"جلسة عائلية",caption_en:"Family Session",category:"جلسات",color:GAL_COLORS[5]},
];

const INIT_USERS = [
  {id:1,username:"admin",password:"admin123",role:"admin",perms:["bookings","gallery","calendar","settings","bank","users"],canDelete:false},
  {id:2,username:"editor",password:"edit123",role:"editor",perms:["bookings","gallery","calendar"],canDelete:true},
];

const INIT_PACKAGES = [
  {id:1,name:"الباقة الأساسية",name_en:"Basic Package",price:"80",desc:"مناسبة لجلسات التصوير الفردية والصغيرة",desc_en:"Suitable for individual and small photo sessions",features:["مصور واحد لمدة ساعتين","50 صورة معدّلة","تسليم خلال 5 أيام"],features_en:["One photographer for 2 hours","50 edited photos","Delivery within 5 days"]},
  {id:2,name:"الباقة الفضية",name_en:"Silver Package",price:"150",desc:"الأنسب للمناسبات المتوسطة كالتخرج وأعياد الميلاد",desc_en:"Best for medium events like graduations and birthdays",features:["مصور واحد لمدة 4 ساعات","120 صورة معدّلة","فيديو قصير (Reel)","تسليم خلال 4 أيام"],features_en:["One photographer for 4 hours","120 edited photos","Short video (Reel)","Delivery within 4 days"]},
  {id:3,name:"الباقة الذهبية",name_en:"Gold Package",price:"280",desc:"التغطية الكاملة لحفلات الزفاف والمناسبات الكبرى",desc_en:"Full coverage for weddings and major events",features:["مصوّران لمدة يوم كامل","300+ صورة معدّلة","فيديو سينمائي قصير","ألبوم صور مطبوع","تسليم خلال 7 أيام"],features_en:["Two photographers for a full day","300+ edited photos","Short cinematic video","Printed photo album","Delivery within 7 days"]},
];

function pad(n){return String(n).padStart(2,"0")}
function dk(y,m,d){return`${y}-${pad(m+1)}-${pad(d)}`}

/* ─── TOAST ─── */
function Toast({msg,show}){
  return(
    <div style={{
      position:"fixed",bottom:18,left:"50%",transform:`translateX(-50%) translateY(${show?0:20}px)`,
      background:"var(--bg2)",border:"1px solid var(--t)",color:"var(--tx)",
      padding:"9px 20px",borderRadius:8,fontSize:".82rem",zIndex:9999,
      opacity:show?1:0,transition:"all .3s",pointerEvents:"none",
      fontFamily:"inherit",whiteSpace:"nowrap",boxShadow:"var(--sh)",
      display:"flex",alignItems:"center",gap:7
    }}>{msg}</div>
  );
}

/* ─── WAICON ─── */
function WaIcon(){
  return(
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.847L.057 24l6.304-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.368l-.36-.213-3.73.979 1.001-3.648-.233-.374A9.818 9.818 0 1112 21.818z"/>
    </svg>
  );
}

/* ─── CALENDAR ─── */
function Calendar({lang, selectedDate, setSelectedDate, blockedDates, bookings}){
  const [calDate, setCalDate] = useState(new Date(2026,5,1));
  const tr = T[lang];
  const y = calDate.getFullYear(), m = calDate.getMonth();
  const first = new Date(y,m,1).getDay();
  const days = new Date(y,m+1,0).getDate();
  const today = new Date();
  const todayK = dk(today.getFullYear(),today.getMonth(),today.getDate());

  const cells = [];
  for(let i=0;i<first;i++) cells.push(<div key={"e"+i}/>);
  for(let d=1;d<=days;d++){
    const k = dk(y,m,d);
    const isPast = new Date(y,m,d) < new Date(today.getFullYear(),today.getMonth(),today.getDate());
    const isBkd = blockedDates.has(k) || bookings.some(b=>b.date===k&&b.status!=="rejected");
    const isSel = selectedDate===k;
    const isToday = k===todayK;
    let cls = "cal-d";
    if(isBkd) cls+=" bkd";
    else if(isPast) cls+=" past";
    else{ cls+=" avail"; if(isSel) cls+=" sel"; if(isToday) cls+=" today"; }
    cells.push(
      <div key={k} className={cls}
        onClick={!isBkd&&!isPast?()=>setSelectedDate(isSel?null:k):undefined}>
        {d}
      </div>
    );
  }

  return(
    <div className="card" style={{marginBottom:"1rem"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem"}}>
        <div style={{fontWeight:700,fontSize:".9rem",color:"var(--tx)"}}>{tr.months[m]} {y}</div>
        <div style={{display:"flex",gap:5}}>
          <button className="icon-btn" onClick={()=>setCalDate(new Date(y,m-1,1))}>
            {lang==="ar"?"›":"‹"}
          </button>
          <button className="icon-btn" onClick={()=>setCalDate(new Date(y,m+1,1))}>
            {lang==="ar"?"‹":"›"}
          </button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
        {tr.days.map(d=><div key={d} style={{textAlign:"center",fontSize:".65rem",color:"var(--txm)",padding:"3px 0",fontWeight:700}}>{d}</div>)}
        {cells}
      </div>
      <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
        {[[tr.legAv,"var(--bg3)","1px solid var(--t)"],[tr.legBk,"rgba(185,28,28,.3)","1px solid rgba(220,38,38,.6)"],[tr.legSel,"var(--t)","none"]].map(([lbl,bg,brd])=>(
          <div key={lbl} style={{display:"flex",alignItems:"center",gap:4,fontSize:".68rem",color:"var(--txm)"}}>
            <div style={{width:8,height:8,borderRadius:2,background:bg,border:brd,flexShrink:0}}/>
            {lbl}
          </div>
        ))}
      </div>
      {selectedDate&&(
        <div style={{marginTop:8,padding:"6px 10px",background:"var(--tp)",border:"1px solid var(--tpb)",borderRadius:6,fontSize:".78rem",color:"var(--txm)"}}>
          ✅ {parseInt(selectedDate.split("-")[2])} {tr.months[parseInt(selectedDate.split("-")[1])-1]} {selectedDate.split("-")[0]}
        </div>
      )}
    </div>
  );
}

/* ─── SLIDESHOW ─── */
function Slideshow({photos, lang}){
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const n = photos.length;

  const go = useCallback((i)=>{
    setIdx(((i%n)+n)%n);
    clearInterval(timerRef.current);
    if(n>1) timerRef.current = setInterval(()=>setIdx(p=>((p+1)%n)),4200);
  },[n]);

  useEffect(()=>{
    if(n>1) timerRef.current = setInterval(()=>setIdx(p=>((p+1)%n)),4200);
    return()=>clearInterval(timerRef.current);
  },[n]);

  if(!n) return(
    <div style={{height:240,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg3)",flexDirection:"column",gap:8,color:"var(--txm)",fontSize:".85rem"}}>
      <span style={{fontSize:"2rem"}}>📷</span>{T[lang].addPhoto}
    </div>
  );

  const p = photos[idx];
  return(
    <div style={{position:"relative"}}>
      <div style={{height:260,overflow:"hidden",position:"relative"}}>
        {p.src
          ? <img src={p.src} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} alt={p.caption}/>
          : <div style={{width:"100%",height:"100%",background:p.color+"1A",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
              <div style={{width:70,height:70,borderRadius:12,background:p.color+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem"}}>📸</div>
              <div style={{fontSize:".9rem",fontWeight:600,color:"var(--tx)"}}>{lang==="ar"?p.caption:p.caption_en||p.caption}</div>
              <div style={{fontSize:".72rem",color:"var(--txm)"}}>{p.category}</div>
            </div>
        }
        <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(7,15,14,.8) 0%,transparent 55%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:".75rem 1.1rem"}}>
          <div style={{fontSize:".88rem",fontWeight:600,color:"#fff",marginBottom:3}}>{lang==="ar"?p.caption:p.caption_en||p.caption}</div>
          <span style={{display:"inline-flex",alignItems:"center",background:"rgba(165,123,0,.35)",border:"1px solid rgba(201,160,32,.3)",borderRadius:20,padding:"2px 9px",fontSize:".66rem",color:"#C9A020"}}>{p.category}</span>
        </div>
        <button className="slide-nav" style={{[lang==="ar"?"right":"left"]:10}} onClick={()=>go(idx+(lang==="ar"?-1:1))}>‹</button>
        <button className="slide-nav" style={{[lang==="ar"?"left":"right"]:10}} onClick={()=>go(idx+(lang==="ar"?1:-1))}>›</button>
        <div style={{position:"absolute",top:10,background:"rgba(0,0,0,.4)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"3px 10px",fontSize:".68rem",color:"#fff",[lang==="ar"?"left":"right"]:10}}>
          {idx+1} / {n}
        </div>
      </div>
      {/* Thumbs */}
      <div style={{display:"flex",gap:6,padding:".55rem 1.1rem",overflowX:"auto",background:"var(--bg3)",scrollbarWidth:"none"}}>
        {photos.map((ph,i)=>(
          <div key={ph.id} onClick={()=>go(i)} style={{width:52,height:38,borderRadius:5,overflow:"hidden",cursor:"pointer",border:`2px solid ${i===idx?"var(--t)":"transparent"}`,flexShrink:0,background:"var(--bg4)",transition:"border-color .2s"}}>
            {ph.src?<img src={ph.src} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
              :<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem",background:ph.color+"22",opacity:.7}}>📸</div>}
          </div>
        ))}
      </div>
      {/* Dots */}
      <div style={{display:"flex",justifyContent:"center",gap:5,padding:".5rem 0 .75rem",background:"var(--bg2)"}}>
        {photos.map((_,i)=>(
          <button key={i} onClick={()=>go(i)} style={{width:i===idx?18:6,height:6,borderRadius:i===idx?3:50,background:i===idx?"var(--t)":"var(--bd)",border:"none",cursor:"pointer",padding:0,transition:"all .3s"}}/>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("ar");
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [toast, setToast] = useState({msg:"",show:false});
  const [adminTab, setAdminTab] = useState("bookings");
  const [loginErr, setLoginErr] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [sett, setSett] = useState({name:"Seven Photography",tagline:"نوثّق لحظاتك الثمينة بعدسة احترافية",wa:"96891234567",location:"مسقط، عُمان",phone:"+968 9X XXX XXXX",email:"info@seven.om",hours:"٩ص - ٩م",logoSrc:null});
  const [bankSett, setBankSett] = useState({bank:"بنك مسقط",holder:"Seven Photography",iban:"OM55 0001 0001 2345 6789 01",deposit:"50",note:"يرجى ذكر اسمك عند الإيداع، ثم إرسال الإيصال عبر واتساب."});
  const [gallery, setGallery] = useState(INIT_GALLERY);
  const [users, setUsers] = useState(INIT_USERS);
  const [bookings, setBookings] = useState([]);
  const [blockedDates, setBlockedDates] = useState(new Set(["2026-07-05","2026-07-12","2026-07-18","2026-07-25","2026-08-02"]));
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [categories, setCategories] = useState(INIT_CATEGORIES);
  const [editCatIdx, setEditCatIdx] = useState(null);
  const [editCatVal, setEditCatVal] = useState("");
  const [newCatVal, setNewCatVal] = useState("");
  // Packages
  const [packages, setPackages] = useState(INIT_PACKAGES);
  const [editPkgId, setEditPkgId] = useState(null);
  const [pkgForm, setPkgForm] = useState({name:"",name_en:"",price:"",desc:"",desc_en:"",features:"",features_en:""});
  const [showAddPkg, setShowAddPkg] = useState(false);
  // User editing
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({username:"",password:"",role:"editor",perms:{bookings:true,gallery:true,calendar:true,settings:false,bank:false}});

  // Booking form
  const [fName,setFName]=useState(""); const [fPhone,setFPhone]=useState(""); const [fTime,setFTime]=useState("");
  const [fVenue,setFVenue]=useState(""); const [fMaps,setFMaps]=useState(""); const [fType,setFType]=useState(""); const [fNotes,setFNotes]=useState(""); const [fPackage,setFPackage]=useState("");

  // Admin form
  const [blockDate,setBlockDate]=useState("");
  const [newUsername,setNewUsername]=useState(""); const [newPassword,setNewPassword]=useState(""); const [newRole,setNewRole]=useState("editor");
  const [newPerms,setNewPerms]=useState({bookings:true,gallery:true,calendar:true,settings:false,bank:false});

  // Edit photo
  const [epCaption,setEpCaption]=useState(""); const [epCategory,setEpCategory]=useState("");

  // Settings local state
  const [sName,setSName]=useState(sett.name); const [sTagline,setSTagline]=useState(sett.tagline);
  const [sWa,setSWa]=useState(sett.wa); const [sLoc,setSLoc]=useState(sett.location);
  const [sPh,setSpH]=useState(sett.phone); const [sEm,setSEm]=useState(sett.email);
  const [sHr,setSHr]=useState(sett.hours);
  const [bBank,setBBank]=useState(bankSett.bank); const [bHolder,setBHolder]=useState(bankSett.holder);
  const [bIban,setBIban]=useState(bankSett.iban); const [bDep,setBDep]=useState(bankSett.deposit);
  const [bNote,setBNote]=useState(bankSett.note);

  const toastRef = useRef(null);
  const showToast = useCallback((msg)=>{
    setToast({msg,show:true});
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(()=>setToast(p=>({...p,show:false})),2400);
  },[]);

  const tr = T[lang];
  const dir = lang==="ar"?"rtl":"ltr";

  const hasP = (perm) => currentUser && (currentUser.role==="admin" || currentUser.perms.includes(perm));

  // CSS variables via style tag
  const cssVars = theme==="dark"
    ? `--bg:#0E0B00;--bg2:#181200;--bg3:#1F1800;--bg4:#272000;--tx:#F5EDD8;--txm:#A89050;--txd:#4A3A10;--bd:#2A2000;--bdl:#352A00;--inp:#181200;--sh:0 4px 24px rgba(0,0,0,.4);--shsm:0 2px 8px rgba(0,0,0,.3);`
    : `--bg:#FAF7F0;--bg2:#FFFFFF;--bg3:#F5F0E6;--bg4:#EDE4CC;--tx:#1A1200;--txm:#6B5A2A;--txd:#C8B97A;--bd:#D4C08A;--bdl:#E0D09A;--inp:#FFFFFF;--sh:0 4px 24px rgba(165,123,0,.08);--shsm:0 2px 8px rgba(165,123,0,.06);`;

  const doLogin = () => {
    const found = users.find(u=>u.username===loginUser&&u.password===loginPass);
    if(!found){setLoginErr(true);return;}
    setLoginErr(false);setCurrentUser(found);setPage("admin");
  };

  const nav = (pg) => {setPage(pg);window.scrollTo(0,0);};

  const submitBooking = () => {
    if(!fName||!fPhone||!fTime||!fVenue){showToast("⚠️ "+tr.fillAll);return;}
    const b = {id:Date.now(),name:fName,phone:fPhone,time:fTime,venue:fVenue,maps:fMaps,type:fType,notes:fNotes,date:selectedDate,status:"pending",pkg:fPackage};
    setBookings(p=>[...p,b]);setCurrentBooking(b);
    setFName("");setFPhone("");setFTime("");setFVenue("");setFMaps("");setFType("");setFNotes("");setFPackage("");
    nav("confirm");
  };

  const confirmBk = (id)=>setBookings(p=>p.map(b=>b.id===id?{...b,status:"confirmed"}:b));
  const rejectBk = (id)=>setBookings(p=>p.map(b=>b.id===id?{...b,status:"rejected"}:b));

  const formatDate = (dateStr) => {
    if(!dateStr) return "";
    const [y,m,d] = dateStr.split("-");
    return `${parseInt(d)} ${tr.months[parseInt(m)-1]} ${y}`;
  };

  const sendWAAdmin = (b) => {
    const statusMsg = b.status==="confirmed"?`✅ تم *تأكيد* حجزك`:`⏳ حجزك قيد المراجعة`;
    const msg = `مرحباً ${b.name}،\n\n${statusMsg}\n📅 ${formatDate(b.date)}\n🕐 ${b.time}\n📍 ${b.venue}\n${b.type?"🎉 "+b.type+"\n":""}${b.pkg?"📦 "+b.pkg+"\n":""}${b.maps?"🗺️ "+b.maps+"\n":""}\nشكراً 🌟\n— ${sett.name}`;
    window.open(`https://wa.me/${b.phone.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const sendConfirmWA = () => {
    if(!currentBooking) return;
    const b = currentBooking;
    const msg = `مرحباً، أودّ تأكيد حجزي لدى ${sett.name}:\n\n👤 ${b.name}\n📞 ${b.phone}\n📅 ${formatDate(b.date)}\n🕐 ${b.time}\n📍 ${b.venue}\n${b.pkg?"📦 "+b.pkg+"\n":""}${b.maps?"🗺️ "+b.maps+"\n":""}\n💰 سأرسل إيصال العربون قريباً.`;
    window.open(`https://wa.me/${sett.wa}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const sendContactWA = () => {
    window.open(`https://wa.me/${sett.wa}`,"_blank");
  };

  const saveSettings = () => {
    setSett({name:sName||sett.name,tagline:sTagline,wa:sWa||sett.wa,location:sLoc,phone:sPh,email:sEm,hours:sHr,logoSrc:sett.logoSrc});
    showToast(tr.saved);
  };
  const saveBankSettings = () => {
    setBankSett({bank:bBank,holder:bHolder,iban:bIban,deposit:bDep,note:bNote});
    showToast(tr.saved);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0]; if(!file) return;
    const r = new FileReader(); r.onload=ev=>setSett(p=>({...p,logoSrc:ev.target.result})); r.readAsDataURL(file);
  };
  const handlePhotoUpload = (e) => {
    [...e.target.files].forEach(file=>{
      const r = new FileReader(); r.onload=ev=>{
        setGallery(p=>[...p,{id:Date.now()+Math.random(),src:ev.target.result,caption:file.name.replace(/\.[^.]+$/,""),caption_en:file.name.replace(/\.[^.]+$/,""),category:categories[categories.length-1]||"أخرى",color:GAL_COLORS[p.length%GAL_COLORS.length]}]);
        showToast(tr.photoAdded);
      }; r.readAsDataURL(file);
    }); e.target.value="";
  };

  const startEditPhoto = (p) => {setEditPhotoId(p.id);setEpCaption(p.caption);setEpCategory(categories.includes(p.category)?p.category:(categories[0]||p.category));};
  const savePhotoEdit = () => {
    setGallery(p=>p.map(ph=>ph.id===editPhotoId?{...ph,caption:epCaption||ph.caption,category:epCategory}:ph));
    setEditPhotoId(null);showToast(tr.saved);
  };

  const addUser = () => {
    if(!newUsername||!newPassword){showToast("⚠️ "+tr.fillAll);return;}
    if(users.find(u=>u.username===newUsername)){showToast("⚠️ "+tr.userExists);return;}
    const perms = Object.entries(newPerms).filter(([,v])=>v).map(([k])=>k);
    setUsers(p=>[...p,{id:Date.now(),username:newUsername,password:newPassword,role:newRole,perms,canDelete:true}]);
    setNewUsername("");setNewPassword("");showToast(tr.userAdded);
  };

  // ── Category handlers ──
  const addCategory = () => {
    const v = newCatVal.trim();
    if(!v){showToast("⚠️ "+tr.catEmpty);return;}
    if(categories.includes(v)){showToast("⚠️");return;}
    setCategories(p=>[...p,v]);setNewCatVal("");showToast(tr.catAdded);
  };
  const startEditCat = (idx) => {setEditCatIdx(idx);setEditCatVal(categories[idx]);};
  const saveEditCat = () => {
    const v = editCatVal.trim();
    if(!v){showToast("⚠️ "+tr.catEmpty);return;}
    const oldName = categories[editCatIdx];
    setCategories(p=>p.map((c,i)=>i===editCatIdx?v:c));
    setGallery(p=>p.map(ph=>ph.category===oldName?{...ph,category:v}:ph));
    setEditCatIdx(null);setEditCatVal("");showToast(tr.catUpdated);
  };
  const deleteCategory = (idx) => {
    setCategories(p=>p.filter((_,i)=>i!==idx));showToast(tr.catDeleted);
  };

  // ── Package handlers ──
  const openAddPkg = () => {
    setPkgForm({name:"",name_en:"",price:"",desc:"",desc_en:"",features:"",features_en:""});
    setEditPkgId(null);setShowAddPkg(true);
  };
  const openEditPkg = (pkg) => {
    setPkgForm({name:pkg.name,name_en:pkg.name_en||"",price:pkg.price,desc:pkg.desc,desc_en:pkg.desc_en||"",features:(pkg.features||[]).join("\n"),features_en:(pkg.features_en||[]).join("\n")});
    setEditPkgId(pkg.id);setShowAddPkg(true);
  };
  const savePkg = () => {
    if(!pkgForm.name||!pkgForm.price){showToast("⚠️ "+tr.fillAll);return;}
    const featuresArr = pkgForm.features.split("\n").map(s=>s.trim()).filter(Boolean);
    const featuresEnArr = pkgForm.features_en.split("\n").map(s=>s.trim()).filter(Boolean);
    if(editPkgId){
      setPackages(p=>p.map(pk=>pk.id===editPkgId?{...pk,name:pkgForm.name,name_en:pkgForm.name_en,price:pkgForm.price,desc:pkgForm.desc,desc_en:pkgForm.desc_en,features:featuresArr,features_en:featuresEnArr}:pk));
      showToast(tr.pkgUpdated);
    }else{
      setPackages(p=>[...p,{id:Date.now(),name:pkgForm.name,name_en:pkgForm.name_en,price:pkgForm.price,desc:pkgForm.desc,desc_en:pkgForm.desc_en,features:featuresArr,features_en:featuresEnArr}]);
      showToast(tr.pkgAdded);
    }
    setShowAddPkg(false);setEditPkgId(null);
  };
  const deletePkg = (id) => {
    setPackages(p=>p.filter(pk=>pk.id!==id));showToast(tr.pkgDeleted);
  };

  // ── User editing handlers ──
  const startEditUser = (u) => {
    setEditUserId(u.id);
    const permsObj = {bookings:false,gallery:false,calendar:false,settings:false,bank:false};
    u.perms.forEach(p=>{if(p in permsObj) permsObj[p]=true;});
    setEditUserData({username:u.username,password:"",role:u.role,perms:permsObj});
  };
  const saveEditUser = () => {
    const d = editUserData;
    if(!d.username){showToast("⚠️ "+tr.fillAll);return;}
    const conflict = users.find(u=>u.username===d.username&&u.id!==editUserId);
    if(conflict){showToast("⚠️ "+tr.userExists);return;}
    const perms = Object.entries(d.perms).filter(([,v])=>v).map(([k])=>k);
    setUsers(p=>p.map(u=>{
      if(u.id!==editUserId) return u;
      const updated = {...u,username:d.username,role:d.role,perms};
      if(d.password) updated.password = d.password;
      return updated;
    }));
    setCurrentUser(prev=>{
      if(!prev||prev.id!==editUserId) return prev;
      const updated = {...prev,username:d.username,role:d.role,perms};
      if(d.password) updated.password = d.password;
      return updated;
    });
    setEditUserId(null);showToast(tr.userUpdated);
  };

  const switchTab = (tab) => {
    const permMap = {settings:"settings",bank:"bank",users:"users"};
    if(permMap[tab]&&!hasP(permMap[tab])){showToast(tr.noPerm);return;}
    setAdminTab(tab);
  };

  const roleBadgeStyle = (role) => {
    const styles = {admin:{background:"var(--tp)",border:"1px solid var(--tpb)",color:"var(--tl)"},editor:{background:"var(--amp)",border:"1px solid rgba(217,119,6,.3)",color:"#F59E0B"},viewer:{background:"var(--bg3)",border:"1px solid var(--bd)",color:"var(--txm)"}};
    return {display:"inline-flex",padding:"2px 8px",borderRadius:20,fontSize:".65rem",fontWeight:700,...styles[role]};
  };

  // ─── NAV COMPONENT ───
  const Nav = ({showAdmin=true}) => (
    <nav style={{background:"var(--bg2)",borderBottom:"1px solid var(--bd)",padding:"0 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:54,position:"sticky",top:0,zIndex:200,boxShadow:"var(--shsm)",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>nav("home")}>
        <div style={{width:30,height:30,borderRadius:7,overflow:"hidden",background:"var(--t)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,border:"1px solid var(--tl)",flexShrink:0}}>
          {sett.logoSrc?<img src={sett.logoSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="logo"/>:"📷"}
        </div>
        <span style={{fontSize:".9rem",fontWeight:800,color:"var(--t)",letterSpacing:.3}}>{sett.name}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {/* Theme */}
        <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
          {[["dark","🌙"],["light","☀️"]].map(([th,ic])=>(
            <button key={th} onClick={()=>setTheme(th)} style={{width:26,height:22,borderRadius:17,border:"none",cursor:"pointer",background:theme===th?"var(--t)":"transparent",color:theme===th?"#fff":"var(--txm)",fontSize:".72rem",transition:"all .2s",fontFamily:"inherit"}}>{ic}</button>
          ))}
        </div>
        {/* Lang */}
        <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
          {[["ar","ع"],["en","EN"]].map(([l,lbl])=>(
            <button key={l} onClick={()=>setLang(l)} style={{fontSize:".72rem",fontWeight:700,padding:"3px 9px",borderRadius:17,cursor:"pointer",border:"none",background:lang===l?"var(--t)":"transparent",color:lang===l?"#fff":"var(--txm)",transition:"all .2s",fontFamily:"inherit"}}>{lbl}</button>
          ))}
        </div>
        {showAdmin&&(
          <button onClick={()=>{if(currentUser){nav("admin");}else{setPage("login");}}} style={{background:"var(--t)",color:"#fff",border:"none",padding:"5px 12px",borderRadius:7,cursor:"pointer",fontSize:".78rem",fontWeight:700,fontFamily:"inherit",transition:"all .2s",display:"flex",alignItems:"center",gap:4}}>⚙️ {tr.adminNav}</button>
        )}
      </div>
    </nav>
  );

  // ─── RENDER ───
  return (
    <div style={{["--t"]:"#A57B00",["--td"]:"#7A5C00",["--tl"]:"#C9A020",["--tp"]:"rgba(165,123,0,.12)",["--tpb"]:"rgba(165,123,0,.28)",["--am"]:"#D97706",["--aml"]:"#F59E0B",["--amp"]:"rgba(217,119,6,.12)",cssText:cssVars,background:"var(--bg)",color:"var(--tx)",fontFamily:"'Tajawal',sans-serif",direction:dir,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--t:#A57B00;--td:#7A5C00;--tl:#C9A020;--tp:rgba(165,123,0,.12);--tpb:rgba(165,123,0,.28);--am:#D97706;--aml:#F59E0B;--amp:rgba(217,119,6,.12);${cssVars}}
        body{background:var(--bg);color:var(--tx)}
        input,select,textarea{background:var(--inp)!important;border:1px solid var(--bd)!important;border-radius:7px;padding:9px 11px;color:var(--tx)!important;font-family:inherit;font-size:.85rem;outline:none;width:100%;transition:all .2s}
        input:focus,select:focus,textarea:focus{border-color:var(--t)!important;box-shadow:0 0 0 3px var(--tp)}
        .card{background:var(--bg2);border:1px solid var(--bd);border-radius:12px;padding:1.1rem;box-shadow:var(--shsm)}
        .btn-prim{background:var(--t);color:#fff;border:none;padding:10px 20px;border-radius:8px;font-family:inherit;font-weight:700;font-size:.88rem;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
        .btn-prim:hover{background:var(--tl);transform:translateY(-1px)}
        .btn-sec{background:var(--bg2);color:var(--t);border:1px solid var(--t);padding:10px 20px;border-radius:8px;font-family:inherit;font-weight:600;font-size:.88rem;cursor:pointer;transition:all .2s}
        .btn-sec:hover{background:var(--tp)}
        .btn-ghost{background:var(--bg3);border:1px solid var(--bd);color:var(--txm);padding:5px 12px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:.8rem;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:5px}
        .btn-ghost:hover{border-color:var(--t);color:var(--t);background:var(--tp)}
        .icon-btn{background:var(--bg3);border:1px solid var(--bd);color:var(--t);width:28px;height:28px;border-radius:6px;cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
        .icon-btn:hover{background:var(--tp);border-color:var(--t)}
        .tab-btn{padding:7px 12px;font-family:inherit;font-size:.8rem;background:none;border:none;color:var(--txm);cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;font-weight:600}
        .tab-btn.active{color:var(--t);border-bottom-color:var(--t)}
        .cal-d{text-align:center;padding:5px 2px;border-radius:5px;font-size:.76rem;border:1px solid transparent;min-height:27px;display:flex;align-items:center;justify-content:center;font-weight:500;transition:all .15s}
        .cal-d.avail{color:var(--tx);background:var(--bg3);cursor:pointer}
        .cal-d.avail:hover{border-color:var(--t);color:var(--t);background:var(--tp)}
        .cal-d.avail.sel{background:var(--t);color:#fff;border-color:var(--tl);font-weight:700}
        .cal-d.bkd{background:rgba(153,27,27,.35);color:#FCA5A5;cursor:not-allowed;border-color:rgba(239,68,68,.6);font-weight:700;text-decoration:line-through;text-decoration-color:rgba(239,68,68,.5)}
        .cal-d.past{color:var(--txd);cursor:not-allowed}
        .cal-d.today{border-color:var(--tl)}
        .slide-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(165,123,0,.2);border:1px solid rgba(165,123,0,.4);color:#C9A020;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:5;backdrop-filter:blur(4px)}
        .slide-nav:hover{background:rgba(165,123,0,.45)}
        .badge{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:.66rem;font-weight:700}
        .badge.pending{background:var(--amp);color:var(--aml);border:1px solid rgba(217,119,6,.35)}
        .badge.confirmed{background:var(--tp);color:var(--tl);border:1px solid var(--tpb)}
        .badge.rejected{background:rgba(239,68,68,.12);color:#EF4444;border:1px solid rgba(239,68,68,.25)}
        .act-btn{padding:5px 11px;border-radius:6px;font-family:inherit;font-size:.74rem;font-weight:700;cursor:pointer;transition:all .2s}
        .act-conf{background:var(--t);color:#fff;border:1px solid var(--t)}
        .act-conf:hover{background:var(--tl)}
        .act-rej{background:rgba(239,68,68,.12);color:#EF4444;border:1px solid rgba(239,68,68,.25)}
        .act-rej:hover{background:rgba(239,68,68,.2)}
        .act-wa{background:rgba(37,211,102,.1);color:#25D366;border:1px solid rgba(37,211,102,.3)}
        .act-wa:hover{background:rgba(37,211,102,.2)}
        .danger-btn{background:rgba(239,68,68,.12);color:#EF4444;border:1px solid rgba(239,68,68,.25);padding:6px 12px;border-radius:6px;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer;transition:all .2s}
        .danger-btn:hover{background:rgba(239,68,68,.2)}
        .wa-btn{background:#25D366;color:#fff;border:1px solid #1ebe5c;padding:10px;border-radius:7px;font-family:inherit;font-weight:700;font-size:.88rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .2s;width:100%}
        .wa-btn:hover{background:#1ebe5c}
        .save-btn{background:var(--t);color:#fff;border:1px solid var(--tl);padding:7px 18px;border-radius:6px;font-family:inherit;font-weight:700;font-size:.8rem;cursor:pointer;transition:all .2s}
        .save-btn:hover{background:var(--tl)}
        .perm-chip{font-size:.64rem;padding:1px 7px;border-radius:20px;background:var(--bg3);border:1px solid var(--bd);color:var(--txm)}
        .perm-chip.on{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3);color:#10B981}
        .gi-btn{background:none;border:1px solid var(--bd);color:var(--txm);border-radius:4px;padding:2px 7px;font-size:.67rem;cursor:pointer;font-family:inherit;font-weight:600;transition:all .2s}
        .gi-btn.edit:hover{border-color:var(--t);color:var(--t);background:var(--tp)}
        .gi-btn.del:hover{border-color:#EF4444;color:#EF4444;background:rgba(239,68,68,.1)}
        @media(max-width:500px){.f-row,.g2,.ci-grid{grid-template-columns:1fr!important}}
      `}</style>

      <Toast msg={toast.msg} show={toast.show}/>

      {/* ── LOGIN ── */}
      {page==="login"&&(
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:"2rem 1rem",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:380,height:380,borderRadius:"50%",border:"1px solid var(--tpb)",top:-100,right:-100,pointerEvents:"none"}}/>
          <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",border:"1px solid var(--amp)",bottom:-130,left:-130,pointerEvents:"none"}}/>
          <div style={{background:"var(--bg2)",border:"1px solid var(--bd)",borderRadius:16,padding:"2rem 1.75rem",width:"100%",maxWidth:360,boxShadow:"var(--sh)",position:"relative",zIndex:1}}>
            {/* Back to site */}
            <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"var(--txm)",cursor:"pointer",fontSize:".78rem",display:"flex",alignItems:"center",gap:4,fontFamily:"inherit",marginBottom:"1rem",padding:0,transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="var(--t)"} onMouseLeave={e=>e.currentTarget.style.color="var(--txm)"}>
              ← {lang==="ar"?"العودة للموقع":"Back to Site"}
            </button>
            {/* Logo */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"1.5rem",gap:6}}>
              <div style={{width:56,height:56,borderRadius:13,background:"linear-gradient(135deg,var(--td),var(--t))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",boxShadow:"0 8px 24px var(--tpb)",overflow:"hidden"}}>
                {sett.logoSrc?<img src={sett.logoSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="logo"/>:"📷"}
              </div>
              <div style={{fontSize:"1.1rem",fontWeight:800,color:"var(--tx)"}}>{sett.name}</div>
              <div style={{fontSize:".76rem",color:"var(--txm)"}}>{tr.loginSub}</div>
            </div>
            <div style={{height:1,background:"var(--bd)",margin:"1.1rem 0"}}/>
            {loginErr&&(
              <div style={{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",borderRadius:8,padding:"8px 12px",fontSize:".78rem",color:"#EF4444",marginBottom:".75rem"}}>
                ❌ {tr.loginErr}
              </div>
            )}
            <div style={{marginBottom:".75rem"}}>
              <label style={{fontSize:".76rem",color:"var(--txm)",marginBottom:4,display:"block",fontWeight:600}}>{tr.loginUser}</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",fontSize:".85rem",color:"var(--txm)",[dir==="rtl"?"right":"left"]:10,pointerEvents:"none"}}>👤</span>
                <input value={loginUser} onChange={e=>{setLoginUser(e.target.value);setLoginErr(false);}} placeholder="admin" style={{[dir==="rtl"?"paddingRight":"paddingLeft"]:"32px"}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
              </div>
            </div>
            <div style={{marginBottom:"1rem"}}>
              <label style={{fontSize:".76rem",color:"var(--txm)",marginBottom:4,display:"block",fontWeight:600}}>{tr.loginPass}</label>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",fontSize:".85rem",color:"var(--txm)",[dir==="rtl"?"right":"left"]:10,pointerEvents:"none"}}>🔒</span>
                <input type="password" value={loginPass} onChange={e=>{setLoginPass(e.target.value);setLoginErr(false);}} placeholder="••••••••" style={{[dir==="rtl"?"paddingRight":"paddingLeft"]:"32px"}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
              </div>
            </div>
            <button className="btn-prim" style={{width:"100%",justifyContent:"center",padding:11}} onClick={doLogin}>{tr.loginBtn} →</button>
            <div style={{marginTop:"1rem",padding:".6rem",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:8,fontSize:".72rem",color:"var(--txm)",textAlign:"center"}}>{tr.loginHint}</div>
            <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:".85rem"}}>
              <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
                {[["dark","🌙"],["light","☀️"]].map(([th,ic])=>(
                  <button key={th} onClick={()=>setTheme(th)} style={{width:26,height:22,borderRadius:17,border:"none",cursor:"pointer",background:theme===th?"var(--t)":"transparent",color:theme===th?"#fff":"var(--txm)",fontSize:".72rem",fontFamily:"inherit"}}>{ic}</button>
                ))}
              </div>
              <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
                {[["ar","ع"],["en","EN"]].map(([l,lbl])=>(
                  <button key={l} onClick={()=>setLang(l)} style={{fontSize:".72rem",fontWeight:700,padding:"3px 9px",borderRadius:17,cursor:"pointer",border:"none",background:lang===l?"var(--t)":"transparent",color:lang===l?"#fff":"var(--txm)",fontFamily:"inherit"}}>{lbl}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HOME ── */}
      {page==="home"&&(
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          <Nav/>
          {/* Gallery */}
          <div style={{background:"var(--bg2)",borderBottom:"1px solid var(--bd)"}}>
            <div style={{padding:"1.1rem 1.25rem .55rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:".62rem",fontWeight:700,color:"var(--t)",letterSpacing:3,textTransform:"uppercase",marginBottom:3}}>Portfolio</div>
                <div style={{fontSize:".74rem",color:"var(--txm)"}}>{tr.ghSub}</div>
              </div>
              <div style={{fontSize:".72rem",color:"var(--txm)"}}>{gallery.length} {tr.spPhoto}</div>
            </div>
            <Slideshow photos={gallery} lang={lang}/>
          </div>
          {/* Hero */}
          <div style={{padding:"2.25rem 1.25rem 1.75rem",textAlign:"center",borderBottom:"1px solid var(--bd)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",background:"var(--tp)",top:-140,right:-80,pointerEvents:"none"}}/>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--tp)",border:"1px solid var(--tpb)",borderRadius:20,padding:"4px 12px",fontSize:".68rem",fontWeight:700,color:"var(--t)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:"1rem"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"var(--t)",animation:"none"}}/>
              {tr.heroBadge}
            </div>
            <h1 style={{fontFamily:lang==="ar"?"'Tajawal',sans-serif":"'DM Serif Display',serif",fontSize:lang==="ar"?"2rem":"2.3rem",fontWeight:lang==="ar"?800:400,color:"var(--tx)",marginBottom:".3rem",lineHeight:1.2}}>
              {lang==="ar"?sett.name:<><span style={{color:"var(--t)",fontStyle:"italic"}}>Seven</span> Photography</>}
            </h1>
            <p style={{color:"var(--txm)",fontSize:".88rem",marginBottom:"1.5rem",lineHeight:1.65}}>{sett.tagline||tr.heroSub}</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-prim" onClick={()=>{if(!selectedDate){showToast("⚠️ "+tr.selectDate);return;}nav("booking");}}>📅 {tr.bookBtn}</button>
              <button className="btn-sec" onClick={()=>document.getElementById("contact-anchor")?.scrollIntoView({behavior:"smooth"})}>{tr.contactBtn}</button>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:"2rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
              {[["500+",tr.st1],["8",tr.st2],["98%",tr.st3]].map(([n,l],i,arr)=>(
                <div key={l} style={{display:"flex",gap:"2rem",alignItems:"center"}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:lang==="ar"?"'Tajawal',sans-serif":"'DM Serif Display',serif",fontSize:"1.5rem",color:"var(--t)",fontWeight:lang==="ar"?800:400,lineHeight:1,marginBottom:2}}>{n}</div>
                    <div style={{fontSize:".7rem",color:"var(--txm)",fontWeight:500}}>{l}</div>
                  </div>
                  {i<arr.length-1&&<div style={{width:1,height:30,background:"var(--bd)"}}/>}
                </div>
              ))}
            </div>
          </div>
          {/* Content */}
          <div style={{padding:"1.5rem 1.25rem",maxWidth:820,margin:"0 auto",width:"100%"}}>
            <div style={{fontSize:".85rem",fontWeight:700,color:"var(--t)",marginBottom:".75rem",display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:3,height:14,background:"var(--t)",borderRadius:2,flexShrink:0}}/>{tr.calTitle}
            </div>
            <Calendar lang={lang} selectedDate={selectedDate} setSelectedDate={setSelectedDate} blockedDates={blockedDates} bookings={bookings}/>
            <button className="btn-prim" style={{width:"100%",justifyContent:"center",padding:11,marginBottom:"1.25rem"}} onClick={()=>{if(!selectedDate){showToast("⚠️ "+tr.selectDate);return;}nav("booking");}}>
              {tr.bookNow} →
            </button>

            {/* Packages */}
            <div style={{fontSize:".85rem",fontWeight:700,color:"var(--t)",marginBottom:".4rem",display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:3,height:14,background:"var(--t)",borderRadius:2,flexShrink:0}}/>{tr.pkgTitle}
            </div>
            <div style={{fontSize:".78rem",color:"var(--txm)",marginBottom:".85rem"}}>{tr.pkgSub}</div>
            <div style={{display:"grid",gridTemplateColumns:packages.length>=3?"repeat(auto-fit,minmax(220px,1fr))":"repeat(auto-fit,minmax(220px,1fr))",gap:".75rem",marginBottom:"1.5rem"}}>
              {packages.map((pkg,i)=>{
                const isMiddle = packages.length===3 && i===1;
                return(
                  <div key={pkg.id} className="card" style={{display:"flex",flexDirection:"column",position:"relative",border:isMiddle?"1.5px solid var(--t)":"1px solid var(--bd)",boxShadow:isMiddle?"0 8px 24px var(--tpb)":"var(--shsm)"}}>
                    {isMiddle&&<div style={{position:"absolute",top:-10,[lang==="ar"?"right":"left"]:16,background:"var(--t)",color:"#fff",fontSize:".62rem",fontWeight:700,padding:"3px 10px",borderRadius:20}}>{lang==="ar"?"الأكثر طلباً":"Most Popular"}</div>}
                    <div style={{fontSize:".95rem",fontWeight:800,color:"var(--tx)",marginBottom:4,marginTop:isMiddle?6:0}}>{lang==="ar"?pkg.name:(pkg.name_en||pkg.name)}</div>
                    <div style={{fontSize:".76rem",color:"var(--txm)",marginBottom:".6rem",lineHeight:1.5,minHeight:32}}>{lang==="ar"?pkg.desc:(pkg.desc_en||pkg.desc)}</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:".75rem"}}>
                      <span style={{fontSize:"1.6rem",fontWeight:800,color:"var(--t)"}}>{pkg.price}</span>
                      <span style={{fontSize:".78rem",color:"var(--txm)"}}>{tr.pkgPrice}</span>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:".9rem",flex:1}}>
                      {(lang==="ar"?pkg.features:(pkg.features_en?.length?pkg.features_en:pkg.features)||[]).map((f,fi)=>(
                        <div key={fi} style={{display:"flex",alignItems:"flex-start",gap:6,fontSize:".78rem",color:"var(--tx)"}}>
                          <span style={{color:"var(--t)",flexShrink:0,marginTop:1}}>✓</span><span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <button className={isMiddle?"btn-prim":"btn-sec"} style={{width:"100%",justifyContent:"center"}} onClick={()=>{setFPackage(pkg.name);if(!selectedDate){showToast("⚠️ "+tr.selectDate);return;}nav("booking");}}>
                      {tr.bookBtn}
                    </button>
                  </div>
                );
              })}
            </div>

            <div id="contact-anchor"/>
            <div style={{fontSize:".85rem",fontWeight:700,color:"var(--t)",marginBottom:".75rem",display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:3,height:14,background:"var(--t)",borderRadius:2,flexShrink:0}}/>{tr.contactTitle}
            </div>
            <div className="card" style={{marginBottom:"1rem"}}>
              <div className="ci-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:".85rem"}}>
                {[[tr.ctLoc,"📍",sett.location],[tr.ctPh,"📞",sett.phone],[tr.ctEm,"📧",sett.email],[tr.ctHr,"🕐",sett.hours]].map(([lbl,ico,val])=>(
                  <div key={lbl} style={{background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:8,padding:".55rem",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:28,height:28,borderRadius:6,background:"var(--tp)",border:"1px solid var(--tpb)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".8rem",flexShrink:0}}>{ico}</div>
                    <div><div style={{fontSize:".68rem",color:"var(--txm)",marginBottom:1}}>{lbl}</div><div style={{fontSize:".78rem",color:"var(--tx)",fontWeight:600}}>{val}</div></div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"1rem 0 .25rem",textAlign:"center"}}>
                <div style={{fontSize:".8rem",color:"var(--txm)"}}>{tr.waContactSub}</div>
                <button className="wa-btn" style={{maxWidth:320}} onClick={sendContactWA}><WaIcon/>{tr.waContactBtn}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKING ── */}
      {page==="booking"&&(
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          <Nav showAdmin={false}/>
          <div style={{padding:"1.5rem 1.25rem",maxWidth:540,margin:"0 auto",width:"100%"}}>
            <button className="btn-ghost" style={{marginBottom:"1rem"}} onClick={()=>nav("home")}>← {tr.back}</button>
            <div className="card">
              <div style={{fontSize:"1.1rem",fontWeight:800,color:"var(--tx)",marginBottom:".2rem"}}>{tr.ftTitle}</div>
              <div style={{fontSize:".78rem",color:"var(--txm)",marginBottom:".9rem"}}>{tr.ftSub}</div>
              <div style={{background:"var(--tp)",border:"1px solid var(--tpb)",borderRadius:7,padding:"6px 12px",display:"inline-flex",alignItems:"center",gap:6,fontSize:".82rem",color:"var(--t)",marginBottom:".9rem",fontWeight:600}}>
                📅 {selectedDate?formatDate(selectedDate):"-"}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flName}</label><input value={fName} onChange={e=>setFName(e.target.value)} placeholder={tr.flName.replace(" *","")}/></div>
                <div className="f-row" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem"}}>
                  <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flPhone}</label><input value={fPhone} onChange={e=>setFPhone(e.target.value)}/></div>
                  <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flTime}</label><input type="time" value={fTime} onChange={e=>setFTime(e.target.value)}/></div>
                </div>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flVenue}</label><input value={fVenue} onChange={e=>setFVenue(e.target.value)}/></div>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flMaps}</label><input value={fMaps} onChange={e=>setFMaps(e.target.value)} placeholder="https://maps.google.com/..."/></div>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flPackage}</label>
                  <select value={fPackage} onChange={e=>setFPackage(e.target.value)}>
                    <option value="">{tr.pkgNone}</option>
                    {packages.map(pk=><option key={pk.id} value={pk.name}>{(lang==="ar"?pk.name:(pk.name_en||pk.name))} — {pk.price} {tr.pkgPrice}</option>)}
                  </select>
                </div>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flType}</label>
                  <select value={fType} onChange={e=>setFType(e.target.value)}><option value="">---</option>{tr.eventTypes.map(t2=><option key={t2}>{t2}</option>)}</select>
                </div>
                <div><label style={{fontSize:".75rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.flNotes}</label><textarea value={fNotes} onChange={e=>setFNotes(e.target.value)} style={{minHeight:60}}/></div>
              </div>
              <button className="btn-prim" style={{width:"100%",justifyContent:"center",padding:11,marginTop:".75rem"}} onClick={submitBooking}>{tr.submitBtn} →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM ── */}
      {page==="confirm"&&(
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          <Nav showAdmin={false}/>
          <div style={{padding:"2rem 1.25rem",maxWidth:520,margin:"0 auto",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:"var(--tp)",border:"2px solid var(--t)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",margin:"0 auto 1rem"}}>✅</div>
            <div style={{fontSize:"1.3rem",fontWeight:800,color:"var(--t)",marginBottom:".35rem",textAlign:"center"}}>{tr.confTitle}</div>
            <div style={{color:"var(--txm)",fontSize:".82rem",marginBottom:"1rem",lineHeight:1.65,textAlign:"center"}}>{tr.confSub}</div>
            <div style={{background:"var(--tp)",border:"1px solid var(--tpb)",borderRadius:7,padding:"8px 14px",fontSize:".8rem",color:"var(--t)",marginBottom:"1rem",width:"100%",textAlign:"center",fontWeight:600}}>{tr.confStatus}</div>
            <div className="card" style={{width:"100%",marginBottom:"1rem"}}>
              <div style={{fontSize:".75rem",color:"var(--txm)",marginBottom:".6rem",fontWeight:700}}>{tr.confBankHdr}</div>
              {[[tr.bankRow[0],bankSett.bank],[tr.bankRow[1],bankSett.holder],[tr.bankRow[2],bankSett.iban],[tr.bankRow[3],bankSett.deposit+" ﷼"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--bd)"}}>
                  <span style={{fontSize:".75rem",color:"var(--txm)"}}>{l}</span>
                  <span style={{fontSize:".82rem",fontWeight:700,color:"var(--tx)"}}>{v}</span>
                </div>
              ))}
              <div style={{marginTop:".45rem",fontSize:".72rem",color:"var(--txm)",paddingTop:".4rem",borderTop:"1px solid var(--bd)"}}>{bankSett.note}</div>
            </div>
            {currentBooking&&(
              <div className="card" style={{width:"100%",marginBottom:"1rem"}}>
                <div style={{fontSize:".75rem",color:"var(--txm)",marginBottom:".5rem",fontWeight:700}}>{tr.confSumHdr}</div>
                {[[tr.sumRow[0],currentBooking.name],[tr.sumRow[1],currentBooking.phone],[tr.sumRow[2],formatDate(currentBooking.date)],[tr.sumRow[3],currentBooking.time],[tr.sumRow[4],currentBooking.venue],currentBooking.type?[tr.sumRow[5],currentBooking.type]:null,currentBooking.pkg?[tr.sumRow[6],currentBooking.pkg]:null].filter(Boolean).map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:".78rem"}}>
                    <span style={{color:"var(--txm)"}}>{l}</span><span style={{fontWeight:600,color:"var(--tx)"}}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="wa-btn" style={{maxWidth:400,marginBottom:".6rem"}} onClick={sendConfirmWA}><WaIcon/>{tr.confWaBtn}</button>
            <button className="btn-sec" style={{maxWidth:400,width:"100%"}} onClick={()=>nav("home")}>{tr.confBack}</button>
          </div>
        </div>
      )}

      {/* ── ADMIN ── */}
      {page==="admin"&&(
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          <nav style={{background:"var(--bg2)",borderBottom:"1px solid var(--bd)",padding:"0 1.25rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:54,position:"sticky",top:0,zIndex:200,boxShadow:"var(--shsm)",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:30,height:30,borderRadius:7,overflow:"hidden",background:"var(--t)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,border:"1px solid var(--tl)"}}>
                {sett.logoSrc?<img src={sett.logoSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:"📷"}
              </div>
              <span style={{fontSize:".9rem",fontWeight:800,color:"var(--t)"}}>{sett.name}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
                {[["dark","🌙"],["light","☀️"]].map(([th,ic])=>(
                  <button key={th} onClick={()=>setTheme(th)} style={{width:26,height:22,borderRadius:17,border:"none",cursor:"pointer",background:theme===th?"var(--t)":"transparent",color:theme===th?"#fff":"var(--txm)",fontSize:".72rem",fontFamily:"inherit"}}>{ic}</button>
                ))}
              </div>
              <div style={{display:"flex",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:20,padding:3,gap:2}}>
                {[["ar","ع"],["en","EN"]].map(([l,lbl])=>(
                  <button key={l} onClick={()=>setLang(l)} style={{fontSize:".72rem",fontWeight:700,padding:"3px 9px",borderRadius:17,cursor:"pointer",border:"none",background:lang===l?"var(--t)":"transparent",color:lang===l?"#fff":"var(--txm)",fontFamily:"inherit"}}>{lbl}</button>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:7,padding:"4px 10px 4px 6px",cursor:"pointer"}} onClick={()=>nav("home")}>
                <div style={{width:22,height:22,borderRadius:5,background:"var(--td)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".68rem",fontWeight:700}}>{currentUser?.username?.slice(0,2).toUpperCase()}</div>
                <span style={{fontSize:".75rem",color:"var(--txm)"}}>{currentUser?.username}</span>
                <span style={{fontSize:".65rem",color:"var(--txd)"}}>← {tr.toSite}</span>
              </div>
              <button className="danger-btn" style={{padding:"5px 11px",fontSize:".75rem"}} onClick={()=>{setCurrentUser(null);nav("login");}}>🚪 {tr.logout}</button>
            </div>
          </nav>
          <div style={{padding:"1.1rem 1.25rem",maxWidth:960,margin:"0 auto",width:"100%",flex:1}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",flexWrap:"wrap",gap:6}}>
              <div style={{fontSize:"1.05rem",fontWeight:800,color:"var(--tx)",display:"flex",alignItems:"center",gap:8}}>
                ⚙️ {tr.adminTitle}
                <span style={{...roleBadgeStyle(currentUser?.role||"viewer")}}>{currentUser?.role}</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[[bookings.length,tr.spBook],[bookings.filter(b=>b.status==="pending").length,tr.spPend],[gallery.length,tr.spPhoto]].map(([n,l])=>(
                  <div key={l} style={{background:"var(--bg2)",border:"1px solid var(--bd)",borderRadius:7,padding:"5px 11px",fontSize:".74rem",color:"var(--txm)",display:"flex",alignItems:"center",gap:5}}>
                    <b style={{color:"var(--tx)"}}>{n}</b> {l}
                  </div>
                ))}
              </div>
            </div>
            {/* Tabs */}
            <div style={{display:"flex",gap:2,borderBottom:"1px solid var(--bd)",marginBottom:"1rem",overflowX:"auto",scrollbarWidth:"none"}}>
              {[["bookings",tr.tabBook],["packages",tr.tabPkg],["gallery",tr.tabGal],["calendar",tr.tabCal],currentUser?.role==="admin"?["users",tr.tabUsers]:null,["settings",tr.tabSet],["bank",tr.tabBank]].filter(Boolean).map(([key,lbl])=>(
                <button key={key} className={"tab-btn"+(adminTab===key?" active":"")} onClick={()=>switchTab(key)}>
                  {{"bookings":"📋","packages":"📦","gallery":"🖼️","calendar":"📅","users":"👥","settings":"⚙️","bank":"🏦"}[key]} {lbl}
                </button>
              ))}
            </div>

            {/* Bookings */}
            {adminTab==="bookings"&&(
              <div>
                {bookings.length===0
                  ?<div style={{textAlign:"center",color:"var(--txm)",padding:"2rem",fontSize:".85rem"}}>{tr.noBookings}</div>
                  :[...bookings].reverse().map(b=>(
                    <div key={b.id} style={{background:"var(--bg2)",border:"1px solid var(--bd)",borderRadius:10,padding:".85rem",marginBottom:".5rem",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:".7rem",flexWrap:"wrap",boxShadow:"var(--shsm)"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                          <span className={"badge "+b.status}>{b.status==="confirmed"?"✅ "+tr.bkConf:b.status==="rejected"?"❌ "+tr.bkRej:"⏳"}</span>
                          <span style={{fontWeight:700,fontSize:".88rem"}}>{b.name}</span>
                        </div>
                        <div style={{fontSize:".74rem",color:"var(--txm)",marginBottom:2}}>📅 {formatDate(b.date)} | 🕐 {b.time} | 📞 {b.phone}</div>
                        <div style={{fontSize:".74rem",color:"var(--txm)",marginBottom:2}}>📍 {b.venue}{b.type?" | "+b.type:""}{b.pkg?" | 📦 "+b.pkg:""}</div>
                        {b.maps&&<div style={{fontSize:".72rem"}}><a href={b.maps} target="_blank" rel="noreferrer" style={{color:"var(--t)"}}>🗺️ {tr.viewLocation}</a></div>}
                      </div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap",flexShrink:0}}>
                        {b.status==="pending"&&<><button className="act-btn act-conf" onClick={()=>confirmBk(b.id)}>{tr.bkConf}</button><button className="act-btn act-rej" onClick={()=>rejectBk(b.id)}>{tr.bkRej}</button></>}
                        <button className="act-btn act-wa" onClick={()=>sendWAAdmin(b)}>{tr.bkWa}</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* Packages */}
            {adminTab==="packages"&&(
              <div>
                <div className="card" style={{marginBottom:".75rem"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem",flexWrap:"wrap",gap:8}}>
                    <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)"}}>{tr.pkgManage}</div>
                    <button className="save-btn" onClick={openAddPkg}>+ {tr.pkgAdd}</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:".6rem"}}>
                    {packages.map(pkg=>(
                      <div key={pkg.id} style={{background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:9,padding:".85rem",display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:".88rem",fontWeight:800,color:"var(--tx)",marginBottom:3}}>{pkg.name}</div>
                        <div style={{fontSize:".74rem",color:"var(--txm)",marginBottom:6,lineHeight:1.5}}>{pkg.desc}</div>
                        <div style={{fontSize:"1.2rem",fontWeight:800,color:"var(--t)",marginBottom:6}}>{pkg.price} <span style={{fontSize:".7rem",color:"var(--txm)",fontWeight:500}}>{tr.pkgPrice}</span></div>
                        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:8,flex:1}}>
                          {(pkg.features||[]).map((f,fi)=>(
                            <div key={fi} style={{fontSize:".72rem",color:"var(--tx)",display:"flex",gap:5}}><span style={{color:"var(--t)"}}>✓</span>{f}</div>
                          ))}
                        </div>
                        <div style={{display:"flex",gap:5}}>
                          <button className="gi-btn edit" style={{flex:1,textAlign:"center"}} onClick={()=>openEditPkg(pkg)}>{tr.edit}</button>
                          <button className="gi-btn del" style={{flex:1,textAlign:"center"}} onClick={()=>deletePkg(pkg.id)}>{tr.delete}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {showAddPkg&&(
                  <div className="card" style={{border:"1px solid var(--tpb)"}}>
                    <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{editPkgId?tr.edit:tr.pkgNew}</div>
                    <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:".65rem"}}>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgName} (AR)</label><input value={pkgForm.name} onChange={e=>setPkgForm(p=>({...p,name:e.target.value}))}/></div>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgName} (EN)</label><input value={pkgForm.name_en} onChange={e=>setPkgForm(p=>({...p,name_en:e.target.value}))}/></div>
                    </div>
                    <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgPriceLbl}</label><input type="number" value={pkgForm.price} onChange={e=>setPkgForm(p=>({...p,price:e.target.value}))}/></div>
                    <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:".65rem"}}>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgDesc} (AR)</label><input value={pkgForm.desc} onChange={e=>setPkgForm(p=>({...p,desc:e.target.value}))}/></div>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgDesc} (EN)</label><input value={pkgForm.desc_en} onChange={e=>setPkgForm(p=>({...p,desc_en:e.target.value}))}/></div>
                    </div>
                    <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:".65rem"}}>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgFeatures} (AR)</label><textarea value={pkgForm.features} onChange={e=>setPkgForm(p=>({...p,features:e.target.value}))} style={{minHeight:90}}/></div>
                      <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.pkgFeatures} (EN)</label><textarea value={pkgForm.features_en} onChange={e=>setPkgForm(p=>({...p,features_en:e.target.value}))} style={{minHeight:90}}/></div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="save-btn" onClick={savePkg}>{tr.save}</button>
                      <button className="danger-btn" onClick={()=>{setShowAddPkg(false);setEditPkgId(null);}}>{tr.cancel}</button>
                    </div>
                  </div>
                )}
              </div>
            )}


            {adminTab==="gallery"&&(
              <div>
                {/* Photos grid */}
                <div className="card" style={{marginBottom:".75rem"}}>
                  <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{tr.galManage}</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:".5rem",marginBottom:".6rem"}}>
                    {gallery.map(p=>(
                      <div key={p.id} style={{background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:7,overflow:"hidden"}}>
                        {p.src?<img src={p.src} style={{width:"100%",height:88,objectFit:"cover"}} alt=""/>
                          :<div style={{width:"100%",height:88,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",background:p.color+"18",opacity:.7}}>📸</div>}
                        <div style={{padding:".4rem .5rem"}}>
                          <div style={{fontSize:".7rem",color:"var(--tx)",fontWeight:600,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.caption}</div>
                          <div style={{display:"inline-flex",background:"var(--tp)",border:"1px solid var(--tpb)",borderRadius:20,padding:"1px 7px",fontSize:".62rem",color:"var(--t)",marginBottom:4}}>{p.category}</div>
                          <div style={{display:"flex",gap:3}}>
                            <button className="gi-btn edit" onClick={()=>{startEditPhoto(p);}}>{tr.edit}</button>
                            <button className="gi-btn del" onClick={()=>{setGallery(g=>g.filter(x=>x.id!==p.id));showToast(tr.photoDeleted);}}>{tr.delete}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label style={{display:"block",background:"var(--bg3)",border:"2px dashed var(--bdl)",borderRadius:8,padding:".75rem",textAlign:"center",cursor:"pointer",color:"var(--txm)",fontSize:".78rem",transition:"all .2s"}}>
                    <div style={{fontSize:"1.2rem",marginBottom:3}}>+</div>
                    {tr.addPhoto}
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{display:"none"}}/>
                  </label>
                </div>

                {/* Edit photo panel */}
                {editPhotoId&&(
                  <div className="card" style={{marginBottom:".75rem",border:"1px solid var(--tpb)"}}>
                    <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".7rem"}}>{tr.editPhoto}</div>
                    <div style={{marginBottom:".65rem"}}><label style={{fontSize:".74rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.epCaption}</label><input value={epCaption} onChange={e=>setEpCaption(e.target.value)}/></div>
                    <div style={{marginBottom:".65rem"}}><label style={{fontSize:".74rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.epCategory}</label>
                      <select value={epCategory} onChange={e=>setEpCategory(e.target.value)}>
                        {categories.map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="save-btn" onClick={savePhotoEdit}>{tr.save}</button>
                      <button className="danger-btn" onClick={()=>setEditPhotoId(null)}>{tr.cancel}</button>
                    </div>
                  </div>
                )}

                {/* Categories management */}
                <div className="card">
                  <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>🏷️ {tr.catManage}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:".75rem"}}>
                    {categories.map((cat,idx)=>(
                      <div key={cat+idx} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:7}}>
                        {editCatIdx===idx?(
                          <>
                            <input value={editCatVal} onChange={e=>setEditCatVal(e.target.value)}
                              onKeyDown={e=>e.key==="Enter"&&saveEditCat()}
                              style={{flex:1,padding:"5px 9px",fontSize:".82rem"}} autoFocus/>
                            <button className="save-btn" style={{padding:"4px 12px",marginTop:0}} onClick={saveEditCat}>{tr.catSave}</button>
                            <button className="danger-btn" style={{padding:"4px 10px"}} onClick={()=>setEditCatIdx(null)}>{tr.catCancel}</button>
                          </>
                        ):(
                          <>
                            <span style={{flex:1,fontSize:".84rem",color:"var(--tx)",fontWeight:500}}>{cat}</span>
                            <span style={{fontSize:".68rem",color:"var(--txm)",background:"var(--bg4)",borderRadius:20,padding:"1px 8px",border:"1px solid var(--bd)"}}>
                              {gallery.filter(p=>p.category===cat).length}
                            </span>
                            <button className="gi-btn edit" onClick={()=>startEditCat(idx)} style={{padding:"3px 9px"}}>{tr.catEdit}</button>
                            <button className="gi-btn del" onClick={()=>deleteCategory(idx)} style={{padding:"3px 9px"}}>{tr.catDelete}</button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Add new category */}
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <input value={newCatVal} onChange={e=>setNewCatVal(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&addCategory()}
                      placeholder={tr.catNew} style={{flex:1,padding:"7px 10px",fontSize:".82rem"}}/>
                    <button className="save-btn" style={{marginTop:0,whiteSpace:"nowrap"}} onClick={addCategory}>+ {tr.catAdd}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar */}
            {adminTab==="calendar"&&(
              <div className="card">
                <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{tr.calManage}</div>
                <div style={{marginBottom:".65rem"}}>
                  <label style={{fontSize:".74rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.blockLbl}</label>
                  <div style={{display:"flex",gap:6}}>
                    <input type="date" value={blockDate} onChange={e=>setBlockDate(e.target.value)} style={{flex:1}}/>
                    <button className="save-btn" style={{marginTop:0}} onClick={()=>{if(!blockDate){showToast("⚠️");return;}setBlockedDates(p=>new Set([...p,blockDate]));setBlockDate("");showToast("✅");}}>
                      {tr.addDate}
                    </button>
                  </div>
                </div>
                {blockedDates.size===0
                  ?<div style={{color:"var(--txm)",fontSize:".78rem"}}>{tr.noBlocked}</div>
                  :[...blockedDates].sort().map(d=>(
                    <div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 8px",background:"var(--amp)",border:"1px solid rgba(217,119,6,.2)",borderRadius:5,marginBottom:3,fontSize:".78rem"}}>
                      <span style={{color:"var(--aml)"}}>{d}</span>
                      <button style={{background:"none",border:"none",color:"var(--txm)",cursor:"pointer",padding:"2px 5px"}} onClick={()=>setBlockedDates(p=>{const s=new Set(p);s.delete(d);return s;})}>✕</button>
                    </div>
                  ))
                }
              </div>
            )}

            {/* Users */}
            {adminTab==="users"&&(
              <div>
                {/* Users list */}
                <div className="card" style={{marginBottom:".75rem"}}>
                  <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{tr.usersManage}</div>
                  {users.map(u=>(
                    <div key={u.id}>
                      {/* VIEW MODE */}
                      {editUserId!==u.id?(
                        <div style={{background:"var(--bg3)",border:"1px solid var(--bd)",borderRadius:9,padding:".75rem",marginBottom:".45rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:".65rem",flexWrap:"wrap"}}>
                          <div style={{width:34,height:34,borderRadius:8,background:"var(--td)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".85rem",fontWeight:800,flexShrink:0}}>
                            {u.username.slice(0,2).toUpperCase()}
                          </div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
                              <span style={{fontWeight:700,fontSize:".88rem"}}>{u.username}</span>
                              <span style={{...roleBadgeStyle(u.role)}}>{u.role}</span>
                              {u.id===currentUser?.id&&<span style={{fontSize:".62rem",background:"var(--amp)",color:"var(--aml)",border:"1px solid rgba(217,119,6,.3)",borderRadius:20,padding:"1px 7px",fontWeight:700}}>{lang==="ar"?"أنت":"You"}</span>}
                            </div>
                            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                              {["bookings","gallery","calendar","settings","bank"].map(p=>(
                                <span key={p} className={"perm-chip"+(u.perms.includes(p)||u.role==="admin"?" on":"")}>
                                  {tr[{bookings:"pcBook",gallery:"pcGal",calendar:"pcCal",settings:"pcSet",bank:"pcBank"}[p]]}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div style={{display:"flex",gap:5,flexShrink:0}}>
                            <button className="gi-btn edit" style={{padding:"4px 11px",fontSize:".76rem"}} onClick={()=>startEditUser(u)}>{tr.edit}</button>
                            {u.canDelete&&u.id!==currentUser?.id&&(
                              <button className="danger-btn" style={{padding:"4px 10px",fontSize:".76rem"}} onClick={()=>{setUsers(p=>p.filter(x=>x.id!==u.id));showToast(tr.userDeleted);}}>🗑️</button>
                            )}
                          </div>
                        </div>
                      ):(
                        /* EDIT MODE */
                        <div style={{background:"var(--bg3)",border:"1px solid var(--tpb)",borderRadius:9,padding:"1rem",marginBottom:".45rem"}}>
                          <div style={{fontSize:".8rem",fontWeight:800,color:"var(--t)",marginBottom:".65rem",display:"flex",alignItems:"center",gap:6}}>
                            ✏️ {tr.editUser}: <span style={{color:"var(--txm)",fontWeight:400}}>{u.username}</span>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:".55rem"}}>
                            <div>
                              <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.ulUser}</label>
                              <input value={editUserData.username} onChange={e=>setEditUserData(p=>({...p,username:e.target.value}))} style={{fontSize:".82rem"}}/>
                            </div>
                            <div>
                              <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.newPass}</label>
                              <input type="password" value={editUserData.password} onChange={e=>setEditUserData(p=>({...p,password:e.target.value}))} placeholder="••••••" style={{fontSize:".82rem"}}/>
                            </div>
                          </div>
                          <div style={{marginBottom:".55rem"}}>
                            <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.ulRole}</label>
                            <select value={editUserData.role} onChange={e=>setEditUserData(p=>({...p,role:e.target.value}))} style={{fontSize:".82rem"}}>
                              <option value="admin">{tr.rolAdmin}</option>
                              <option value="editor">{tr.rolEditor}</option>
                              <option value="viewer">{tr.rolViewer}</option>
                            </select>
                          </div>
                          <div style={{marginBottom:".65rem"}}>
                            <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:4,display:"block",fontWeight:600}}>{tr.ulPerms}</label>
                            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                              {[["bookings",tr.pcBook],["gallery",tr.pcGal],["calendar",tr.pcCal],["settings",tr.pcSet],["bank",tr.pcBank]].map(([key,lbl])=>(
                                <label key={key} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:".76rem",color:"var(--txm)",userSelect:"none"}}>
                                  <input type="checkbox" checked={editUserData.perms[key]||false}
                                    onChange={e=>setEditUserData(p=>({...p,perms:{...p.perms,[key]:e.target.checked}}))}
                                    style={{accentColor:"var(--t)",width:13,height:13,cursor:"pointer"}}/>
                                  {lbl}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div style={{display:"flex",gap:6}}>
                            <button className="save-btn" onClick={saveEditUser}>{tr.save}</button>
                            <button className="danger-btn" onClick={()=>setEditUserId(null)}>{tr.cancel}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add new user */}
                <div className="card">
                  <div style={{fontSize:".8rem",fontWeight:800,color:"var(--tx)",marginBottom:".65rem"}}>{tr.addUserTitle}</div>
                  <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:".65rem"}}>
                    <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.ulUser}</label><input value={newUsername} onChange={e=>setNewUsername(e.target.value)} placeholder="username"/></div>
                    <div><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.ulPass}</label><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="••••••"/></div>
                  </div>
                  <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.ulRole}</label>
                    <select value={newRole} onChange={e=>setNewRole(e.target.value)}>
                      <option value="admin">{tr.rolAdmin}</option>
                      <option value="editor">{tr.rolEditor}</option>
                      <option value="viewer">{tr.rolViewer}</option>
                    </select>
                  </div>
                  <div style={{marginBottom:".65rem"}}>
                    <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:5,display:"block",fontWeight:600}}>{tr.ulPerms}</label>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {[["bookings",tr.pcBook],["gallery",tr.pcGal],["calendar",tr.pcCal],["settings",tr.pcSet],["bank",tr.pcBank]].map(([key,lbl])=>(
                        <label key={key} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:".76rem",color:"var(--txm)",userSelect:"none"}}>
                          <input type="checkbox" checked={newPerms[key]} onChange={e=>setNewPerms(p=>({...p,[key]:e.target.checked}))} style={{accentColor:"var(--t)",width:14,height:14,cursor:"pointer"}}/>
                          {lbl}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="save-btn" onClick={addUser}>{tr.addUserBtn}</button>
                </div>
              </div>
            )}

            {/* Settings */}
            {adminTab==="settings"&&(
              <div className="card">
                <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{tr.brandTitle}</div>
                <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.sName}</label><input value={sName} onChange={e=>setSName(e.target.value)}/></div>
                <div style={{marginBottom:".65rem"}}>
                  <label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.sLogo}</label>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <div style={{width:44,height:44,borderRadius:8,border:"1px solid var(--bd)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg3)",fontSize:"1.3rem",flexShrink:0}}>
                      {sett.logoSrc?<img src={sett.logoSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:"📷"}
                    </div>
                    <label style={{background:"var(--tp)",border:"1px solid var(--tpb)",color:"var(--t)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:".76rem",fontWeight:700}}>
                      {tr.sUpload}<input type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}}/>
                    </label>
                  </div>
                </div>
                <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.sTag}</label><input value={sTagline} onChange={e=>setSTagline(e.target.value)}/></div>
                <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.sWa}</label><input value={sWa} onChange={e=>setSWa(e.target.value)}/></div>
                <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem"}}>
                  {[[tr.sLoc,sLoc,setSLoc],[tr.sPh,sPh,setSpH],[tr.sEm,sEm,setSEm],[tr.sHr,sHr,setSHr]].map(([l,v,set])=>(
                    <div key={l} style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{l}</label><input value={v} onChange={e=>set(e.target.value)}/></div>
                  ))}
                </div>
                <button className="save-btn" onClick={saveSettings}>{tr.saveSet}</button>
              </div>
            )}

            {/* Bank */}
            {adminTab==="bank"&&(
              <div className="card">
                <div style={{fontSize:".85rem",fontWeight:800,color:"var(--tx)",marginBottom:".75rem"}}>{tr.bankTitle}</div>
                {[[tr.bBank,bBank,setBBank],[tr.bHolder,bHolder,setBHolder],[tr.bIban,bIban,setBIban],[tr.bDep,bDep,setBDep]].map(([l,v,set])=>(
                  <div key={l} style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{l}</label><input value={v} onChange={e=>set(e.target.value)}/></div>
                ))}
                <div style={{marginBottom:".65rem"}}><label style={{fontSize:".72rem",color:"var(--txm)",marginBottom:3,display:"block",fontWeight:600}}>{tr.bNote}</label><textarea value={bNote} onChange={e=>setBNote(e.target.value)} style={{minHeight:52}}/></div>
                <button className="save-btn" onClick={saveBankSettings}>{tr.saveBank}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
