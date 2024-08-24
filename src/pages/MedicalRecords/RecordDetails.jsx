import React, { useState } from "react";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { Sidebar } from "../../components";
import RecordDetailsHeader from "../../components/MedicalRecords/RecordDetailsHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/index";
import { TbProgress } from "react-icons/tb";
import FileUploadModal from "../../components/MedicalRecords/FileUploadModal";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const RecordDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setIsProcessing] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );
  const [filename, setFilename] = useState("");
  const [fileType, setFileType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateRecord } = useStateContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileType(file.type);
    setFilename(file.name);
    setFile(file);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader?.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: fileType,
          },
        },
      ];
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are an expert mental health diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatments.
        Give a detailed treatment plan for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable
        `;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = result.response;
      const text = response.text();
      setAnalysisResult(text);
      const updatedRecord = await updateRecord({
        documentID: state.id,
        analysisResult: text,
        kanbanRecords: "",
      });
      setUploadSuccess(true);
      setIsModalOpen(false); // Close the modal after a successful upload
      setFilename("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const processTreatmentPlan = async () => {
    setIsProcessing(true);

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Your role and goal is to be an that will be using this treatment plan ${analysisResult} to create Columns:
                - Todo: Tasks that need to be started
                - Doing: Tasks that are in progress
                - Done: Tasks that are completed
          
                Each task should include a brief description. The tasks should be categorized appropriately based on the stage of the treatment process.
          
                Please provide the results in the following  format for easy front-end display no quotating or what so ever just pure the structure below:

                {
                  "columns": [
                    { "id": "todo", "title": "Todo" },
                    { "id": "doing", "title": "Work in progress" },
                    { "id": "done", "title": "Done" }
                  ],
                  "tasks": [
                    { "id": "1", "columnId": "todo", "content": "Example task 1" },
                    { "id": "2", "columnId": "todo", "content": "Example task 2" },
                    { "id": "3", "columnId": "doing", "content": "Example task 3" },
                    { "id": "4", "columnId": "doing", "content": "Example task 4" },
                    { "id": "5", "columnId": "done", "content": "Example task 5" }
                  ]
                }
                            
                `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const parsedResponse = JSON.parse(text);

    console.log(text);
    console.log(parsedResponse);
    const updatedRecord = await updateRecord({
      documentID: state.id,
      kanbanRecords: text,
    });
    console.log(updatedRecord);
    navigate("/schedule", { state: parsedResponse });
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-row items-start gap-6">
      <Sidebar />
      <div className="flex flex-wrap gap-[26px]">
        <button
          type="button"
          onClick={handleOpenModal}
          className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
        >
          <MdOutlineUploadFile size={24} />
          Upload Reports
        </button>
        <FileUploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onFileChange={handleFileChange}
          onFileUpload={handleFileUpload}
          uploading={uploading}
          uploadSuccess={uploadSuccess}
          filename={filename}
        />
        <RecordDetailsHeader recordName={state.recordName} />
        {analysisResult && (
          <div className="w-full">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-[#13131a]">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                        Personalized AI-Driven Treatment Recommendations
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        A tailored medical strategy leveraging advanced AI
                        insights.
                      </p>
                    </div>
                    <div className="flex w-full flex-col px-6 py-4 text-white">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                          Analysis Result
                        </h2>
                        <div className="space-y-2">
                          <ReactMarkdown>{analysisResult}</ReactMarkdown>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-2 sm:flex">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                        >
                          View Treatment plan
                          <FaChevronRight size={20} />
                          {processing && (
                            <TbProgress
                              size={10}
                              className="mr-3 h-5 w-5 animate-spin"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>{" "}
                        </p>
                      </div>
                      <div>
                        <div className="inline-flex gap-x-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordDetails;
