"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Personne = { nom:string; anneeNaissance:number|null; anneeDeces:number; age:number|null; description:string; emoji:string; imageUrl:string|null; extrait:string|null }

function getEmoji(d:string):string {
    const s=d.toLowerCase()
    if(s.includes("acteur")||s.includes("actrice"))return"🎬"
    if(s.includes("chanteur")||s.includes("chanteuse")||s.includes("musicien"))return"🎤"
    if(s.includes("footballeur")||s.includes("tennis")||s.includes("sportif"))return"🏆"
    if(s.includes("écrivain")||s.includes("romancier")||s.includes("poète"))return"✍️"
    if(s.includes("scientifique")||s.includes("physicien"))return"🔬"
    if(s.includes("peintre")||s.includes("artiste"))return"🎨"
    if(s.includes("philosophe"))return"🧠"
    if(s.includes("président")||s.includes("ministre")||s.includes("politique"))return"🏛️"
    if(s.includes("réalisateur"))return"🎥"
    if(s.includes("compositeur"))return"🎼"
    return"⭐"
}

export default function DecesCard() {
    const [personnes, setPersonnes] = useState<Personne[]>([])
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR",{month:"long"})
    const MM = String(today.getMonth()+1).padStart(2,"0")
    const DD = String(today.getDate()).padStart(2,"0")

    useEffect(()=>{
        fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${MM}/${DD}`)
            .then(r=>r.json()).then(async data=>{
                const deaths=data?.deaths??[]
                const avecImg=deaths.filter((b:any)=>b.pages?.[0]?.thumbnail?.source)
                const sel=avecImg.length>=5?avecImg.slice(0,5):[...avecImg,...deaths.filter((b:any)=>!b.pages?.[0]?.thumbnail?.source)].slice(0,5)
                const formatted:Personne[]=await Promise.all(sel.map(async(b:any)=>{
                    const description=b.pages?.[0]?.description??b.text??""
                    const nom=b.pages?.[0]?.titles?.normalized??b.text?.split(",")[0]??"Inconnu"
                    let extrait:string|null=b.pages?.[0]?.extract??null
                    if(!extrait&&nom!=="Inconnu"){
                        try{const r=await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nom)}`);extrait=(await r.json())?.extract??null}catch{}
                    }
                    let anneeNaissance:number|null=null
                    if(extrait){const m=extrait.match(/née? (?:le )?\d{1,2}[^\d]+(\d{4})|(\d{4})\s*[-–]\s*\d{4}/);if(m)anneeNaissance=parseInt(m[1]??m[2])}
                    return{nom,anneeNaissance,anneeDeces:b.year,age:anneeNaissance?b.year-anneeNaissance:null,description,emoji:getEmoji(description),imageUrl:b.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/,"/400px-")??null,extrait}
                }))
                setPersonnes(formatted);setLoading(false)
            }).catch(()=>setLoading(false))
    },[MM,DD])

    useEffect(()=>{
        if(personnes.length<=1)return
        const t=setTimeout(()=>{
            const iv=setInterval(()=>{setFading(true);setTimeout(()=>{setIndex(i=>(i+1)%personnes.length);setFading(false)},300)},20000)
            return()=>clearInterval(iv)
        },17000)
        return()=>clearTimeout(t)
    },[personnes.length])

    const goTo=(i:number)=>{setFading(true);setTimeout(()=>{setIndex(i);setFading(false)},300)}
    const current=personnes[index]

    return (
        <Card title={`Ils sont partis un ${jour} ${mois}`} emoji="🕯️" bgColor="#d0dcea" accent="#3a4a6a">
            {personnes.length>1&&(
                <div style={{display:"flex",gap:"6px",marginBottom:"18px"}}>
                    {personnes.map((_,i)=>(
                        <div key={i} onClick={()=>goTo(i)} style={{height:"3px",flex:1,borderRadius:"4px",cursor:"pointer",background:i===index?"#3a4a6a":"#3a4a6a22",transition:"background 0.3s"}} />
                    ))}
                </div>
            )}
            {loading?<p style={{color:"var(--text-muted)"}}>Chargement...</p>:current?(
                <div style={{opacity:fading?0:1,transition:"opacity 0.3s"}}>
                    <div style={{display:"flex",gap:"16px",alignItems:"center",marginBottom:"14px"}}>
                        <div style={{position:"relative",flexShrink:0}}>
                            <div style={{width:"76px",height:"76px",borderRadius:"50%",overflow:"hidden",background:"rgba(58,74,106,0.1)",border:"2px solid #3a4a6a33",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                {current.imageUrl
                                    ?<img src={current.imageUrl} alt={current.nom} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}} />
                                    :<span style={{fontSize:"2.2rem"}}>{current.emoji}</span>
                                }
                            </div>
                            <div style={{position:"absolute",bottom:-4,right:-4,background:"white",borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",boxShadow:"0 2px 6px rgba(0,0,0,0.12)"}}>
                                {current.emoji}
                            </div>
                        </div>
                        <div style={{flex:1}}>
                            <p style={{fontFamily:"var(--font-licorice)",fontSize:"1.8rem",color:"#3a4a6a",lineHeight:1,marginBottom:"4px"}}>{current.nom}</p>
                            <p style={{fontSize:"0.8rem",color:"var(--text-muted)",marginBottom:"6px"}}>{current.description}</p>
                            <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
                                <span style={{fontSize:"0.8rem",fontWeight:700,color:"#3a4a6a"}}>🕯️ {current.anneeDeces}</span>
                                {current.anneeNaissance&&<span style={{fontSize:"0.75rem",color:"var(--text-muted)",background:"rgba(58,74,106,0.08)",padding:"2px 10px",borderRadius:"20px"}}>né(e) en {current.anneeNaissance}</span>}
                                {current.age&&<span style={{fontSize:"0.75rem",color:"var(--text-muted)",background:"rgba(58,74,106,0.08)",padding:"2px 10px",borderRadius:"20px"}}>{current.age} ans</span>}
                            </div>
                        </div>
                    </div>
                    {current.extrait&&(
                        <p style={{fontSize:"0.85rem",lineHeight:1.75,color:"var(--text-muted)",borderLeft:"3px solid #3a4a6a33",paddingLeft:"14px",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical" as const,overflow:"hidden"}}>
                            {current.extrait}
                        </p>
                    )}
                </div>
            ):<p style={{color:"var(--text-muted)"}}>Aucun décès trouvé.</p>}
        </Card>
    )
}
