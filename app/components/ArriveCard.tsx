"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Evenement = { annee: number; texte: string; imageUrl: string | null }

export default function ArriveCard() {
    const [evenements, setEvenements] = useState<Evenement[]>([])
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth()+1).padStart(2,"0")
    const DD = String(today.getDate()).padStart(2,"0")

    useEffect(() => {
        fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/events/${MM}/${DD}`)
            .then(r => r.json()).then(data => {
                const sorted = [...(data?.events??[])].sort((a:any,b:any)=>b.year-a.year)
                const step = Math.floor(sorted.length/5)
                setEvenements([0,1,2,3,4].map(i=>sorted[i*step]??sorted[i]).filter(Boolean).map((e:any)=>({
                    annee: e.year, texte: e.text,
                    imageUrl: e.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/,"/400px-")??null
                })))
                setLoading(false)
            }).catch(()=>setLoading(false))
    }, [MM, DD])

    useEffect(() => {
        if (evenements.length<=1) return
        const t = setTimeout(()=>{
            const iv = setInterval(()=>{ setFading(true); setTimeout(()=>{setIndex(i=>(i+1)%evenements.length);setFading(false)},300) },20000)
            return ()=>clearInterval(iv)
        },5000)
        return ()=>clearTimeout(t)
    }, [evenements.length])

    const goTo = (i: number) => { setFading(true); setTimeout(()=>{setIndex(i);setFading(false)},300) }
    const current = evenements[index]

    return (
        <Card title={`C'est arrivé un ${jour} ${mois}`} emoji="📅" bgColor="#c8ece6" accent="#2d6a5e">
            {evenements.length>1 && (
                <div style={{display:"flex",gap:"6px",marginBottom:"18px"}}>
                    {evenements.map((_,i)=>(
                        <div key={i} onClick={()=>goTo(i)} style={{height:"3px",flex:1,borderRadius:"4px",cursor:"pointer",background:i===index?"#2d6a5e":"#2d6a5e22",transition:"background 0.3s"}} />
                    ))}
                </div>
            )}
            {loading ? <p style={{color:"var(--text-muted)"}}>Chargement...</p> : current ? (
                <div style={{opacity:fading?0:1,transition:"opacity 0.3s",display:"flex",gap:"16px",alignItems:"flex-start"}}>
                    <div style={{width:"80px",height:"80px",borderRadius:"14px",flexShrink:0,overflow:"hidden",background:"rgba(45,106,94,0.1)",border:"2px solid #2d6a5e22",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {current.imageUrl
                            ? <img src={current.imageUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                            : <span style={{fontSize:"2.5rem"}}>📅</span>
                        }
                    </div>
                    <div style={{flex:1}}>
                        <p style={{fontFamily:"var(--font-licorice)",fontSize:"1.8rem",color:"#2d6a5e",lineHeight:1,marginBottom:"8px"}}>En {current.annee}</p>
                        <p style={{fontSize:"0.95rem",lineHeight:1.7,color:"var(--text-dark)"}}>{current.texte}</p>
                    </div>
                </div>
            ) : <p style={{color:"var(--text-muted)"}}>Aucun événement trouvé.</p>}
        </Card>
    )
}
