import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../config/Firebase"; // Sesuaikan path Firebase Anda

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const segments = useSegments();

  // 1. Logic Autentikasi untuk menjaga sesi login
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  // 2. Logic Navigasi berdasarkan status user
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, initializing]);

  // 3. Tampilkan Loading saat pengecekan auth awal
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  // 4. Render Stack Navigation yang telah Anda buat
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />

      {/* Halaman di luar tabs */}
      <Stack.Screen
        name="edit-profil"
        options={{
          headerShown: true,
          title: "Edit Profil",
          headerBackTitle: "Kembali",
        }}
      />
      <Stack.Screen
        name="verifikasi"
        options={{
          headerShown: true,
          title: "Verifikasi NIK",
          headerBackTitle: "Kembali",
        }}
      />
      <Stack.Screen
        name="tentang"
        options={{
          headerShown: true,
          title: "Tentang Aplikasi",
          headerBackTitle: "Kembali",
        }}
      />
      <Stack.Screen
        name="syarat"
        options={{
          headerShown: true,
          title: "Syarat & Ketentuan",
          headerBackTitle: "Kembali",
        }}
      />
      <Stack.Screen
        name="privasi"
        options={{
          headerShown: true,
          title: "Kebijakan Privasi",
          headerBackTitle: "Kembali",
        }}
      />
    </Stack>
  );
}
