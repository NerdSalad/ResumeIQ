import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

// Interfaces based on usage
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface Category {
  score: number;
  tips: Tip[];
}

export interface Feedback {
  toneAndStyle: Category;
  content: Category;
  structure: Category;
  skills: Category;
  [key: string]: any; // Allow other properties
}

const ScoreBadge = ({ score }: { score: number }) => {
  let bgClass = "bg-red-100";
  let textClass = "text-red-700";
  let icon = "/icons/warning.svg";

  if (score > 75) {
    bgClass = "bg-green-100";
    textClass = "text-green-700";
    icon = "/icons/check.svg";
  } else if (score > 50) {
    bgClass = "bg-yellow-100";
    textClass = "text-yellow-700";
    icon = "/icons/warning.svg"; // or another icon if available, reusing warning for improve
  }

  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-full",
        bgClass
      )}
    >
      <img src={icon} alt="score icon" className="size-4" />
      <p className={cn("text-sm font-medium", textClass)}>{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <p className="text-xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Grid of tips */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-start" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt={tip.type}
              className="size-5 shrink-0 mt-0.5"
            />
            <p className="text-gray-600">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Detailed explanations */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-xl p-4 border",
              tip.type === "good"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-yellow-50 border-yellow-200 text-yellow-800"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={tip.type}
                className="size-5"
              />
              <p className="font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm opacity-90">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const sections = [
    {
      id: "tone-style",
      title: "Tone & Style",
      data: feedback.toneAndStyle,
    },
    {
      id: "content",
      title: "Content",
      data: feedback.content,
    },
    {
      id: "structure",
      title: "Structure",
      data: feedback.structure,
    },
    {
      id: "skills",
      title: "Skills",
      data: feedback.skills,
    },
  ];

  return (
    <div className="w-full">
      <Accordion>
        {sections.map((section) => (
          <AccordionItem key={section.id} id={section.id}>
            <AccordionHeader itemId={section.id}>
              <CategoryHeader
                title={section.title}
                categoryScore={section.data.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={section.id}>
              <CategoryContent tips={section.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
