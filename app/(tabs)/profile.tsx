import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/Firebase";

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    nik: null,
    nama: "User",
    photoURL: null,
  });
  const router = useRouter();

  useEffect(() => {
    // Memantau perubahan data user di Firestore secara real-time
    if (auth.currentUser) {
      const unsub = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as any);
          }
        },
      );
      return () => unsub();
    }
  }, []);

  const handleLogout = async () => {
    Alert.alert("Keluar", "Yakin ingin keluar?", [
      { text: "Batal" },
      {
        text: "Ya",
        onPress: async () => {
          await signOut(auth);
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const MenuIcon = ({ icon, label, onPress, color = "#003366" }: any) => (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: "#F0F4F8" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Avatar dengan cache-busting timestamp */}
        <View style={styles.avatar}>
          {profile.photoURL ? (
            <Image
              source={{ uri: `${profile.photoURL}?${new Date().getTime()}` }}
              style={{ width: 90, height: 90, borderRadius: 45 }}
            />
          ) : (
            <Ionicons name="person" size={50} color="#FFF" />
          )}
        </View>

        <Text style={styles.name}>{profile.nama}</Text>

        <TouchableOpacity
          style={[
            styles.badge,
            { backgroundColor: profile.nik ? "#E8F5E9" : "#FFF3E0" },
          ]}
          onPress={() => !profile.nik && router.push("/verifikasi")}
        >
          <Ionicons
            name={profile.nik ? "shield-checkmark" : "alert-circle"}
            size={16}
            color={profile.nik ? "#2E7D32" : "#EF6C00"}
          />
          <Text
            style={[
              styles.badgeText,
              { color: profile.nik ? "#2E7D32" : "#EF6C00" },
            ]}
          >
            {profile.nik ? "NIK Terverifikasi" : "Klik untuk Verifikasi NIK"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PENGATURAN</Text>
        <MenuIcon
          icon="person-outline"
          label="Edit Profil"
          onPress={() => router.push("/edit-profil")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TENTANG SIBANTEN</Text>
        <MenuIcon
          icon="information-circle-outline"
          label="Tentang Aplikasi"
          onPress={() => router.push("/tentang")}
        />
        <MenuIcon
          icon="document-text-outline"
          label="Syarat & Ketentuan"
          onPress={() => router.push("/syarat")}
        />
        <MenuIcon
          icon="shield-outline"
          label="Kebijakan Privasi"
          onPress={() => router.push("/privasi")}
        />
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar Aplikasi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F6" },
  header: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFBF00",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#003366" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: { fontSize: 12, fontWeight: "bold", marginLeft: 5 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#999",
    marginBottom: 10,
    letterSpacing: 1,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: { flex: 1, fontSize: 15, color: "#333", marginLeft: 15 },
  logout: { margin: 20, padding: 15, alignItems: "center" },
  logoutText: { color: "#D9534F", fontWeight: "bold" },
});
