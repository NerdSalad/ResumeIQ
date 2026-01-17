import React, { useState } from 'react';
import Navbar from '~/components/Navbar';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router-dom';
import { convertPdfToImage } from '~/lib/pdf2img';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants';
import Footer from '~/components/Footer';

type FormEvent<T> = React.FormEvent<T>;

const Upload = () => {

    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);
        setStatusText("Uploading your resume...");

        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile)
            return setStatusText("Failed to upload file");

        setStatusText("Converting to image...");

        const imageFile = await convertPdfToImage(file);

        if (!imageFile.file)
            return setStatusText("Error: Failed to convert PDF to image");

        setStatusText("Uploading the image...");

        const uploadedImage = await fs.upload([imageFile.file]);

        if (!uploadedImage)
            return setStatusText("Error: Failed to upload image");

        setStatusText("Preparing data...")

        const uuid = generateUUID();

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: ""
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analyzing...")

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )

        if (!feedback)
            return setStatusText("Error: Failed to analyze resume");

        // Handle both string and array content responses from Claude
        let feedbackText = "";
        if (typeof feedback.message.content === 'string') {
            feedbackText = feedback.message.content;
        } else if (Array.isArray(feedback.message.content)) {
            feedbackText = feedback.message.content[0].text;
        }

        // @ts-ignore - We'll assume the structure is correct for now or could add validation
        data.feedback = JSON.parse(feedbackText)

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analysis complete! Redirecting...")
        navigate(`/resume/${uuid}`)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });

    }

    return (
        <main className='bg-[url("/images/bg-main.svg")] bg-cover min-h-screen flex flex-col'>
            <Navbar />
            <section className='main-section flex-1'>
                <div className='page-heading py-16'>
                    <h1>Smart feedback for your dream job!</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form action="" id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id='company-name' name='company-name' placeholder='Company Name' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id='job-title' name='job-title' placeholder='Job Title' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} id='job-description' name='job-description' placeholder='Paste the complete job description (skills, responsibilities, requirements).' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} file={file} />
                            </div>

                            <button className='primary-button' type='submit'>Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default Upload;