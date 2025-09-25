  import { preset , cloudName } from "../AppSecret";

  export const uploadToCloudinary = async (file: File, folder: string): Promise<string | null> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);
    data.append("folder", folder);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      return json.secure_url ?? null;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };