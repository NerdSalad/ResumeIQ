import React from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "../lib/puter";
import { useEffect, useState } from "react";

const ResumeCard = ({ resume, onDelete }: { resume: Resume, onDelete?: (resume: Resume) => void }) => {

    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(resume.imagePath)
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }
        loadResume();
    }, [resume.imagePath])


    return (
        <div className="relative group">
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Delete button clicked");
                        onDelete(resume);
                    }}
                    className="absolute top-2 right-2 z-10 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete Resume"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            <Link
                to={`/resume/${resume.id}`}
                className="resume-card animate-in fade-in duration-1000 block"
            >
                <div className="resume-card-header">
                    <div className="flex flex-col gap-2">
                        
                        {resume.companyName && <h2 className="!text-black font-bold break-words">
                            {resume.companyName}
                        </h2>}
                        {resume.jobTitle && <h3 className="text-lg break-words text-gray-500">
                            {resume.jobTitle}
                        </h3>}
                        {
                            !resume.companyName && !resume.jobTitle && <h2 className="!text-black font-bold">Resume</h2>
                        }
                    </div>
                    <div className="flex-shrink-0">
                        <ScoreCircle score={resume.feedback.overallScore} />
                    </div>
                </div>
                {resumeUrl && 
                (
                    <div className="gradient-border animate-in fade-in duration-1000">
                        <div className="w-full h-full">
                            <img src={resumeUrl} alt="resume" className="w-full h-[350px] max-sm:h-[250px] object-cover object-top" />
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ResumeCard;
