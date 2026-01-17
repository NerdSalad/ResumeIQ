// interface Suggestion {
//   type: "good" | "improve";
//   tip: string;
// }

// interface ATSProps {
//   score: number;
//   suggestions: Suggestion[];
// }

// const ATS = ({ score, suggestions }: ATSProps) => {
//   let gradientClass = "";
//   let iconSrc = "";
//   let subtitle = "";
//   let description = "";
//   let closingText = "";

//   if (score > 75) {
//     gradientClass = "from-green-100 to-white";
//     iconSrc = "/icons/ats-good.svg";
//     subtitle = "Great Job!";
//     description = "Your resume is well-optimized for ATS.";
//     closingText = "Keep up the good work!";
//   } else if (score > 50) {
//     gradientClass = "from-yellow-100 to-white";
//     iconSrc = "/icons/ats-warning.svg";
//     subtitle = "Good Start";
//     description = "Your resume has some good elements but needs improvement.";
//     closingText = "Focus on the suggestions above to improve your score.";
//   } else {
//     gradientClass = "from-red-100 to-white";
//     iconSrc = "/icons/ats-bad.svg";
//     subtitle = "Needs Improvement";
//     description = "Your resume might struggle to pass ATS filters.";
//     closingText = "Consider a major revision based on these tips.";
//   }

//   return (
//     <div className={`w-full rounded-2xl shadow-sm border border-gray-100 bg-linear-to-b ${gradientClass} p-8 flex flex-col gap-6`}>
//       {/* Header Section */}
//       <div className="flex flex-col items-center gap-4 text-center">
//         <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center p-3">
//           <img src={iconSrc} alt="ATS Status" className="w-full h-full object-contain" />
//         </div>
//         <div className="flex flex-col gap-1">
//           <h3 className="text-3xl font-bold text-gray-900">ATS Score - {score}/100</h3>
//           <p className="text-xl font-semibold text-gray-800">{subtitle}</p>
//           <p className="text-gray-500 max-w-md">{description}</p>
//         </div>
//       </div>

//       {/* Suggestions List */}
//       <div className="flex flex-col gap-3 bg-white/50 rounded-xl p-4">
//         {suggestions.map((suggestion, index) => (
//           <div key={index} className="flex flex-row items-start gap-3 p-2">
//             <img 
//               src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
//               alt={suggestion.type}
//               className="w-5 h-5 mt-0.5 shrink-0"
//             />
//             <p className={`leading-snug ${suggestion.type === "good" ? "text-green-700" : "text-red-700"}`}>{suggestion.tip}</p>
//           </div>
//         ))}
//       </div>

//       <div className="text-center pt-2">
//         <p className="text-sm font-medium text-gray-500">{closingText}</p>
//       </div>
//     </div>
//   );
// };

// export default ATS;

import { cn } from "~/lib/utils";

const ATS = ({
    score,
    suggestions,
}: {
    score: number;
    suggestions: { type: "good" | "improve" | "warning"; tip: string }[];
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
                score > 69
                    ? "from-green-100"
                    : score > 49
                        ? "from-yellow-100"
                        : "from-red-100"
            )}
        >
            <div className="flex flex-row gap-4 items-center">
                <img
                    src={
                        score > 69
                            ? "/icons/ats-good.svg"
                            : score > 49
                                ? "/icons/ats-warning.svg"
                                : "/icons/ats-bad.svg"
                    }
                    alt="ATS"
                    className="w-10 h-10"
                />
                <p className="text-2xl font-semibold">ATS Score - {score}/100</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-medium text-xl">
                    How well does your resume pass through Applicant Tracking Systems?
                </p>
                <p className="text-lg text-gray-500">
                    Your resume was scanned like an employer would. Here's how it
                    performed:
                </p>
                {suggestions.map((suggestion, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                suggestion.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="ATS"
                            className="w-4 h-4"
                        />
                        <p className={`text-lg text-gray-500 ${suggestion.type === "good"
                                ? "text-green-700"
                                : suggestion.type === "warning"
                                    ? "text-yellow-700"
                                    : "text-red-700"
                            }`}>{suggestion.tip}</p>
                    </div>
                ))}
                <p className="text-lg text-gray-500">
                    Want a better score? Improve your resume by applying the suggestions  
                    listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;