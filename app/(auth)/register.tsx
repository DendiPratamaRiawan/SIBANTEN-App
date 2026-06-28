import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../config/Firebase";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!nama || !email || !password || !nik) {
      return Alert.alert("Error", "Mohon lengkapi semua data");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nama: nama,
        email: email,
        nik: nik,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Sukses", "Akun berhasil dibuat!");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Registrasi Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Tambahan Logo */}
          <Image
            source={require("../../assets/images/logoSIBANTEN.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Daftar Akun</Text>
          <Text style={styles.subtitle}>Buat akun SIBANTEN untuk memulai</Text>

          <TextInput
            placeholder="Nama Lengkap"
            style={styles.input}
            onChangeText={setNama}
          />
          <TextInput
            placeholder="NIK"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setNik}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>DAFTAR</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.linkText}>
              Sudah punya akun?{" "}
              <Text style={{ fontWeight: "bold", color: "#FFBF00" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 100, height: 100, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    width: "100%",
    backgroundColor: "#FFBF00",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", fontSize: 16 },
  link: { marginTop: 25 },
  linkText: { color: "#666" },
});
