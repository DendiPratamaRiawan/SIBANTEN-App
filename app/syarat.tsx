import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SyaratScreen() {
  const syaratList = [
    "Pengguna wajib memberikan data diri (NIK) yang valid dan benar sesuai dengan Kartu Tanda Penduduk saat melakukan proses verifikasi.",
    "Dilarang keras menyebarkan laporan palsu, berita bohong (hoax), atau konten yang mengandung unsur SARA dan kebencian.",
    "Pihak pengelola SiBanten berhak melakukan moderasi, peninjauan, atau penghapusan terhadap laporan yang dianggap tidak sesuai dengan ketentuan.",
    "Data pribadi pengguna seperti nama dan lokasi akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan tindak lanjut pelaporan.",
    "Pengguna bertanggung jawab penuh atas setiap informasi atau bukti foto yang diunggah ke dalam aplikasi.",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={40} color="#FFBF00" />
        <Text style={styles.title}>Syarat & Ketentuan</Text>
        <Text style={styles.subtitle}>
          Harap baca dengan teliti sebelum menggunakan layanan SiBanten.
        </Text>
      </View>

      <View style={styles.card}>
        {syaratList.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.updateDate}>Terakhir diperbarui: Juni 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7F6" },
  header: { alignItems: "center", padding: 30, backgroundColor: "#FFBF00" },
  title: { fontSize: 22, fontWeight: "bold", color: "#FFF", marginTop: 10 },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  itemRow: { flexDirection: "row", marginBottom: 20, alignItems: "flex-start" },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFBF00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 2,
  },
  numberText: { color: "#1b0505", fontWeight: "bold" },
  itemText: { fontSize: 15, lineHeight: 22, color: "#333", flex: 1 },
  updateDate: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 40,
  },
});
