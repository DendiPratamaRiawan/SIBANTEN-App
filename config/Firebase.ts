const ReactNativeAsyncStorage =
  require("@react-native-async-storage/async-storage").default;
const { initializeApp } = require("firebase/app");
const { initializeAuth, getReactNativePersistence } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

// Data dari file JSON Anda
const firebaseConfig = {
  apiKey: "AIzaSyAK6gs6hEGjCP8TP1aygggLDd0aaZp2abI", // Dari 'current_key'
  authDomain: "sibanten-app.firebaseapp.com", // Format: [project_id].firebaseapp.com
  projectId: "sibanten-app", // Dari 'project_id'
  storageBucket: "sibanten-app.firebasestorage.app", // Dari 'storage_bucket'
  messagingSenderId: "559640489547", // Dari 'project_number'
  appId: "1:559640489547:android:c664ab1cf1dcfc437327ce", // Dari 'mobilesdk_app_id'
};

const app = initializeApp(firebaseConfig);

// Inisialisasi Auth dengan persistensi
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Inisialisasi Firestore
export const db = getFirestore(app);
