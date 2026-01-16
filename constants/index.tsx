export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Netflix",
    jobTitle: "Backend Developer",
    imagePath: "/images/resume_04.png",
    resumePath: "/resumes/resume-4.pdf",
    feedback: {
      overallScore: 65,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Amazon",
    jobTitle: "AI Engineer",
    imagePath: "/images/resume_05.png",
    resumePath: "/resumes/resume-5.pdf",
    feedback: {
      overallScore: 60,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Meta",
    jobTitle: "DevOps Engineer",
    imagePath: "/images/resume_06.png",
    resumePath: "/resumes/resume-6.pdf",
    feedback: {
      overallScore: 90,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `{
  "overallScore": 85,
  "ATS": {
    "score": 90,
    "tips": [
      {
        "type": "good",
        "tip": "Good use of keywords"
      },
      {
        "type": "improve",
        "tip": "Add more metrics"
      }
    ]
  },
  "toneAndStyle": {
    "score": 80,
    "tips": [
      {
        "type": "good",
        "tip": "Professional tone",
        "explanation": "The resume uses professional language throughout."
      }
    ]
  },
  "content": {
    "score": 75,
    "tips": [
      {
        "type": "improve",
        "tip": "Quantify achievements",
        "explanation": "Use numbers to show impact."
      }
    ]
  },
  "structure": {
    "score": 85,
    "tips": [
      {
        "type": "good",
        "tip": "Clear headings"
      }
    ]
  },
  "skills": {
    "score": 90,
    "tips": [
      {
        "type": "good",
        "tip": "Relevant skills listed"
      }
    ]
  }
}`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) => `
You are an expert in ATS (Applicant Tracking System) and resume evaluation.

Analyze the provided resume and give an honest, critical assessment.
If the resume is weak, assign low scores. Do not inflate ratings.

Use the job title and job description below to tailor the feedback:
Job Title: ${jobTitle}
Job Description: ${jobDescription}

Rules:
- All scores must be between 0 and 100
- Overall score should reflect the quality of all sections combined
- Provide 3–4 tips per section
- Clearly distinguish between strengths ("good") and improvements ("improve")
- ATS scores are optimistic and keyword-driven
- Most qualified resumes score between 65 and 85
- Do NOT grade like an academic evaluator
- Do NOT penalize missing metrics unless impact is unclear
- Focus primarily on keyword overlap and role relevance

Return the response strictly as a JSON object following this format:
${AIResponseFormat}

Do NOT include backticks, markdown, comments, or any text outside the JSON.
`;