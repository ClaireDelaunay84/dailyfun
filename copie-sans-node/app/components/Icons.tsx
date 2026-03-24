type IconProps = {
    color?: string
    size?: number
}

export function IconMeteo({ color = "#C8B6FF", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="10" r="3.5" />
            <path d="M12 2v1.5M12 17v1.5M4.22 4.22l1.06 1.06M18.72 4.22l-1.06 1.06M2 10h1.5M20.5 10H22" />
            <path d="M6 17.5a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8H8a2 2 0 0 1 0-4" />
        </svg>
    )
}

export function IconFete({ color = "#FFB5A7", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.5 2 3 6 3 10c0 5 4 8 9 10 5-2 9-5 9-10 0-4-3.5-8-9-8z" />
            <path d="M12 6v4M10 8h4" />
            <path d="M8 14c1 1.5 2 2 4 2s3-.5 4-2" />
        </svg>
    )
}

export function IconMonde({ color = "#BDE0FE", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" />
            <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
        </svg>
    )
}

export function IconSavoir({ color = "#FFC8DD", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 21h4" />
            <path d="M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z" />
            <path d="M12 6v3M10.5 7.5l3 0" />
        </svg>
    )
}

export function IconCalendrier({ color = "#FFB5A7", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="17" rx="3" />
            <path d="M8 2v3M16 2v3M3 10h18" />
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
    )
}

export function IconNaissance({ color = "#C8B6FF", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2" />
            <circle cx="12" cy="7" r="4" />
            <path d="M12 2v1M15 3.5l-.7.7M9 3.5l.7.7" />
        </svg>
    )
}

export function IconDeces({ color = "#BDE0FE", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21h6" />
            <path d="M12 3a5 5 0 0 1 5 5c0 2-1 3.5-2 4.5L14 21H10l-1-8.5C8 11.5 7 10 7 8a5 5 0 0 1 5-5z" />
            <path d="M12 7v3M10.5 8.5h3" />
        </svg>
    )
}

export function IconDicton({ color = "#BDE0FE", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 9h1v4H8V9zM8 9a2 2 0 0 1 2-2M13 9h1v4h-1V9zM13 9a2 2 0 0 1 2-2" />
        </svg>
    )
}

export function IconProverbe({ color = "#C8B6FF", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 7h8M8 11h8M8 15h5" />
        </svg>
    )
}

export function IconSoleil({ color = "#FFC8DD", size = 22 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 18h20" />
            <path d="M3 18c0-5 4-9 9-9s9 4 9 9" />
            <path d="M12 5V3M5.2 7.2 3.8 5.8M18.8 7.2l1.4-1.4M12 9v2" />
        </svg>
    )
}