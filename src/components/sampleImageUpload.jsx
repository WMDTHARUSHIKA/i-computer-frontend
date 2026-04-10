import { useState } from "react";
import uploadFile from "../utils/mediaUpload";

export default function Test() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState("");

    async function upload() {
        if (!file) {
            console.log("Please select a file first");
            return;
        }

        try {
            setIsUploading(true);
            const url = await uploadFile(file);
            setUploadedUrl(url);
            console.log(url);
        } catch (err) {
            console.log(err);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-accent flex justify-center items-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 border border-primary/10">
                <h1 className="text-2xl font-bold text-primary mb-2">
                    Test Image Upload
                </h1>
                <p className="text-primary/70 mb-6">
                    Select an image and upload it to test your media upload utility.
                </p>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-semibold text-primary">
                        Choose File
                    </label>

                    <input
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setUploadedUrl("");
                        }}
                        className="w-full rounded-xl border border-primary/15 bg-accent px-4 py-3 text-primary file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-white hover:file:opacity-90"
                    />

                    {file && (
                        <div className="rounded-xl bg-accent p-4 border border-primary/10">
                            <p className="text-sm text-primary">
                                <span className="font-semibold">Selected file:</span>{" "}
                                {file.name}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={upload}
                        disabled={isUploading || !file}
                        className="h-[46px] rounded-xl bg-secondary text-white font-semibold shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>

                    {uploadedUrl && (
                        <div className="rounded-xl bg-white border border-secondary/20 p-4">
                            <p className="text-sm font-semibold text-primary mb-2">
                                Uploaded URL
                            </p>
                            <p className="break-all text-sm text-secondary">
                                {uploadedUrl}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}