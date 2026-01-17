
import React from 'react'

const ScoreBadge = ({ score }: { score: number }) => {
    let badgeColor = "";
    let badgeText = "";
    let textColor = "";

    if (score >= 80) {
        badgeColor = "bg-[var(--color-badge-green)]";
        badgeText = "Strong";
        textColor = "text-[var(--color-badge-green-text)]";
    } else if (score >= 50) {
        badgeColor = "bg-[var(--color-badge-yellow)]";
        badgeText = "Good Start";
        textColor = "text-[var(--color-badge-yellow-text)]";
    } else {
        badgeColor = "bg-[var(--color-badge-red)]";
        badgeText = "Needs Work";
        textColor = "text-[var(--color-badge-red-text)]";
    }

    return (
        <div className={`score-badge ${badgeColor} ${textColor}`}>
            <p className="text-sm font-semibold">{badgeText}</p>
        </div>
    )
}

export default ScoreBadge
