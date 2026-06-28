import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivasiScreen() {
  const privasiList = [
    {
      title: "Pengumpulan Data",
      desc: "Kami mengumpulkan informasi yang Anda berikan secara sukarela, seperti NIK, nama lengkap, dan data lokasi saat mengirimkan laporan.",
    },
    {
      title: "Penggunaan Informasi",
      desc: "Data tersebut digunakan untuk keperluan verifikasi identitas, tindak lanjut laporan, serta peningkatan kualitas layanan SiBanten.",
    },
    {
      title: "Keamanan Data",
      desc: "Kami menerapkan protokol keamanan enkripsi untuk melindungi data pribadi Anda dari akses yang tidak sah atau penyalahgunaan.",
    },
    {
      title: "Pihak Ketiga",
      desc: "Kami berkomitmen untuk tidak membagikan atau menjual data pribadi Anda kepada pihak ketiga tanpa izin resmi atau perintah hukum yang sah.",
    },
    {
      title: "Pembaruan Kebijakan",
      desc: "Kebijakan ini dapat berubah sewaktu-waktu. Kami akan memberitahu Anda mengenai perubahan signifikan melalui aplikasi.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#FFBF00" />
        <Text style={styles.title}>Kebijakan Privasi</Text>
        <Text style={styles.subtitle}>
          Bagaimana kami menjaga data Anda tetap aman.
        </Text>
      </View>

      <View style={styles.card}>
        {privasiList.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-closed" size={18} color="#003366" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footerNote}>
        Dengan menggunakan aplikasi SiBanten, Anda menyetujui kebijakan privasi
        yang berlaku.
      </Text>
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
  itemRow: { flexDirection: "row", marginBottom: 25 },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#FFF3CD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 4,
  },
  itemDesc: { fontSize: 14, lineHeight: 20, color: "#666" },
  footerNote: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
});
