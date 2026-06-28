import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TentangScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        {/* Menggunakan Image dengan source lokal */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logoSIBANTEN.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>SiBanten</Text>
        <Text style={styles.version}>Versi 1.0.4 (Build 2026)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tentang Aplikasi</Text>
        <Text style={styles.description}>
          SiBanten adalah aplikasi resmi pelaporan masyarakat Kota Cilegon.
          Platform ini dirancang untuk mempercepat respon pemerintah terhadap
          laporan warga, mulai dari masalah kebersihan, fasilitas umum, hingga
          keamanan lingkungan.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fitur Unggulan</Text>
        <FeatureItem
          icon="camera"
          text="Pelaporan foto real-time dengan lokasi GPS."
        />
        <FeatureItem
          icon="notifications"
          text="Notifikasi status tindak lanjut laporan."
        />
        <FeatureItem
          icon="shield-checkmark"
          text="Keamanan data terjamin dengan verifikasi NIK."
        />
      </View>

      <Text style={styles.footer}>
        Dikembangkan oleh:{"\n"}
        Tim IT Universitas Faletehan
      </Text>
    </ScrollView>
  );
}

const FeatureItem = ({ icon, text }: { icon: any; text: string }) => (
  <View style={styles.featureRow}>
    <Ionicons name={icon} size={20} color="#FFBF00" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F6" },
  headerSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FFBF00",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden", // Memastikan logo tidak keluar dari kotak
  },
  logoImage: { width: "80%", height: "80%" },
  appName: { fontSize: 28, fontWeight: "bold", color: "#FFF" },
  version: { fontSize: 14, color: "#FFBF00", marginTop: 5 },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },
  description: { fontSize: 15, lineHeight: 24, color: "#555" },
  featureRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  featureText: { marginLeft: 10, fontSize: 14, color: "#333", flex: 1 },
  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 40,
    marginTop: 10,
  },
});
