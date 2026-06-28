// services/firebaseStorage.ts
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImagesToStorage = async (
  localUris: string[],
): Promise<string[]> => {
  const storage = getStorage();
  const uploadedUrls: string[] = [];

  for (const uri of localUris) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `laporan/${Date.now()}_${filename}`);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    uploadedUrls.push(downloadUrl);
  }
  return uploadedUrls;
};
